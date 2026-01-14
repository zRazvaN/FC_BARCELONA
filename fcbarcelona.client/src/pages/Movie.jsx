import { useState, useEffect } from 'react';
import './Movie.css';

function Movie() {
    // State pentru a gestiona vizibilitatea overlay-ului de animatie
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Overlay-ul care simuleaza pregatirea salii de cinema */}
            <div className={`cinema-animation-overlay ${animationComplete ? 'fade-out' : ''}`}>
                <div className="cinema-animation-content">
                    <div className="film-reel">
                        <svg viewBox="0 0 100 100" className="reel-icon">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="50" cy="50" r="5" fill="currentColor" />
                            <line x1="50" y1="10" x2="50" y2="30" stroke="currentColor" strokeWidth="2" />
                            <line x1="50" y1="70" x2="50" y2="90" stroke="currentColor" strokeWidth="2" />
                            <line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="2" />
                            <line x1="70" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="cinema-loading-text">Preparing Cinema...</p>
                </div>
            </div>

            {/* Containerul principal al paginii Movie */}
            <div className="cinema-container">
                <div className="cinema-header">
                    <div className="title-container">
                        <span className="title-decoration">★</span>
                        <h1 className="cinema-title">THE MOVIE</h1>
                        <span className="title-sub">FC BARCELONA HISTORY</span>
                    </div>
                </div>

                {/* Zona de afisare a player-ului video integrat din YouTube */}
                <div className="cinema-screen-container">
                    <div className="cinema-screen">
                        <div className="screen-frame">
                            <div className="screen-content">
                                <iframe
                                    src="https://www.youtube.com/embed/NOjqNkmIrAc?rel=0&modestbranding=1&autoplay=0"
                                    title="FC Barcelona Movie"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="cinema-video"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Movie;