import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import HomeView from './Views/HomeView';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import PostsView from './Views/PostsView';
import CreatePostView from './Views/CreatePostView';
import EditPostView from './Views/EditPostView';
import DeletePostView from './Views/DeletePostView';
import DetailsPostView from './Views/DetailsPostView';
import UserView from './Views/UsersView';
import DetailsUserView from './Views/DetailsUserView';
import EditUserProfileView from './Views/EditUserProfileView';
import ChatRoomView from './Views/ChatRoomView';
import AllChatView from './Views/AllChatView'
import PrivateChatView from './Views/PrivateChatView'
import CreateCommentView from './Views/CreateCommentView';
import EditCommentView from './Views/EditCommentView';
import DeleteConfirmationView from './Views/DeleteConfirmationView';


import $ from 'jquery';
import KinveyRequester from './KinveyRequester'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: sessionStorage.getItem('username'),
            userId: sessionStorage.getItem('userId')
        }
    }

    componentDidMount(){
        $(document).on({
            ajaxStart:function(){$('#loadingBox').show()},
            ajaxStop:function(){$('#loadingBox').hide()}
        });
        $(document).ajaxError(this.handleAjaxError.bind(this));

        $('#errorBox').on('click',function(){$(this).hide()});
        $('#infoBox').on('click',function(){$(this).hide()});

        this.showHomeView()
    }

    render() {
      return (
        <div className="App">
          <header>
            <NavigationBar
                username={this.state.username}
                homeClicked={this.showHomeView.bind(this)}
                loginClicked={this.showLoginView.bind(this)}
                registerClicked={this.showRegisterView.bind(this)}
                postsClicked={this.showPostsView.bind(this)}
                createPostClicked={this.showCreatePostView.bind(this)}
                usersClicked={this.showUsersView.bind(this)}
                chatRoomClicked={this.showChatRoomView.bind(this)}
                logoutClicked={this.logout.bind(this)}
                loadUser={this.loadUsersDetails.bind(this)}
            />
            <div id="loadingBox">Loading...</div>
            <div id="errorBox">Error msg</div>
            <div id="infoBox">Info msg</div>
          </header>
          <div id="main"></div>
          <Footer />
        </div>
      );
    }

    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON &&
            response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 3000);
    }

    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }

    showView(reactComponent) {
        ReactDOM.render(
            reactComponent,
            document.getElementById('main')
        );
        $('#errorBox').hide();

    }


    showHomeView() {
        if(sessionStorage.getItem('userId')){
            KinveyRequester.loadPosts()
                .then(loadPostSuccess.bind(this));
            function loadPostSuccess(postsData) {
                //compare based on last modified time
                let posts = postsData.sort((postA, postB) => Number(postB.date) - Number(postA.date));
                this.showView(<HomeView
                    getDetailsPostClicked={this.loadPostDetails.bind(this)}
                    searchPosts={this.searchPosts.bind(this)}
                    load={this.loadPostDetails.bind(this)}
                    posts={posts}
                    finalPost={posts[0]}
                    cutText={this.cutText.bind(this)}
                    parseDate={this.parseDate.bind(this)}
                />)
            }    
        }
        else{
            this.showView(<HomeView noLoggedUser="true"/>)
        }
    }

    showLoginView() {
        this.showView(<LoginView onsubmit={this.login.bind(this)}/>)
    }

    showRegisterView() {
        this.showView(<RegisterView onsubmit={this.register.bind(this)}/>)
    }

    showPostsView() {
        KinveyRequester.loadPosts()
            .then(loadPostsSuccess.bind(this));
        function loadPostsSuccess(posts) {
            this.showInfo('Posts loaded.');
            posts=posts.sort((p1,p2)=>Number(p2.date)-Number(p1.date));
            this.showView(<PostsView
                posts={posts}
                userId={this.state.userId}
                editPostClicked={this.loadPostForEdit.bind(this)}
                deletePostClicked={this.loadPostForDelete.bind(this)}
                getDetailsPostClicked={this.loadPostDetails.bind(this)}
                searchPosts={this.searchPosts.bind(this)}
                cutText={this.cutText.bind(this)}
                parseDate={this.parseDate.bind(this)}
            />)
        }
    }
    showChatRoomView(targetId,targetName){

        let chatPromise=KinveyRequester.loadChat();
        let userPromise=KinveyRequester.loadUsers();

        Promise.all([chatPromise, userPromise])
            .then(loadChatSuccess.bind(this));

        function loadChatSuccess([messages,users]) {
            users = users.filter(u=>u.username !== sessionStorage.getItem('username'));
            if (targetId === 'allchat') {
                let publicMessages = messages.filter(m=>m.target === 'allchat');
                if (publicMessages.length > 15) {
                    publicMessages = publicMessages.slice(Math.max(publicMessages.length - 15, 1))
                }
                this.showView(<ChatRoomView reloadPage={this.showChatRoomView.bind(this)} users={users}
                                            chatType={<AllChatView onsubmit={this.createMessage.bind(this)}
                                                                   messages={publicMessages}/>}/>);
            }
            else {
                let privateMessages = messages
                    .filter(m=>m.target === targetId || m.target === sessionStorage.getItem('userId'))
                    .filter(m=>m.posterId === sessionStorage.getItem('userId') || m.posterId === targetId);
                if (privateMessages.length > 15) {
                    privateMessages = privateMessages.slice(Math.max(privateMessages.length - 15, 1))
                }
                this.showView(<ChatRoomView reloadPage={this.showChatRoomView.bind(this)} users={users}
                                            chatType={<PrivateChatView onsubmit={this.createMessage.bind(this)}
                                                                       name={targetName} target={targetId}
                                                                       messages={privateMessages}/>}/>);
            }

        }

    }

    showFilteredPostsView(posts) {
        this.showInfo('Posts loaded.');
        this.showView(<PostsView
            posts={posts}
            userId={this.state.userId}
            editPostClicked={this.loadPostForEdit.bind(this)}
            deletePostClicked={this.loadPostForDelete.bind(this)}
            getDetailsPostClicked={this.loadPostDetails.bind(this)}
            searchPosts={this.searchPosts.bind(this)}
            cutText={this.cutText.bind(this)}
            parseDate={this.parseDate.bind(this)}
        />)
    }

    showCreatePostView() {
        this.showView(<CreatePostView author={this.state.username} onsubmit={this.createPost.bind(this)}/>)
    }

    createPost(title, author, body, tags) {
        let date = Date.now();

        if (tags.length > 0) {
            tags = tags.split(',').map(tag=>tag.trim().toLowerCase());
        }

        KinveyRequester.createPost(title, author, body, date, tags)
            .then(createPostSuccess.bind(this));
        function createPostSuccess() {
            this.showInfo('Post created.');
            this.showPostsView();
        }
    }

    loadPostDetails(postId) {
        let that = this;
            let comments = [];
            KinveyRequester.getAllComments().then(function (data) {
                if (data.length > 0) {
                    comments = data.filter(x=>x.postId === postId);
                    comments.sort((a, b)=>new Date(Number(b.date)) - new Date(Number(a.date)));
                }
                KinveyRequester.findPostById(postId)
                    .then(findPostById.bind(that));
                function findPostById(post) {
                    that.showView(<DetailsPostView
                        deleteCommentClicked={that.showDeleteConfirmationView.bind(that)}
                        editCommentClicked={that.showEditCommentView.bind(that)}
                        makeCommentClicked={that.showCommentView.bind(that)}
                        userId={that.state.userId}
                        postId={post._id}
                        author={post.author}
                        title={post.title}
                        body={post.body}
                        date={that.parseDate(post.date)}
                        comments={comments}
                        getTime={that.getTimeFromDate}
                        parseDate={that.parseDate}
                    />)
                }

            });

    }

    loadPostForEdit(postId) {
        KinveyRequester.findPostById(postId)
            .then(findPostById.bind(this));
        function findPostById(post) {
            this.showView(<EditPostView
                postId={post._id}
                author={post.author}
                date={post.date}
                title={post.title}
                body={post.body}
                tags={post.tags}
                parseDate={this.parseDate.bind(this)}
                onsubmit={this.editPost.bind(this)}
            />)
        }
    }

    loadPostForDelete(postId) {
        KinveyRequester.findPostById(postId)
            .then(findPostById.bind(this));
        function findPostById(post) {
            this.showView(<DeletePostView
                postId={post._id}
                author={post.author}
                date={post.date}
                title={post.title}
                body={post.body}
                parseDate={this.parseDate}
                onsubmit={this.deletePost.bind(this)}
            />)
        }
    }

    deletePost(postId) {
        KinveyRequester.deletePost(postId)
            .then(deletePostSuccess.bind(this));
        function deletePostSuccess() {
            this.showInfo('Post deleted.');
            this.showPostsView();
        }
    }

    editPost(postId, title, author, body, date, tags) {
        if (tags.length > 0) {
            tags = tags.split(',').map(tag=>tag.trim().toLowerCase());
        }
        KinveyRequester.editPost(postId, title, author, body, date, tags)
            .then(editPostSuccess.bind(this));
        function editPostSuccess() {
            this.showInfo('Post edited.');
            this.showPostsView();
        }
    }

    createMessage(messageText, targetId, targetName) {

        KinveyRequester.createChatMessage(messageText, targetId)
            .then(createMessageSuccess.bind(this))
        function createMessageSuccess() {
            this.showChatRoomView(targetId, targetName);
        }
    }

    login(username, password) {
        KinveyRequester.loginUser(username, password)
            .then(loginSuccess.bind(this));
        function loginSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showInfo('Login successful.');
            this.showPostsView();
        }
    }

    register(username,firstName,lastName,image,password){
        KinveyRequester.registerUser(username,firstName,lastName,image,password)
            .then(registerSuccess.bind(this));
        function registerSuccess(userInfo) {
            this.saveAuthInSession(userInfo);
            this.showInfo('Register successful.');
            this.showPostsView();
        }
    }

    logout() {
        sessionStorage.clear();
        this.setState({
            username: null,
            userId: null
        })
        this.showInfo('Logout successful.')
        this.showHomeView();
    }

    saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);

        this.setState({
            username: userInfo.username,
            userId: userInfo._id
        })
    }

    searchPosts(searchVal, searchText) {
        KinveyRequester.loadPosts()
            .then(loadPostsSuccess.bind(this));
        function loadPostsSuccess(posts) {
            switch (searchVal) {
                case 'author':
                    posts = posts.filter(post=>post.author.toLowerCase().indexOf(searchText) !== -1);
                    this.showFilteredPostsView(posts);
                    break;
                case 'title':
                    posts = posts.filter(post=>post.title.toLowerCase().indexOf(searchText) !== -1);
                    this.showFilteredPostsView(posts);
                    break;
                case 'tag':
                    posts = posts.filter(post=>post.tags.indexOf(searchText) !== -1);
                    this.showFilteredPostsView(posts);
                    break;
                default: break;
            }
        }
    }


    parseDate(dateString) {
        let date = new Date(Number(dateString));
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    cutText(text, maxLength) {
        if (text.length > maxLength)
            text = text.substr(0, maxLength) + '...'
        return text;
    }

    showUsersView() {
        KinveyRequester.loadUsers()
            .then(loadUsersSuccess.bind(this));
        function loadUsersSuccess(users) {
            this.showInfo('Users loaded.');
            this.showView(<UserView
                users={users}
                userProfileClicked={this.loadUsersDetails.bind(this)}
            />)
        }
    }

    loadUsersDetails(userId){

        let userPromise=KinveyRequester.findUserById(userId);

        let postsPromise=KinveyRequester.loadPosts();

        Promise.all([userPromise,postsPromise])
            .then(loadUserPostsSuccess.bind(this));

        function loadUserPostsSuccess([user,postsData]) {
            let usernameVal = user.username;
            let firstNameVal = user.firstName;
            let lastNameVal = user.lastName;
            let imageVal = user.image;
            let user_id=user._id;

            let arrPosts = [];
            for(let post of postsData){
                if(post._acl.creator === userId){
                    arrPosts.push(post);
                }
            }
            this.showView(<DetailsUserView
                username={usernameVal}
                firstName={firstNameVal}
                lastName={lastNameVal}
                image={imageVal}
                posts={arrPosts}
                userId={user_id}
                editUser={this.loadUserForEdit.bind(this)}
                getDetailsPostClicked={this.loadPostDetails.bind(this)}
            />)
        }

    }

    loadUserForEdit(userId){
        KinveyRequester.findUserById(userId)
            .then(findUserByIdSuccess.bind(this));
        function findUserByIdSuccess(user){
            this.showView(<EditUserProfileView
                userId={user._id}
                username={user.username}
                firstName={user.firstName}
                lastName={user.lastName}
                image={user.image}
                onsubmit={this.editUser.bind(this)}
            />)
        }

    }
    editUser(userId,username,firstName,lastName,image){
        KinveyRequester.editUser(userId,username,firstName,lastName,image)
            .then(editUserSuccess.bind(this));
        function editUserSuccess(){
            this.showInfo('Edit successful.');
            this.loadUsersDetails(userId);
        }
    }

    //comment functions


    showCommentView(postId) {
        if(document.getElementById('createCommentForm')){
            ReactDOM.unmountComponentAtNode(document.getElementById('createCommentDiv'));
        }
        else {
            let view = <CreateCommentView
                postId={postId}
                onsubmit={this.postComment.bind(this)}
            />;
            ReactDOM.render(view, document.getElementById('createCommentDiv'));
        }
    }

    postComment(commentBody, postId, date) {
        if(commentBody.length>500){
            let response={responseJSON:{description:"Comment must be no longer than 500 symbols"}};
            this.handleAjaxError("",response)
        }else {
            let that = this;
            KinveyRequester.postComment(postId, commentBody, date, this.state.username).then(
                // this.loadPostDetails(postId))
                function () {
                    ReactDOM.unmountComponentAtNode(document.getElementById('createCommentDiv'));
                    that.loadPostDetails(postId);
                }
            )
        }
    }

    showDeleteConfirmationView(commentId, commentBody, postId) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
            let view = <DeleteConfirmationView
                postId={postId}
                commentId={commentId}
                commentBody={commentBody}
                yesClicked={this.deleteComment.bind(this)}
                cancelClicked={this.cancelConfirmation}
            />;
            ReactDOM.render(view, document.getElementById('createCommentDiv'));


    }

    cancelConfirmation() {
    ReactDOM.unmountComponentAtNode(document.getElementById('createCommentDiv'));
}

    deleteComment(commentId, postId) {
        let that = this;
        KinveyRequester.deleteComment(commentId).then(function () {
            ReactDOM.unmountComponentAtNode(document.getElementById('createCommentDiv'));
            that.loadPostDetails(postId);
        })
    }


    showEditCommentView(commentId, postId, commentBody, date) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
            let view = <EditCommentView
                cancelClicked={this.cancelConfirmation}
                date={date}
                postId={postId}
                commentId={commentId}
                commentBody={commentBody}
                onsubmit={this.editComment.bind(this)}
            />;
            ReactDOM.render(view, document.getElementById('createCommentDiv'));
    }

    editComment(commentId, commentBody, postId, date) {
        if(commentBody.length>700) {
            let response = {responseJSON: {description: "Comment must be no longer than 500 symbols"}};
            this.handleAjaxError("", response)
        }else {
            let that = this;
            KinveyRequester.editComment(commentId, postId, commentBody, date, this.state.username).then(
                // this.loadPostDetails(postId))
                function () {
                    ReactDOM.unmountComponentAtNode(document.getElementById('createCommentDiv'));
                    that.loadPostDetails(postId);
                }
            )
        }
    }

    getTimeFromDate(dateString) {
        let date = new Date(Number(dateString));
        let hours = "0" + date.getHours();
        let minutes = "0" + date.getMinutes();
        return `${hours.slice(-2)}:${minutes.slice(-2)}`
    }

}

export default App;