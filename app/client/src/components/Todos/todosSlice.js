import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { prop } from 'ramda'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: null,
    create: null
  },
  reducers: {
    create: (state) => ({
      ...state,
      loading: true,
    }),
    setCreate: (state, action) => ({
      ...state,
      loading: false,
      create: action.payload
    }),
    read: (state) => ({
      ...state,
      loading: true
    }),
    setRead: (state, action) => ({
      ...state,
      loading: false,
      todos: action.payload
    }),
  },
});

const selectState = state => state.todos

export const selectLoading = createSelector(
  selectState,
  prop('loading')
)

export const selectTodos = createSelector(
  selectState,
  prop('todos')
)

export const selectCreate = createSelector(
  selectState,
  prop('create')
)

export const { read, setRead, create, setCreate } = todosSlice.actions;
export default todosSlice.reducer
