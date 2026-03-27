import { Link, useNavigate } from "react-router-dom"
import { estilos } from "../style/Estilos"
import { mudarTema } from "../pages/Principal"


const Aula14 = ({tema}) => {
    const navigate = useNavigate()
    return (
        <div style={mudarTema(tema).cardAula}>
            <h2>Aula 14 - react Route - Navegação em React</h2>
            <h3>Biblioteca que permite criar e gerenciar rotas em React</h3>
            <hr />
            <h3>Navegação com links no React Router</h3>
            <Link to="/">pagina Principal</Link>
            <br />
            <Link to="/sobre">Sobre</Link>
            <br />
            <Link to="/sesisenai">notfound</Link>
            <br />
            <h3>Navegação com programação utilizando o useNavigate</h3>
            <button onClick={() => navigate('/sobre')} >Sobre</button>
            <hr />
            <h3>rota dinamica com useParams</h3>
            <button onClick={() => navigate('/perfil/Ricardo')} >Sobre</button>
            <button onClick={() => navigate('/perfil/Douglas')} >Sobre</button>
            <hr />
            <Link to="/inicio">inicio</Link>
            <hr />
            <button onClick={() => navigate('/filme/chato')} >Sobre</button>
            <button onClick={() => navigate('/filme/legal')} >Sobre</button>
            
        </div>
    )
}

export default Aula14