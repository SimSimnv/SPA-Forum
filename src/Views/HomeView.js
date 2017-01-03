import React, {Component} from 'react'
import SideBarView from './SideBarView';

class HomeView extends Component {
    render() {
        if(this.props.noLoggedUser){
            return(
                <div>
                    <h1>Home</h1>
                    <p>Welcome to the SPA-Forum, application created with javascript, React, jquery, ajax and Kinvey</p>
                </div>
            )
        }

        return (
            <div className="home-view">
                <SideBarView load={this.props.load} posts={this.props.posts}/>
                <h1>Home</h1>
                <p>Welcome to the SPA-Forum, application created with javascript, React, jquery, ajax and Kinvey</p>

            </div>
        )
    }

}

export default HomeView;