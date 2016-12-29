import React, { Component } from 'react';
import './SideBar.css';

class SideBar extends Component {

    render() {
        let links = this.props.books.map(book =>

            <a href="#" key={book._id} onClick={this.props.load.bind(this, book._id)}>
                <p>{book.title}</p>
            </a>
        )
        return (
            <div className="">
                <p>Last Posts:</p>
                {links}
            </div>
        );
    }

}

export default SideBar;/**
 * Created by gyurg on 06-Dec-16.
 */
