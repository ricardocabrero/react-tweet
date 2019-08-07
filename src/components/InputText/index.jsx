import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './input-text.css'

class InputText extends Component {
    
    render(){
        const { onSendText, onCloseText, userNameToReply } = this.props
        return (
            <form 
            className = {styles.form}
            onSubmit={onSendText}>
                <textarea 
                className={styles.text} 
                name='text'
                defaultValue={(userNameToReply) ? `@${userNameToReply} `: ''}
                >
                </textarea>
                <div className={styles.buttons}>
                    <button 
                    className={styles.close}
                    onClick={onCloseText}>Cerrar</button>
                    <button 
                    className={styles.send}
                    type='submit'>Enviar</button>
                </div>
            </form>
        )
    }
}

InputText.propTypes = {
    onSendText: PropTypes.func.isRequired,
    onCloseText: PropTypes.func.isRequired, 
    userNameToReply: PropTypes.string.isRequired 
}

export default InputText