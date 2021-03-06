import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { prop, isEmpty, complement, head, propEq, propOr, filter } from 'ramda'
import { selectUserId } from 'components/App/state'

const ENTITY = 'todos'

export const state = createSlice({
  name: ENTITY,
  initialState: {
    loading: false,
    list: [],
  },
  reducers: {
    loading: (state) => ({
      ...state,
      loading: true
    }),
    create: (state) => ({
      ...state,
      loading: true,
    }),
    read: (state) => ({
      ...state,
      loading: true,
    }),
    update: (state) => ({
      ...state,
      loading: true,
    }),
    remove: (state) => ({
      ...state,
      loading: true
    }),
    createSuccess: (state, action) => ({
      ...state,
      loading: false,
      list: [
        ...state.list,
        propOr([], 'payload', action)
      ]
    }),
    readSuccess: (state, action) => ({
      ...state,
      loading: false,
      list: propOr([], 'payload', action)
    }),
    updateSuccess: (state, action) => ({
      ...state,
      loading: false,
      list: propOr([], 'payload', action)
    }),
    removeSuccess: (state, action) => ({
      ...state
    })
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

export const selectCompletedList = createSelector(
  selectList,
  filter(propEq('complete', false))
)

export const selectListForUser = createSelector(
  selectCompletedList,
  selectUserId,
  (list, id) => filter(propEq('user', id))(list)
)

export const selectHasList = createSelector(
  selectList,
  complement(isEmpty)
)

export const selectEditor = createSelector(
  selectSlice,
  prop('editor')
)

export const selectEntity = createSelector(
  selectList,
  (_, props) => propOr(null, 'id', props),
  (list, id) => {
    if (!list) return null
    const item = list.find(propEq('id', parseInt(id)))
    if (item) return item
    return head(list)
  } 
)

export const selectEntityStrict = createSelector(
  selectList,
  (_, props) => propOr(null, 'id', props),
  (list, id) => {
    if (!list) return null
    const item = list.find(propEq('id', parseInt(id)))
    if (item) return item
    return null
  } 
)

export const {
  create,
  read,
  update,
  remove,
  createSuccess,
  readSuccess,
  updateSuccess,
  removeSuccess
} = state.actions;
export default state.reducer