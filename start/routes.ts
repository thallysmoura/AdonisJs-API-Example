import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    
  Route.get('/', async () => {
    return { hello: 'world' }
  })  

  Route.get('/recuperarEmpresa', 'Controller.recuperarEmpresa')

}).prefix('/api')
