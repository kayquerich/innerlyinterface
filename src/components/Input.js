import { useEffect, useState, useRef } from 'react'
import styles from '../styles/input.module.css'
import { listaEmojis, listaNomesEmojis } from '../assets/dados'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export function Input ({id, name, type, placeholder, icon, handleChange, styleType, value, custom_styles, lista}) {

    const setStyle = () => {
        if (styleType === 'login') {
            return styles.inputlogin
        } else if (styleType === 'edit') {
            return styles.editinput
        } else if (styleType === 'senha') {
            return styles.senha
        } else if (styleType === 'senhac') {
            return styles.senhac
        } else {
            return styles.input
        }
    }

    const defineIcon = () => {
        if (icon) {
            return styles.containerinput
        } else {
            return styles.void
        }
    }

    const defineTypeIcon = () => {
        if (styleType === 'login' || styleType === 'senha') {
            return styles.iconinputl
        } else {
            return styles.iconinputc
        }
    }

    const defineTypeShow = () => {
        if (styleType === 'senha') {
            return styles.showpass
        } else if (styleType === 'senhac') {
            return styles.showpassc
        }
    }

    const [typeInp, setTypeInp] = useState(type)
    const [eye, setEye] = useState('eye')
    const showPass = (e) => {
        if (typeInp === 'text'){
            setTypeInp('password')
            setEye('eye')
        } else {
            setTypeInp('text')
            setEye('eye-slash')
        }
    }

    return (
        <div className={defineIcon()}>
            {icon ? (
                <div className={defineTypeIcon()}>
                    <Icon icon={icon}/>
                </div>
            ) : <></>}
            <input 
                value={value}
                type={typeInp}
                id={id} 
                name={name} 
                placeholder={placeholder} 
                onChange={handleChange}
                className={setStyle()}
                style={custom_styles}
                autoComplete={(styleType === 'senha' || styleType === 'senhac') ? 'off' : 'on'}
                list={lista && lista}
            />
            {styleType === 'senha' || styleType === 'senhac' ? (
                <div className={defineTypeShow()} onClick={showPass}><Icon icon={eye}/></div>
            ) : <></>}
        </div>
    )
}

export function DateInput ({handleChange, text}) {

    const preencheArray = (qtd) => Array.from({length : qtd}, (_, i) => i + 1 < 10 ? '0' + (i+1) : '' + (i+1))
    const [dias, setDias] = useState(preencheArray(31))
    const [meses] = useState(preencheArray(12))
    const [anos] = useState(Array.from({ length: 2025 - 1925 + 1 }, (_, i) => 2025 - i))

    const [data, setData] = useState('AAAA-dd-mm')

    const execute = (handleChange, value) => {
        if (handleChange) {
            handleChange(value)
        }
    }

    const onDayChange = (e) => {
        const novaData = data.substring(0,8) + e
        execute(handleChange, novaData)
        setData(novaData)
    }

    const isBissexto = (ano) => {

        let intAno = parseInt(ano)

        if (ano.substring(2) === '00' && intAno % 400 === 0) {
            return true
        } else if (intAno % 4 === 0) {
            return true
        }

        return false

    }

    const onMonthChange = (e) => {

        const novaData = data.substring(0,5) + e + data.substring(7)

        if (e === '02') {
            if (isBissexto(novaData.substring(5))) {
                setDias(preencheArray(29))
            } else {
                setDias(preencheArray(28))
            }
        } else if (['04', '06', '09', '11'].includes(e)) {
            setDias(preencheArray(30))
        } else {
            setDias(preencheArray(31))
        }

        execute(handleChange, novaData)
        setData(novaData)
    }

    const onYearChange = (e) => {
        const novaData = e + data.substring(4)
        
        if (isBissexto(e) && novaData.substring(3, 5) === '02') {
            setDias(preencheArray(29))
        } else {
            setDias(preencheArray(28))
        }

        execute(handleChange, novaData)
        setData(novaData)
    }
    

    return (
        <div style={{ width : '100%' }} >
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
    const [value, setValue] = useState("" + (valuehumor))

    const onHandleClick = (e) => {
        setChose(true)
        setValue(e.currentTarget.id)
        handleChange(parseInt(e.currentTarget.id) - 1)
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

export function RadioInput ({handleChange, checked_value, options, title, initial_value}) {

    const toTitle = (str) => {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const [select, setSelect] = useState(checked_value)
    const [value, setValue] = useState(initial_value)

    const verifyGender = () => {
        if (select === 'masculino' || select === 'feminino') {
            return select
        } else if (select) {
            return 'outro'
        } else if (!select) {
            return ''
        }
    }

    const onHandleChange = (e) => {
        setSelect(e.target.id)
        setValue(e.target.value === 'outro' ? '' : e.target.value)
        handleChange(e.target.value)
    }

    return (
        <div style={{ width : '100%'}} >

            <p style={{marginBottom : 5}}>{title}</p>

            <div className={styles.radio_external}>
                {options.map((option, index) => (
                    <div className={styles.radio_container} key={index}>
                        <input 
                            id={option}
                            type="radio" 
                            name="radio" 
                            className={styles.radio}
                            checked={option === verifyGender(checked_value)}
                            onChange={onHandleChange}
                            value={option}
                        />
                        <label htmlFor={option}>{toTitle(option)}</label>
                    </div>
                ))}
            </div>

            {verifyGender() === 'outro' ? (
                <input 
                    id='outro'
                    type="text"
                    placeholder='Personalise seu gênero...'
                    onChange={onHandleChange}
                    value={value}
                    className={styles.radio_personalize}
                />
            ) : (<></>)}

        </div>
    )

} 

export function Picker({handleChange, options, custom_styles, icon, placeholder, options_width}) {

    const pickerRef = useRef(null)

    useEffect(() => {

        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [])

    const [isOpen, setOpen] = useState(false)
    const [text, setText] = useState('')

    const onTextChange = (e) => {
        setText(e.target.value)
    } 

    const onHandleSelect = (option) => {

        if (handleChange) {
            handleChange(option.value)
        }

        setText(option.label)
        setOpen(false)
    }

    return (

        <div className={styles.container_picker} ref={pickerRef} style={{width : '100%'}} >

            <div className={icon ? styles.containerinput : 'void'}>

                {icon ? (
                    <div className={styles.iconinputl}>
                        <Icon icon={icon} />
                    </div>
                ) : (<></>)}

                <input
                    onFocus={() => setOpen(true)}
                    className={styles.inputlogin}
                    style={custom_styles}
                    placeholder={placeholder}
                    value={text}
                    onChange={onTextChange}
                />

            </div>

            <div className={styles.container_options}>

                {isOpen && options? (
                    options.filter(option => option.label.toLowerCase().includes(text.toLowerCase())).map((option, index) => (

                        <div
                            onClick={() => onHandleSelect(option)}
                            key={index}
                            className={styles.picker_option}
                            style={{width : '100%'}}
                        >
                            {option.label}
                        </div>

                    ))
                ) : (<></>)}

            </div>

        </div>
    )

}

export function TextInput ({name, placeholder, value, onChange}) {
    return (
        <textarea 
            name={name} 
            id={name}
            placeholder={placeholder}
            onChange={onChange}
            className={styles.textinput}
        >
            {value}
        </textarea>
    )
}