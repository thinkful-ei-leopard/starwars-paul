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

    let foundPeople = [];
    let pagenum;

    for (let i = 1; i < 10; i++) {
      pagenum = i;

      const url = `https://swapi.co/api/people/?page=${pagenum}`;

      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw new Error('there was an error!');
          }
          return res.json();
        })
        .then(data => {
          let character = this.state.character.toLowerCase();
          data.results.map(person => {
            let casedPerson = person.name.toLowerCase();
            if (casedPerson.includes(character)) {
              foundPeople.push(person.name)
            };
          });
          console.log(foundPeople);
        })
        .then(() => {
          this.setState({
            people: [...foundPeople],
            loading: false
          });
        })
    }
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
            autoComplete="off"
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
                {people.map((person, idx) => {
                  return (
                  <li key={idx}>{person}
                  </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchForm;
