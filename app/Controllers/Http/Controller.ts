import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Controller {
    
    // ========================== RECUPERAR EMPRESA ( CASO USUÁRIO EXISTIR ) ================================

    async recuperarEmpresa ({ request, response } : HttpContextContract ) 
    {
        const username = request.input('username').toUpperCase()
        const sql = await Database.rawQuery(`
        SELECT                                                                                       
            multi_empresas.CD_MULTI_EMPRESA, multi_empresas.DS_MULTI_EMPRESA EMPRESA           
        FROM                                                                                   
            DBASGU.USUARIOS                  usuario                                            
            ,DBAMV.USUARIO_MULTI_EMPRESA     usuario_multi_empresa                              
            ,DBAMV.MULTI_EMPRESAS            multi_empresas                                     
        WHERE                                                                                  
            usuario.CD_USUARIO = :COD_USUARIO AND usuario.SN_ATIVO = 'S'                           
        AND  
            usuario.CD_USUARIO = usuario_multi_empresa.CD_ID_USUARIO`, { COD_USUARIO: username }
        )

        response.json(
            sql
        )
    }

    // ========================== VALIDAÇÃO USUÁRIO ================================
        
    async login ({ request, response } : HttpContextContract )
    {
        const USUARIO   = request.input('USUARIO').toUpperCase();
        const SENHA     = request.input('SENHA')

        let retorno = {};

        if (USUARIO != undefined && SENHA != undefined) 
        {
            const sql = await Database.rawQuery(`
                SELECT                                                                                       
                    multi_empresas.CD_MULTI_EMPRESA, 
                    multi_empresas.DS_MULTI_EMPRESA EMPRESA           
                FROM                                                                                   
                    DBASGU.USUARIOS                  usuario                                            
                    ,DBAMV.USUARIO_MULTI_EMPRESA     usuario_multi_empresa                              
                    ,DBAMV.MULTI_EMPRESAS            multi_empresas                                     
                WHERE                                                                                  
                    usuario.CD_USUARIO = :COD_USUARIO AND usuario.SN_ATIVO = 'S'
                AND  
                    usuario.CD_USUARIO = usuario_multi_empresa.CD_ID_USUARIO
            `,
            {
                COD_USUARIO: USUARIO
            })

            let empresa = sql;
            if (empresa[0]) {
                const sql_senha = await Database.rawQuery(`select dbaadv.senhausuariomv(:COD_USUARIO) SENHA FROM DUAL`, { COD_USUARIO: USUARIO });
                let valor = await sql_senha;

                // VERIFICA SE A SENHA É VALIDA
                if (valor[0].SENHA != "Erro ao tentar descriptografar a senha") {
                    // COMPARA SENHAS
                    if (valor[0].SENHA == SENHA.toUpperCase()) {
                        const sql_papel = await Database.rawQuery(`
                        SELECT
                            papel_usuario.CD_PAPEL PAPEL,
                            papel.DS_PAPEL,
                            papel_usuario.SN_USUARIO_MASTER,
                            papel.CD_PRODUTO
                        FROM  DBASGU.PAPEL_USUARIOS papel_usuario
                            JOIN DBASGU.USUARIOS usuarios     ON papel_usuario.CD_USUARIO =  usuarios.CD_USUARIO
                            JOIN DBASGU.PAPEL papel           ON papel.CD_PAPEL           =  papel_usuario.CD_PAPEL
                        WHERE
                            papel_usuario.cd_usuario = :COD_USUARIO AND usuarios.SN_ATIVO = 'S' 
                        ORDER BY papel_usuario.CD_USUARIO`
                            , {
                                COD_USUARIO: USUARIO
                            }
                        );

                        let papel = sql_papel;
                        // SENHA VALIDA
                        retorno = [{
                            USUARIO: USUARIO,
                            EMPRESA: empresa[0].EMPRESA,
                            MENSAGEM: `AUTENTICADO`,
                            RESULTADO: 1,
                            PAPEIS: papel
                        }];
                    } else {
                        // SENHA INVALIDA
                        retorno = [{
                            USUARIO: ``,
                            EMPRESA: empresa[0].EMPRESA,
                            MENSAGEM: `SENHA INVALIDA`,
                            RESULTADO: 0,
                            PAPEIS: []
                        }];
                    }

                }
            } else {
                retorno = [{
                    USUARIO: ``,
                    EMPRESA: ``,
                    MENSAGEM: `USUARIO NAO ENCONTRADO`,
                    RESULTADO: 0,
                    PAPEIS: []
                }];
            }
        } else {
            retorno = [{
                USUARIO: ``,
                EMPRESA: ``,
                MENSAGEM: `USUARIO E/OU SENHA VAZIOS`,
                RESULTADO: 0,
                PAPEIS: []
            }];
        }

        response.json({
            retorno
        })
}


}
