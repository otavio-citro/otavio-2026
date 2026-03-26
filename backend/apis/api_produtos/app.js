import express from 'express';
import { BD, testarConexao } from "./db.js";
import rotaUsuarios from './src/routes/rotaUsuarios.js'
import rotaProdutos from "./src/routes/rotaProtutos.js"
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
app.use(rotaProdutos)

const porta = 3001
app.listen(porta, () => {
    console.log(`http://localhost:${porta}`);
   
})

