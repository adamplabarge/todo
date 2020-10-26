import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { prop } from 'ramda'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: null,
    getting: false
  },
  reducers: {
    getTodos: (state) => {
      return {
        ...state,
        getting: true
      }
    },
    setTodos: (state, action) => {
      return {
        ...state,
        getting: false,
        todos: action.payload
      }
    }
  },
});

const selectState = state => state.todos
export const selectTodos = createSelector(
  selectState,
  prop('todos')
)
export const selectGetting = createSelector(
  selectState,
  prop('getting')
)


export const { getTodos, setTodos } = todosSlice.actions;
export default todosSlice.reducer
