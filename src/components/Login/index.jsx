import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './login.css'

class Login extends Component {
    render(){
        const { onAuth } = this.props
        return(
            <div className={styles.root}>
                <p className={styles.text}>
                Necesitamos que inicies sesión con tu cuenta de Github, para poder leer y escribir mensajes
                </p>
                <button 
                className={styles.button}
                onClick={onAuth}>
                <span className="fab fa-github"></span>&nbsp;
                Login con Github
                </button>
            </div>
        )
    }
}

Login.propTypes = {
    onAuth: PropTypes.func.isRequired
}

export default Login