export const cadastroUsuario = async (dados) => {

    try {

        const response = await fetch('http://localhost:8000/usuarios/create', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dados)
        })

        if (response.ok) {
            return await response.json()
        } else {
            alert('Não foi possivel realizar o cadastro, tente novamente')
        }

    } catch (error) {
        error_case()
    }
    
}

export const getUsuario = async (token) => {

    try {

        const response = await fetch('http://localhost:8000/usuarios/usuario', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            }
        })

        if (response.ok) {
            return await response.json()
        } else {
            alert(await response.json().message)
        }

    } catch (error) {
        error_case()
    }

} 

export const updateUsuario = async (dados, token) => {

    try {

        const response = await fetch('http://localhost:8000/usuarios/update', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            },
            body : JSON.stringify(dados)
        })

        if (response.ok) {

            const usuario = await getUsuario(token)
            sessionStorage.setItem('usuario', JSON.stringify({...usuario, 'token' : token}))

            return true
        } else {
            return false
        }

    } catch (error) {
        error_case()
    }
}

export const createRegistro = async (dados, token) => {

    try {

        const response = await fetch('http://localhost:8000/registros/create', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            },
            body : JSON.stringify(dados)
        })

        if (response.ok) {
            return await response.json()
        } else {
            return {}
        }

    } catch (error) {
        error_case()
    }

}

export const getRegistrosByUser = async (id, token) => {

    try {

        const response = await fetch(`http://localhost:8000/registros/usuario/${id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            }
        })

        if (response.ok) {
            return await response.json()
        } else {
            alert('Erro na consulta')
        }

    } catch (error) {
        error_case()
    }

}

export const updateRegistro = async (registro, token) => {
    
    try {

        const response = await fetch('http://localhost:8000/registros/update', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            },
            body : JSON.stringify(registro)
        })

        if (response.ok) {
            return await response.json()
        } else {
            alert('Não foi possivel realizar a mudança no registro')
        }
        

    } catch (error) {
        console.log(error)
        error_case()
    }

}

export const listarAcompanhamentos = async (token) => {

    try {

        const response = await fetch('http://localhost:8000/acompanhamentos/listar', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            }
        })

        if (response.ok) {
            return await response.json()
        } else {
            return []
        }

    } catch (error) {
        error_case()
    }

}

export const encerrarAcompanhamento = async (id, token) => {

    try {

        const response = await fetch('http://localhost:8000/acompanhamentos/encerrar', {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            },
            body : JSON.stringify({
                id : id
            })
        })

        if (response.ok) return true;
        return false;

    } catch (error) {
        error_case()
    }

}

function error_case () {
    alert('O servidor não está respondendo, tente novamente mais tarde')
}