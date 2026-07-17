// src/components/BookFilter.tsx　作成者：小松拓
import type { FilterStatus, SortOrder } from './types';

type BookFilterProps = {
  filter: FilterStatus;
  sortOrder: SortOrder;
  onFilterChange: (filter: FilterStatus) => void;
  onSortOrderChange: (order: SortOrder) => void;
};

const FILTER_OPTIONS: FilterStatus[] = ['すべて', '未読', '読書中', '読了'];


function BookFilter({
  filter,
  sortOrder,
  onFilterChange,
  onSortOrderChange,
}: BookFilterProps) {

  const handleSortToggle = () => {
    onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="book-filter">
      <div className="filter-group">
        <span className="filter-label">絞り込み:</span>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={filter === option ? 'is-active' : ''}
            onClick={() => onFilterChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="sort-group">
        <span className="filter-label">並び替え:</span>
        <button type="button" onClick={handleSortToggle}>
          価格 {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
      </div>
    </div>
  );
}

export default BookFilter;