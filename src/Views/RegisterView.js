import React, {Component} from 'react'

class RegisterView extends Component{
    render(){
        return(
            <form className="register-form my-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Register</h1>
                <label>
                    <div>Username:</div>
                    <input type="text" className="form-control hvr-grow" name="username" required ref={e=>this.usernameField=e}/>
                </label>
                <label>
                    <div>First Name:</div>
                    <input type="text" className="form-control hvr-grow" name="firstName" required ref={e=>this.firstNameField=e}/>
                </label>
                <label>
                    <div>Last Name:</div>
                    <input type="text" className="form-control hvr-grow" name="lastName" required ref={e=>this.lastNameField=e}/>
                </label>
                <label>
                    <div>Profile image:</div>
                    <input type="text" className="form-control hvr-grow" name="profileImage"  ref={e=>this.profileImageField=e}/>
                </label>
                <label>
                    <div>Password:</div>
                    <input type="password" className="form-control hvr-grow" name="password" required ref={e=>this.passwordField=e}/>
                </label>
                <div>
                    <input type="submit" className="my-btns hvr-pulse" value="Register"/>
                </div>
            </form>
        )
    }
    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.usernameField.value, this.firstNameField.value, this.lastNameField.value, this.profileImageField.value, this.passwordField.value)
    }
}

export default RegisterView;