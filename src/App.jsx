import './App.css';
import CreateDesk from './CreateDesk.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DeskPage from './DeskPage';

function App() {
    return (
        <Router>
            <header>
                <div className="logo-block">
                    <Link to="/">
                        <img src="/public/react.svg" alt="Логотип" className="logo" />
                        <span className="title">SLT</span>
                    </Link>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<CreateDesk />} />
                <Route path="/desk/:deskName" element={<DeskPage />} />
            </Routes>
        </Router>
    );
}

export default App;

