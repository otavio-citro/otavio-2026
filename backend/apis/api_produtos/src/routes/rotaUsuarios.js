import express, { Router } from 'express'
import { BD } from '../../db.js'


const router = Router();

//criando o entpoint para listar todos os usuarios
router.get('/usuarios', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM usuarios ORDER BY id_usuario`
        //cria uma variavel para reveber o retorno no sql
        const usuarios = await BD.query(query);

        //retorno para a pagina o json com os dados
        //buscandos do sql
        return res.status(200).json(usuarios.rows);

    } catch (error) {
        console.error('Erro ao listar usuarios', error.message)
        return res.status(500).json({ error: 'Erro ao listar usuarios' })
    }
})

//endpoint para adicionar um novo usuario
//o endpoint com parametros diretos no comando sql, permite o sql injection
// router.post('/usuarios', async(req, res) => {
//     const nome = req.body.nome
//     const email = req.body.email
//     const senha = req.body.senha

// console.log(nome);

//     try {
//         const comando = `insert into teste(nome, email, senha) values('${nome}', '${email}', '${senha}')`

//         console.log(comando);
//         await BD.query(comando)
//         res.status(201).json('usuario cadastrado')

//     } catch (error) {
//         console.error('Erro ao cadastrar usuarios', error.message)
//         res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
//     }

// })

//endpoint seguro contra sql injection
router.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body

    console.log(nome);

    try {
        const comando = `insert into usuarios(nome, email, senha) values($1, $2, $3)`
        const valores = [nome, email, senha]


        const responsta = await BD.query(comando, valores)
        console.log(responsta);


        return res.status(201).json('usuario cadastrado')
    } catch (error) {
        console.error('Erro ao cadastrar usuarios', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }

})

//endpoint para atualizar um unico usuario(id)
//recebendo parametro pelo id e buscando o usuario
router.put('/usuarios/:id_usuario', async (req, res) => {
    //id recebido via parametro
    const {id_usuario} = req.params;
    //dados de usuario recebido via corpo da pagina
    const {nome, email, senha} = req.body
    try {
        //verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios where id_usuario = $1`, [id_usuario]);
        if(verificarUsuario.rows.length === 0){
            return res.status(404).json({message: 'Usuario nâo encontrado'})
        }
        //atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 where id_usuario = $4`;
        const valores = [nome, email, senha, id_usuario];
        await BD.query(comando, valores)

        return res.status(200).json('usuario atualizado')
    } catch (error) {  
         console.error('Erro ao atualizar usuarios', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' })
    }
})


router.patch('/usuarios/:id_usuario', async(req, res)=> {
const {id_usuario} = req.params;
const {nome, email, senha} = req.body

    try {
         //verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios where id_usuario = $1`, [id_usuario]);
        if(verificarUsuario.rows.length === 0){
            return res.status(404).json({message: 'Usuario nâo encontrado'})
        }

        //montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador}`);
            valores.push(nome)
            contador++
        }
        if (email !== undefined) {
            campos.push(`email = $${contador}`);
            valores.push(email)
            contador++
        }
        if (senha !== undefined) {
            campos.push(`senha = $${contador}`);
            valores.push(senha)
            contador++
        }

        //se nenhum campos foi enviado
        if(campos.length === 0){
            return res.status(400).json({message: "nenhum campo a atualizar"})
        }


        //adicionan id ao final de valores
        valores.push(id_usuario
        )

        //montando a query dinamicamente
        const comando = `update usuarios set ${campos.join(', ')} where id_usuario = $${contador}`
        await BD.query(comando, valores)
        return res.status(200).json('usuario atualizado com sucesso')
    } catch (error) {
        console.error('erro autualizar usuario', error.message)
        return res.status(500).json({message: "erro interno no servidor" + error.message})
    }

})

router.delete('/usuarios/:id_usuario', async(req, res)=>{
    const {id_usuario} = req.params
    try {
        //executa o comando de delete
        const comando = `delete from usuarios where id_usuario = $1`
        await BD.query(comando, [id_usuario])
        return res.status(200).json({message: 'usuario removido com sucesso'})
    } catch (error) {
        console.error('erro ao deletar usuario', error.message)
        return res.status(500).json({message: "erro interno no servidor" + error.message})
    }
   
})

router.post('/login', async(req, res) => {
    const {email, senha} = req.body
    
    if(!email || ! !senha){
        return res.status(400).json({message: 'campo obrigatorio vago!'})
    }
    try {
         const comando = 'SELECT id_usuario, nome, email, senha FROM USUARIOS WHERE email = $1'
if(resultado.rows.lengt === 0) {
    return res.statusCode(401).json({message: 'email nao encontrado'})
}

    const usuario = resultado.rows[0]

    if(usuario.senha !== senha){
        return res.status(200).json({
            message: "sucesso",
            usuario:{
                id:usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        })
    }

    } catch (error) {
     console.error('erro ao deletar usuario', error.message)
        return res.status(500).json({message: "erro interno no servidor" + error.message})   
    }


})

export default router