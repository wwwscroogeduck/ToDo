import { useState } from 'react';
import NewDesk from './NewDesk.jsx';
import './CreateDesk.css';

function CreateDesk() {
    const [showNewDesk, setShowNewDesk] = useState(false);
    const [desks, setDesks] = useState([]);

    const handleNewDeskClick = () => {
        setShowNewDesk(true);
    };

    const handleCancelClick = () => {
        setShowNewDesk(false);
    };

    const handleSaveClick = (name) => {
        if (name) {
            setDesks([...desks, name]);
            setShowNewDesk(false);
        }
    };

    return (
        <div className="create-desk-container">
            <div className="new-desk-block">
                {!showNewDesk && (
                    <button className="board-block" onClick={handleNewDeskClick}>
                        <img src="public/plus.svg" alt="Добавить доску" className="plus" />
                        <p>Новая доска</p>
                    </button>
                )}
                {showNewDesk && (
                    <NewDesk 
                        onCancel={handleCancelClick} 
                        onSave={(name) => handleSaveClick(name)}
                    />
                )}
            </div>

            <div className="created-desks">
                {desks.map((desk, index) => (
                    <div key={index} className="created-desk">
                        <h3>{desk}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateDesk;
