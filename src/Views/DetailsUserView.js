import React, {Component} from 'react'

class DetailsUserView extends Component {
    render() {
        let postRows=<div>{this.props.username} doesn't have posts</div>;

        if(this.props.posts.length>0) {
            postRows = this.props.posts.map(post =>
                <a key={post._id} href="#" className="users-click post-user-back"
                   onClick={this.props.getDetailsPostClicked.bind(this, post._id)}>{post.title}</a>
            );
        }

        let username = this.props.username;
        let firstName = this.props.firstName;
        let lastName = this.props.lastName;
        let image = this.props.image;
        if(image==undefined){
            image = "http://www.therealtyclub.com/public/images/realty_club/no_logo.svg";
        }

        let editButton=<div></div>;
        if(this.props.userId==sessionStorage.getItem('userId')){
            editButton=<button onClick={this.editUserButtonClicked.bind(this)}>Edit user</button>;
        }

        return (
            <div className="main-container">
                <div className="row">
                    <div className="col-sm-10 col-sm-offset-1">
                        <div className="col-md-offset-0 col-sm-offset-1 col-md-10 col-sm-6">
                            <div className="card-container">
                                <div className="card">
                                    <div className="front">
                                        <div className="cover">
                                            <img src="http://i.imgur.com/8CkzoaL.png"/>
                                        </div>
                                        <div className="user">
                                            <img className="img-circle" src={image}/>
                                        </div>
                                        <div className="content text-center">
                                            <div className="main">
                                                <h3 className="name">{username}</h3>
                                                <h5><i className="fa fa-building-o fa-fw text-muted"></i>Fullname: {firstName} {lastName}</h5>
                                                <h5><i className="fa fa-envelope-o fa-fw text-muted"></i>Posts count: {this.props.posts.length}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="back">
                                        <div className="header">
                                            <h2 className="motto">Posts</h2>
                                        </div>
                                        <div className="content">
                                            <div className="main">
                                                <h4 className="text-center">{postRows}</h4>
                                                {editButton}
                                            </div>
                                        </div>
                                        <div className="footer">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    noPic(){
        alert('asd')
    }
    editUserButtonClicked(){
        this.props.editUser(this.props.userId);
    }

}

export default DetailsUserView;

