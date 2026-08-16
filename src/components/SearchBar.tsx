import { Search, Plus } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onAdd?: () => void;
  addLabel?: string;
}

export default function SearchBar({ value, onChange, placeholder = '搜索...', onAdd, addLabel = '新增' }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      )}
    </div>
  );
}
