import './PlayerCard.css';

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

export default PlayerCard;