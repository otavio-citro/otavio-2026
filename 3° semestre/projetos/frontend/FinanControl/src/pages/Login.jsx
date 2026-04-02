import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { enredecoServidor } from '../Utils'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    function MouseEntrouLink(event) {
        event.target.style.textDecoration = 'underline';
    }
    function MouseSaiuLink(event) {
        event.target.style.textDecoration = 'none';
    }
    function MouseEntrouBotao(event) {
        event.target.style.backgroundColor = '#F21A28';
    }
    function MouseSaiuBotao(event) {
        event.target.style.backgroundColor = '#E30613';
    }

    const botaoEntrar = async (event) => {
        event.preventDefault()

        try {
            if (email === '' || senha === '') {
                throw new Error('Preencha todos os campos')
            }

            const login = {
                email: email,
                senha: senha
            }

            const resposta = await fetch(`${enredecoServidor}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            })

            const dados = await resposta.json()

            if (resposta.ok) {
                console.log('login bem sucedido', dados)
                setMensagem('Login bem sucedido')
                localStorage.setItem('UsuarioLogado', JSON.stringify(dados))
                navigate('/')
            } else {
                setMensagem('email ou senha incorretos')
                console.log('erro ao fazer login', dados)
            }

        } catch (error) {
            console.error('Erro ao realizar login', error)
            setMensagem(error.message)
        }
    }

    return (
        <div style={estilos.container}>
            <img
                src="../images/bannerFundoSesi.jpg"
                alt="Banner SESI SENAI"
                style={estilos.banner}
            />

            <div style={estilos.ladoFormulario}>
                <div style={estilos.loginConteudo}>
                    <img
                        src="../images/bannerlogo.png"
                        alt="Logo"
                        style={estilos.logo}
                    />

                    <h2 style={estilos.titulo}>Login</h2>

                    <div style={estilos.grupoInput}>
                        <label style={estilos.label}>Email</label>
                        <input
                            type="text"
                            placeholder="Digite seu email"
                            style={estilos.input}
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                    </div>

                    <div style={estilos.grupoInput}>
                        <label style={estilos.label}>Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            style={estilos.input}
                            onChange={(event) => setSenha(event.target.value)}
                            value={senha}
                        />
                    </div>

                    <button
                        onClick={botaoEntrar}
                        style={estilos.botao}
                        onMouseEnter={MouseEntrouBotao}
                        onMouseLeave={MouseSaiuBotao}
                    >
                        Entrar
                    </button>

                    <p style={estilos.mensagem}>{mensagem}</p>

                    <p>
                        Não tem conta?{' '}
                        <Link to="/cadastro"
                            style={{ textDecoration: 'none', color: 'red' }}
                            onMouseEnter={MouseEntrouLink}
                            onMouseLeave={MouseSaiuLink}
                        >Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

/** @type {{ [key: string]: import('react').CSSProperties }} */
const estilos = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        width: '100%'
    },

    banner: {
        width: '70%',
        height: '100vh',
        objectFit: 'cover'
    },

    ladoFormulario: {
        width: '30%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },

    loginConteudo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        maxWidth: '350px',
        padding: '30px',
        borderRadius: '12px',
        gap: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },

    titulo: {
        margin: '5px 0 10px 0'
    },

    logo: {
        height: '50px',
        marginBottom: '10px',
        
    },

    grupoInput: {
        width: '100%'
    },

    label: {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '5px'
    },

    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        outline: 'none',
        fontSize: '16px',
        boxSizing: 'border-box'
    },

    botao: {
        width: '100%',
        backgroundColor: '#e30613',
        color: '#fff',
        padding: '12px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold'
    },

    mensagem: {
        minHeight: '20px',
        fontWeight: 'bold'
    }
}

export default Login