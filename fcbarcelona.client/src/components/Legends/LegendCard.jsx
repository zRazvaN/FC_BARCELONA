import React from 'react';
import './LegendCard.css';

const LegendCard = ({ legend, onClick }) => {
    // Calculam pozitia absoluta pe teren folosind procentele primite din baza de date
    const style = {
        left: `${legend.formationX}%`,
        top: `${legend.formationY}%`
    };

    return (
        <div
            className="legend-card-pitch"
            style={style}
            onClick={() => onClick(legend)}
            title={legend.name}
        >
            <div className="legend-card-content">
                <img
                    src={legend.imageUrl}
                    alt={legend.name}
                    className="legend-card-image"
                />

                {/* Afisam numarul de pe tricou doar pentru jucatori, nu si pentru manager */}
                {!legend.isManager && legend.number && (
                    <div className="legend-card-number">
                        {legend.number}
                    </div>
                )}

                <div className="legend-card-overlay">
                    <div className="legend-card-name">{legend.name}</div>
                    <div className="legend-card-position">{legend.position}</div>
                </div>
            </div>

            {/* Sectiune mica pentru trofee (UCL si La Liga) vizibila pe teren sub card */}
            {!legend.isManager && (
                <div className="legend-card-trophies">
                    {legend.championsLeague > 0 && (
                        <div className="trophy-icon ucl">
                            <span></span> {legend.championsLeague}
                        </div>
                    )}
                    {legend.laLigaTitles > 0 && (
                        <div className="trophy-icon liga">
                            <span></span> {legend.laLigaTitles}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LegendCard;