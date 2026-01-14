import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-text">FC Barcelona</span>
                </Link>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/players" className="nav-link">Players</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/legends" className="nav-link">Legends</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movie" className="nav-link">Movie</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;