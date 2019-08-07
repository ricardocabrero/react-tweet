import React from 'react'
import styles from './header.css'

const Header = ({ titleApp }) => (
        <header className={styles.root}>
            <h1 className={styles.logo}>{titleApp}</h1>
        </header>
    )

export  default Header

