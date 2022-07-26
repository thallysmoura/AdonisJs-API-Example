import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    
  Route.get   ('/recuperarEmpresa', 'Controller.recuperarEmpresa')
  Route.get   ('/login',            'Controller.login')

}).prefix('/api')


