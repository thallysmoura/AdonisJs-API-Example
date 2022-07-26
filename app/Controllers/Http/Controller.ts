import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Controller {
    /**
    * Responsável por Recuperar Empresa
    */
    
    recuperarEmpresa ({ request, response } : HttpContextContract ) {
        const CODUSUARIO = request.input('CODUSUARIO')
        response.json({
            usuario: CODUSUARIO,
            status : true,
        })
    }

    /**
    * LOG-IN do usuário
    */
    

    login ({ request, response } : HttpContextContract ) {
        const USUARIO = request.input('USUARIO')
        const SENHA   = request.input('SENHA')

        response.json({
            user: USUARIO,
            pass: SENHA,
            status : true,
        })
    }
}
