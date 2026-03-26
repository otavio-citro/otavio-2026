import express, { Router } from 'express'
import { BD } from '../../db.js'

const router = Router();


router.get('/ordem_servicos', async (req, res) => {
    try {
        const query = `SELECT * FROM ordem_servicos ORDER BY id_ordem`
        const ordem_servicos = await BD.query(query);
        res.status(200).json(ordem_servicos.rows);
    } catch (error) {
        console.error('Erro ao listar a Ordem de serviços', error.message)
        res.status(500).json({error:'Erro ao listar a Ordem de serviços'})
    }
})

router.post('/ordem_servicos', async (req, res) => {
    const { nr_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento } = req.body

    try {
        const comando = `insert into ordem_servicos(nr_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento ) values($1, $2, $3, $4, $5, $6, $7, $8)`
        const valores = [nr_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento]


        const responsta = await BD.query(comando, valores)
        console.log(responsta);


        return res.status(201).json('ordem cadastrado')
    } catch (error) {
        console.error('Erro ao cadastrar ordem', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar ordem' })
    }

})

router.put('/ordem_servicos/:id_ordem', async (req, res) => {
    //id recebido via parametro
    const {id_ordem} = req.params;
    //dados de ordem recebido via corpo da pagina
    const {nr_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento} = req.body
    try {
        //verificar se o ordem existe
        const verificarordem = await BD.query(`SELECT * FROM ordem_servicos where id_ordem = $1`, [id_ordem]);
        if(verificarordem.rows.length === 0){
            return res.status(404).json({message: 'ordem nâo encontrado'})
        }
        //atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE ordem_servicos SET nr_ordem = $1, titulo = $2, descricao = $3, prioridade = $4, status = $5, data = $6, id_usuario = $7, id_departamento = $8 where id_ordem = $9`;
        const valores = [nr_ordem, titulo, descricao, prioridade, status, data, id_usuario, id_departamento, id_ordem];
        await BD.query(comando, valores)

        return res.status(200).json('ordem atualizado')
    } catch (error) {  
         console.error('Erro ao atualizar ordems', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' })
    }
})

router.patch('/ordem_servicos/:id_ordem', async(req, res)=> {
const {id_ordem} = req.params;
const {titulo, descricao, prioridade, status, data, id_usuario, id_departamento} = req.body

    try {
         //verificar se o ordem_servico existe
        const verificarordem_servico = await BD.query(`SELECT * FROM ordem_servicos where id_ordem = $1`, [id_ordem]);
        if(verificarordem_servico.rows.length === 0){
            return res.status(404).json({message: 'ordem_servico nâo encontrado'})
        }

        //montar o update dinamicamente(apenas campos enviados)
        const campos = [];
        const valores = [];
        let contador = 1;

        if (titulo !== undefined) {
            campos.push(`titulo = $${contador}`);
            valores.push(titulo)
            contador++
        }
        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao)
            contador++
        }
        if (prioridade !== undefined) {
            campos.push(`prioridade = $${contador}`);
            valores.push(prioridade)
            contador++
        }
        if (status !== undefined) {
            campos.push(`status = $${contador}`);
            valores.push(status)
            contador++
        }
        if (data !== undefined) {
            campos.push(`data = $${contador}`);
            valores.push(data)
            contador++
        }
        if (id_usuario !== undefined) {
            campos.push(`id_usuario = $${contador}`);
            valores.push(id_usuario)
            contador++
        }
        if (id_departamento !== undefined) {
            campos.push(`id_departamento = $${contador}`);
            valores.push(id_departamento)
            contador++
        }
        //se nenhum campos foi enviado
        if(campos.length === 0){
            return res.status(400).json({message: "nenhum campo a atualizar"})
        }


        //adicionan id ao final de valores
        valores.push(id_ordem)

        //montando a query dinamicamente
        const comando = `update ordem_servicos set ${campos.join(', ')} where id_ordem = $${contador}`
        await BD.query(comando, valores)
        return res.status(200).json('ordem_servico atualizado com sucesso')
    } catch (error) {
        console.error('erro autualizar ordem_servico', error.message)
        return res.status(500).json({message: "erro interno no servidor" + error.message})
    }

})

router.delete('/ordem_servicos/:id_ordem', async(req, res)=>{
    const {id_ordem} = req.params
    try {
        //executa o comando de delete
        const comando = `delete from ordem_servicos where id_ordem = $1`
        await BD.query(comando, [id_ordem])
        return res.status(200).json({message: 'ordem_servico removido com sucesso'})
    } catch (error) {
        console.error('erro ao deletar ordem_servico', error.message)
        return res.status(500).json({message: "erro interno no servidor" + error.message})
    }
   
})


export default router
