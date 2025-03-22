import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addList, addItem, toggleItemState } from './store/deskSlice';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DeskPage.css';

function DeskPage() {
  const dispatch = useDispatch();
  const { deskName } = useParams();
  const desk = useSelector((state) => state.desks[deskName] || { lists: [] });
  const [newListName, setNewListName] = useState('');
  const [newItemName, setNewItemName] = useState('');

  const handleAddListClick = () => {
    if (newListName) {
      dispatch(addList({ deskName, list: { name: newListName, items: [] } }));
      setNewListName('');
    }
  };

  const handleAddItemClick = (listIndex) => {
    if (newItemName) {
      dispatch(addItem({ deskName, listIndex, item: { text: newItemName, marked: false, completed: false } }));
      setNewItemName('');
    }
  };

  const handleListNameChange = (e) => {
    setNewListName(e.target.value);
  };

  const handleItemNameChange = (e) => {
    setNewItemName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddListClick();
    }
  };

  const handleItemKeyPress = (e, listIndex) => {
    if (e.key === 'Enter') {
      handleAddItemClick(listIndex);
    }
  };

  const handleItemClick = (listIndex, itemIndex) => {

    dispatch(toggleItemState({ deskName, listIndex, itemIndex }));
  };

  return (
    <div className="desk-page">
      <div className="desk-info">
        <h2>{deskName}</h2>
      </div>

      <DragDropContext>
        <div className="lists-block">
          {desk.lists.map((list, listIndex) => (
            <Droppable key={listIndex} droppableId={listIndex.toString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="list-block"
                >
                  <div className="list-header">
                    <h3>{list.name}</h3>
                  </div>

                  <div className="list-items">
                    {list.items.map((item, itemIndex) => (
                      <Draggable key={itemIndex} draggableId={itemIndex.toString()} index={itemIndex}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`list-item ${item.completed ? 'completed' : ''} ${item.marked ? 'marked' : ''}`}
                            onClick={() => handleItemClick(listIndex, itemIndex)}
                          >
                            <p
                              style={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: item.marked ? 'green' : '',
                              }}
                            >
                              {item.text}
                            </p>
                            <div
                              className={`checkmark ${item.marked ? 'marked' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation(); 
                                handleItemClick(listIndex, itemIndex);
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    <input
                      type="text"
                      value={newItemName}
                      onChange={handleItemNameChange}
                      onKeyDown={(e) => handleItemKeyPress(e, listIndex)}
                      placeholder="Введите элемент списка"
                    />
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <input
            type="text"
            value={newListName}
            onChange={handleListNameChange}
            onKeyDown={handleKeyPress}
            placeholder="Введите название списка"
          />
          <button onClick={handleAddListClick}>Добавить список</button>
        </div>
      </DragDropContext>
    </div>
  );
}

export default DeskPage;
