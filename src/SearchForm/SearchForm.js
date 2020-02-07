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
    let urls = [];

    for (let i = 1; i < 10; i++) {
      pagenum = i;
      urls.push(`https://swapi.co/api/people/?page=${pagenum}`);
    }

    let requests = urls.map(url => fetch(url));
    console.log(requests);

    Promise.all(requests)
      .then(responses => {
        for (let res of responses) {
          if (!res.ok) {
            throw new Error('there was an error!');
          }
        }
        return responses;
      })
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(pages => {
        pages.forEach(data => {
          let character = this.state.character.toLowerCase();
          data.results.map(person => {
            let casedPerson = person.name.toLowerCase();
            if (casedPerson.includes(character)) {
              foundPeople.push(person.name);
            }
          });
        });
      })
      .then(() => {
        this.setState({
          people: [...foundPeople],
          loading: false,
          character: ''
        });
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
                  return <li key={idx}>{person}</li>;
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
