import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './profile-bar.css'

const ProfileBar = ({ picture, userName, onOpenText, onLogout }) => (
    <div className={styles.root}>
        <Link to="/profile">
            <figure>
                <img className={styles.avatar} src={picture}/>
            </figure>
        </Link>
        <span className={styles.username}>Hola @{userName}!</span>
        <button 
        onClick={onOpenText}
        className={styles.button}>
            <span className='fa fa-edit'></span> Tweet!
        </button>
        <button 
        className={styles.button}
        onClick={onLogout}
        > 
        <span className='fas fa-sign-out-alt'></span> Salir
        </button>
    </div>    
)

ProfileBar.propTypes = {
    picture: PropTypes.string.isRequired, 
    userName: PropTypes.string.isRequired, 
    onOpenText: PropTypes.func.isRequired 
}

export default ProfileBar