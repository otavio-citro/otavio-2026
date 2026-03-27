import { Link } from "react-router-dom";

function Inicio() {
    return(
        <div>
            <h1>bem vindo</h1>
            {/* <a href=""></a>*/}
            <Link to="/detalhes">detalhes</Link>

        </div>
    )
}

export default Inicio