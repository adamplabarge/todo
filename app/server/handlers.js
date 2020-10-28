const R = require('ramda')
const utils = require('./utils/utils')
/** db */
const _data = require('./utils/data')

/** entities */
const entities = require('./model/entities')

/** Models */
const Todo = require('./model/todos.json')
const Group = require('./model/group.json')
const User = require('./model/user.json')

const entityDefaults = {
  [entities.todos]: Todo,
  [entities.groups]: Group,
  [entities.users]: User
}

const getItem = R.curry((id, list) => R.find(R.propEq('id', id))(list))
const getAllOthers = R.curry((id, list) => R.filter(R.complement(R.propEq('id', id)))(list))

const sortAscBy = (list, prop) => list.sort((a, b) => {
  if (R.prop(prop, a) < R.prop(prop, b)) return -1
  if (R.prop(prop, a) > R.prop(prop, b)) return 1
  return 0
})

const sortByProp = {
  [entities.todos]: 'priority',
  [entities.groups]: 'name',
  [entities.users]: 'id',
}

const handlers = {
  get: R.curry((entity, req, res, next) => {
    try {
      _data.read(entity, 'index', (err, data) => {
        if (!err && data) {
          const id = utils.getId(req)
          if (id !== -1) {
            const item = getItem(id)(data)
            if (!utils.isUndefined(item)) {
              res.send(item)
            } else {
              res.status(404).send(`Todo ${id}: not found.`)
            }
          }
          else {
            const sorted = sortAscBy(data, sortByProp[entity])
            res.send(sorted)
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
  }),
  create: (req, res, next) => {
    try {
      const entity = utils.getEntity(req)
      if (utils.isValidEntity(entity)) { 
        _data.read(entity, 'index', (err, data) => {
          if (!err && data) {
            if (R.isEmpty(data)) {
              const item = {
                ...entityDefaults[entity],
                id: 1
              }
              _data.update(entity, 'index', [item], (err) => {
                if (!err) {
                  res.send([item])
                } else {
                  console.log(err)
                  next(err)
                }
              })
            }
            else {
              const total = R.length(data)
              const item = {
                ...entityDefaults[entity],
                id: R.inc(total)
              }
              const list = [...data, item]
              _data.update(entity, 'index', list, (err) => {
                if (!err) {
                  const sorted = sortAscBy(list, sortByProp[entity])
                  res.send(sorted)
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
    }
    catch (err) {
      next(err)
    }
  },
  post: R.curry((entity, req, res, next) => {
    try {
      _data.read(entity, 'index', (err, data) => {
        if (!err && data) {
          const id = utils.getId(req)
          
          if (id !== -1) {
            const found = getItem(id)(data)
            if (!utils.isUndefined(found)) {
              const body = R.propOr({}, 'body', req)
              const item = {
                ...found,
                ...body,
                id: parseInt(R.prop('id', body))
              }
              const allButItem = getAllOthers(id)(data)
              const list = [...allButItem, item]
              _data.update(entity, 'index', list, (err) => {
                if (!err) {
                  const sorted = sortAscBy(list, sortByProp[entity])
                  res.send(list)
                } else {
                  console.log(err)
                  next(err)
                }
              })
            }
            else {
              res.status(404).send(`Cannot update, ${entity}:${id} not found.`)
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
  }),
  delete: R.curry((entity, req, res, next) => {
    try {
      _data.read(entity, 'index', (err, data) => {
        if (!err && data) {
          const id = utils.getId(req)
          if (id !== -1) {
            const found = getItem(id)(data)
            if (!utils.isUndefined(found)) {
              const allButItem = getAllOthers(id)(data)
              _data.update(entity, 'index', [...allButItem], (err) => {
                if (!err) {
                  res.send(allButItem)
                } else {
                  console.log(err)
                  next(err)
                }
              })
            }
            else {
              res.status(404).send(`Cannot delete, ${entity}:${id} not found.`)
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
  })
}


module.exports = handlers