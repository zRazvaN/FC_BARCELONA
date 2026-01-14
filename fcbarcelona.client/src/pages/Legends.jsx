import { useEffect, useState } from 'react';
import LegendCard from '../components/Legends/LegendCard';
import LegendModal from '../components/Legends/LegendModal';
import './pages.css';

function Legends() {
    // State-uri pentru stocarea listei de jucatori legende si a antrenorului separat
    const [legends, setLegends] = useState([]);
    const [manager, setManager] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLegend, setSelectedLegend] = useState(null);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        fetchLegends();

        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Preluarea datelor din endpoint-ul specializat pentru formatia tactica
    async function fetchLegends() {
        try {
            const response = await fetch('/api/legends/formation');
            if (response.ok) {
                const data = await response.json();
                // Separam jucatorii de manager pentru a-i randa in zone diferite ale paginii
                setLegends(data.players);
                setManager(data.manager);
            } else {
                setError(`Error: ${response.status}`);
            }
        } catch (err) {
            setError(`Failed to fetch: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    // Navigarea intre legende 
    const handleLegendChange = (direction) => {
        if (!selectedLegend) return;

        const currentIndex = legends.findIndex(l => l.id === selectedLegend.id);
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % legends.length;
        } else {
            newIndex = (currentIndex - 1 + legends.length) % legends.length;
        }

        setSelectedLegend(legends[newIndex]);
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="ball-animation">
                    <svg viewBox="0 0 100 100" className="animated-ball">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M50,5 L50,25 M50,75 L50,95 M5,50 L25,50 M75,50 L95,50" stroke="currentColor" strokeWidth="2" />
                        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
                <p className="loading-text">Loading Legends...</p>
            </div>
        );
    }

    if (error) return <div className="App"><h1>{error}</h1></div>;

    return (
        <>
            {/* Overlay pentru animatia de fade-out la intrarea pe pagina */}
            <div className={`players-animation-overlay ${animationComplete ? 'fade-out' : ''}`}>
                <div className="players-animation-content">
                    <div className="ball-animation">
                        <svg viewBox="0 0 100 100" className="animated-ball">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M50,5 L50,25 M50,75 L50,95 M5,50 L25,50 M75,50 L95,50" stroke="currentColor" strokeWidth="2" />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <p className="loading-text">Loading Legends...</p>
                </div>
            </div>

            <div className="App">
                <header className="header">
                    <div className="header-content">
                        <h1 className="header-title">FC Barcelona Legends</h1>
                        <div className="header-label">Hall of Fame</div>
                        <div className="season-badge">
                            <span className="season-year">4-3-3</span>
                            <span className="season-label">Formation</span>
                        </div>
                    </div>
                </header>

                <div className="legends-intro">
                    <p className="legends-description">
                        Explore the greatest players who have worn the Blaugrana jersey.
                        These legends have shaped Barcelona's history and left an unforgettable legacy.
                    </p>
                </div>

                {/* Reprezentarea vizuala a terenului de fotbal */}
                <div className="football-pitch-container">
                    <div className="football-pitch">
                        {/* Liniile de marcaj ale terenului (stilizate prin CSS) */}
                        <div className="pitch-lines">
                            <div className="center-circle"></div>
                            <div className="center-line"></div>
                            <div className="penalty-box penalty-box-top"></div>
                            <div className="penalty-box penalty-box-bottom"></div>
                            <div className="goal-area goal-area-top"></div>
                            <div className="goal-area goal-area-bottom"></div>
                        </div>

                        {/* Pozitionarea jucatorilor pe teren conform coordonatelor din baza de date */}
                        {legends.map(legend => (
                            <LegendCard
                                key={legend.id}
                                legend={legend}
                                onClick={() => setSelectedLegend(legend)}
                            />
                        ))}
                    </div>
                </div>

                {/* Sectiune dedicata pentru manager, afisata sub teren */}
                {manager && (
                    <div className="manager-section">
                        <h3 className="manager-title">Manager</h3>
                        <div
                            className="manager-card"
                            onClick={() => setSelectedLegend(manager)}
                        >
                            <img src={manager.imageUrl} alt={manager.name} className="manager-image" />
                            <div className="manager-info">
                                <h4>{manager.name}</h4>
                                <p className="manager-years">{manager.yearsAtClub}</p>
                                <div className="manager-trophies">
                                    <span> {manager.laLigaTitles + manager.championsLeague + manager.copaDelRey + manager.otherTrophies} Trophies</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedLegend && (
                    <LegendModal
                        legend={selectedLegend}
                        onClose={() => setSelectedLegend(null)}
                        onNext={() => handleLegendChange('next')}
                        onPrev={() => handleLegendChange('prev')}
                    />
                )}
            </div>
        </>
    );
}

export default Legends;