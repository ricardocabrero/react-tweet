import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './profile.css'

class Profile extends Component {
    render(){
        const { 
            picture,
            displayName,
            userName,
            emailAddress,
            location,
        } = this.props
        return(
            <div className={styles.root}>
                <img className={styles.avatar} src={picture}/>
                <span className={styles.name}>{displayName}</span>
                <ul className={styles.data}>
                    <li>
                        <span className='fa fa-user'></span>&nbsp;{userName}
                    </li>
                    <li>
                        <span className='fa fa-envelope'></span>&nbsp;{emailAddress}
                    </li>
                    <li>
                        <span className='fa fa-map-marker'></span>&nbsp;{location}
                    </li>
                </ul>
            </div>
        )
    }
}

Profile.propTypes = {
    picture: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
}

export default Profile