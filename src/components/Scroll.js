import { useContext } from "react"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import styles from '../styles/scroll.module.css'
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import "react-horizontal-scrolling-menu/dist/styles.css";

export function Arrow ({direction, handleClick}) {

    return (
        <div 
            className={direction === 'right' ? styles.right_scroll_button : styles.left_scroll_button}
            onClick={handleClick}
        >
            <Icon icon={`chevron-${direction}`}/>
        </div>
    )
} 

function LeftArrow() {
    const { scrollPrev, isFirstItemVisible } = useContext(VisibilityContext);
    
    if (isFirstItemVisible) return null;

    return (
        <Arrow direction='left' handleClick={() => scrollPrev()}/>
    );
}

function RightArrow() {
    const { scrollNext, isLastItemVisible } = useContext(VisibilityContext);
    
    if (isLastItemVisible) return null;

    return (
        <Arrow direction='right' handleClick={() => scrollNext()}/>
    );
}

export function ScrollView ({children}) {
    return (
        <div className={styles.container}>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} scrollContainerClassName={styles.scroll}>
                {children}
            </ScrollMenu>
        </div>
    )
}