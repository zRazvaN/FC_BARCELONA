import './SortDropdown.css';

function SortDropdown({ sortBy, onSortChange }) {
    return (
        <select
            // Valoarea selectata este controlata de starea din componenta parinte (Players.jsx)
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
        >
            <option value="default">Sort by...</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="number-asc">Number (Low-High)</option>
            <option value="number-desc">Number (High-Low)</option>
            <option value="age-asc">Age (Young-Old)</option>
            <option value="age-desc">Age (Old-Young)</option>
            <option value="goals-asc">Goals (Low-High)</option>
            <option value="goals-desc">Goals (High-Low)</option>
        </select>
    );
}

export default SortDropdown;