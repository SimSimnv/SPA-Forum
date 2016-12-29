import React, { Component } from 'react';

export default class CreateCommentView extends Component{
    render(){

        return <form className="formClass" id="createCommentForm" onSubmit={this.submitForm.bind(this)}>
            <label>
                <div>Comment:</div>
                <textarea name="body" rows="3"
                          ref={e => this.commentField = e} />
            </label>
            <div>
                <input type="submit" value="Create" />
            </div>
        </form>
    }
    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.commentField.value,this.props.postId,Date.now());
    }
}

