import { estilos } from "../style/Estilos"
import jogo from '../assets/jogo.png'
import { mudarTema } from "../pages/Principal"

const Aula08 = ({ tema }) => {
    return (
        <div style={mudarTema(tema).cardAula}>
            <h2>Aula 08 - Revisão</h2>
            <h3>Revisão de conteúdo com o Jogo Número Secreto</h3>
            <a href="https://jogo-numero-secreto-bice-three.vercel.app/">
                <img src={jogo} style={{ width: '100%' }} />
                Link do Jogo
            </a>
        </div>
    )
}

export default Aula08

