const R = require('ramda')
const utils = require('./utils/utils')
/** db */
const _data = require('./utils/data')

/** Models */
const Todo = require('./model/todos.json')


const handlers = {
  get: {
    todos: (req, res, next) => {
      try {
        _data.read('todos', 'index', (err, data) => {
          if (!err && data) {
            const id = utils.getId('params', req)
            if (id !== -1) {
              const found = R.find(R.propEq('id', id))(data)
              if (!utils.isUndefined(found)) {
                res.send({ todos: [selected]})
              } else {
                res.status(404).send(`Todo ${id}: not found.`)
              }
            }
          }
          if (err) {
            next(new Error(err))
          }
        })
      }
      catch (err) { 
        next(err)
      }
    },
    createTodo: (_, res, next) => {
      try {
        _data.read('todos', 'index', (err, data) => {
          if (!err && data) {
            if (R.isEmpty(data)) {
              const newTodo = {
                ...Todo,
                id: 1
              }
              _data.update('todos', 'index', [newTodo], (err) => {
                if (!err) {
                  res.send(newTodo)
                } else {
                  console.log(err)
                  next(err)
                }
              })
            } else {
              const totalTodos = R.length(data)
              const newTodo = {
                ...Todo,
                id: R.inc(totalTodos)
              }
              _data.update('todos', 'index', [...data, newTodo], (err) => {
                if (!err) {
                  res.send(newTodo)
                } else {
                  console.log(err)
                  next(err)
                }
              })
            }
          }
          if (err) {
            next(err)
          }
        })
      }
      catch (err) {
        next(err)
      }
    },
    groups: () => {},
    createGroup: () => {},
    users: () => {},
    createUser: () => {},
  },
  post: {
    todos: (req, res, next) => {
      try {
        _data.read('todos', 'index', (err, data) => {
          if (!err && data) {
            const id = uils.getId('params', req)
            if (id !== -1) {
              const found = R.find(R.propEq('id', id))(data)
              if (!utils.isUndefined(found)) {
                const todo = {
                  ...found,
                  ...R.propOr({}, 'body', req)
                }
                const allButTodo = data.filter(todo => todo.id !== id)
                _data.update('todos', 'index', [...allButTodo, todo], (err) => {
                  if (!err) {
                    res.send(todo)
                  } else {
                    console.log(err)
                    next(err)
                  }
                })
              } else {
                console.log('lkj')
                res.status(404).send(`Todo ${id}: not found.`)
              }
            }
          }
          if (err) {
            next(new Error(err))
          }
        })
      }
      catch (err) { 
        next(err)
      }
    }
  }
}

module.exports = handlers