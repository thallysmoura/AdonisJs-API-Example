import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    
  Route.get   ('/recuperarEmpresa',   'Controller.recuperarEmpresa')
  Route.post  ('/login',              'Controller.login'           )
  Route.get   ('*', () => {return 'unauthorized'}                  )

}).prefix('/api')


