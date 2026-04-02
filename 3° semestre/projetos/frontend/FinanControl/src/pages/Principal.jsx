import { estilos } from "../../../../../frontend/aulas_react/src/style/Estilos"
import { useNavigate } from 'react-router-dom'




const Principal = () => {
const navigate = useNavigate()
function botaoSair() {
    localStorage.removeItem('UsuarioLogado')
    navigate('/login')
}
    return (
        <div style={estilos.cardAula}>
           <h1>
           bem vindo{'(a)'}
           </h1>

           <button onClick={botaoSair}>sair</button>
            
        </div>
    )
}

export default Principal