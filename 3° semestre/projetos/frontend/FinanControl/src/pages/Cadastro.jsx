import { useEffect, useState } from "react"
import { enredecoServidor } from "../Utils"
import { Navigate, useNavigate } from "react-router-dom"
const Cadastro = ({ tema }) => {
    const [listaUsuarios, setListaUsuarios] = useState([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    async function botaoAdicionar() {
        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha,
        }

        try {
            const resposta = await fetch(`${enredecoServidor}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoUsuario)
            })


            if (!resposta.ok) {
                throw new Error('Erro ao adicionar usuários: ' + resposta.statusText)
            }
            if (resposta.ok) {
                console.log('usuario cadastrado com sucesso')
                navigate('/')
            }            
            buscarDados()
            LimparCamposFormularios()
        } catch (erro) {
            console.error('Erro ao adicionar produto', erro.message)
        }
    }

    // async function botaoExcluir(id_usuario) {

    //     try {
    //         const resposta = await fetch(`${enredecoServidor}/usuarios/${id_usuario}`, {
    //             method: 'DELETE'
    //         })

    //         if (!resposta.ok) {
    //             throw new Error('Erro ao excluir usuario: ' + resposta.statusText)
    //         }

    //         buscarDados()
    //     } catch (erro) {
    //         console.error('Erro ao adicionar usuario', erro.message)
    //     }
    // }

    function LimparCamposFormularios() {
        setNome('')
        setEmail('')
        setSenha('')
    }

    useEffect(() => {
        buscarDados()
    }, [])

    //Função para buscar os dados de uma API
    async function buscarDados() {
        try {
            const resposta = await fetch(`${enredecoServidor}/usuarios`)
            const dados = await resposta.json()
            setListaUsuarios(dados)

        } catch (erro) {
            console.error('Erro ao carregar os dados', erro.message)
        }
    }

    return (
        <div style={{ backgroundColor: '#f2f2f2', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={estilos.cadastroConteudo}>
                <h1>Cadastro</h1>
                <div style={{ display: "flex", flexDirection: 'column', gap: 10, }}>
                    <input type="text" placeholder="Nome" style={estilos.input} value={nome}
                        onChange={(event) => setNome(event.target.value)} />
                    <input type="email" placeholder="Email" style={estilos.input} value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                    <input type="password" placeholder="Senha " style={estilos.input} value={senha}
                        onChange={(event) => setSenha(event.target.value)} />
                    <button style={estilos.botao} onClick={botaoAdicionar}>Cadastrar</button>

                    {/* <hr /> */}
                    {/* <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} >
                    {
                        listaUsuarios.map((usuario, pos) => (
                            <Aula13_Usuario key={pos} usuario={usuario} botaoExcluir={botaoExcluir} tema={tema}/>
                        ))
                    }
                </div> */}
                </div>
            </div>
        </div>
    )
}

const estilos = {
    cadastro: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
   input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    botao: {
        backgroundColor: "#e30613",
        color: "#fff",
        borderRadius: "5px",
        fontWeight: "bold",
        border: "none",
        padding: "10px",
        fontSize: "16px",
        textAling: "center",
    },
    cadastroConteudo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: '10px auto',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        gap: '5px'
    },
}

export default Cadastro