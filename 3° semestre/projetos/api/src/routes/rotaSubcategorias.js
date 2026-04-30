import express, { Router } from 'express'
import { BD } from '../../db.js'
import { autenticarToken } from '../middlewares/autenticacao.js'
import jwt from 'jsonwebtoken'
const router = Router()

router.get('/subcategorias', autenticarToken, async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM subcategorias where ativo = true ORDER BY id_subcategoria`
        //cria uma variavel para reveber o retorno no sql
        const subcategorias = await BD.query(query);

        //retorno para a pagina o json com os dados
        //buscandos do sql
        return res.status(200).json(subcategorias.rows);

    } catch (error) {
        console.error('Erro ao listar subcategorias', error.message)
        return res.status(500).json({ error: 'Erro ao listar subcategorias' })
    }
})

router.post('/subcategorias', autenticarToken, async (req, res) => {
    const { nome, id_categoria } = req.body

    console.log(nome);

    try {
        // verifica se a categoria existe
        //  const categoriaExiste = await BD.query(
        //     `SELECT * FROM categorias WHERE id_categoria = $1`,
        //     [id_categoria]
        // )

        // if (categoriaExiste.rows.length === 0) {
        //     return res.status(404).json({ error: "Categoria não encontrada" })
        // }

        const comando = `insert into subcategorias(nome, id_categoria) values($1, $2)`
        const valores = [nome, id_categoria]


        const resposta = await BD.query(comando, valores)
        console.log(resposta);


        return res.status(201).json('subcategoria cadastrada')
    } catch (error) {
        console.error('Erro ao cadastrar subcategorias', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar subcategorias' })
    }

})

router.put('/subcategorias/:id_subcategoria', autenticarToken, async (req, res) => {
    //id recebido via parametro
    const { id_subcategoria } = req.params;
    //dados de subcategoria recebido via corpo da pagina
    const { nome, id_categoria } = req.body
    try {
        
        //verificar se a subcategoria existe
        const verificarsubcategoria = await BD.query(`SELECT * FROM subcategorias where id_subcategoria = $1 and ativo = true`, [id_subcategoria]);
        if (verificarsubcategoria.rows.length === 0) {
            return res.status(404).json({ message: 'subcategoria não encontrada' })
        }

        const comando = `UPDATE subcategorias SET nome = $1, id_categoria = $2 where id_subcategoria = $3`;
        const valores = [nome, id_categoria, id_subcategoria];
        await BD.query(comando, valores)

        return res.status(200).json('subcategoria atualizada')
    } catch (error) {
        console.error('Erro ao atualizar subcategorias', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar subcategorias' })
    }
})

router.delete('/subcategorias/:id_subcategoria', autenticarToken,async (req, res) => {
    const { id_subcategoria } = req.params
    try {
        //executa o comando de delete
        const comando = `update subcategorias set ativo = false where id_subcategoria = $1`
        await BD.query(comando, [id_subcategoria])
        return res.status(200).json({ message: 'subcategoria removida com sucesso' })
    } catch (error) {
        console.error('erro ao deletar subcategoria', error.message)
        return res.status(500).json({ message: "erro interno no servidor" + error.message })
    }

})

export default router