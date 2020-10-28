import { put, call, all, take } from 'redux-saga/effects'
import { API_BASE, TODOS, GROUPS, USERS } from 'utils/constants'
import { startApp } from 'components/App/App'

function* readEntity(entity) {
  yield put({ type: `${entity}/loading`})

  const json = yield fetch(`${API_BASE}/${entity}`)
    .then(res => res.json())

  yield put({ type: `${entity}/readSuccess`, payload: json })

}

function* readWatcher() {
  yield take(startApp.toString())
  yield all([
    call(readEntity, [USERS]),
    call(readEntity, [GROUPS]),
    call(readEntity, [TODOS]),
  ])
}

export default function* sagas() {
  yield all([
    readWatcher()
  ])
}