import { Link, useNavigate, useParams } from "react-router-dom";

function Filme() {
    const { id } = useParams();
    return(
        <div>
            <h1>Detalhes do filme = {id}</h1>
            {/* <a href=""></a>*/}
            <Link to="/inicio">inicio</Link>

        </div>
    )
}

export default Filme