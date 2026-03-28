import express, { Router } from 'express'
import { BD } from '../../db.js'
const router = Router()

router.get('/transacoes', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM transacoes WHERE ativo = true ORDER BY id_transacoes`
        //cria uma variavel para reveber o retorno no sql
        const transacoes = await BD.query(query);

        //retorno para a pagina o json com os dados
        //buscandos do sql
        return res.status(200).json(transacoes.rows);

    } catch (error) {
        console.error('Erro ao listar transacoes', error.message)
        return res.status(500).json({ error: 'Erro ao listar transacoes' })
    }
})

router.post('/transacoes', async (req, res) => {
    const { valor, descricao, data_vencimento, tipo, id_categoria, id_subcategoria } = req.body

    console.log(valor);

    try {

        const comando = `insert into transacoes(valor, descricao, data_vencimento, tipo, id_categoria, id_subcategoria) values($1, $2, $3, $4, $5, $6)`
        const valores = [valor, descricao, data_vencimento, tipo, id_categoria, id_subcategoria]


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
    const { valor, descricao, data_vencimento, tipo, id_categoria, id_subcategoria } = req.body
    try {
        
        //verificar se a transacao existe
        const verificartransacao = await BD.query(`SELECT * FROM transacoes where id_transacoes = $1 and ativo = true`, [id_transacoes]);
        if (verificartransacao.rows.length === 0) {
            return res.status(404).json({ message: 'transacao não encontrada' })
        }

        const comando = `UPDATE transacoes SET valor = $1, descricao = $2, data_vencimento = $3, tipo = $4, id_categoria = $5, id_subcategoria = $6 where id_transacoes = $7`;
        const valores = [valor, descricao, data_vencimento, tipo, id_categoria, id_subcategoria, id_transacoes];
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
        const comando = `update transacoes set ativo = false where id_transacoes = $1`
        await BD.query(comando, [id_transacoes])
        return res.status(200).json({ message: 'transacao removida com sucesso' })
    } catch (error) {
        console.error('erro ao deletar transacao', error.message)
        return res.status(500).json({ message: "erro interno no servidor" + error.message })
    }

})

export default router