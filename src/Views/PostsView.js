import React, { Component } from 'react';

export default class PostsView extends Component {
    constructor(props){
        super(props);
        this.state={
            selected:'title',
            searchText:''
        }
    }
    selectChange(event){
        this.setState({selected: event.target.value});
    }
    textChange(event){
        this.setState({searchText: event.target.value.toLowerCase().trim()});
    }
    buttonClicked(){
        this.props.searchPosts(this.state.selected,this.state.searchText)
    }
    tagClicked(tagString){
        this.props.searchPosts('tag',tagString);
    }
    render() {
        let that=this;
        function tagBuilder(tagsArr){
            let tags=[];
            let id=0;
            for(let tagString of tagsArr){
                tags.push(<button className="tag my-btns hvr-grow" key={id} onClick={function(){that.tagClicked(tagString)}}>{tagString}</button>)
                id++;
            }
            return <span>{tags}</span>;
        }
        let postRows = this.props.posts.map(post =>
            <tr key={post._id}>
                <td>{that.props.cutText(post.title,20)}</td>
                <td>{post.author}</td>
                <td>{that.props.cutText(post.body,100)}</td>
                <td>{that.props.parseDate(post.date)}</td>
                <td>{tagBuilder(post.tags)}</td>
                {this.getActions(post, this.props.userId)}
            </tr>
        );
        return (
            <div className="posts-view">
                <h1>Posts</h1>
                <div className="search-bar">
                    Search by
                    <select className="hvr-grow search-post" onChange={this.selectChange.bind(this)} value={this.state.selected}>
                        <option className="options" value="title">Title</option>
                        <option className="options" value="author">Author</option>
                        <option className="options" value="tag">Tag</option>
                    </select>

                    <input type="text" className="hvr-grow search-post" onChange={this.textChange.bind(this)}></input>
                    <button className="my-btns hvr-pulse search-post" onClick={this.buttonClicked.bind(this)}>Search</button>
                </div>

                <table className="posts-table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Body</th>
                        <th>Date</th>
                        <th>Tags</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postRows}
                    </tbody>
                </table>
            </div>
        );
    }

    getActions(post, userId) {
        if (post._acl.creator === userId)
            return (
                <td>
                    <input type="button" value="Edit" className="my-btns hvr-grow"
                           onClick={this.props.editPostClicked.bind(this, post._id)} />
                    &nbsp;
                    <input type="button" value="Delete" className="my-btns hvr-grow"
                           onClick={this.props.deletePostClicked.bind(this, post._id)} />
                    &nbsp;
                    <input type="button" value="Details" className="my-btns hvr-grow"
                           onClick={this.props.getDetailsPostClicked.bind(this, post._id)} />
                </td>
            );
        else
            return <td> <input type="button" value="Details" className="my-btns hvr-grow"
                               onClick={this.props.getDetailsPostClicked.bind(this, post._id)} /></td>;
    }
}
