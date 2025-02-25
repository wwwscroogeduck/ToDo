import './NewDesk.css';

function NewDesk() {
    return (
        <div className="new-desk">
            <h2>Название доски</h2>
            <input type="text" className="desk-name" placeholder="Моя доска" />
            <button className="cancel-desk">Отмена</button>
            <button className="save-desk">Сохранить</button>
        </div>
    );
}

export default NewDesk;