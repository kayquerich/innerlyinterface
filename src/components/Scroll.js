import { useState, useRef } from "react"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import styles from '../styles/scroll.module.css'

export function ScrollRight ({ref, distance, visibility, direction}) {

    const [ intervalId, setIntervalId ] = useState()

    const scroll = () => {

        if (ref) {
            const id = setInterval(() => {
                ref.current.scrollBy({ left : distance, behavior : 'smooth'})
            }, 1)
            setIntervalId(id)
        }
    }

    const stopScroll = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    }

    return (
        <>
            {visibility ? (
                <div 
                    onMouseDown={scroll}
                    onMouseUp={stopScroll}
                    onMouseLeave={stopScroll}
                    onTouchStart={scroll}
                    onTouchEnd={stopScroll}
                    className={direction === 'right' ? styles.right_scroll_button : styles.left_scroll_button}
                >
                    <Icon icon={`chevron-${direction}`}/>
                </div>
            ) : (<></>)}
        </>
    )
} 

export function ScrollView ({style_name, children}) {

    const scrollRef = useRef(null)
    const [scrolled, setScrolled] = useState(false)
    const [ fullScroll, setFullScroll ] = useState(true)

    const handleScroll = () => {
        if (scrollRef.current && scrollRef.current.scrollLeft > 20) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }

        if (scrollRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current 
            if ( scrollLeft + clientWidth >= scrollWidth ) {
                setFullScroll(false)
            } else {
                setFullScroll(true)
            }
        }
    }

    return (
        <div className={style_name} ref={scrollRef} onScroll={handleScroll}>

            <ScrollRight
                    direction='left'
                    ref={scrollRef}
                    distance={-10}
                    visibility={scrolled}
            />

            {children}

            <ScrollRight 
                    direction='right' 
                    distance={10} 
                    ref={scrollRef} 
                    visibility={fullScroll}
            />

        </div>
    )
}