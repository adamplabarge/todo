import { fork, all } from 'redux-saga/effects'
import todos from './todos'

const forkAll = module => Object.values(module).map(fn => fork(fn))

export default function* root() {
  yield all([
    todos()
  ])
}