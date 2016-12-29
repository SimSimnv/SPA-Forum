import React, { Component } from 'react';
import './NavigationBar.css';


class NavigationBar extends Component {
    render() {
        if(this.props.username==null) {
            return (
                <div className="navigation-bar">
                    <a href="#" onClick={this.props.homeClicked}>Home</a>
                    <a href="#" onClick={this.props.loginClicked}>Login</a>
                    <a href="#" onClick={this.props.registerClicked}>Register</a>
                </div>
            );
        }
        else{
            let that=this;
            return (
                <div className="navigation-bar">
                    <a href="#" onClick={this.props.homeClicked}>Home</a>
                    <a href="#" onClick={this.props.postsClicked}>Posts</a>
                    <a href="#" onClick={this.props.createPostClicked}>Create Post</a>
                    <a href="#" onClick={this.props.usersClicked}>Users</a>
                    <a href="#" onClick={function(){that.props.chatRoomClicked('allchat')}}>Chatroom</a>
                    <a href="#" onClick={this.props.logoutClicked}>Logout</a>
                    <span className="loggedInUser" onClick={this.userClicked.bind(this)}>
                        Welcome, {this.props.username}
                    </span>
                </div>
            );
        }
    }

    userClicked(){
        this.props.loadUser(sessionStorage.getItem('userId'));
    }
}

export default NavigationBar;