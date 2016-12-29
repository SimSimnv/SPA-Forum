import React, {Component} from 'react'

class EditUserProfileView extends Component{
    render(){
        return(
            <form className="edit-user-profile-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Redact profile</h1>
                <label>
                    <div>First Name:</div>
                    <input type="text" className="form-control hvr-grow" name="firstName" required
                           defaultValue={this.props.firstName}
                           ref={e => this.firstNameField = e}/>
                </label>
                <label>
                    <div>Last Name:</div>
                    <input type="text" className="form-control hvr-grow" name="lastName" required
                           defaultValue={this.props.lastName}
                           ref={e => this.lastNameField = e}/>
                </label>
                <label>
                    <div>Profile picture:</div>
                    <input type="text" className="form-control hvr-grow" name="picture-link"
                           defaultValue={this.props.image}
                           ref={e => this.pictureField = e}/>
                </label>
                <div>
                    <input type="submit" className="my-btns hvr-pulse" value="Change" />
                </div>
            </form>
        )
    }
    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.props.userId, this.props.username, this.firstNameField.value, this.lastNameField.value, this.pictureField.value)
    }
}

export default EditUserProfileView;