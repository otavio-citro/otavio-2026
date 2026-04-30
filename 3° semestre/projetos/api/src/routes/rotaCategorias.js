import express, { Router } from 'express'
import { BD } from '../../db.js'
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from 'jsonwebtoken'
const router = Router()

router.get('/categorias', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM categorias where ativo = true ORDER BY id_categoria`
        //cria uma variavel para reveber o retorno no sql
        const categorias = await BD.query(query);

        //retorno para a pagina o json com os dados
        //buscandos do sql
        return res.status(200).json(categorias.rows);

    } catch (error) {
        console.error('Erro ao listar categorias', error.message)
        return res.status(500).json({ error: 'Erro ao listar categorias' })
    }
})

router.post('/categorias', autenticarToken, async (req, res) => {
    const { nome, descricao, tipo, cor, icone } = req.body

    console.log(nome);

    try {
        const comando = `insert into categorias(nome, descricao, tipo, cor, icone) values($1, $2, $3, $4, $5)`
        const valores = [nome, descricao, tipo, cor, icone]


        const responsta = await BD.query(comando, valores)
        console.log(responsta);


        return res.status(201).json('categoria cadastrado')
    } catch (error) {
        console.error('Erro ao cadastrar categorias', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar categorias' })
    }

})

router.put('/categorias/:id_categoria', autenticarToken, async (req, res) => {
    //id recebido via parametro
    const { id_categoria } = req.params;
    //dados de categoria recebido via corpo da pagina
    const { nome, descricao, tipo, cor, icone } = req.body
    try {
        
        //verificar se o categoria existe
        const verificarcategoria = await BD.query(`SELECT * FROM categorias where id_categoria = $1 and ativo = true`, [id_categoria]);
        if (verificarcategoria.rows.length === 0) {
            return res.status(404).json({ message: 'categoria nâo encontrado' })
        }

        const comando = `UPDATE categorias SET nome = $1, descricao = $2, tipo = $3, cor = $4, icone = $5 where id_categoria = $6`;
        const valores = [nome, descricao, tipo, cor, icone, id_categoria];
        await BD.query(comando, valores)

        return res.status(200).json('categoria atualizado')
    } catch (error) {
        console.error('Erro ao atualizar categorias', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar categorias' })
    }
})

router.delete('/categorias/:id_categoria', autenticarToken, async (req, res) => {
    const { id_categoria } = req.params
    try {
        //executa o comando de delete
        const comando = `update categorias set ativo = false where id_categoria = $1`
        await BD.query(comando, [id_categoria])
        return res.status(200).json({ message: 'categoria removida com sucesso' })
    } catch (error) {
        console.error('erro ao deletar categoria', error.message)
        return res.status(500).json({ message: "erro interno no servidor" + error.message })
    }

})

export default router