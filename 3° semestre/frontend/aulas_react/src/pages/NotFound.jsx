import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div>
            <h1>pagina não encontrada</h1>
            {/* <a href=""></a>*/}
            <Link to="/">Voltar para Principl</Link>

        </div>
    )
}

export default NotFound