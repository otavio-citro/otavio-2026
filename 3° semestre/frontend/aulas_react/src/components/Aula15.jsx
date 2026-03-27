import { mudarTema } from "../pages/Principal"
import { estilos} from "../style/Estilos"
import Aula15_Login from "./Aula15_Login"

const Aula15 = ({ tema }) => {
    return (
        <div style={mudarTema(tema).cardAula}>
            <h2>Aula 15 - login com api</h2>
            <h3>utilizando o login junto com uma api</h3>
            <hr />
            <Aula15_Login tema={tema} />
        </div>
    )
}

export default Aula15