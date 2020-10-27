import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { prop, isEmpty, complement, head, propEq, propOr } from 'ramda'

const ENTITY = 'users'

export const state = createSlice({
  name: ENTITY,
  initialState: {
    loading: false,
    list: null,
    editor: null
  },
  reducers: {
    create: (state) => ({
      ...state,
      loading: true,
    }),
    setCreate: (state, action) => ({
      ...state,
      loading: false,
      editor: action.payload
    }),
    update: (state) => ({
      ...state,
      loading: true,
    }),
    read: (state) => ({
      ...state,
      loading: true
    }),
    setRead: (state, action) => ({
      ...state,
      loading: false,
      list: action.payload
    }),
  },
});

const selectSlice = state => prop(ENTITY, state)

export const selectLoading = createSelector(
  selectSlice,
  prop('loading')
)

export const selectList = createSelector(
  selectSlice,
  prop('list')
)

export const selectHasList = createSelector(
  selectList,
  complement(isEmpty)
)

export const selectEditor = createSelector(
  selectSlice,
  prop('editor')
)

export const selectUser = createSelector(
  selectList,
  (_, props) => propOr(null, 'id', props),
  (list, id) => {
    if (!list) return null
    const item = list.find(propEq('id', id))
    if (item) return item
    return head(list)
  } 
)

export const { read, setRead, create, setCreate, update } = state.actions;
export default state.reducer