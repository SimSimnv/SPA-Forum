import React, { Component } from 'react';


class SideBarView extends Component {

    render() {
        
        let posts = this.props.posts.sort((a, b) => Number(b.date) - Number(a.date))
        let result = [];
        for (let i = 0; i < 5; i++) {
             result.push(posts[i])
        }

        let links = result.map(post =>
            <a href="#" key={post._id} onClick={this.props.load.bind(this, post._id)}>
                <p>{post.title}</p>
            </a>
        );


        return (
            <div id="sideBar">
                <p>Recent Posts:</p>
                {links}
            </div>
        );
    }

}

export default SideBarView;

/**
 * Created by gyurg on 06-Dec-16.
 */
