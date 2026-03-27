import { Link, useNavigate } from "react-router-dom";
function Detalhes() {
    const navigate = useNavigate()
    return(
        <div>
            <h1>Mais informações</h1>
            {/* <a href=""></a>*/}
            <button onClick={() => navigate('/contato')} >contato</button>

        </div>
    )
}

export default Detalhes