import React, {Component} from 'react'

export default class UserView extends Component {
    render() {
        let that=this;
        let userRows = this.props.users.map(user =>
            <tr key={user._id}>
                <td><a href="#" className="users-click" onClick={function(){that.props.userProfileClicked(user._id)}}>{user.username}</a></td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
            </tr>
        );

        return (
            <div className="user-view">
                <h1>Users</h1>
                <table className="users-table">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

