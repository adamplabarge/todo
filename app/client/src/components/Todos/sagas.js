import { put, takeLatest, all } from 'redux-saga/effects'
import * as actions from 'components/Todos/state'

import { API_BASE, TODOS } from 'utils/constants'

const ENTITY = TODOS

function* createEntity() {
  const json = yield fetch(`${API_BASE}/create/${ENTITY}`)
    .then(res => res.json())

  yield put({ type: actions.createSuccess.toString(), payload: json })
}

function* createWatcher() {
  yield takeLatest(actions.create.toString(), createEntity)
}

function* readEntity() {
  const json = yield fetch(`${API_BASE}/${ENTITY}`)
    .then(res => res.json())

  yield put({ type: actions.readSuccess.toString(), payload: json })

}

function* readWatcher() {
  yield takeLatest(actions.read.toString(), readEntity)
}


function* updateEntity() { 

} 

function* updateWatcher() {

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