import express, { Router } from 'express'
import { BD } from '../../db.js'
import bcrypt from 'bcrypt'
const router = Router()

router.get('/usuarios', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const query = `SELECT * FROM usuarios where ativo = true ORDER BY id_usuario`
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

router.post('/usuarios', async (req, res) => {
    const { nome, email, senha, tipo_acesso } = req.body

    console.log(nome);

    try {
        //definir a força da criptografia
        const saltRounds = 10;
        //gerando a hash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        const comando = `insert into usuarios(nome, email, senha, tipo_acesso) values($1, $2, $3, $4)`
        const valores = [nome, email, senhaCriptografada, tipo_acesso]


        const responsta = await BD.query(comando, valores)
        console.log(responsta);


        return res.status(201).json('usuario cadastrado')
    } catch (error) {
        console.error('Erro ao cadastrar usuarios', error.message)
        return res.status(500).json({ error: 'Erro ao cadastrar usuarios' })
    }

})

router.put('/usuarios/:id_usuario', async (req, res) => {
    //id recebido via parametro
    const { id_usuario } = req.params;
    //dados de usuario recebido via corpo da pagina
    const { nome, email, senha, tipo_acesso } = req.body
    try {
        
        //verificar se o usuario existe
        const verificarUsuario = await BD.query(`SELECT * FROM usuarios where id_usuario = $1 and ativo = true`, [id_usuario]);
        if (verificarUsuario.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario nâo encontrado' })
        }
         const saltRounds = 10;
        //gerando a hash da senha
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        //atualiza todos os campos da tabela(PUT substituição completa)
        const comando = `UPDATE usuarios SET nome = $1, email = $2, senha = $3, tipo_acesso = $4 where id_usuario = $5`;
        const valores = [nome, email, senhaCriptografada, tipo_acesso, id_usuario];
        await BD.query(comando, valores)

        return res.status(200).json('usuario atualizado')
    } catch (error) {
        console.error('Erro ao atualizar usuarios', error.message)
        return res.status(500).json({ error: 'Erro ao atualizar usuarios' })
    }
})

router.delete('/usuarios/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params
    try {
        //executa o comando de delete
        const comando = `update usuarios set ativo = false where id_usuario = $1`
        await BD.query(comando, [id_usuario])
        return res.status(200).json({ message: 'usuario removido com sucesso' })
    } catch (error) {
        console.error('erro ao deletar usuario', error.message)
        return res.status(500).json({ message: "erro interno no servidor" + error.message })
    }

})

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'campo obrigatorio vago!' });
    }

    try {
        const comando = 'SELECT id_usuario, nome, email, senha FROM usuarios WHERE email = $1 and ativo = true';
        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: 'email nao encontrado' });
        }

        const usuario = resultado.rows[0];
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'senha incorreta' });
        }

        return res.status(200).json({
            message: "login realizado com sucesso",
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('erro no login', error.message);
        return res.status(500).json({ message: "erro interno no servidor" });
    }
});

export default router