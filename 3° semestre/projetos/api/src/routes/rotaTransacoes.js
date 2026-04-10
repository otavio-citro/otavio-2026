import express, { Router } from 'express'
import { BD } from '../../db.js'
const router = Router()

router.get('/transacoes', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT 
        t.id_transacoes,
        t.valor,
        t.descricao,
        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome AS categoria,
        s.nome AS subcategoria
    FROM transacoes t
    LEFT JOIN categorias c
        ON t.id_categoria = c.id_categoria
    LEFT JOIN subcategorias s
        ON t.id_subcategoria = s.id_subcategoria
    ORDER BY t.id_transacoes
`
        //cria uma variavel para reveber o retorno no sql
        const transacoes = await BD.query(query);

        //retorno para a pagina o json com os dados
        //buscandos do sql
        return res.status(200).json(transacoes.rows);

    } catch (error) {
        console.error('Erro ao listar transacoes', error.message)
        return res.status(500).json({ error: 'Erro ao listar transacoes' + error.message })
    }
})

router.post('/transacoes', async (req, res) => {
    const { valor, descricao, data_vencimento, tipo, data_pagamento, id_categoria, id_subcategoria } = req.body

    console.log(valor);

    try {

        const comando = `insert into transacoes(valor, descricao, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria) values($1, $2, $3, $4, $5, $6, $7)`
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria]


        const resposta = await BD.query(comando, valores)
        console.log(resposta);


        return res.status(201).json('transacao cadastrada')
    } catch (error) {
        console.error('Erro ao cadastrar transacoes', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar transacoes' })
    }

})

router.put('/transacoes/:id_transacoes', async (req, res) => {
    //id recebido via parametro
    const { id_transacoes } = req.params;
    //dados de transacao recebido via corpo da pagina
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria } = req.body
    try {

        //verificar se a transacao existe
        const verificartransacao = await BD.query(`SELECT * FROM transacoes where id_transacoes = $1`, [id_transacoes]);
        if (verificartransacao.rows.length === 0) {
            return res.status(404).json({ message: 'transacao não encontrada' })
        }

        const comando = `UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4, tipo = $5, id_categoria = $6, id_subcategoria = $7 where id_transacoes = $8`;
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria, id_transacoes];
        await BD.query(comando, valores)

        return res.status(200).json('transacao atualizada')
    } catch (error) {
        console.error('Erro ao atualizar transacoes', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar transacoes' })
    }
})

router.delete('/transacoes/:id_transacoes', async (req, res) => {
    const { id_transacoes } = req.params
    try {
        //executa o comando de delete
        const comando = `delete from transacoes where id_transacoes = $1`
        await BD.query(comando, [id_transacoes])
        return res.status(200).json({ message: 'transacao removida com sucesso' })
    } catch (error) {
        console.error('erro ao deletar transacao', error.message)
        return res.status(500).json({ message: "erro interno no servidor" + error.message })
    }

})

router.get('/transacoes/tipo/:tipo', async (req, res) => {
    const { tipo } = req.params

    try {
        const query = `
            SELECT 
                t.id_transacoes,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                c.nome AS categoria,
                s.nome AS subcategoria
            FROM transacoes t
            LEFT JOIN categorias c
                ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s
                ON t.id_subcategoria = s.id_subcategoria
            WHERE t.tipo = $1
            ORDER BY t.id_transacoes
        `

        const transacoes = await BD.query(query, [tipo])

        return res.status(200).json(transacoes.rows)
    } catch (error) {
        console.error('Erro ao buscar por tipo', error.message)
        return res.status(500).json({
            error: 'Erro ao buscar por tipo'
        })
    }
})

router.get('/transacoes/categoria/:id_categoria', async (req, res) => {
    const { id_categoria } = req.params

    try {
        const query = `
            SELECT 
                t.id_transacoes,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                c.nome AS categoria,
                s.nome AS subcategoria
            FROM transacoes t
            LEFT JOIN categorias c
                ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s
                ON t.id_subcategoria = s.id_subcategoria
            WHERE t.id_categoria = $1   
            ORDER BY t.id_transacoes
        `

        const transacoes = await BD.query(query, [id_categoria])

        return res.status(200).json(transacoes.rows)
    } catch (error) {
        console.error('Erro ao buscar por categoria', error.message)
        return res.status(500).json({
            error: 'Erro ao buscar por categoria'
        })
    }
})

router.get('/transacoes/subcategoria/:id_subcategoria', async (req, res) => {
    const { id_subcategoria } = req.params

    try {
        const query = `
            SELECT 
                t.id_transacoes,
                t.valor,
                t.descricao,
                TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                t.tipo,
                c.nome AS categoria,
                s.nome AS subcategoria
            FROM transacoes t
            LEFT JOIN categorias c
                ON t.id_categoria = c.id_categoria
            LEFT JOIN subcategorias s
                ON t.id_subcategoria = s.id_subcategoria
            WHERE t.id_subcategoria = $1
            ORDER BY t.id_transacoes
        `

        const transacoes = await BD.query(query, [id_subcategoria])

        return res.status(200).json(transacoes.rows)
    } catch (error) {
        console.error('Erro ao buscar por subcategoria', error.message)
        return res.status(500).json({
            error: 'Erro ao buscar por subcategoria'
        })
    }
})

router.get('/transacoes/periodo', async (req, res) => {
    //requisição apartir de uma query
    const {inicio, fim} = req.query;
    
    try {

        if (!inicio || !fim) {
            return res.status(400).json({message: 'Informe as datas de inicio e fim'})
        }


        //cria uma variavel para enviar o comando sql
        const query = `SELECT 
        t.id_transacoes,
        t.valor,
        t.descricao,
        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
        t.tipo,
        c.nome AS categoria,
        s.nome AS subcategoria
    FROM transacoes t
    LEFT JOIN categorias c
        ON t.id_categoria = c.id_categoria
    LEFT JOIN subcategorias s
        ON t.id_subcategoria = s.id_subcategoria
        WHERE t.data_registro BETWEEN TO_DATE($1, 'DD/MM/YYYY') AND TO_DATE($2, 'DD/MM/YYYY')
    ORDER BY t.data_registro DESC
`
        //cria uma variavel para reveber o retorno no sql
        const transacoes = await BD.query(query, [inicio, fim]);

        //retorno para a pagina o json com os dados
        //buscandos do sql
        return res.status(200).json(transacoes.rows);

    } catch (error) {
        console.error('Erro ao listar transacoes', error.message)
        return res.status(500).json({ error: 'Erro ao listar transacoes' + error.message })
    }
})

export default router