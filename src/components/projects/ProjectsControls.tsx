import { motion } from 'framer-motion';
import { Search, ArrowUp, ArrowDown, ArrowUpDown, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SortOrder, ViewMode } from '@/hooks/useProjects';

interface ProjectsControlsProps {
    selectedCategory: string;
    categories: string[];
    onSelectCategory: (category: string) => void;
    searchTerm: string;
    onSearchChange: (display: string) => void;
    sortOrder: SortOrder;
    onSortToggle: () => void;
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

const ProjectsControls = ({
    selectedCategory,
    categories,
    onSelectCategory,
    searchTerm,
    onSearchChange,
    sortOrder,
    onSortToggle,
    viewMode,
    onViewModeChange
}: ProjectsControlsProps) => {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mt-20 -translate-y-16">

            {/* Category Tabs (Scene Selection) */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={cn(
                            "text-xs md:text-sm uppercase tracking-widest transition-all duration-300 relative py-1",
                            selectedCategory === category
                                ? "text-foreground font-bold"
                                : "text-muted-foreground hover:text-foreground/80"
                        )}
                    >
                        {category}
                        {selectedCategory === category && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tools (Search, Sort, View) */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative group flex-1 lg:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={14} />
                    <input
                        type="text"
                        placeholder="SEARCH ARCHIVES..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-secondary/30 border border-border/50 text-foreground text-xs font-mono py-2.5 pl-9 pr-4 focus:outline-none focus:border-primary/50 transition-colors uppercase tracking-wider placeholder:text-muted-foreground/50"
                    />
                </div>

                <div className="flex items-center gap-px border border-border/50 bg-secondary/30 p-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onSortToggle}
                        className="h-8 w-8 hover:bg-background/50 text-muted-foreground hover:text-foreground rounded-none"
                        title="Sort by Year"
                    >
                        {sortOrder === 'asc' ? <ArrowUp size={14} /> : sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUpDown size={14} />}
                    </Button>
                    <div className="w-[1px] h-4 bg-border/50 mx-1" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewModeChange('grid')}
                        className={cn(
                            "h-8 w-8 hover:bg-background/50 rounded-none transition-colors",
                            viewMode === 'grid' ? "text-foreground bg-background/80 shadow-sm" : "text-muted-foreground"
                        )}
                    >
                        <Grid3X3 size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewModeChange('list')}
                        className={cn(
                            "h-8 w-8 hover:bg-background/50 rounded-none transition-colors",
                            viewMode === 'list' ? "text-foreground bg-background/80 shadow-sm" : "text-muted-foreground"
                        )}
                    >
                        <List size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsControls;
