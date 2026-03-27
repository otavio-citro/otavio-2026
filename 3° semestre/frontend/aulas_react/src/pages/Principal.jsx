import { Link } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import Aula01 from "../components/Aula01";
import Aula02 from "../components/Aula02";
import Aula03 from "../components/Aula03";
import Aula04 from "../components/Aula04";
import Aula05 from "../components/Aula05";
import Aula06 from "../components/Aula06";
import Aula07 from "../components/Aula07";
import Aula08 from "../components/Aula08";
import Aula09 from "../components/Aula09";
import Aula10 from "../components/Aula10";
import Aula11 from "../components/Aula11";
import Aula12 from "../components/Aula12";
import Aula13 from "../components/Aula13";
import Aula14 from "../components/Aula14";
import { estilos, temas } from "../style/Estilos";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarAndCrescent } from '@fortawesome/free-solid-svg-icons'
import { faSun } from "@fortawesome/free-solid-svg-icons";

export function mudarTema(tema) {
  return tema ? temas.escuro : temas.claro
}
const Principal = () => {
   const [tema, settema] = useState(() => {
    const temaSalvo = localStorage.getItem("tema")
    return temaSalvo === "escuro"
})
useEffect(() => {
    localStorage.setItem("tema", tema ? "escuro" : "claro")
}, [tema])
    
    return (
        <div style={mudarTema(tema).fundo}>
            <Cabecalho aula='React' tema={tema} />
            <main style={mudarTema(tema).conteudo}>
                <div style={{display: "flex"}}>
                <h2 style={mudarTema(tema).texto}>Aulas</h2>
                    <div style={{display : "flex", width: '100%', justifyContent: 'end', marginBottom: '10px'}}>
                <button onClick={() => settema(!tema)} style={mudarTema(tema).botaoTema}>
                    {

                        tema ? <FontAwesomeIcon icon={faStarAndCrescent} /> :<FontAwesomeIcon icon={faSun} />

                    }

                    {/* tema == false ? {{...mudarTema().fundo, mudarTema().cardAula}}  : {{}} */}

                </button>
                    </div>
                </div>
                <div style={mudarTema(tema).lista_aulas}>
                    {/* Aqui incluiremos todos os componentes de Aula */}
                    <Aula01 tema={tema} />
                    <Aula02 tema={tema} />
                    <Aula03 tema={tema} />
                    <Aula04 tema={tema} />
                    <Aula05 tema={tema} />
                    <Aula06 tema={tema} />
                    <Aula07 tema={tema} />
                    <Aula08 tema={tema} />
                    <Aula09 tema={tema} />
                    <Aula10 tema={tema} />
                    <Aula11 tema={tema} />
                    <Aula12 tema={tema} />
                    <Aula13 tema={tema} />
                    <Aula14 tema={tema} />
                </div>
            </main>
        </div>
    )
}

export default Principal;