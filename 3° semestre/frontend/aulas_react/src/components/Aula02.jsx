import { mudarTema } from "../pages/Principal"
import { estilos} from "../style/Estilos"

const Aula02 = ({ tema }) => {
    return (
        <div style={mudarTema(tema).cardAula}>
            <h2>Aula 02 - Introdução ao React</h2>
            <h3>Conceitos básicos e configuração do ambiente</h3>
            <p>Aprendemos os fundamentos do React, criação e conhecimento da estrutura do primeiro projeto</p>
        </div>
    )
}

export default Aula02