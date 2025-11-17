import { Link } from 'react-router-dom';
import './pages.css';

function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Welcome to FC Barcelona</h1>
                <p className="hero-subtitle">Més que un club</p>
                <p className="hero-description">
                    Explore our legendary squad, compare players, and build your dream team
                </p>
                <Link to="/players" className="cta-button">
                    View Squad
                </Link>
            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">👥</div>
                    <h3>Full Squad</h3>
                    <p>Browse all Barcelona players with detailed stats</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🏆</div>
                    <h3>Hall of Fame</h3>
                    <p>Legendary players and historic moments</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">⚽</div>
                    <h3>Build Your Team</h3>
                    <p>Create your ideal formation (Coming Soon)</p>
                </div>
            </div>
        </div>
    );
}

export default Home;  