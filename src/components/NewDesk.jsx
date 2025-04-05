import { useState } from 'react';
import PropTypes from 'prop-types';
import '../style/NewDesk.css';

function NewDesk({ onCancel, onSave }) {
  const [deskName, setDeskName] = useState('');

  const handleSaveClick = () => {
    onSave(deskName);
    setDeskName('');
  };

  return (
    <div className="new-desk">
      <h2>Название доски</h2>
      <input
        type="text"
        className="desk-name"
        placeholder="Моя доска"
        value={deskName}
        onChange={(e) => setDeskName(e.target.value)}
      />
      <button className="cancel-desk" onClick={onCancel}>Отмена</button>
      <button className="save-desk" onClick={handleSaveClick}>Сохранить</button>
    </div>
  );
}

NewDesk.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default NewDesk;
