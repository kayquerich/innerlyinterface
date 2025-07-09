export const login = async (dados) => {

    try {

        const response = await fetch('http://localhost:8000/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(dados)   
        })

        if (response.ok) {
            return await response.json()
        } else {
            return await response.json()
        }

    } catch (error) {
        alert('O servidor não está respondendo tente novamente mais tarde')
    }

}

export const logout = async (token) => {

    try {

        const response = await fetch('http://localhost:8000/logout', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            }
        })

        if (response.ok) {
            sessionStorage.removeItem('usuario')
            sessionStorage.removeItem('registros')
            return true
        } else {
            return false
        }

    } catch (error) {
        alert('O servidor não está respondendo tente novamente mais tarde')
    }

}