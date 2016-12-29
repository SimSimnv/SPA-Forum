import React, {Component} from 'react'

class DeletePostView extends Component{
    render(){
        return(
            <form className="delete-post-form my-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Confirm Post Delete</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} disabled/>
                </label>
                <label>
                    <div>Author:</div>
                    <input type="text" name="author" required
                           defaultValue={this.props.author}
                           ref={e => this.authorField = e} disabled />
                </label>
                <label>
                    <div>Posted on:</div>
                    <input type="text" name="date" required
                           defaultValue={this.props.parseDate(this.props.date)} disabled />
                </label>
                <label>
                    <div>Body:</div>
                    <textarea name="body" rows="10"
                              defaultValue={this.props.body}
                              ref={e => this.bodyField = e} disabled />
                </label>
                <div>
                    <input className="my-btns hvr-pulse" type="submit" value="Delete" />
                </div>
            </form>
        )
    }
    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.props.postId)
    }
}

export default DeletePostView;