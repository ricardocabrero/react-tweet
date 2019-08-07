import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'normalize-css'
import firebase from 'firebase'

import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import Login from '../Login'


class App extends Component {
    constructor(){
        super()
        this.state = {
            user: null
        }
        this.handleOnAut = this.handleOnAut.bind(this)
        this.hanleLogout = this.hanleLogout.bind(this)
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                this.setState({ user }) //key === value
                console.log(user)
            } else {
                this.setState({ user: null })
            }
        })
    }

    handleOnAut(){
        const provider = new firebase.auth.GithubAuthProvider()
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesión`))
            .catch(error => console.log(`Error: ${error.code} : ${error.message}`))
    }

    hanleLogout(){
        firebase.auth().signOut()
            .then(() => console.log('Te has desconectado correctamente'))
            .catch(error => console.log('Ha ocurrido un error'))
    }
    
    render(){
        const { user } = this.state
        return(
            <Router>
                <div>
                    <Header titleApp='React-tweet!!'/>
                    <Switch>
                        <Route exact path='/' render={() => {
                            if(this.state.user){
                                return(
                                    <Main 
                                        user={user}
                                        onLogout={this.hanleLogout}
                                    />
                                )
                            } else {
                                return(
                                    <Login
                                        onAuth={this.handleOnAut}
                                    />
                                 )
                            }
                        }}/>
                        <Route path="/profile" render={() => (
                            <Profile
                                picture={user.photoURL}
                                userName={user.email.split('@')[0]}
                                displayName={user.displayName}
                                location={user.location}
                                emailAddress={user.email}
                            />
                        )}/>
                        <Route path='/user/:username' render={({ match }) => (
                            <Profile
                                displayName={match.params.username}
                                userName={user.email.split('@')[0]}
                                emailAddress={user.email}
                            />
                        )}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App

