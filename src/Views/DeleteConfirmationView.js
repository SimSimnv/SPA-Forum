import React, { Component } from 'react';

export default class DeleteConfirmationView extends Component{
    render(){
        let commentId = this.props.commentId;
        let postId=this.props.postId;
        return <div className="confirmationView" id="deleteConfirmationBox">
            <h3>Do you want to delete this comment?</h3>
            <textarea className="single-comment-div" value={this.props.commentBody} disabled/><br/>
            <input type="button" className="commentButton" value="Yes"
                   onClick={this.props.yesClicked.bind(this,commentId,postId)}/> &nbsp;
            <input type="button" className="commentButton" value="Cancel"
                onClick={this.props.cancelClicked}/>
        </div>
    }

}
