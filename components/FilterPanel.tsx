import { Filter, Star, SortAsc, Building, Users } from 'lucide-react';
import { Category } from '@/types/attendee';

interface FilterPanelProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'name' | 'company' | 'priority';
  onSortChange: (sort: 'name' | 'company' | 'priority') => void;
  showOnlyTopTargets: boolean;
  onTopTargetsToggle: () => void;
}

const categoryColors: Record<string, string> = {
  'Investors': 'bg-purple-500',
  'Tech/AI': 'bg-blue-500',
  'EdTech': 'bg-emerald-500',
  'Longevity/Health': 'bg-red-500',
  'Middle East': 'bg-amber-500',
  'Other': 'bg-gray-500',
};

export default function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  showOnlyTopTargets,
  onTopTargetsToggle,
}: FilterPanelProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-white">Filters & Sort</h2>
      </div>

      {/* Top Targets Toggle */}
      <div className="mb-6">
        <button
          onClick={onTopTargetsToggle}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${showOnlyTopTargets ? 'bg-yellow-900/30 border border-yellow-700/50' : 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-lg ${showOnlyTopTargets ? 'bg-yellow-900/50' : 'bg-gray-700/50'}`}>
              <Star className={`w-4 h-4 ${showOnlyTopTargets ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className="font-medium text-white">Top Targets Only</p>
              <p className="text-xs text-gray-400">Show Primer-relevant contacts</p>
            </div>
          </div>
          <div className={`w-10 h-6 rounded-full transition-colors ${showOnlyTopTargets ? 'bg-yellow-500' : 'bg-gray-600'}`}>
            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${showOnlyTopTargets ? 'translate-x-5' : 'translate-x-1'} mt-1`} />
          </div>
        </button>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
          <SortAsc className="w-4 h-4" />
          Sort By
        </h3>
        <div className="space-y-2">
          {[
            { id: 'priority', label: 'Priority Score', icon: Star },
            { id: 'name', label: 'Name', icon: Users },
            { id: 'company', label: 'Company', icon: Building },
          ].map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => onSortChange(option.id as 'name' | 'company' | 'priority')}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${sortBy === option.id ? 'bg-blue-900/30 text-blue-300' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{option.label}</span>
                {sortBy === option.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition ${selectedCategory === category.id ? 'bg-gray-800' : 'hover:bg-gray-800/50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${categoryColors[category.id] || 'bg-gray-500'}`}></div>
                <span className={`text-sm ${selectedCategory === category.id ? 'text-white' : 'text-gray-400'}`}>
                  {category.label}
                </span>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                {category.count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      {(selectedCategory !== 'all' || showOnlyTopTargets) && (
        <button
          onClick={() => {
            onCategoryChange('all');
            if (showOnlyTopTargets) onTopTargetsToggle();
          }}
          className="w-full mt-6 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
        >
          Reset all filters
        </button>
      )}
    </div>
  );
}