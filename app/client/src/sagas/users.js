import { put, takeLatest, all } from 'redux-saga/effects'
import * as actions from 'components/Users/state'

import { API_BASE, USERS } from '../constants'

const ENTITY = USERS

function* createEntity() {
  const json = yield fetch(`${API_BASE}/create/${ENTITY}`)
    .then(res => res.json())

  yield put({ type: actions.setCreate.toString(), payload: json })
}

function* createWatcher() {
  yield takeLatest(actions.create.toString(), createEntity)
}

function* readEntity() {
  const json = yield fetch(`${API_BASE}/${ENTITY}`)
    .then(res => res.json())

  yield put({ type: actions.setRead.toString(), payload: json })

}

function* readWatcher() {
  yield takeLatest(actions.read.toString(), readEntity)
}


function* updateEntity(action) {
  const { id, name, icon } = action.payload 
  const json = yield fetch(
    `${API_BASE}/${ENTITY}/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name,
        icon
      })
    }
  )
  .then(res => res.json())

  yield put({ type: actions.setRead.toString(), json })
} 

function* updateWatcher() {
  yield takeLatest(actions.update.toString(), updateEntity)
}

function* deleteEntity() {

}

function* deleteWatcher() {

}

export default function* sagas() {
  yield all([
    createWatcher(),
    readWatcher(),
    updateWatcher(),
    deleteWatcher()
  ])
}