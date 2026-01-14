import './PlayerCard.css';

function PlayerCard({ player, onClick, isSelected, compareMode }) {
    return (
        <div
            // Aplica clase CSS diferite daca cardul este selectat sau daca suntem in modul de comparare
            className={`player-card ${isSelected ? 'selected' : ''} ${compareMode ? 'compare-mode' : ''}`}
            onClick={onClick}
        >
            {/* Afiseaza o bifa verde doar daca jucatorul este selectat in modul Compare */}
            {compareMode && isSelected && (
                <div className="selection-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                </div>
            )}
            <div className="player-number">{player.number}</div>
            <img src={player.imageUrl} alt={player.name} className="player-image" />

            <div className="player-overlay">
                <h3 className="player-name">{player.name}</h3>
                <p className="player-position">{player.position}</p>
            </div>
        </div>
    );
}

export default PlayerCard;