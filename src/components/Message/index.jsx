import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './message.css'
import moment from 'moment'

class Message extends Component {
    constructor(props){
        super(props)
        this.onPressRetweet = this.onPressRetweet.bind(this)
        this.onPressFavorites = this.onPressFavorites.bind(this)
        this.state = {
            pressRetweet: false,
            pressFavorite: false
        }
    }

    onPressRetweet(){
        this.props.onRetweet()
        this.setState({
            pressRetweet: true
        })
    }

    onPressFavorites(){
        this.props.onFavorite()
        this.setState({
            pressFavorite: true
        })
    }

    render(){
        const { 
            picture, 
            displayName, 
            userName, 
            date, 
            text, 
            numRetweets, 
            numFavorites,
            onReplyTweet,
        }  = this.props

        const { pressRetweet, pressFavorite } = this.state
        let dateFormat = moment(date).fromNow()
        let userLink = `/user/${userName}`
        return(
            <div className={styles.root}>
                <div className={styles.user}>
                    <Link to={userLink}>
                        <figure>
                            <img className={styles.avatar} src={picture}/>
                        </figure>
                    </Link>
                    <span className={styles.displayName}>{displayName}</span>
                    <span className={styles.userName}>{userName}</span>
                    <span className={styles.date}>{dateFormat}</span>
                </div>
                <h3 className={styles.text}>{text}</h3>
                <div className={styles.buttons}>
                    <div className={styles.icon}
                        onClick={onReplyTweet}
                    >
                        <span className='fa fa-reply'></span>
                    </div>
                    <div 
                        className={ (pressRetweet) ? styles.rtGreen : '' }
                        onClick={this.onPressRetweet}
                    >
                        <span className='fa fa-retweet'></span>
                        <span className={styles.num}>{numRetweets}</span>
                    </div>
                    <div 
                        className={ (pressFavorite) ? styles.favYellow : '' }
                        onClick={this.onPressFavorites}
                    >
                        <span className='fa fa-star'></span>
                        <span className={styles.num}>{numFavorites}</span>
                    </div>
                </div>
            </div>
        )
    }
}

Message.propTypes = {
    onRetweet: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
    onReplyTweet: PropTypes.func.isRequired,
    picture: PropTypes.string.isRequired, 
    displayName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired, 
    text: PropTypes.string.isRequired, 
    numRetweets: PropTypes.number.isRequired, 
    numFavorites: PropTypes.number.isRequired, 
    date: PropTypes.number.isRequired  
}

export default Message