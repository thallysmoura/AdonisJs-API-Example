import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Controller {
    recuperarEmpresa ({ request, response } : HttpContextContract ) {
        return {
            status : true,
        };
    }

    login ({ request, response } : HttpContextContract ) {
        return {
            login : 'sucess',
        };
    }
}
