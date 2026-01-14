import { useEffect } from 'react';
import './PlayerModal.css';

function PlayerModal({ player, onClose, onNext, onPrev }) {
    // Calculeaza varsta in timp real pentru a fi afisata in modal
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
        // Blocheaza scroll-ul paginii principale cand modalul este deschis
        document.body.style.overflow = 'hidden';

        // Permite navigarea intre jucatori si inchiderea modalului de la tastatura
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // Re-activeaza scroll-ul si elimina event listener-ul la inchidere
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onNext, onPrev, onClose]);

    // Inchide modalul daca se da click pe fundalul intunecat
    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <button className="modal-nav-button modal-nav-prev" onClick={onPrev} title="Previous player (?)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div className="modal-container">
                {/* Buton inchidere modal (X) */}
                <button className="modal-close" onClick={onClose} title="Close (Esc)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="modal-content">
                    {/* Partea stanga: Imaginea si datele de baza */}
                    <div className="modal-left">
                        <div className="modal-player-number">{player.number}</div>
                        <img src={player.imageUrl} alt={player.name} className="modal-player-image" />
                        <div className="modal-player-header">
                            <h2 className="modal-player-name">{player.name}</h2>
                            <p className="modal-player-position">{player.position}</p>
                        </div>
                    </div>

                    {/* Partea dreapta: Statisici detaliate*/}
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
                                    <div className="stat-value-big"> {player.goals}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="modal-nav-button modal-nav-next" onClick={onNext} title="Next player (?)">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}

export default PlayerModal;