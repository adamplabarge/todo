import { fork, all } from 'redux-saga/effects'
import start from './start'
import todos from 'components/Todos/sagas'
import groups from 'components/Groups/sagas'
import users from 'components/Users/sagas'

const forkAll = module => Object.values(module).map(fn => fork(fn))

export default function* root() {
  yield all([
    start(),
    todos(),
    users(),
    groups()
  ])
}