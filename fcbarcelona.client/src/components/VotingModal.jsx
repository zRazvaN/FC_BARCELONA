import { useEffect, useState } from 'react';
import './VotingModal.css';

function VotingModal({ players, onClose }) {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [votingResults, setVotingResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Genereaza sau recupereaza un ID unic pentru vizitator din browser (LocalStorage)
    // Acest ID previne votul multiplu fara a necesita cont de utilizator
    const getVoterIdentifier = () => {
        let identifier = localStorage.getItem('voter_id');
        if (!identifier) {
            identifier = 'voter_' + Math.random().toString(36).substr(2, 9) + Date.now();
            localStorage.setItem('voter_id', identifier);
        }
        return identifier;
    };

    useEffect(() => {
        // Blocam scroll-ul paginii din spate cand modalul este deschis
        document.body.style.overflow = 'hidden';
        checkVotingStatus();

        // Inchidere modal la apasarea tastei Escape
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // Reinstauram scroll-ul si curatam event listener-ul la inchidere
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    // Verifica la server daca acest vizitator a votat deja
    const checkVotingStatus = async () => {
        try {
            const identifier = getVoterIdentifier();
            const response = await fetch(`/api/votes/check/${identifier}`);
            const data = await response.json();

            if (data.hasVoted) {
                setHasVoted(true);
                await fetchResults(); // Daca a votat, aratam direct rezultatele
            }
        } catch (err) {
            console.error('Error checking vote status:', err);
        } finally {
            setLoading(false);
        }
    };

    // Aduce clasamentul actual de la server
    const fetchResults = async () => {
        try {
            const response = await fetch('/api/votes/results');
            const data = await response.json();
            setVotingResults(data);
        } catch (err) {
            console.error('Error fetching results:', err);
        }
    };

    // Trimite votul catre API
    const handleVote = async (playerId) => {
        try {
            const identifier = getVoterIdentifier();
            const response = await fetch('/api/votes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerId: playerId,
                    voterIdentifier: identifier
                })
            });

            if (response.ok) {
                setHasVoted(true);
                await fetchResults(); // Reincarcam rezultatele pentru a include noul vot
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to cast vote');
            }
        } catch (err) {
            setError('Failed to cast vote. Please try again.');
            console.error('Error casting vote:', err);
        }
    };

    // Inchide modalul daca se da click pe fundalul intunecat (in afara ferestrei)
    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('voting-backdrop')) {
            onClose();
        }
    };

    // Calculeaza procentajul pentru bara de progres din rezultate
    const getPercentage = (voteCount, totalVotes) => {
        if (totalVotes === 0) return 0;
        return ((voteCount / totalVotes) * 100).toFixed(1);
    };

    if (loading) {
        return (
            <div className="voting-backdrop">
                <div className="voting-container">
                    <div className="loading-state">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="voting-backdrop" onClick={handleBackdropClick}>
            <div className="voting-container">
                <button className="voting-close" onClick={onClose} title="Close (Esc)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="voting-header">
                    <div className="trophy-icon"></div>
                    <h2>Player of the Month</h2>
                    <p className="voting-subtitle">
                        {hasVoted ? 'Voting Results' : 'Vote for your favorite player'}
                    </p>
                </div>

                {error && (
                    <div className="error-message">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {error}
                    </div>
                )}
                {!hasVoted ? (
                    <div className="voting-grid">
                        {players.map(player => (
                            <div
                                key={player.id}
                                className={`vote-card ${selectedPlayer === player.id ? 'selected' : ''}`}
                                onClick={() => setSelectedPlayer(player.id)}
                            >
                                <img src={player.imageUrl} alt={player.name} className="vote-player-image" />
                                <div className="vote-player-info">
                                    <div className="vote-player-number">{player.number}</div>
                                    <h3 className="vote-player-name">{player.name}</h3>
                                    <p className="vote-player-position">{player.position}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            handleVote(player.id);
                                        }}
                                        className="vote-button"
                                    >
                                        Vote
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="results-container">
                        <div className="results-header">
                            <h3>Current Standings</h3>
                            <p>Total Votes: {votingResults?.totalVotes || 0}</p>
                        </div>

                        <div className="results-list">
                            {votingResults?.results?.map((result, index) => (
                                <div key={result.player.id} className="result-item">
                                    <div className="result-rank">
                                        {index === 0 && '1'}
                                        {index === 1 && '2'}
                                        {index === 2 && '3'}
                                        {index > 2 && `#${index + 1}`}
                                    </div>

                                    <img
                                        src={result.player.imageUrl}
                                        alt={result.player.name}
                                        className="result-player-image"
                                    />

                                    <div className="result-player-info">
                                        <h4>{result.player.name}</h4>
                                        <p>{result.player.position}</p>
                                    </div>

                                    <div className="result-votes">
                                        <div className="vote-count">{result.voteCount} votes</div>
                                        <div className="vote-percentage">
                                            {getPercentage(result.voteCount, votingResults.totalVotes)}%
                                        </div>
                                    </div>
                                    <div className="result-progress">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${getPercentage(result.voteCount, votingResults.totalVotes)}%`,
                                                background: index === 0 ? 'linear-gradient(90deg, #FFD700, #FFA500)' :
                                                    index === 1 ? 'linear-gradient(90deg, #C0C0C0, #A8A8A8)' :
                                                        index === 2 ? 'linear-gradient(90deg, #CD7F32, #B87333)' :
                                                            'linear-gradient(90deg, #0066ff, #00ccff)'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="thank-you-message">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>Thank you for voting!</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VotingModal;