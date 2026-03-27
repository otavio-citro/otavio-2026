import { mudarTema } from "../pages/Principal"
import { estilos } from "../style/Estilos"
import Aula13_CRUD_Produtos from "./Aula13_CRUD_Produtos"
import Aula13_CRUD_Usuarios from "./Aula13_CRUD_Usuarios"

const Aula13 = ({ tema }) => {
    return (
        <div style={mudarTema(tema).cardAula}>
            <h2>Aula 13 - CRUD com API</h2>
            <h3>Criando um CRUD utilizando API desenvolvida em Backend</h3>
            <hr />
            <Aula13_CRUD_Produtos tema={tema} />
            <hr />
            <Aula13_CRUD_Usuarios tema={tema} />
        </div>
    )
}

export default Aula13