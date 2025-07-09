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
        alert('Não foi possivel realizar o cadastro, tente novamente')
    }

}