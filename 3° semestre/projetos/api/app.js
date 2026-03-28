    import express from 'express';
    import { BD, testarConexao } from "./db.js";
    import rotaUsuarios from './src/routes/rotaUsuarios.js'
    import rotaCategorias from './src/routes/rotaCategorias.js'
    import rotaSubcategorias from './src/routes/rotaSubcategorias.js'
    import rotaTransacoes from './src/routes/rotaTransacoes.js'
    //usando swwager
    import swaggerUi from 'swagger-ui-express'
    import documentacao from './config/swagger.js';
    import cors from 'cors'

    const app = express();
    app.use(express.json());
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
    app.use(cors())


    app.get('/', async (req, res) => {
        await testarConexao();
        // res.status(200).json('Api funcionando')
        res.redirect('/swagger')
    })
    app.use(rotaUsuarios)
    app.use(rotaCategorias)
    app.use(rotaSubcategorias)
    app.use(rotaTransacoes)

    const porta = 3002
    app.listen(porta, () => {
        console.log(`http://localhost:${porta}`);

    })

