import { useState } from 'react'
import styles from '../styles/input.module.css'
import { listaEmojis, listaNomesEmojis } from '../assets/dados'

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
            <select onChange={onHandleChange} className={styles.selectdate} defaultValue=''>
                <option value='' disabled>{label}</option>
                {options.map((value) => (
                    <option value={value} key={value}>{value}</option>
                ))}
            </select>
        </>
    )
}

export function EmotionInput ({handleChange, valuehumor}) {

    const [chose, setChose] = useState(valuehumor !== -1 ? true : false)
    const [value, setValue] = useState("" + (valuehumor + 1))

    const onHandleClick = (e) => {
        setChose(true)
        setValue(e.currentTarget.id)
        handleChange(parseInt(e.currentTarget.id) -1)
    }


    return (
        <div className={styles.emotioninput}>
            <button className={chose === true && value !== '1' ? styles.emojibuttontransparent : styles.emojibutton} id='1' onClick={onHandleClick}>
                <img src={listaEmojis[0]} alt={'emoji-' + 1} className={styles.emojiicon} />
                <span>{listaNomesEmojis[0]}</span>
            </button>

            <button className={chose === true && value !== '2' ? styles.emojibuttontransparent : styles.emojibutton} id='2' onClick={onHandleClick}>
                <img src={listaEmojis[1]} alt={'emoji-' + 1} className={styles.emojiicon} />
                <span>{listaNomesEmojis[1]}</span>
            </button>

            <button className={chose === true && value !== '3' ? styles.emojibuttontransparent : styles.emojibutton} id='3' onClick={onHandleClick}>
                <img src={listaEmojis[2]} alt={'emoji-' + 1} className={styles.emojiicon} />
                <span>{listaNomesEmojis[2]}</span>
            </button>

            <button className={chose === true && value !== '4' ? styles.emojibuttontransparent : styles.emojibutton} id='4' onClick={onHandleClick}>
                <img src={listaEmojis[3]} alt={'emoji-' + 1} className={styles.emojiicon} />
                <span>{listaNomesEmojis[3]}</span>
            </button>

            <button className={chose === true && value !== '5' ? styles.emojibuttontransparent : styles.emojibutton} id='5' onClick={onHandleClick}>
                <img src={listaEmojis[4]} alt={'emoji-' + 1} className={styles.emojiicon} />
                <span>{listaNomesEmojis[4]}</span>
            </button>

        </div>
    )
}

export function AnotationInput ({handleChange, value}) {
    return (
        <>
            <textarea onChange={handleChange} placeholder='Me conte como está se sentindo...' className={styles.anotationinput} >{value}</textarea>
        </>
    )
}