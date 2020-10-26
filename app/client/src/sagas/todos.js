import { apiBase } from 'services'
import { put, takeLatest, all } from 'redux-saga/effects'
import * as actions from 'components/Todos/todosSlice'

function* getTodos() {
  const json = yield fetch(`${apiBase}/todos`)
    .then(res => res.json())

  yield put({ type: actions.setTodos, payload: json })

}

function* getTodosWatcher() {
  yield takeLatest(actions.getTodos.toString(), getTodos)
}

function* putTodos() {

} 

function* putTodosWatcher() {

}

function* deleteTodos() {

}

function* deleteTodosWatcher() {

}

export default function* todos() {
  yield all([
    getTodosWatcher(),
    putTodosWatcher(),
    deleteTodosWatcher()
  ])
}