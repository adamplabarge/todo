import { put, takeLatest, all, call } from 'redux-saga/effects'
import * as actions from 'components/Groups/state'
import { history } from 'store'
import { prop } from 'ramda'

import { API_BASE, GROUPS } from 'utils/constants'

const ENTITY = GROUPS

function* createEntity() {
  const json = yield fetch(`${API_BASE}/create/${ENTITY}`)
    .then(res => res.json())

    yield call(history.push, `/groups/editor/${prop('id', json)}`)
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


function* updateEntity(action) {
  const { id } = action.payload
  const json = yield fetch(
    `${API_BASE}/${ENTITY}/${id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...action.payload
      })
    }
  )
  .then(res => res.json())

  yield put({ type: actions.updateSuccess.toString(), payload: json })
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