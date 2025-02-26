import './App.css';
import CreateDesk from './CreateDesk.jsx';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
    return (
        <>
            <header>
                <div className="logo-block">
                    <img src="public/react.svg" alt="Логотип" className="logo" />
                    <span className="title">SLT</span>
                </div>
            </header>

            <CreateDesk />
        </>
    );
}

export default App;
