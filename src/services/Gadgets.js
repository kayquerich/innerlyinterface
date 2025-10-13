import { meses, listaNomesEmojis } from "../assets/dados"

export function dateString (data) {
    const [ano, mes, dia] = data.split('-')
    const stringMes = meses[parseInt(mes) - 1]
    return `${dia} de ${stringMes} de ${ano}`
}

export function isEmpty(objeto) {
    return Object.keys(objeto).length === 0
}

export function setColorBoolean (boolean) {
    if (boolean) return { color : 'green', borderColor : 'green' };
    return { color : 'red', borderColor : 'red' }
}

export function setColorString (string) {
    if (string === 'aceito') {
        return { color : 'green', borderColor : 'green' }
    } else if (string === 'aguardando') {
        return { color : '#ffd500', borderColor : '#ffd500' }
    } else {
        return { color : 'red', borderColor : 'red' }
    }
}

export function filtarRegistros (lista) {
    
    const hoje = new Date()
    const diaSemana = hoje.getDay()

    const primeiroDia = new Date(hoje)
    primeiroDia.setDate(hoje.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1))
    primeiroDia.setHours(0,0,0,0)

    const ultimoDia = new Date(primeiroDia)
    ultimoDia.setDate(primeiroDia.getDate() + 6)
    ultimoDia.setHours(23,59,59,999) 

    const daSemana = lista.filter(objeto => {
        const data = new Date(objeto.data_registro);
        return data >= primeiroDia && data <= ultimoDia;
    });

    return daSemana;

}

export function getCurrentDate() {
    const hoje = new Date()
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}

export function setEmotionStr (value) {
    return listaNomesEmojis[value]
}

export async function getAtivides() {
    try {
        const atividades = JSON.parse(localStorage.getItem('atividades'))
        if (!atividades) {
            const response = await fetch('http://localhost:8000/registros/atividades', {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                }
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('atividades', JSON.stringify(data))
                return data
            }
        }
        return atividades
    } catch (error) {
        console.error("Erro ao buscar atividades:", error);
        return [];
    }
}