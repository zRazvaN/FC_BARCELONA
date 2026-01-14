import { useEffect } from 'react';
import './CompareModal.css';

function CompareModal({ player1, player2, onClose }) {
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

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('compare-backdrop')) {
            onClose();
        }
    };

    const getComparisonValue = (stat1, stat2, higherIsBetter = true) => {
        if (stat1 === stat2) return 'equal';
        if (higherIsBetter) {
            return stat1 > stat2 ? 'better' : 'worse';
        } else {
            return stat1 < stat2 ? 'better' : 'worse';
        }
    };

    const age1 = calculateAge(player1.dateOfBirth);
    const age2 = calculateAge(player2.dateOfBirth);

    return (
        <div className="compare-backdrop" onClick={handleBackdropClick}>
            <div className="compare-container">
                <button className="compare-close" onClick={onClose} title="Close (Esc)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="compare-header">
                    <h2>Player Comparison</h2>
                    <p className="compare-subtitle">Compare stats side by side</p>
                </div>

                <div className="compare-content">
                    {/* Sectiune Jucator 1 */}
                    <div className="compare-player">
                        <div className="compare-player-card">
                            <div className="compare-player-number">{player1.number}</div>
                            <img src={player1.imageUrl} alt={player1.name} className="compare-player-image" />
                            <div className="compare-player-info">
                                <h3 className="compare-player-name">{player1.name}</h3>
                                <p className="compare-player-position">{player1.position}</p>
                                <p className="compare-player-nationality">{player1.nationality}</p>
                            </div>
                        </div>

                        <div className="compare-stats">
                            <div className={`compare-stat ${getComparisonValue(player1.goals, player2.goals)}`}>
                                <div className="stat-label">Goals</div>
                                <div className="stat-value">{player1.goals}</div>
                            </div>

                            <div className={`compare-stat ${getComparisonValue(age1, age2, false)}`}>
                                <div className="stat-label">Age</div>
                                <div className="stat-value">{age1} years</div>
                            </div>

                            <div className="compare-stat equal">
                                <div className="stat-label">Squad Number</div>
                                <div className="stat-value">#{player1.number}</div>
                            </div>

                            <div className="compare-stat equal">
                                <div className="stat-label">Date of Birth</div>
                                <div className="stat-value">{new Date(player1.dateOfBirth).toLocaleDateString('en-GB')}</div>
                            </div>
                        </div>
                    </div>

                    <div className="compare-divider">
                        <div className="vs-badge">
                            <span>VS</span>
                        </div>
                    </div>

                    {/* Sectiune Jucator 2 */}
                    <div className="compare-player">
                        <div className="compare-player-card">
                            <div className="compare-player-number">{player2.number}</div>
                            <img src={player2.imageUrl} alt={player2.name} className="compare-player-image" />
                            <div className="compare-player-info">
                                <h3 className="compare-player-name">{player2.name}</h3>
                                <p className="compare-player-position">{player2.position}</p>
                                <p className="compare-player-nationality">{player2.nationality}</p>
                            </div>
                        </div>

                        <div className="compare-stats">
                            {/* Verificam statisticile jucatorului 2 in raport cu jucatorul 1 */}
                            <div className={`compare-stat ${getComparisonValue(player2.goals, player1.goals)}`}>
                                <div className="stat-label">Goals</div>
                                <div className="stat-value">{player2.goals}</div>
                            </div>

                            <div className={`compare-stat ${getComparisonValue(age2, age1, false)}`}>
                                <div className="stat-label">Age</div>
                                <div className="stat-value">{age2} years</div>
                            </div>

                            <div className="compare-stat equal">
                                <div className="stat-label">Squad Number</div>
                                <div className="stat-value">#{player2.number}</div>
                            </div>

                            <div className="compare-stat equal">
                                <div className="stat-label">Date of Birth</div>
                                <div className="stat-value">{new Date(player2.dateOfBirth).toLocaleDateString('en-GB')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="compare-footer">
                    <div className="compare-legend">
                        <div className="legend-item">
                            <div className="legend-color better"></div>
                            <span>Better stat</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color equal"></div>
                            <span>Neutral</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color worse"></div>
                            <span>Lower stat</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompareModal;