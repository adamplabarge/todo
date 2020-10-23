import { fork, all } from 'redux-saga/effects'

const forkAll = module => Object.values(module).map(fn => fork(fn))

export default function* root() {
  yield all([])
}