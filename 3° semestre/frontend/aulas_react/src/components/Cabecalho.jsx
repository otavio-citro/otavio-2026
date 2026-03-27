import logoReact from '../assets/react.svg'
import { mudarTema } from '../pages/Principal'
import '../style/Cabecalho.css'

const Cabecalho = ( { aula, tema } ) => {
    return (
        <header className='cabecalho'>
            <img src={logoReact} alt="" />
            <div>
                <h1 style={mudarTema(tema).texto}>SENAI - Desenvolvimento de Sistemas</h1>
                <p style={mudarTema(tema).texto}>Aulas de Front-end - { aula }</p>
            </div>
            <img src="https://sesisenaisp.zendesk.com/hc/theming_assets/01HZKNSQKYGMZYJKC2QCPSG5FA" alt="" />
        </header>
    )
}

export default Cabecalho