import { useEffect } from 'react';
import './LegendModal.css';

function LegendModal({ legend, onClose, onNext, onPrev }) {
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

    const totalTrophies = legend.laLigaTitles + legend.championsLeague + legend.copaDelRey + legend.otherTrophies;

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <button className="modal-nav-button modal-nav-prev" onClick={onPrev} title="Previous legend">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div className="modal-container legend-modal">
                <button className="modal-close" onClick={onClose} title="Close (Esc)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="modal-content">
                    <div className="modal-left">
                        {/* Afiseaza numarul de pe tricou doar daca acesta exista (managerul nu are numar) */}
                        {legend.number && <div className="modal-player-number">{legend.number}</div>}
                        <img src={legend.imageUrl} alt={legend.name} className="modal-player-image" />
                        <div className="modal-player-header">
                            <h2 className="modal-player-name">{legend.name}</h2>
                            <p className="modal-player-position">{legend.isManager ? 'Manager' : legend.position}</p>
                            <p className="legend-years">{legend.yearsAtClub}</p>
                        </div>

                        <div className="legend-description">
                            <p>{legend.description}</p>
                        </div>
                    </div>

                    <div className="modal-right">
                        {!legend.isManager && (
                            <div className="stats-section">
                                <h3 className="section-title">Career Statistics</h3>
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <div className="stat-label">Nationality</div>
                                        <div className="stat-value">{legend.nationality}</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">Years at Club</div>
                                        <div className="stat-value">{legend.yearsAtClub}</div>
                                    </div>
                                    <div className="stat-item highlight">
                                        <div className="stat-label">Appearances</div>
                                        <div className="stat-value-big">{legend.appearances}</div>
                                    </div>
                                    <div className="stat-item highlight">
                                        <div className="stat-label">Goals</div>
                                        <div className="stat-value-big">{legend.goals}</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">Assists</div>
                                        <div className="stat-value">{legend.assists}</div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-label">Total Trophies</div>
                                        <div className="stat-value trophy-count">{totalTrophies}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="stats-section">
                            <h3 className="section-title">🏆 Trophies</h3>
                            <div className="trophies-grid">
                                <div className="trophy-item ucl-trophy">
                                    <div className="trophy-icon-large">🏆</div>
                                    <div className="trophy-count-large">{legend.championsLeague}x</div>
                                    <div className="trophy-name">Champions League</div>
                                </div>
                                <div className="trophy-item liga-trophy">
                                    <div className="trophy-icon-large">⚽</div>
                                    <div className="trophy-count-large">{legend.laLigaTitles}x</div>
                                    <div className="trophy-name">La Liga</div>
                                </div>
                                <div className="trophy-item copa-trophy">
                                    <div className="trophy-icon-large">🏅</div>
                                    <div className="trophy-count-large">{legend.copaDelRey}x</div>
                                    <div className="trophy-name">Copa del Rey</div>
                                </div>
                                <div className="trophy-item other-trophy">
                                    <div className="trophy-icon-large">✨</div>
                                    <div className="trophy-count-large">{legend.otherTrophies}x</div>
                                    <div className="trophy-name">Other Trophies</div>
                                </div>
                            </div>
                        </div>

                        <div className="stats-section">
                            <h3 className="section-title">⭐ Achievements</h3>
                            <div className="achievements-box">
                                <p>{legend.achievements}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="modal-nav-button modal-nav-next" onClick={onNext} title="Next legend">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}

export default LegendModal;