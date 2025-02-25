import './App.css';
import NewDesk from './NewDesk.jsx';
import { useState } from 'react';

function App() {
    const [showNewDesk, setShowNewDesk] = useState(false);

    const handleNewDeskClick = () => {
        setShowNewDesk(true);
    };

    const handleCancelClick = () => {
        setShowNewDesk(false);
    };

    return (
        <>
            <header>
                <div className="logo-block">
                    <img src="public/react.svg" alt="Логотип" className="logo" />
                    <span className="title">SLT</span>
                </div>
            </header>

            <div className="boards">
                {!showNewDesk && (
                    <button className="board-block" onClick={handleNewDeskClick}>
                        <img src="public/plus.svg" alt="Добавить доску" className="plus" />
                        <p>Новая доска</p>
                    </button>
                )}
                {showNewDesk && <NewDesk onCancel={handleCancelClick} />}
            </div>
        </>
    );
}


export default App;
