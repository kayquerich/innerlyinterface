import { useEffect, useRef, useState } from 'react'
import styles from '../styles/search.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export function SearchBar ({action, placeholder, values, close}) {

    const [string, setString] = useState('')
    const searchRef = useRef(null)
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {

        function handleClickOutside (event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [])

    const searchAction = async (option) => {
        setString(option)
        setOpen(false)
        await action(option)
    }

    const handleChange = (e) => {
        setString(e.target.value)
        if (e.target.value === '') {
            close()
        }
    }

    return (

        <div className={styles.container} ref={searchRef} >
            <div className={styles.container_search}>
                <div className={styles.icon}>
                    <Icon icon='search'/>
                </div>
                <input
                    onFocus={() => setOpen(true)}
                    type='text'
                    className={styles.search}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={string}
                />
            </div>

            <div className={styles.container_options} >
                {( isOpen && string.trim() && values.length > 0 ) && (
                    values.filter(option => option.toLowerCase().includes(string.toLowerCase())).map((option, index) => (
                        <div key={index} className={styles.option} onClick={() => searchAction(option)} >
                            {option}
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}