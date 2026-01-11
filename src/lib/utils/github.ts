// Language icon mapping using Simple Icons CDN
export const languageIcons: Record<string, string> = {
    'JavaScript': 'https://cdn.simpleicons.org/javascript',
    'TypeScript': 'https://cdn.simpleicons.org/typescript',
    'Python': 'https://cdn.simpleicons.org/python',
    'Java': 'https://cdn.simpleicons.org/openjdk',
    'C++': 'https://cdn.simpleicons.org/cplusplus',
    'C#': 'https://cdn.simpleicons.org/csharp',
    'C': 'https://cdn.simpleicons.org/c',
    'Go': 'https://cdn.simpleicons.org/go',
    'Rust': 'https://cdn.simpleicons.org/rust',
    'Ruby': 'https://cdn.simpleicons.org/ruby',
    'PHP': 'https://cdn.simpleicons.org/php',
    'Swift': 'https://cdn.simpleicons.org/swift',
    'Kotlin': 'https://cdn.simpleicons.org/kotlin',
    'Dart': 'https://cdn.simpleicons.org/dart',
    'HTML': 'https://cdn.simpleicons.org/html5',
    'CSS': 'https://cdn.simpleicons.org/css3',
    'SCSS': 'https://cdn.simpleicons.org/sass',
    'Sass': 'https://cdn.simpleicons.org/sass',
    'Vue': 'https://cdn.simpleicons.org/vuedotjs',
    'React': 'https://cdn.simpleicons.org/react',
    'Shell': 'https://cdn.simpleicons.org/gnubash',
    'PowerShell': 'https://cdn.simpleicons.org/powershell',
    'Dockerfile': 'https://cdn.simpleicons.org/docker',
    'Lua': 'https://cdn.simpleicons.org/lua',
    'R': 'https://cdn.simpleicons.org/r',
    'Scala': 'https://cdn.simpleicons.org/scala',
    'Elixir': 'https://cdn.simpleicons.org/elixir',
    'Haskell': 'https://cdn.simpleicons.org/haskell',
    'Perl': 'https://cdn.simpleicons.org/perl',
    'MATLAB': 'https://cdn.simpleicons.org/mathworks',
    'Jupyter Notebook': 'https://cdn.simpleicons.org/jupyter',
};

// Contribution level colors for heatmap
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

const levelColors: Record<ContributionLevel, string> = {
    0: 'bg-muted/30',
    1: 'bg-accent/30',
    2: 'bg-accent/50',
    3: 'bg-accent/70',
    4: 'bg-accent',
};

export const getLevelColor = (level: ContributionLevel): string => {
    return levelColors[level];
};

// Generate weeks for the heatmap (52 weeks x 7 days)
export interface ContributionDay {
    date: string;
    count: number;
    level: ContributionLevel;
}

export const generateWeeks = (contributions: ContributionDay[]): ContributionDay[][] => {
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < 52; i++) {
        weeks.push(contributions.slice(i * 7, (i + 1) * 7));
    }
    return weeks;
};
