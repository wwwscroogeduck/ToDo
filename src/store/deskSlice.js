import { createSlice } from '@reduxjs/toolkit';


const initialState = {};

const deskSlice = createSlice({
  name: 'desks',
  initialState,
  reducers: {
    addList: (state, action) => {
      const { deskName, list } = action.payload;
      
      
      if (!state[deskName]) {
        state[deskName] = { lists: [] };
      }

      
      state[deskName].lists = [...state[deskName].lists, list]; 
    },
    
    addItem: (state, action) => {
      const { deskName, listIndex, item } = action.payload;
      
      
      if (state[deskName]) {
        const updatedLists = state[deskName].lists.map((list, index) => {
          if (index === listIndex) {
            
            return { ...list, items: [...list.items, item] };
          }
          return list;
        });

        
        state[deskName].lists = updatedLists;
      }
    },
    
    toggleItemState: (state, action) => {
      const { deskName, listIndex, itemIndex } = action.payload;

      
      if (state[deskName]) {
        const updatedLists = state[deskName].lists.map((list, listIdx) => {
          if (listIdx === listIndex) {
            
            const updatedItems = list.items.map((item, itemIdx) => {
              if (itemIdx === itemIndex) {
                
                return {
                  ...item,
                  marked: !item.marked,
                  completed: item.marked ? false : item.completed,
                };
              }
              return item;
            });

            
            return { ...list, items: updatedItems };
          }
          return list;
        });

        state[deskName].lists = updatedLists;
      }
    },
  },
});

export const { addList, addItem, toggleItemState } = deskSlice.actions;
export default deskSlice.reducer;
