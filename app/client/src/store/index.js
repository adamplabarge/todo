import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import sagas from 'sagas'
import todosReducer from 'components/Todos/todosSlice'

const sagaMiddleware = createSagaMiddleware()

const devMode = process.env.NODE_ENV === 'development'

const reduxDevTools = devMode ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : false

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

const reducer = {
  todos: todosReducer
}

export default () => {
  const store = configureStore({
    reducer,
    devTools: reduxDevTools,
    middleware,
  })

  sagaMiddleware.run(sagas)
  
  return store
}