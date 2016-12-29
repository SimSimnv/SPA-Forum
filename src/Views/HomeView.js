import React, {Component} from 'react'
import SideBarView from './SideBarView';

class HomeView extends Component {
    render() {
        if(this.props.noLoggedUser){
            return(
                <div>
                    <h1>Home</h1>
                    <p>Welcome to the SoftUni project Blog, a single page application created with javascript, React, jquery, ajax and Kinvey</p>
                </div>
            )
        }

        let that = this;
        function tagBuilder(tagsArr){
            let tags=[];
            let id=0;
            for(let tagString of tagsArr){
                tags.push(<button className="tag my-btns hvr-grow" key={id} onClick={function(){that.tagClicked(tagString)}}>{tagString}</button>)
                id++;
            }
            return <span>{tags}</span>;
        }
        let postRows =
        <table>
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
                <tr key={that.props.finalPost._id}>
                    <td>{that.props.cutText(that.props.finalPost.title,20)}</td>
                    <td>{that.props.finalPost.author}</td>
                    <td>{that.props.cutText(that.props.finalPost.body,100)}</td>
                    <td>{that.props.parseDate(that.props.finalPost.date)}</td>
                    <td>{tagBuilder(that.props.finalPost.tags)}</td>
                    <td><input type="button" value="Details" className="my-btns hvr-grow"
                               onClick={this.props.getDetailsPostClicked.bind(this, that.props.finalPost._id)} /></td>
                </tr>
            </tbody>
        </table>
        ;

        return (
            <div className="home-view">
                <SideBarView load={this.props.load} posts={this.props.posts}/>
                <h1>Home</h1>
                <p>Welcome to the SoftUni project Blog, a single page application created with javascript, React, jquery, ajax and Kinvey</p>
                <div>
                    <h3>
                        Latest post
                    </h3>
                    <span>

                        {postRows}
                    </span>
                </div>
            </div>
        )
    }
    tagClicked(tagString){
        this.props.searchPosts('tag',tagString);
    }

}

export default HomeView;