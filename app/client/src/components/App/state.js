import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { prop, path, propOr } from 'ramda'

const ENTITY = 'app'

export const state = createSlice({
  name: ENTITY,
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: {
        ...prop('payload', action),
        id: parseInt(path(['payload', 'id'], action))
      }
    }),
    setUserId: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        id: parseInt(path(['payload', 'id'], action))
      }
    })
  },
});

const selectSlice = state => prop(ENTITY, state)

export const selectUser = createSelector(
  selectSlice,
  prop('user')
)

export const selectUserId = createSelector(
  selectUser,
  propOr(0, 'id')
)

export const {
  setUser,
  setUserId
} = state.actions;
export default state.reducer