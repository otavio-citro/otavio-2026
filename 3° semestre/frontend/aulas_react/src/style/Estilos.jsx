/** @type {{ [key: string]: import('react').CSSProperties }} */


export const estilos = {
    tituloModulo: {
        color: 'blue',
        fontWeight: 'bold'
    },
    descricaoModulo: {
        fontStyle: 'italic'
    },
    fundo: {
        backgroundColor: '#f6f4f3',
        minHeight: '100vh'
    },
    conteudo: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: 24
    },
    lista_aulas: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    cardAula: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        width: '100%',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
    }
}

export const temas = {
    claro: {
        fundo: {
            backgroundColor: '#f6f4f3',
            minHeight: '100vh'
        },
        cardAula: {
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 8,
            width: '100%',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
        },
        lista_aulas: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        },
        conteudo: {
            maxWidth: 1200,
            margin: '0 auto',
            padding: 24
        },
        loginConteudo: {
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
        botao: {
        width: '100%',
        backgroundColor: '#e30613',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '4px'
    }, 
    botaoTema: {
        width: '5%',
        backgroundColor: '#e30613',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center'
    }, 
    texto: {
        color: 'black',
        
     }
    },

    escuro: {
        fundo: {
            backgroundColor: '#121212',
            minHeight: '100vh'
        },
        cardAula: {
            backgroundColor: '#2A2A2A',
            color: 'white',
            padding: 16,
            borderRadius: 8
        },
        lista_aulas: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16
        },
        conteudo: {
            maxWidth: 1200,
            margin: '0 auto',
            padding: 24
        },
        loginConteudo : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: '10px auto',
        backgroundColor: '#2e2e2e',
        padding: '20px',
        boxShadow: '0px 4px 6px rgba(37, 37, 37, 0.2)',
        borderRadius: '8px',
        gap: '5px'
     },
     botao: {
        width: '100%',
        backgroundColor: '#e30613',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '4px'
    }, 
     botaoTema: {
        width: '5%',
        backgroundColor: '#062ee3',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center'
    }, 
    texto: {
        color: 'white'
     }
    }
}