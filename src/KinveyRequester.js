import $ from 'jquery';

let KinveyRequester=(function(){
    const kinveyBaseUrl='https://baas.kinvey.com/';
    const kinveyAppKey='kid_B1CgsiCfx';
    const kinveyAppSecret='2b8a330f821f41ad97076b893bd348d0';
    const kinveyAppAuthHeaders={'Authorization':'Basic '+btoa(kinveyAppKey+':'+kinveyAppSecret)};

    function loginUser(username,password){
        return $.ajax({
            method:"POST",
            url:kinveyBaseUrl+'user/'+kinveyAppKey+'/login',
            data:{username,password},
            headers:kinveyAppAuthHeaders
        })
    }
    function registerUser(username,firstName,lastName,image,password){
        return $.ajax({
            method:"POST",
            url:kinveyBaseUrl+'user/'+kinveyAppKey,
            data:{username, firstName,lastName,image, password},
            headers:kinveyAppAuthHeaders
        })
    }
    function loadPosts(){
        return $.ajax({
            method:"GET",
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/posts',
            headers:getAuthHeaders()
        })
    }
    function createPost(title,author,body,date,tags){
        let postData={title,author,body,date,tags};
        return $.ajax({
            method:"POST",
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/posts',
            headers:getAuthHeaders(),
            data:postData
        })
    }
    function findPostById(postId){
        return $.ajax({
            method:"GET",
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/posts/'+postId,
            headers:getAuthHeaders()
        })
    }
    function editPost(postId,title,author,body,date,tags){
        let putData={title,author,body,date,tags};
        return $.ajax({
            method:"PUT",
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/posts/'+postId,
            headers:getAuthHeaders(),
            data:putData
        })
    }
    function deletePost(postId){
        return $.ajax({
            method:"DELETE",
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/posts/'+postId,
            headers:getAuthHeaders()
        })
    }
    
    
    function getAuthHeaders(){
        return {
            'Authorization':'Kinvey '+sessionStorage.getItem('authToken')
        }
    }

    function loadUsers(){
        return $.ajax({
            method:"GET",
            url:kinveyBaseUrl+'user/'+kinveyAppKey,
            headers:getAuthHeaders()
        })
    }
    function loadChat(){
        return $.ajax({
            method:"GET",
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/chatroom',
            headers:getAuthHeaders()
        })
    }
    function createChatMessage(messageText,targetId){
        let postData={
            author:sessionStorage.getItem('username'),
            body:messageText,
            target:targetId,
            posterId:sessionStorage.getItem('userId')
        };
        return $.ajax({
            method:"POST",
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/chatroom',
            data:postData,
            headers:getAuthHeaders()
        })
    }
    function findUserById(userId){
        return $.ajax({
            method:"GET",
            url:kinveyBaseUrl+'user/'+kinveyAppKey+'/'+userId,
            headers:getAuthHeaders()
        })
    }


    function editUser(userId, username, firstName, lastName, image){
        let userData = {username, firstName, lastName, image};
        return $.ajax({
            method:"PUT",
            url:kinveyBaseUrl+'user/'+kinveyAppKey +'/' + userId,
            headers:getAuthHeaders(),
            data:userData
        })
    }

    function getAllComments(){
        return $.ajax({
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/comments',
            headers:getAuthHeaders()
        })
    }

    function postComment(postId,commentBody,date,author) {
        let data = {postId:postId,body:commentBody,author:author,date:date};
        return $.ajax({
            method:'POST',
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/comments',
            headers:getAuthHeaders(),
            data:data
        })
    }

    function editComment(commentId,postId,commentBody,date,author) {
        let data = {postId:postId,body:commentBody,author:author,date:date};
        return $.ajax({
            method:'PUT',
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/comments/'+commentId,
            headers:getAuthHeaders(),
            data:data
        })
    }

    function deleteComment(commentId) {
        return $.ajax({
            method:'DELETE',
            url:kinveyBaseUrl+'appdata/'+kinveyAppKey+'/comments/'+commentId,
            headers:getAuthHeaders()
        })
    }

    return {loginUser,registerUser,loadPosts,createPost,findPostById,editPost,deletePost,loadUsers,
        findUserById,loadChat,createChatMessage,getAllComments,deleteComment,editComment,postComment,editUser}

})();

export default KinveyRequester;