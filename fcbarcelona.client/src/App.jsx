import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Players from './pages/Players';
import Legends from './pages/Legends';
import Movie from './pages/Movie';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/players" element={<Players />} />
                <Route path="/legends" element={<Legends />} />
                <Route path="/movie" element={<Movie />} />
            </Routes>
        </Router>
    );
}

export default App;