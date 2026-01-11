import { useState, useEffect, useCallback } from 'react';

interface GitHubContribution {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubCommit {
    sha: string;
    message: string;
    repo: string;
    date: string;
    url: string;
}

interface GitHubLanguage {
    name: string;
    percentage: number;
    color: string;
}

interface GitHubData {
    contributions: GitHubContribution[];
    weeks: GitHubContribution[][];
    commits: GitHubCommit[];
    languages: GitHubLanguage[];
    totalContributions: number;
    isLoading: boolean;
    error: string | null;
}

export function useGitHub(): GitHubData {
    const [contributions, setContributions] = useState<GitHubContribution[]>([]);
    const [weeks, setWeeks] = useState<GitHubContribution[][]>([]);
    const [commits, setCommits] = useState<GitHubCommit[]>([]);
    const [languages, setLanguages] = useState<GitHubLanguage[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGitHubData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Fetch from our API route (which uses GraphQL)
            const response = await fetch('/api/github');

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch GitHub data');
            }

            const data = await response.json();

            setContributions(data.contributions || []);
            setWeeks(data.weeks || []);
            setTotalContributions(data.totalContributions || 0);
            setLanguages(data.languages || []);
            setCommits(data.commits || []);

        } catch (err) {
            console.error('GitHub fetch error:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGitHubData();
    }, [fetchGitHubData]);

    return {
        contributions,
        weeks,
        commits,
        languages,
        totalContributions,
        isLoading,
        error,
    };
}
