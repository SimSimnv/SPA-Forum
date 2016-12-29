import React, {Component} from 'react'

class PrivateChatView extends Component{
    constructor(){
        super();
        this.state={inputField:''}
    }
    render(){
        let chatMessages=this.props.messages.map((m,i)=><div className="message" key={i}><i>{m.author}</i> : {m.body}</div>);
        return(
            <div id="message-box">
                <h2>Chat with {this.props.name}</h2>
                <div id="chatMessages">{chatMessages}</div>
                <form className="message-form" onSubmit={this.submitForm.bind(this)}>
                    <label >
                        <div>Write message:</div>
                        <input type="text"  name="message" required
                               onChange={this.handleChange.bind(this)}
                               value={this.state.inputField}
                               ref={e => this.messageField = e} />
                    </label>
                    <div>
                        <input type="submit" className="my-btns hvr-pulse" value="Post" />
                    </div>
                </form>
            </div>
        )
    }
    handleChange(event){
        this.setState({inputField:event.target.value})
    }
    submitForm(event){
        event.preventDefault();
        this.props.onsubmit(this.messageField.value,this.props.target,this.props.name)
        this.setState({inputField:''})
    }
}

export default PrivateChatView;