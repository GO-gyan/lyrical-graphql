import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { content: '' }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    changeHandler(event) {
        this.setState({content: event.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        }).then(() => this.setState({content: ''}));
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add a lyric</label>
                <input 
                    type="text" 
                    name="lyric" 
                    value={this.state.content} 
                    onChange={this.changeHandler}
                />
            </form>
        )
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;
export default graphql(mutation)(LyricCreate);