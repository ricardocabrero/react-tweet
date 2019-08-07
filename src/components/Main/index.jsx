import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import uuid from 'uuid'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

class Main extends Component {
    constructor(props){
        super(props)

        const { user } = this.props

        this.state = {
            user: Object.assign({}, user, {retweets: []}, {favorites: []}),
            openText: false,
            userNameToReply: '',
            messages: []
        }
        this.handleOpenText = this.handleOpenText.bind(this)
        this.handleSendText = this.handleSendText.bind(this)
        this.handleCloseText = this.handleCloseText.bind(this)
        this.handleRetweet = this.handleRetweet.bind(this)
        this.handleFavorite = this.handleFavorite.bind(this)
        this.handleReplyTweet = this.handleReplyTweet.bind(this)
    }

    componentWillMount(){
        const messageRef = firebase.database().ref().child('messages')
        messageRef.on('child_added', snapshot => {
            const { messages } = this.state
            this.setState({
                messages: this.state.messages.concat(snapshot.val()),
                openText: false
            })
        })
    }

    handleSendText(e) {
        e.preventDefault()
        const { user } = this.props
        let newMessage = {
            id: uuid.v4(),
            userName: user.email.split('@')[0],
            displayName: user.displayName,
            picture: user.photoURL,
            date: Date.now(),
            text: e.target.text.value,
            retweets: 0,
            favorites: 0
        }
        const messageRef = firebase.database().ref().child('messages')
        const messageID = messageRef.push()
        messageID.set(newMessage)
    }

    handleCloseText(e){
        e.preventDefault()
        this.setState({
            openText: false,
            userNameToReply: ''
        })
    }

    handleOpenText(e) {
        e.preventDefault()
        this.setState({
            openText: true
        })
    }

    renderOpenText(){
        const {openText, userNameToReply} = this.state
        if(openText){
            return (
                <InputText
                    onSendText={this.handleSendText}
                    onCloseText={this.handleCloseText}
                    userNameToReply={userNameToReply}
                />
            )
        }
    }

    handleRetweet(msgId){
        const { user } = this.state
        let allReadyRetweet = user.retweets.filter(rtw => rtw === msgId)

        if(allReadyRetweet.length === 0){
            let messages = this.state.messages.map(msg => {
                if(msg.id === msgId){
                    msg.retweets++
                }
                return msg
            })

            let user = Object.assign( {}, this.state.user )
            user.retweets.push(msgId)

            this.setState({
                messages,
                user
            })
        }
    }

    handleFavorite(msgId){
        const { user } = this.state
        let allReadyFavorite = user.favorites.filter(fav => fav === msgId)

        if(allReadyFavorite.length === 0){
            let messages = this.state.messages.map(msg => {
                if(msg.id === msgId){
                    msg.favorites++
                }
                return msg
            })

            let user = Object.assign( {}, this.state.user )
            user.favorites.push(msgId)

            this.setState({
                messages,
                user
            })
        }
    }

    handleReplyTweet(msgId, userNameToReply){
        this.setState({
            openText: true,
            userNameToReply, //key === value
        })
    }

    render(){
        const { messages } = this.state
        const { user, onLogout } = this.props
        return(
            <div>
                <ProfileBar
                    picture={user.photoURL}
                    userName={user.email.split('@')[0]}
                    onOpenText={this.handleOpenText}
                    onLogout={onLogout}
                />
                {this.renderOpenText()}
                <MessageList 
                    messages={messages}
                    onRetweet={this.handleRetweet}
                    onFavorite={this.handleFavorite}
                    onReplyTweet={this.handleReplyTweet}
                />
            </div>
        )
    }
}

Main.propTypes = {
    user: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default Main