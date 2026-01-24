import { Search, Grid3X3, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SortOrder, ViewMode } from '@/hooks/useProjects';

interface ProjectsControlsProps {
    // Restoring these as they seem to be expected by the parent component "ProjectsPanel" based on the error message
    // "Property 'selectedCategory' does not exist..." implies the parent is passing these.
    // However, the component Logic I wrote previously used activeCategory.
    // I need to match what the Parent passes.
    // The previous error in ProjectsPanel said:
    // Type '{ selectedCategory: string; categories: string[]; onSelectCategory: ... }' is not assignable...
    // So the parent passes: selectedCategory, categories, onSelectCategory, searchTerm, onSearchChange, sortOrder, onSortToggle, viewMode, onViewModeChange.

    // I should accept them but ignore the unused ones if I can't change the parent.
    selectedCategory: string;
    categories: string[];
    onSelectCategory: (category: string) => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortOrder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSortToggle,
    viewMode,
    onViewModeChange
}: ProjectsControlsProps) => {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mt-20 -translate-y-16">

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={cn(
                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border",
                            selectedCategory === category
                                ? "bg-white text-black border-white"
                                : "text-zinc-500 border-white/5 hover:border-white/20 hover:text-zinc-300"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-1 lg:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full bg-black/20 border border-white/5 rounded-full pl-9 pr-4 py-2 text-xs text-zinc-300 focus:outline-none focus:border-white/20 transition-colors"
                    />
                </div>

                {/* View Mode */}
                <div className="flex bg-black/20 rounded-full p-1 border border-white/5">
                    <button
                        onClick={() => onViewModeChange('grid')}
                        className={cn(
                            "p-2 rounded-full transition-all",
                            viewMode === 'grid' ? "bg-white/10 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-400"
                        )}
                    >
                        <Grid3X3 size={14} />
                    </button>
                    <button
                        onClick={() => onViewModeChange('list')}
                        className={cn(
                            "p-2 rounded-full transition-all",
                            viewMode === 'list' ? "bg-white/10 text-white shadow-sm" : "text-zinc-600 hover:text-zinc-400"
                        )}
                    >
                        <List size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsControls;
