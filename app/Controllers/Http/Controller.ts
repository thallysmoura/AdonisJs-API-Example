import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Controller {
    /**
    * Responsável por Recuperar Empresa
    */
    
    async recuperarEmpresa ({ request, response } : HttpContextContract ) {
        const username = request.input('username')
        const sql = await Database.rawQuery(`
        SELECT                                                                                       
            multi_empresas.CD_MULTI_EMPRESA, multi_empresas.DS_MULTI_EMPRESA EMPRESA           
        FROM                                                                                   
            DBASGU.USUARIOS                  usuario                                            
            ,DBAMV.USUARIO_MULTI_EMPRESA     usuario_multi_empresa                              
            ,DBAMV.MULTI_EMPRESAS            multi_empresas                                     
            WHERE                                                                                  
                usuario.CD_USUARIO = :COD_USUARIO AND usuario.SN_ATIVO = 'S'                           
                AND  usuario.CD_USUARIO = usuario_multi_empresa.CD_ID_USUARIO`, 
                {

                COD_USUARIO: username
               
                })
        
            response.json(
                sql
            )
    }

    /**
    * LOG-IN do usuário
    */
    

    async login ({ request, response } : HttpContextContract ) {
        const USUARIO = request.input('USUARIO')
        const SENHA   = request.input('SENHA')
        response.json({
            user: USUARIO,
            pass: SENHA,
            status : true,
        })
    }
}
