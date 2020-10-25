const handlers = require('./handlers')

const routes = {
  get: [
    {
      route: 'todos',
      handler: handlers.get.todos
    },
    {
      route: 'todos/:id',
      handler: handlers.get.todos
    },
    {
      route: 'create/todo',
      handler: handlers.get.createTodo
    },
    {
      route: 'groups',
      handler: handlers.get.groups
    },
    {
      route: 'groups/:id',
      handler: handlers.get.groups
    },
    {
      route: 'create/group',
      handler: handlers.get.createGroup
    },
    {
      route: 'users',
      handler: handlers.get.users
    },
    {
      route: 'users/:id',
      handler: handlers.get.users
    },
    {
      route: 'create/user',
      handler: handlers.get.createUser
    },
  ],
  post: [
    {
      route: 'todos/:id',
      handler: handlers.post.todos
    }
  ],
  delete: [
    {
      route: '',
      handler: () => {}
    }
  ]
}


// Export
module.exports = routes