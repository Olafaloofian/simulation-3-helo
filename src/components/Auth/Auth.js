import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'

class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: "",
            password: ""
        }

        this.updatePassword = this.updatePassword.bind(this)
        this.updateUsername = this.updateUsername.bind(this)
        this.createUser = this.createUser.bind(this)
        this.userLogin = this.userLogin.bind(this)
    }

    updatePassword(val) {
        this.setState({
            password: val
        })
    }

    updateUsername(val) {
        this.setState({
            username: val
        })
    }

    createUser() {
        console.log('------------ this.state.username', this.state.username)
        console.log('------------ this.state.password', this.state.password)
        axios.post('/api/auth/register', {username: this.state.username, password: this.state.password, profile_pic: `https://robohash.org/${this.state.username}`}).then((res)=> {
            this.props.updateUser(res.data[0].username, res.data[0].id, res.data[0].profile_pic); this.setState({redirect: true})})
    }

    userLogin() {
        console.log('------------ this.state.username', this.state.username)
        console.log('------------ this.state.password', this.state.password)
        axios.post('/api/auth/login', {username: this.state.username, password: this.state.password}).then((res)=> { console.log('------------ res', res); this.props.updateUser(res.data[0].username, res.data[0].id, res.data[0].profile_pic); this.setState({redirect: true})})
    }

    render() {
        const { redirect } = this.state

        if(redirect) {
            return <Redirect to={`/nav/${this.props.id}`} />
        }
        return(
            <div>
                Auth
                <div><input type="text" onChange={(e) => this.updateUsername(e.target.value)}/></div>
                <div><input type="password" onChange={(e) => this.updatePassword(e.target.value)}/></div>
                <div><button onClick={() => this.userLogin()}>Login</button></div>
                <div><button onClick={() => this.createUser()}>Register</button></div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    console.log(store)
    return {
        id: store.id,
        username: store.username,
        profile_pic: store.profile_pic
    }
}

export default connect(mapStateToProps, { updateUser })(Auth)