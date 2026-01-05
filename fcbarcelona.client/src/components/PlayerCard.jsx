import './PlayerCard.css';

function PlayerCard({ player, onClick, isSelected, compareMode }) {
    return (
        <div 
            className={`player-card ${isSelected ? 'selected' : ''} ${compareMode ? 'compare-mode' : ''}`}
            onClick={onClick}
        >
            {compareMode && isSelected && (
                <div className="selection-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
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