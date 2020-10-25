const handlers = require('./handlers')

const routes = {
  get: [
    {
      route: 'create/:entity',
      handler: handlers.create
    },
    {
      route: 'todos',
      handler: handlers.get('todos')
    },
    {
      route: 'todos/:id',
      handler: handlers.get('todos')
    },
    {
      route: 'groups',
      handler: handlers.get('groups')
    },
    {
      route: 'groups/:id',
      handler: handlers.get('groups')
    },
    {
      route: 'users',
      handler: handlers.get('users')
    },
    {
      route: 'users/:id',
      handler: handlers.get('users')
    },
  ],
  post: [
    {
      route: 'todos/:id',
      handler: handlers.post('todos')
    },
    {
      route: 'groups/:id',
      handler: handlers.post('groups')
    },
    {
      route: 'users/:id',
      handler: handlers.post('users')
    }
  ],
  delete: [
    {
      route: 'todos/:id',
      handler: handlers.delete('todos')
    },
    {
      route: 'groups/:id',
      handler: handlers.delete('groups')
    },
    {
      route: 'users/:id',
      handler: handlers.delete('users')
    }
  ]
}


// Export
module.exports = routes