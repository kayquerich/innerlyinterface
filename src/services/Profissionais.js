export const cadastroProfissional = async (dados) => {

    try {

        const response = await fetch('http://localhost:8000/profissionais/create', {
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

export const getProfissional = async (token) => {

    try {

        const response = await fetch('http://localhost:8000/profissionais/profissional', {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Token ${token}`
            }
        })

        if (response.ok) return await response.json();
        return {}

    } catch (error) {
        error_case()
    }

}

function error_case () {
    alert('Não foi possivel realizar o cadastro, tente novamente')
}