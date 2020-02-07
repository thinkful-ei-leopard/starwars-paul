import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      character: '',
      people: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    this.setState({
      loading: true
    });

    const url = `https://swapi.co/api/people`;
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('there was an error!');
        }
        return res.json();
      })
      .then(data => {
        let foundPeople = [];
        console.log(data);
        data.results.map(person => {
          foundPeople.push(person.name);
        });
        this.setState({
          people: [...foundPeople],
          loading: false
        })
      });
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      character: event.target.value
    });
  };

  render() {
    let { people } = this.state;

    return (
      <div className="search-form-results">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="character-search">Search character: </label>
          <input
            type="text"
            name="character"
            placeholder="Han Solo"
            id="character-search"
            value={this.state.character}
            onChange={this.handleChange}
          />

          <button onClick={this.handleSubmit}>submit</button>
        </form>

        <div className="results">
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <ul>

              {people.map(person => {
                return <li>{person}</li>
              })}
              </ul>
              

              {/* {console.log(people)} */}
              
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchForm;
