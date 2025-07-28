import { meses } from "../assets/dados"

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