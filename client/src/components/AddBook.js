import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

class AddBook extends Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  displayAuthors() {
    var { getAuthorsQuery } = this.props;
    if (getAuthorsQuery.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return getAuthorsQuery.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  render() {
    const { name, genre, authorId } = this.state;
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select name="authorId" value={authorId} onChange={this.handleChange}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button onClick={this.handleSubmit}>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook);
