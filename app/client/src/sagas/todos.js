import { put, takeLatest, all } from 'redux-saga/effects'
import * as actions from 'components/Todos/todosSlice'

const apiBase = '/api/v1.0'

function* createTodos() {
  console.log('asdf')
  const json = yield fetch(`${apiBase}/create/todos`)
    .then(res => res.json())

  yield put({ type: actions.setCreate.toString(), payload: json })
}

function* createTodosWatcher() {
  yield takeLatest(actions.create.toString(), createTodos)
}

function* readTodos() {
  const json = yield fetch(`${apiBase}/todos`)
    .then(res => res.json())

  yield put({ type: actions.setRead.toString(), payload: json })

}

function* readTodosWatcher() {
  yield takeLatest(actions.read.toString(), readTodos)
}


function* updateTodos() { 

} 

function* updateTodosWatcher() {

}

function* deleteTodos() {

}

function* deleteTodosWatcher() {

}

export default function* api() {
  yield all([
    createTodosWatcher(),
    readTodosWatcher(),
    updateTodosWatcher(),
    deleteTodosWatcher()
  ])
}