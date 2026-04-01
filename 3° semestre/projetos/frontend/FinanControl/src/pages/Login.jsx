import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { enredecoServidor } from '../Utils'
import { Link } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    const botaoEntrar = async () => {
        //funçao para nao recarregar a tela
        event.preventDefault();
        try {

            if (email == '' || senha == '') {
                throw new Error('Preencha todos os campos')
            }

            const login = {
                email: email,
                senha: senha
            }
            //utilizando autenticação com api do backend
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
                console.log('erro ao fazer login', dados);

            }

        } catch (error) {
            console.error('Erro ao realizar login', error);
            setMensagem(error.message)
        }
    }
    return (
        <div /*style={{ backgroundColor: '#f2f2f2', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}*/>
            <div style={{ display: 'flex', justifyContent: "space-between",}}>
                <img src="../images/bannerFundoSesi.jpg" alt="Logo" style={estilos.banner} />
                <div style={{display: 'flex', width: '20%', justifyContent: 'top', justifyItems: 'top'}}>
                    <div style={estilos.loginConteudo}>
                        <img src="../images/bannerlogo.png" alt="Logo"
                            style={estilos.logo} />
                        <h2>Login</h2>
                        <div style={estilos.grupoInput}>
                            <label style={estilos.label} >Email</label>
                            <input type="text" placeholder='Digite seu email' style={estilos.input}
                                onChange={(event) => setEmail(event.target.value)} value={email} />
                        </div>
                        <div style={estilos.grupoInput}>
                            <label style={estilos.label}>Senha</label>
                            <input type="password" placeholder='Digite sua senha' style={estilos.input}
                                onChange={(event) => setSenha(event.target.value)} value={senha} />
                        </div>
                        <button onClick={botaoEntrar} style={estilos.botao}>Entrar</button>
                        <p style={{ fontStyle: 'bold' }}>{mensagem}</p>
                        <p>não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )


}

/** @type {{ [key: string]: import('react').CSSProperties }} */
const estilos = {
    loginConteudo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        // margin: '10px auto',
        borderRadius: '8px',
        gap: '5px',
        justifyContent: 'top',
        marginTop: '50px',


    },
    logo: {
        height: '50px'
    },
    label: {
        display: 'block',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    botao: {
        width: '100%',
        backgroundColor: '#e30613',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '4px'
    },
    grupoInput: {
        width: '100%'
    },
    banner: {
        width: '70%',
        height: '100vh',
        objectFit: 'cover',
    }
}

export default Login