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
      state[deskName].lists.push(list);
    },
    addItem: (state, action) => {
      const { deskName, listIndex, item } = action.payload;
      if (state[deskName]) {
        state[deskName].lists[listIndex].items.push(item);
      }
    },
    toggleItemState: (state, action) => {
      const { deskName, listIndex, itemIndex } = action.payload;
      const item = state[deskName].lists[listIndex].items[itemIndex];
      
      if (!item.marked && !item.completed) {
        item.marked = true; 
      } else if (item.marked && !item.completed) {
        item.completed = true;
      } else {
        item.marked = false;  
        item.completed = false;
      }
    },
  },
});

export const { addList, addItem, toggleItemState } = deskSlice.actions;

export default deskSlice.reducer;
