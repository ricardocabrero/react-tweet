import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from '../Message'
import styles from './message-list.css'

class MessageList extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const { messages, onRetweet, onFavorite, onReplyTweet } = this.props
        return(
            <div className={styles.root}>
                {messages.map(msg => {
                    return (
                        <Message 
                            key={msg.id}
                            text={msg.text}
                            picture={msg.picture}
                            displayName={msg.displayName}
                            userName={msg.userName}
                            date={msg.date}
                            numRetweets={msg.retweets}
                            numFavorites={msg.favorites}
                            onRetweet={() => onRetweet(msg.id)}
                            onFavorite={() => onFavorite(msg.id)}
                            onReplyTweet={() => onReplyTweet(msg.id, msg.userName)}
                        />
                    )
                }).reverse()
            }
            </div>
        )
    }
}

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRetweet: PropTypes.func.isRequired, 
    onFavorite: PropTypes.func.isRequired,  
    onReplyTweet: PropTypes.func.isRequired  
}

export default MessageList