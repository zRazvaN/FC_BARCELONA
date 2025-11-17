import { useEffect, useState } from 'react';
import './pages.css';

function Players() {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlayers();
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

    const grouped = groupByPosition();

    if (loading) return <div className="App"><h1>Loading...</h1></div>;
    if (error) return <div className="App"><h1>{error}</h1></div>;

    return (
        <div className="App">
            <header className="header">
                <h1>FC Barcelona Squad</h1>
                <p className="subtitle">Season 2024/25</p>
            </header>

            {/* Portari */}
            {grouped.goalkeepers.length > 0 && (
                <section className="position-section">
                    <h2 className="position-title">Goalkeepers</h2>
                    <div className="players-grid">
                        {grouped.goalkeepers.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                </section>
            )}

            {/* Fundasi */}
            {grouped.defenders.length > 0 && (
                <section className="position-section">
                    <h2 className="position-title">Defenders</h2>
                    <div className="players-grid">
                        {grouped.defenders.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                </section>
            )}

            {/* Mijlocasi */}
            {grouped.midfielders.length > 0 && (
                <section className="position-section">
                    <h2 className="position-title">Midfielders</h2>
                    <div className="players-grid">
                        {grouped.midfielders.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                </section>
            )}

            {/* Atacanti */}
            {grouped.forwards.length > 0 && (
                <section className="position-section">
                    <h2 className="position-title">Forwards</h2>
                    <div className="players-grid">
                        {grouped.forwards.map(player => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

function PlayerCard({ player }) {
    return (
        <div className="player-card">
            <div className="player-number">{player.number}</div>
            <img src={player.imageUrl} alt={player.name} className="player-image" />
            <h3 className="player-name">{player.name}</h3>
            <p className="player-info">{player.nationality}</p>
            <div className="player-stats">
                <span className="stat">⚽ {player.goals} goals</span>
                <span className="stat">📅 {new Date(player.dateOfBirth).toLocaleDateString()}</span>
            </div>
        </div>
    );
}

export default Players;