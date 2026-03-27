import { mudarTema } from "../pages/Principal"
import { estilos, temas } from "../style/Estilos"


const Aula01 = ({ tema }) => {
    return (
        <div style={mudarTema(tema).cardAula}>
            <h2>Aula 01 - Revisão de JS</h2>
            <h3>Revisão dos principais conceitos de JavaScript</h3>
            <p>Revimos variáveis e constantes, if, objeto, função, arrow function, UI e UX</p>
            
        </div>
    )
}

export default Aula01