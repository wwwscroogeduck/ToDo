import './App.css';
import CreateDesk from './CreateDesk.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DeskPage from './DeskPage';
import { useSelector } from 'react-redux'; 

function App() {
  const desks = useSelector((state) => state.desks.desks);

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
        <Route path="/desk/:deskName" element={<DeskPage desks={desks} />} />
      </Routes>
    </Router>
  );
}

export default App;
