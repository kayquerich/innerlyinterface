import { useState } from 'react'
import styles from '../styles/input.module.css'

export function Input ({id, name, type, placeholder, icon, handleChange, styleType}) {

    return (
        <>
            <input 
                type={type}
                id={id} 
                name={name} 
                placeholder={placeholder} 
                onChange={handleChange}
                className={styleType === 'login' ? styles.inputlogin : styles.input}
            />
        </>
    )
}

export function DateInput ({handleChange, text}) {

    const preencheArray = (qtd) => Array.from({length : qtd}, (_, i) => i + 1 < 10 ? '0' + (i+1) : '' + (i+1))
    const [dias, setDias] = useState(preencheArray(31))
    const [meses] = useState(preencheArray(12))
    const [anos] = useState(Array.from({ length: 2025 - 1925 + 1 }, (_, i) => 2025 - i))

    const [data, setData] = useState('dd/mm/AAAA')

    const execute = (handleChange, value) => {
        if (handleChange) {
            handleChange(value)
        }
    }

    const onDayChange = (e) => {
        const novaData = e + data.substring(2)
        execute(handleChange, novaData)
        setData(novaData)
    }

    const onMonthChange = (e) => {

        const novaData = data.substring(0,3) + e + data.substring(5)

        if (e === '02') {
            setDias(preencheArray(28))
        } else if (['04', '06', '09', '11'].includes(e)) {
            setDias(preencheArray(30))
        } else {
            setDias(preencheArray(31))
        }

        execute(handleChange, novaData)
        setData(novaData)
    }

    const onYearChange = (e) => {
        const novaData = data.substring(0,6) + e
        execute(handleChange, novaData)
        setData(novaData)
    }
    

    return (
        <div>
            <p>{text}</p>

            <div className={styles.containerdates} > 
                <SelectForDate options={dias} execute={onDayChange} label='Dia' />
                <SelectForDate options={meses} execute={onMonthChange} label='Mês' />
                <SelectForDate options={anos} execute={onYearChange} label='Ano' />
            </div>

        </div>
    )
}

function SelectForDate ({options, execute, label}) {

    const onHandleChange = (e) => {
        execute(e.target.value)
    }

    return (
        <>
            <select onChange={onHandleChange} className={styles.selectdate}>
                <option value='' disabled selected>{label}</option>
                {options.map((value) => (
                    <option value={value} key={value}>{value}</option>
                ))}
            </select>
        </>
    )
}