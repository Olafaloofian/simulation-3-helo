import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser, clearRedux } from '../../ducks/reducer'
import axios from 'axios'

class Nav extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     params: this.props.match.params.id
        // }
    }

    componentDidMount() {
        axios.get('/api/auth/me').then(res => {console.log('------------ res', res); this.props.updateUser(this.props.username, res.data[0].id, res.data[0].profile_pic)})
        console.log(this.props)
    }

    deleteProfile = () => {
        console.log('------------ this.props', this.props);
        axios.delete(`/api/profile/${this.props.match.params.id}`).then((res) => console.log(res))
    }

    logout() {
        axios.post('/api/auth/logout').then(() => this.props.clearRedux())
    }

    render () {
        // console.log('==========================',this.state.params)
    return(
        <div>
            Nav
            <Link to='/dashboard'><button>Home</button></Link>
            <Link to='/new'><button>New Post</button></Link>
            <Link to='/'><button onClick={() => this.logout()}>Logout</button></Link>
            <Link to='/'><button onClick={() => this.deleteProfile()}>Delete Profile</button></Link>
            <div><img src={this.props.profile_pic} /></div>
            <div>{this.props.username}</div>
            {/* <div>{this.props.match.params.id}</div> */}
        </div>
    )
}
}

const mapStateToProps = (store) => {
    console.log(store)
    return {
        // match: this.props.match,
        username: store.username,
        profile_pic: store.profile_pic
    }
}

export default connect(mapStateToProps, { updateUser, clearRedux })(Nav)