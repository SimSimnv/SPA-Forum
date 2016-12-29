import React, { Component } from 'react';

export default class EditCommentView extends Component{
    render(){
        return <form className="formClass single-comment-div"  onSubmit={this.submitForm.bind(this)}>
            <label>
                <div>Comment:</div>
                <textarea name="body"  rows="5" defaultValue={this.props.commentBody}
                          ref={e => this.commentField = e} />
            </label>
            <div>
                <input type="submit" value="Edit" />&nbsp;
                <input type ="button" value ="Cancel" onClick={this.props.cancelClicked}/>
            </div>
        </form>
    }
    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.props.commentId,this.commentField.value,this.props.postId,this.props.date);
    }
}