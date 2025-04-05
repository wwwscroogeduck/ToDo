import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from '../store/deskSlice'; 
import { Link } from 'react-router-dom';
import NewDesk from './NewDesk'; 
import '../style/CreateDesk.css';

function CreateDesk() {
  const [showNewDesk, setShowNewDesk] = useState(false);
  const desks = useSelector((state) => state.desks);  
  const dispatch = useDispatch();

  const handleNewDeskClick = () => {
    setShowNewDesk(true);
  };

  const handleCancelClick = () => {
    setShowNewDesk(false);
  };

  const handleSaveClick = (name) => {
    if (name) {
      
      dispatch(addList({ deskName: name, list: [{ name: '', items: [] }] }));  
      setShowNewDesk(false); 
    }
  };

  return (
    <div className="create-desk-container">
      <div className="new-desk-block">
        {!showNewDesk && (
          <button className="board-block" onClick={handleNewDeskClick}>
            <img src="/public/plus.svg" alt="Добавить доску" className="plus" />
            <p>Новая доска</p>
          </button>
        )}
        {showNewDesk && (
          <NewDesk 
            onCancel={handleCancelClick} 
            onSave={handleSaveClick} 
          />
        )}
      </div>
      <div className="created-desks">
        {Object.keys(desks).map((deskName, index) => (  
          <div key={index} className="created-desk">
            <Link to={`/desk/${deskName}`}>
              <h3>{deskName}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateDesk;
