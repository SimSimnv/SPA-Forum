import React, {Component} from 'react'


class ChatRoomView extends Component {
    userClicked(user) {
        this.props.reloadPage(user._id, user.username)
    }

    render() {
        let that = this;
        let userBar = [];
        userBar.push(<div key={0} className="sidebar-user" onClick={function () {
            that.props.reloadPage('allchat')
        }}><b>Public chat</b></div>);
        let id = 1;
        for (let user of this.props.users) {
            userBar.push(<div key={id} onClick={function () {
                that.userClicked(user)
            }} className="sidebar-user">{user.username}</div>);
            id++;
        }

        return (
            <div className="chatroom-view">
                <div>
                    <h1>Chatroom</h1>
                    <div id="userSidebar">
                        {userBar}
                    </div>
                    {this.props.chatType}
                </div>
            </div>
        )
    }
}

export default ChatRoomView;