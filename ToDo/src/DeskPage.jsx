import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './DeskPage.css';

function DeskPage() {
    const { deskName } = useParams();
    const [lists, setLists] = useState([
        { id: 'list-1', name: '', items: [], showItems: false, newListName: '', newItemName: '' },
    ]);

    const handleAddListClick = (listIndex) => {
        if (lists[listIndex].newListName) {
            const updatedLists = [...lists];
            updatedLists[listIndex].name = updatedLists[listIndex].newListName;
            updatedLists[listIndex].showItems = true;
            updatedLists[listIndex].newListName = '';
            if (listIndex === 0) {
                updatedLists.push({
                    id: 'list-2',
                    name: '',
                    items: [],
                    showItems: false,
                    newListName: '',
                    newItemName: '',
                });
            }
            setLists(updatedLists);
        }
    };

    const handleAddItemClick = (listIndex) => {
        if (lists[listIndex].newItemName) {
            const updatedLists = [...lists];
            updatedLists[listIndex].items.push({
                text: updatedLists[listIndex].newItemName,
                marked: false,
                completed: false,
            });
            updatedLists[listIndex].newItemName = '';
            setLists(updatedLists);
        }
    };

    const handleListNameChange = (e, listIndex) => {
        const updatedLists = [...lists];
        updatedLists[listIndex].newListName = e.target.value;
        setLists(updatedLists);
    };

    const handleItemNameChange = (e, listIndex) => {
        const updatedLists = [...lists];
        updatedLists[listIndex].newItemName = e.target.value;
        setLists(updatedLists);
    };

    const handleKeyPress = (e, listIndex) => {
        if (e.key === 'Enter') {
            handleAddListClick(listIndex);
        }
    };

    const handleItemKeyPress = (e, listIndex) => {
        if (e.key === 'Enter') {
            handleAddItemClick(listIndex);
        }
    };

    const handleItemClick = (listIndex, itemIndex) => {
        const updatedLists = [...lists];
        if (updatedLists[listIndex].items[itemIndex].marked) {
            updatedLists[listIndex].items[itemIndex].marked = false;
            updatedLists[listIndex].items[itemIndex].completed = true;
        } else {
            updatedLists[listIndex].items[itemIndex].marked = true;
            updatedLists[listIndex].items[itemIndex].completed = false;
        }
        setLists(updatedLists);
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            return;
        }

        const sourceList = lists.find((list) => list.id === source.droppableId);
        const destinationList = lists.find((list) => list.id === destination.droppableId);

        const sourceItems = [...sourceList.items];
        const destinationItems = [...destinationList.items];

        const [removedItem] = sourceItems.splice(source.index, 1);

        destinationItems.splice(destination.index, 0, removedItem);

        const updatedLists = lists.map((list) => {
            if (list.id === source.droppableId) {
                return { ...list, items: sourceItems };
            } else if (list.id === destination.droppableId) {
                return { ...list, items: destinationItems };
            } else {
                return list;
            }
        });

        setLists(updatedLists);
    };

    return (
        <div className="desk-page">
            <div className="desk-info">
                <h2>{deskName}</h2>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="lists-block">
                    {lists.map((list, index) => (
                        <Droppable key={list.id} droppableId={list.id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="list-block"
                                >
                                    {list.name ? (
                                        <div className="list-header">
                                            <h3>{list.name}</h3>
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={list.newListName}
                                            onChange={(e) => handleListNameChange(e, index)}
                                            onKeyDown={(e) => handleKeyPress(e, index)}
                                            placeholder="Введите название списка"
                                        />
                                    )}

                                    {list.showItems && (
                                        <div className="list-items">
                                            {list.items.map((item, itemIndex) => (
                                                <Draggable key={`${list.id}-${itemIndex}`} draggableId={`${list.id}-${itemIndex}`} index={itemIndex}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`list-item ${item.marked ? 'marked' : ''} ${item.completed ? 'completed' : ''}`}
                                                            onClick={() => handleItemClick(index, itemIndex)}
                                                        >
                                                            <p style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.text}</p>
                                                            {item.marked && (
                                                                <span className="checkmark checked"></span>
                                                            )}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            <input
                                                type="text"
                                                value={list.newItemName}
                                                onChange={(e) => handleItemNameChange(e, index)}
                                                onKeyDown={(e) => handleItemKeyPress(e, index)}
                                                placeholder="Введите элемент списка"
                                            />
                                        </div>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}

export default DeskPage;
