import { useEffect, useState } from 'react';
import './pages.css';

function Players() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [animationComplete, setAnimationComplete] = useState(false);

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

    const groupByPosition = () => {
        return {
            goalkeepers: players.filter(p => p.position === 'Goalkeeper'),
            defenders: players.filter(p => p.position === 'Defender'),
            midfielders: players.filter(p => p.position === 'Midfielder'),
            forwards: players.filter(p => p.position === 'Forward')
        };
    };

    const handlePlayerChange = (direction) => {
        if (!selectedPlayer) return;

        const currentIndex = players.findIndex(p => p.id === selectedPlayer.id);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % players.length;
        } else {
            newIndex = (currentIndex - 1 + players.length) % players.length;
        }

        setSelectedPlayer(players[newIndex]);
    };

    const grouped = groupByPosition();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="ball-animation">
                    <svg viewBox="0 0 100 100" className="animated-ball">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M50,5 L50,25 M50,75 L50,95 M5,50 L25,50 M75,50 L95,50" stroke="currentColor" strokeWidth="2" />
                        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
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
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M50,5 L50,25 M50,75 L50,95 M5,50 L25,50 M75,50 L95,50" stroke="currentColor" strokeWidth="2" />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="loading-text">Loading Squad...</p>
                </div>
            </div>

            <div className="App">
                <header className="header">
                    <div className="header-content">
                        <h1 className="header-title">
                            <span className="title-fc">FC </span>
                            <span className="title-barcelona">Barcelona</span>
                        </h1>
                        <div className="header-label">Official Squad</div>
                        <div className="header-season">
                            <div className="season-badge">
                                <span className="season-year">2025/26</span>
                                <span className="season-label">Season</span>
                            </div>
                            <div className="header-divider"></div>
                        </div>
                    </div>
                </header>

                {grouped.goalkeepers.length > 0 && (
                    <section className="position-section">
                        <h2 className="position-title">Goalkeepers</h2>
                        <div className="players-grid">
                            {grouped.goalkeepers.map(player => (
                                <PlayerCard
                                    key={player.id}
                                    player={player}
                                    onClick={() => setSelectedPlayer(player)}
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
                                    onClick={() => setSelectedPlayer(player)}
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
                                    onClick={() => setSelectedPlayer(player)}
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
                                    onClick={() => setSelectedPlayer(player)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {selectedPlayer && (
                    <PlayerModal
                        player={selectedPlayer}
                        onClose={() => setSelectedPlayer(null)}
                        onNext={() => handlePlayerChange('next')}
                        onPrev={() => handlePlayerChange('prev')}
                    />
                )}
            </div>
        </>
    );
}

function PlayerCard({ player, onClick }) {
    return (
        <div className="player-card" onClick={onClick}>
            <div className="player-number">{player.number}</div>
            <img src={player.imageUrl} alt={player.name} className="player-image" />
            <div className="player-overlay">
                <h3 className="player-name">{player.name}</h3>
                <p className="player-position">{player.position}</p>
            </div>
        </div>
    );
}

function PlayerModal({ player, onClose, onNext, onPrev }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onNext, onPrev, onClose]);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

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

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <button className="modal-nav-button modal-nav-prev" onClick={onPrev} title="Previous player (←)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div className="modal-container">
                <button className="modal-close" onClick={onClose} title="Close (Esc)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="modal-content">
                    <div className="modal-left">
                        <div className="modal-player-number">{player.number}</div>
                        <img src={player.imageUrl} alt={player.name} className="modal-player-image" />
                        <div className="modal-player-header">
                            <h2 className="modal-player-name">{player.name}</h2>
                            <p className="modal-player-position">{player.position}</p>
                        </div>
                    </div>

                    <div className="modal-right">
                        <div className="stats-section">
                            <h3 className="section-title">Player Statistics</h3>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-label">Nationality</div>
                                    <div className="stat-value">{player.nationality}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Age</div>
                                    <div className="stat-value">{calculateAge(player.dateOfBirth)} years</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Date of Birth</div>
                                    <div className="stat-value">{new Date(player.dateOfBirth).toLocaleDateString('en-GB')}</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-label">Squad Number</div>
                                    <div className="stat-value">#{player.number}</div>
                                </div>
                                <div className="stat-item highlight">
                                    <div className="stat-label">Total Goals</div>
                                    <div className="stat-value-big">⚽ {player.goals}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="modal-nav-button modal-nav-next" onClick={onNext} title="Next player (→)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}

export default Players;