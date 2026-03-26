import express, { Router } from 'express'
import { BD } from '../../db.js'

const router = Router();


router.get('/departamentos', async (req, res) => {
    try {
        
        const query = `SELECT * FROM departamentos ORDER BY id_departamento`
       
        const departamentos = await BD.query(query);

        
        res.status(200).json(departamentos.rows);

    } catch (error) {
        console.error('Erro.', error.message)
        res.status(500).json({error:'Erro'})
    }
})

router.post('/departamentos', async (req, res) => {
    const { nome, descricao } = req.body

    console.log(nome);

    try {
        const comando = `insert into departamentos(nome, descricao) values($1, $2)`
        const valores = [nome, descricao]


        const responsta = await BD.query(comando, valores)
        console.log(responsta);

        return res.status(201).json('departamentos cadastrado')
    } catch (error) {
        console.error('Erro ao cadastrar departamentos', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar departamentos' })
    }

})


router.put('/departamentos/:id_departamento', async (req, res) => {
    const { id_departamento } = req.params;
    const { nome, descricao} = req.body
    try {
        const verificardepartamento = await BD.query(`SELECT * FROM departamentos where id_departamento = $1`, [id_departamento])
        if (verificardepartamento.rows.length === 0) {
            return res.status(404).json({ message: 'departamento não encontrado' })
        }
        const comando = `UPDATE departamento SET nome = $1, email = $2, senha =$3 WHERE id_departamento = $4`;
        const valores = [nome,  descricao, id_departamento];
        await BD.query(comando, valores);
        return res.status(200).json('departamento atualizado');
    } catch (error) {
        console.log('Erro', error.message);
        return res.status(500).json({ error: 'erro' })
    }
})

router.patch('/dempartamentos/:id_dempartamento', async(req, res)=> {
const {id_dempartamento} = req.params;
const {nome, descricao} = req.body

    try {
         //verificar se o dempartamento existe
        const verificardempartamento = await BD.query(`SELECT * FROM dempartamentos where id_dempartamento = $1`, [id_dempartamento]);
        if(verificardempartamento.rows.length === 0){
            return res.status(404).json({message: 'dempartamento nâo encontrado'})
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
        if (descricao !== undefined) {
            campos.push(`descricao = $${contador}`);
            valores.push(descricao)
            contador++
        }
        //se nenhum campos foi enviado
        if(campos.length === 0){
            return res.status(400).json({message: "nenhum campo a atualizar"})
        }


        //adicionan id ao final de valores
        valores.push(id_dempartamento
        )

        //montando a query dinamicamente
        const comando = `update dempartamentos set ${campos.join(', ')} where id_dempartamento = $${contador}`
        await BD.query(comando, valores)
        return res.status(200).json('dempartamento atualizado com sucesso')
    } catch (error) {
        console.error('erro autualizar dempartamento', error.message)
        return res.status(500).json({message: "erro interno no servidor" + error.message})
    }

})

router.delete('/departamentos/:id_departamento', async(req, res)=>{
    const {id_departamento} = req.params
    try {
        //executa o comando de delete
        const comando = `delete from departamentos where id_departamento = $1`
        await BD.query(comando, [id_departamento])
        return res.status(200).json({message: 'departamento removido com sucesso'})
    } catch (error) {
        console.error('erro ao deletar departamento', error.message)
        return res.status(500).json({message: "erro interno no servidor" + error.message})
    }
   
})



export default router
