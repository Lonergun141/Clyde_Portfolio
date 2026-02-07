'use client';

import WorkspacePanel from '@/components/spatial/WorkspacePanel';
import { useGitHub } from '@/hooks/useGitHub';
import { Loader2 } from 'lucide-react';
import {
    GitHubSummary,
    ContributionGraph,
    LanguagesList,
    RecentCommits
} from '@/components/github';

export default function GitHubPanel() {
    const { weeks, commits, languages, totalContributions, isLoading, error } = useGitHub();

    return (
        <WorkspacePanel panelId="github" title="GitHub Activity">
            <div className="h-full">

                {/* Asymmetric Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 h-full">

                    {/* Left Column: Summary */}
                    <GitHubSummary
                        totalContributions={totalContributions}
                        commitsCount={commits.length}
                        languagesCount={languages.length}
                        isLoading={isLoading}
                    />

                    {/* Right Column: Activity Details */}
                    <div className="lg:col-span-8 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">

                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 size={24} className="animate-spin text-muted-foreground" />
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-muted-foreground font-mono">{error}</p>
                            </div>
                        ) : (
                            <>
                                <ContributionGraph weeks={weeks} />
                                <LanguagesList languages={languages} />
                                {/* <RecentCommits commits={commits} /> */}
                            </>
                        )}

                    </div>

                </div>

            </div>
        </WorkspacePanel>
    );
}
