import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import FilterPanel from '../components/FilterPanel';
import PlayerCard from '../components/PlayerCard';
import PlayerModal from '../components/PlayerModal';
import CompareModal from '../components/CompareModal';
import VotingModal from '../components/VotingModal';
import './pages.css';

function Players() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [animationComplete, setAnimationComplete] = useState(false);
    
    // Compare mode states
    const [compareMode, setCompareMode] = useState(false);
    const [compareSelection, setCompareSelection] = useState([]);
    
    // Voting state
    const [showVoting, setShowVoting] = useState(false);
    
    // Search, Sort, Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        position: 'all',
        minGoals: 0,
        maxAge: 100,
        minAge: 0,
        nationality: 'all'
    });

    useEffect(() => {
        fetchPlayers();
        
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    async function fetchPlayers() {
        try {
            const response = await fetch('/api/players');
            if (response.ok) {
                const data = await response.json();
                setPlayers(data);
            } else {
                setError(`Error: ${response.status}`);
            }
        } catch (err) {
            setError(`Failed to fetch: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const getFilteredAndSortedPlayers = () => {
        let filtered = [...players];

        // Apply search
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply filters
        if (filters.position !== 'all') {
            filtered = filtered.filter(p => p.position === filters.position);
        }
        if (filters.minGoals > 0) {
            filtered = filtered.filter(p => p.goals >= filters.minGoals);
        }
        if (filters.nationality !== 'all') {
            filtered = filtered.filter(p => p.nationality === filters.nationality);
        }
        filtered = filtered.filter(p => {
            const age = calculateAge(p.dateOfBirth);
            return age >= filters.minAge && age <= filters.maxAge;
        });

        // Apply sorting
        switch(sortBy) {
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'number-asc':
                filtered.sort((a, b) => a.number - b.number);
                break;
            case 'number-desc':
                filtered.sort((a, b) => b.number - a.number);
                break;
            case 'age-asc':
                filtered.sort((a, b) => calculateAge(a.dateOfBirth) - calculateAge(b.dateOfBirth));
                break;
            case 'age-desc':
                filtered.sort((a, b) => calculateAge(b.dateOfBirth) - calculateAge(a.dateOfBirth));
                break;
            case 'goals-asc':
                filtered.sort((a, b) => a.goals - b.goals);
                break;
            case 'goals-desc':
                filtered.sort((a, b) => b.goals - a.goals);
                break;
            default:
                break;
        }

        return filtered;
    };

    const groupByPosition = (playersList) => {
        return {
            goalkeepers: playersList.filter(p => p.position === 'Goalkeeper'),
            defenders: playersList.filter(p => p.position === 'Defender'),
            midfielders: playersList.filter(p => p.position === 'Midfielder'),
            forwards: playersList.filter(p => p.position === 'Forward')
        };
    };

    const handlePlayerChange = (direction) => {
        if (!selectedPlayer) return;
        
        const filteredPlayers = getFilteredAndSortedPlayers();
        const currentIndex = filteredPlayers.findIndex(p => p.id === selectedPlayer.id);
        let newIndex;
        
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredPlayers.length;
        } else {
            newIndex = (currentIndex - 1 + filteredPlayers.length) % filteredPlayers.length;
        }
        
        setSelectedPlayer(filteredPlayers[newIndex]);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSortBy('default');
        setFilters({
            position: 'all',
            minGoals: 0,
            maxAge: 100,
            minAge: 0,
            nationality: 'all'
        });
    };

    const handleCompareToggle = () => {
        setCompareMode(!compareMode);
        setCompareSelection([]);
    };

    const handlePlayerClick = (player) => {
        if (compareMode) {
            // Compare mode logic
            if (compareSelection.find(p => p.id === player.id)) {
                // Deselect player
                setCompareSelection(compareSelection.filter(p => p.id !== player.id));
            } else if (compareSelection.length < 2) {
                // Select player (max 2)
                setCompareSelection([...compareSelection, player]);
            }
        } else {
            // Normal mode - open modal
            setSelectedPlayer(player);
        }
    };

    const isPlayerSelected = (playerId) => {
        return compareSelection.some(p => p.id === playerId);
    };

    const uniqueNationalities = [...new Set(players.map(p => p.nationality))].sort();
    const filteredPlayers = getFilteredAndSortedPlayers();
    const grouped = groupByPosition(filteredPlayers);
    const hasActiveFilters = searchTerm || sortBy !== 'default' || 
        filters.position !== 'all' || filters.minGoals > 0 || 
        filters.nationality !== 'all' || filters.minAge > 0 || filters.maxAge < 100;

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="ball-animation">
                    <svg viewBox="0 0 100 100" className="animated-ball">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <path d="M50,5 L50,25 M50,75 L50,95 M5,50 L25,50 M75,50 L95,50" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
                <p className="loading-text">Loading Squad...</p>
            </div>
        );
    }

    if (error) return <div className="App"><h1>{error}</h1></div>;

    return (
        <>
            <div className={`players-animation-overlay ${animationComplete ? 'fade-out' : ''}`}>
                <div className="players-animation-content">
                    <div className="ball-animation">
                        <svg viewBox="0 0 100 100" className="animated-ball">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <path d="M50,5 L50,25 M50,75 L50,95 M5,50 L25,50 M75,50 L95,50" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </div>
                    <p className="loading-text">Loading Squad...</p>
                </div>
            </div>

            <div className="App">
                <header className="header">
                    <div className="header-content">
                        <h1 className="header-title">FC Barcelona</h1>
                        <div className="header-label">Official Squad</div>
                        <div className="season-badge">
                            <span className="season-year">2025/26</span>
                            <span className="season-label">Season</span>
                        </div>
                    </div>
                </header>

                {/* Toolbar */}
                <div className="toolbar">
                    <div className="toolbar-left">
                        <SearchBar 
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            onClear={() => setSearchTerm('')}
                        />
                    </div>

                    <div className="toolbar-right">
                        <SortDropdown 
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                        />
                        
                        <FilterPanel 
                            showFilters={showFilters}
                            onToggleFilters={() => setShowFilters(!showFilters)}
                            hasActiveFilters={hasActiveFilters}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onResetFilters={resetFilters}
                            uniqueNationalities={uniqueNationalities}
                        />

                        <button 
                            onClick={handleCompareToggle}
                            className={`compare-toggle-button ${compareMode ? 'active' : ''}`}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                            </svg>
                            {compareMode ? 'Cancel Compare' : 'Compare'}
                            {compareMode && compareSelection.length > 0 && (
                                <span className="compare-badge">{compareSelection.length}</span>
                            )}
                        </button>

                        <button 
                            onClick={() => setShowVoting(true)}
                            className="voting-toggle-button"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                            </svg>
                            Vote
                        </button>
                    </div>
                </div>

                {/* Compare Mode Banner */}
                {compareMode && (
                    <div className="compare-banner">
                        <div className="compare-banner-content">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <span>
                                {compareSelection.length === 0 && 'Select 2 players to compare'}
                                {compareSelection.length === 1 && 'Select 1 more player to compare'}
                                {compareSelection.length === 2 && 'Click "View Comparison" to see stats'}
                            </span>
                        </div>
                        {compareSelection.length === 2 && (
                            <button 
                                onClick={() => {
                                }} 
                                className="view-comparison-btn"
                            >
                                View Comparison
                            </button>
                        )}
                    </div>
                )}

                {/* Results Info */}
                <div className="results-info">
                    <span className="results-count">
                        Showing {filteredPlayers.length} of {players.length} players
                    </span>
                    {hasActiveFilters && (
                        <button onClick={resetFilters} className="clear-all">
                            Clear all filters
                        </button>
                    )}
                </div>

                {/* Players Grid */}
                {filteredPlayers.length === 0 ? (
                    <div className="no-results">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <h3>No players found</h3>
                        <p>Try adjusting your search or filters</p>
                        <button onClick={resetFilters} className="reset-button">Reset Filters</button>
                    </div>
                ) : (
                    <>
                        {grouped.goalkeepers.length > 0 && (
                            <section className="position-section">
                                <h2 className="position-title">Goalkeepers</h2>
                                <div className="players-grid">
                                    {grouped.goalkeepers.map(player => (
                                        <PlayerCard 
                                            key={player.id} 
                                            player={player} 
                                            onClick={() => handlePlayerClick(player)}
                                            isSelected={isPlayerSelected(player.id)}
                                            compareMode={compareMode}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {grouped.defenders.length > 0 && (
                            <section className="position-section">
                                <h2 className="position-title">Defenders</h2>
                                <div className="players-grid">
                                    {grouped.defenders.map(player => (
                                        <PlayerCard 
                                            key={player.id} 
                                            player={player}
                                            onClick={() => handlePlayerClick(player)}
                                            isSelected={isPlayerSelected(player.id)}
                                            compareMode={compareMode}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {grouped.midfielders.length > 0 && (
                            <section className="position-section">
                                <h2 className="position-title">Midfielders</h2>
                                <div className="players-grid">
                                    {grouped.midfielders.map(player => (
                                        <PlayerCard 
                                            key={player.id} 
                                            player={player}
                                            onClick={() => handlePlayerClick(player)}
                                            isSelected={isPlayerSelected(player.id)}
                                            compareMode={compareMode}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {grouped.forwards.length > 0 && (
                            <section className="position-section">
                                <h2 className="position-title">Forwards</h2>
                                <div className="players-grid">
                                    {grouped.forwards.map(player => (
                                        <PlayerCard 
                                            key={player.id} 
                                            player={player}
                                            onClick={() => handlePlayerClick(player)}
                                            isSelected={isPlayerSelected(player.id)}
                                            compareMode={compareMode}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}

                {selectedPlayer && !compareMode && (
                    <PlayerModal 
                        player={selectedPlayer} 
                        onClose={() => setSelectedPlayer(null)}
                        onNext={() => handlePlayerChange('next')}
                        onPrev={() => handlePlayerChange('prev')}
                    />
                )}

                {compareSelection.length === 2 && (
                    <CompareModal 
                        player1={compareSelection[0]}
                        player2={compareSelection[1]}
                        onClose={() => {
                            setCompareMode(false);
                            setCompareSelection([]);
                        }}
                    />
                )}

                {showVoting && (
                    <VotingModal 
                        players={players}
                        onClose={() => setShowVoting(false)}
                    />
                )}
            </div>
        </>
    );
}

export default Players;