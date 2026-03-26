import express, { Router } from 'express'
import { BD } from '../../db.js'

const router = Router();

// GET - listar todos os produtos
router.get('/produtos', async (req, res) => {
    try {
        const query = `SELECT * FROM produtos ORDER BY id_produto`
        const produtos = await BD.query(query);

        return res.status(200).json(produtos.rows);

    } catch (error) {
        console.error('Erro ao listar produtos', error.message)
        return res.status(500).json({ error: 'Erro ao listar produtos' })
    }
})


// POST - cadastrar produto (CORRIGIDO)
router.post('/produtos', async (req, res) => {
    const { nome, preco, link_produto, link_imagem, categoria, frete } = req.body

    try {
        const comando = `
            INSERT INTO produtos
            (nome, preco, link_produto, link_imagem, categoria, frete)
            VALUES ($1, $2, $3, $4, $5, $6)
        `
        const valores = [nome, preco, link_produto, link_imagem, categoria, frete]

        await BD.query(comando, valores)

        return res.status(201).json('Produto cadastrado')
    } catch (error) {
        console.error('Erro ao cadastrar produto', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar produto' })
    }
})


// PUT - atualizar tudo (CORRIGIDO)
router.put('/produtos/:id_produto', async (req, res) => {
    const { id_produto } = req.params;
    const { nome, preco, link_produto, link_imagem, categoria, frete } = req.body

    try {
        const verificar = await BD.query(
            `SELECT * FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        const comando = `
            UPDATE produtos SET
            nome = $1,
            preco = $2,
            link_produto = $3,
            link_imagem = $4,
            categoria = $5,
            frete = $6
            WHERE id_produto = $7
        `;

        const valores = [nome, preco, link_produto, link_imagem, categoria, frete, id_produto];

        await BD.query(comando, valores)

        return res.status(200).json('Produto atualizado')
    } catch (error) {  
        console.error('Erro ao atualizar produto', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar produto' })
    }
})


// PATCH - atualizar parcialmente (CORRIGIDO)
router.patch('/produtos/:id_produto', async (req, res) => {
    const { id_produto } = req.params;
    const { nome, preco, link_produto, link_imagem, categoria, frete } = req.body

    try {
        const verificar = await BD.query(
            `SELECT * FROM produtos WHERE id_produto = $1`,
            [id_produto]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' })
        }

        const campos = [];
        const valores = [];
        let contador = 1;

        if (nome !== undefined) {
            campos.push(`nome = $${contador++}`);
            valores.push(nome);
        }

        if (preco !== undefined) {
            campos.push(`preco = $${contador++}`);
            valores.push(preco);
        }

        if (link_produto !== undefined) {
            campos.push(`link_produto = $${contador++}`);
            valores.push(link_produto);
        }

        if (link_imagem !== undefined) {
            campos.push(`link_imagem = $${contador++}`);
            valores.push(link_imagem);
        }

        if (categoria !== undefined) {
            campos.push(`categoria = $${contador++}`);
            valores.push(categoria);
        }

        if (frete !== undefined) {
            campos.push(`frete = $${contador++}`);
            valores.push(frete);
        }

        if (campos.length === 0) {
            return res.status(400).json({ message: "Nenhum campo para atualizar" })
        }

        valores.push(id_produto);

        const comando = `
            UPDATE produtos
            SET ${campos.join(', ')}
            WHERE id_produto = $${contador}
        `

        await BD.query(comando, valores)

        return res.status(200).json('Produto atualizado com sucesso')

    } catch (error) {
        console.error('Erro ao atualizar produto', error.message)
        return res.status(500).json({ message: "Erro interno no servidor" })
    }
})


// DELETE
router.delete('/produtos/:id_produto', async (req, res) => {
    const { id_produto } = req.params

    try {
        await BD.query(
            `DELETE FROM produtos WHERE id_produto = $1`,
            [id_produto]
        )

        return res.status(200).json({ message: 'Produto removido com sucesso' })
    } catch (error) {
        console.error('Erro ao deletar produto', error.message)
        return res.status(500).json({ message: "Erro interno no servidor" })
    }
})

export default router
