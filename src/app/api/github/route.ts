import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Lonergun141';

// Revalidate every 5 minutes to get fresh data
export const revalidate = 300;

export async function GET() {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return NextResponse.json(
            { error: 'GitHub token not configured' },
            { status: 500 }
        );
    }

    // GraphQL query for contribution data AND recent commits
    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                contributionLevel
                            }
                        }
                    }
                    commitContributionsByRepository(maxRepositories: 10) {
                        repository {
                            name
                            url
                            isPrivate
                        }
                        contributions(first: 3) {
                            nodes {
                                commitCount
                                occurredAt
                            }
                        }
                    }
                }
                repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, ownerAffiliations: [OWNER]) {
                    nodes {
                        name
                        url
                        isPrivate
                        primaryLanguage {
                            name
                            color
                        }
                        diskUsage
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    history(first: 5) {
                                        nodes {
                                            oid
                                            message
                                            committedDate
                                            url
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        // Fetch data from GraphQL API
        const graphqlRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { username: GITHUB_USERNAME },
            }),
        });

        if (!graphqlRes.ok) {
            throw new Error(`GraphQL request failed: ${graphqlRes.status}`);
        }

        const graphqlData = await graphqlRes.json();

        if (graphqlData.errors) {
            console.error('GraphQL errors:', graphqlData.errors);
            throw new Error(graphqlData.errors[0]?.message || 'GraphQL error');
        }

        const user = graphqlData.data?.user;
        if (!user) {
            throw new Error('User not found');
        }

        // Process contribution data - preserve week structure from GitHub
        const calendar = user.contributionsCollection.contributionCalendar;
        const weeks: { date: string; count: number; level: number }[][] = [];

        for (const week of calendar.weeks) {
            const weekDays: { date: string; count: number; level: number }[] = [];
            for (const day of week.contributionDays) {
                const levelMap: Record<string, number> = {
                    'NONE': 0,
                    'FIRST_QUARTILE': 1,
                    'SECOND_QUARTILE': 2,
                    'THIRD_QUARTILE': 3,
                    'FOURTH_QUARTILE': 4,
                };
                weekDays.push({
                    date: day.date,
                    count: day.contributionCount,
                    level: levelMap[day.contributionLevel] || 0,
                });
            }
            weeks.push(weekDays);
        }

        // Flatten for backward compatibility with contributions array
        const contributions = weeks.flat();

        // Process language data
        const langCounts: Record<string, { size: number; color: string }> = {};
        for (const repo of user.repositories.nodes) {
            if (repo.primaryLanguage) {
                const name = repo.primaryLanguage.name;
                if (!langCounts[name]) {
                    langCounts[name] = { size: 0, color: repo.primaryLanguage.color || '#8b949e' };
                }
                langCounts[name].size += repo.diskUsage || 1;
            }
        }

        const totalSize = Object.values(langCounts).reduce((a, b) => a + b.size, 0);
        const languages = Object.entries(langCounts)
            .map(([name, data]) => ({
                name,
                percentage: totalSize > 0 ? Math.round((data.size / totalSize) * 100) : 0,
                color: data.color,
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 6);

        // Extract commits from repositories
        const commits: { sha: string; message: string; repo: string; date: string; url: string }[] = [];

        for (const repo of user.repositories.nodes) {
            const history = repo.defaultBranchRef?.target?.history?.nodes || [];
            for (const commit of history) {
                commits.push({
                    sha: commit.oid.slice(0, 7),
                    message: commit.message.split('\n')[0].slice(0, 60),
                    repo: repo.name,
                    date: new Date(commit.committedDate).toLocaleDateString(),
                    url: commit.url,
                });
            }
        }

        // Sort by date and take most recent
        commits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return NextResponse.json({
            contributions,
            weeks,
            totalContributions: calendar.totalContributions,
            languages,
            commits: commits.slice(0, 8),
        });

    } catch (error) {
        console.error('GitHub API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch GitHub data' },
            { status: 500 }
        );
    }
}

