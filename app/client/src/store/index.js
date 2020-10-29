import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import sagas from 'sagas'
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import appReducer from 'components/App/state'
import todosReducer from 'components/Todos/state'
import usersReducer from 'components/Users/state'
import groupsReducer from 'components/Groups/state'
import { createBrowserHistory } from 'history'

const sagaMiddleware = createSagaMiddleware()

const devMode = process.env.NODE_ENV === 'development'

const reduxDevTools = devMode ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : false

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware, routerMiddleware(createBrowserHistory())]

const reducer = {
  app: appReducer,
  todos: todosReducer,
  users: usersReducer,
  groups: groupsReducer,
  routing: routerReducer
}

const createStore = () => {
  const store = configureStore({
    reducer,
    devTools: reduxDevTools,
    middleware,
  })

  sagaMiddleware.run(sagas)
  
  return store
}

const store = createStore()

export const history = syncHistoryWithStore(createBrowserHistory(), store)
export default store