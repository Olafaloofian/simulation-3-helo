import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            search: "",
            showMyPosts: true,
            posts: []
        }

    this.updateSearch = this.updateSearch.bind(this)
    }

    updateSearch(val) {
        this.setState({
            search: val
        })
    }

    include() {
        this.setState({
            showMyPosts: !this.state.showMyPosts
        })
    }

    render() {
        return(
            <div>
                Dashboard
                <input type='text' placeholder='Search' onChange={(e) => this.updateSearch(e.target.value)} /> <button>Search</button><button>Reset</button><span>Show my posts:</span><input type="checkbox" onChange={() => this.include}/>
                <div>
                    {this.state.posts.map(prop => {
                        return(
                            <div key={prop.id}>
                                <div>{prop.title}</div>
                                <div>{prop.text}</div>
                                <div>{prop.username}</div>
                                <div><img src={prop.picture} alt=""/></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}