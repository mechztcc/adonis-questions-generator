import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'UsersController.store')
Route.get('/users', 'UsersController.index')
