import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './pages.css';

function Home() {
    // State pentru controlul overlay-ului de animatie la incarcarea paginii
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home-container-wrapper">
            <div className={`logo-animation-overlay ${animationComplete ? 'fade-out' : ''}`}>
                <div className="logo-animation-content">
                    <img
                        src="/images/barca-logo.png"
                        alt="FC Barcelona"
                        className="animated-logo"
                    />
                    <div className="logo-rings">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                    </div>
                </div>
            </div>

            <div className="home-container">
                {/* Sectiunea Hero: contine titlul principal, subtitlul si statisticile clubului */}
                <div className="hero-section-home">
                    <div className="hero-badge">
                        <img src="/images/barca-logo.png" alt="Barcelona" className="hero-logo" />
                    </div>

                    <h1 className="hero-title-home">
                        <span className="title-line">Welcome to</span>
                        <span className="title-main">FC Barcelona</span>
                    </h1>

                    <p className="hero-subtitle-home">Més que un club</p>

                    <p className="hero-description-home">
                        Experience the legacy of one of the world's greatest football clubs.
                        Explore our legendary squad, relive historic moments, and immerse yourself
                        in the passion that defines Barcelona.
                    </p>

                    <div className="hero-actions">
                        <Link to="/players" className="cta-button-primary">
                            <span>Explore Squad</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>

                    {/* Dashboard cu trofeele majore ale clubului */}
                    <div className="hero-stats">
                        <div className="stat-box">
                            <div className="stat-number">27</div>
                            <div className="stat-label">La Liga Titles</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">5</div>
                            <div className="stat-label">Champions League</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-number">31</div>
                            <div className="stat-label">Copa del Rey</div>
                        </div>
                    </div>
                </div>

                {/* Grid-ul de functionalitati: face legatura catre restul paginilor aplicatiei */}
                <div className="features-grid-home">
                    <div className="feature-card-home">
                        <div className="feature-icon-large">⚽</div>
                        <h3>World Class Squad</h3>
                        <p>Browse our complete roster of talented players with detailed statistics and career highlights</p>
                        <Link to="/players" className="feature-link">
                            View Players →
                        </Link>
                    </div>

                    <div className="feature-card-home">
                        <div className="feature-icon-large">🏆</div>
                        <h3>Club Legends</h3>
                        <p>Explore the greatest players who wore the Blaugrana jersey and shaped Barcelona's legendary history</p>
                        <Link to="/legends" className="feature-link">
                            View Legends →
                        </Link>
                    </div>

                    <div className="feature-card-home">
                        <div className="feature-icon-large">🎬</div>
                        <h3>Barcelona Movie</h3>
                        <p>Experience the passion and glory of FC Barcelona through an epic cinematic journey</p>
                        <Link to="/movie" className="feature-link">
                            Watch Now →
                        </Link>
                    </div>
                </div>

                <div className="quote-section">
                    <div className="quote-mark">"</div>
                    <p className="quote-text">
                        Barcelona is not just a football club. It's an identity, a culture, a way of life.
                    </p>
                    <p className="quote-author">— Johan Cruyff</p>
                </div>
            </div>
        </div>
    );
}

export default Home;