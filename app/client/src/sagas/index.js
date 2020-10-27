import { fork, all } from 'redux-saga/effects'
import start from './start'
import todos from './todos'
import groups from './groups'
import users from './users'

const forkAll = module => Object.values(module).map(fn => fork(fn))

export default function* root() {
  yield all([
    start(),
    todos(),
    users(),
    groups()
  ])
}