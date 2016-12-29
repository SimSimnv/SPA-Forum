import React, {Component} from 'react'

class LoginView extends Component{
    render(){
        return(
            <form className="login-form my-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Login</h1>
                <label>
                    <div>Username:</div>
                    <input type="text" className="form-control hvr-grow" name="username" required ref={e=>this.usernameField=e}/>
                </label>
                <label>
                    <div>Password:</div>
                    <input type="password" className="form-control hvr-grow" name="password" required ref={e=>this.passwordField=e}/>
                </label>
                <div>
                    <input type="submit" className="my-btns hvr-pulse" value="Login"/>
                </div>
            </form>
        )
    }
    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.usernameField.value,this.passwordField.value)
    }
}

export default LoginView;