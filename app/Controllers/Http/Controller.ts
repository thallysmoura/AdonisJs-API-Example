import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Controller {
    recuperarEmpresa ({ request, response } : HttpContextContract ) {
        return {
            status : true,
        };
    }

    login ({ request, response } : HttpContextContract ) {
        const USUARIO = request.input('USUARIO')
        const SENHA   = request.input('SENHA')

        return {
            user: USUARIO,
            pass: SENHA,
            auth : true,
        };
    }
}
