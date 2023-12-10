import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  handleChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value });
  };
  handleSubmit = evt => {
    const { searchQuery } = this.state;
    evt.preventDefault();
    if (!searchQuery.trim()) return alert('Fill the searchbar');
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <FiSearch size="10px" />
          </button>

          <input
            value={searchQuery}
            onChange={this.handleChange}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
