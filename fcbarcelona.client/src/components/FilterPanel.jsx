import './FilterPanel.css';

function FilterPanel({
    showFilters,
    onToggleFilters,
    hasActiveFilters,
    filters,
    onFilterChange,
    onResetFilters,
    uniqueNationalities
}) {
    return (
        <>
            <button
                onClick={onToggleFilters}
                className={`filter-button ${hasActiveFilters ? 'active' : ''}`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Filters
                {hasActiveFilters && <span className="filter-badge"></span>}
            </button>

            {showFilters && (
                <div className="filter-panel">
                    <div className="filter-header">
                        <h3>Filter Players</h3>
                        <button onClick={onResetFilters} className="reset-filters">Reset All</button>
                    </div>

                    <div className="filters-grid">
                        <div className="filter-group">
                            <label>Position</label>
                            <select
                                value={filters.position}
                                onChange={(e) => onFilterChange('position', e.target.value)}
                            >
                                <option value="all">All Positions</option>
                                <option value="Goalkeeper">Goalkeeper</option>
                                <option value="Defender">Defender</option>
                                <option value="Midfielder">Midfielder</option>
                                <option value="Forward">Forward</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Nationality</label>
                            <select
                                value={filters.nationality}
                                onChange={(e) => onFilterChange('nationality', e.target.value)}
                            >
                                <option value="all">All Countries</option>
                                {uniqueNationalities.map(nat => (
                                    <option key={nat} value={nat}>{nat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Minimum Goals: {filters.minGoals}</label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={filters.minGoals}
                                onChange={(e) => onFilterChange('minGoals', parseInt(e.target.value))}
                                className="slider"
                            />
                        </div>

                        <div className="filter-group">
                            <label>Age Range: {filters.minAge} - {filters.maxAge} years</label>
                            <div className="range-inputs">
                                <input
                                    type="number"
                                    min="16"
                                    max="40"
                                    value={filters.minAge}
                                    onChange={(e) => onFilterChange('minAge', parseInt(e.target.value))}
                                    placeholder="Min"
                                />
                                <span>to</span>
                                <input
                                    type="number"
                                    min="16"
                                    max="40"
                                    value={filters.maxAge}
                                    onChange={(e) => onFilterChange('maxAge', parseInt(e.target.value))}
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FilterPanel;