import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      character: '',
      people: [],
      nameError: '',
      characterError: ''
    };
  }

  validate = () => {
    let nameError = '';
    if (this.state.character.length === 0) {
      nameError = 'please enter a character';
    }
    if (nameError) {
      this.setState({ nameError });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    let isValid = this.validate();
    if (!isValid) {
      return;
    }

    this.setState({
      loading: true
    });

    let foundPeople = [];
    let {character} = this.state;

    let testUrl = `https://swapi.co/api/people/?search=${character}`;

    fetch(testUrl)
    .then(res => {
      if(!res.ok) {
        throw new Error ('there was an error!')
      }
      return res.json();
    })
    .then(data => {
      console.log(data.results);
      if (data.results.length === 0) {
        this.setState({
          characterError: 'character not found!'
        })
        console.log(this.state.characterError);
      } else {
      data.results.map(person => {
        let casedPerson = person.name.toLowerCase();
         if (casedPerson.includes(character)) {
          return foundPeople.push({name: person.name, mass: person.mass });
        }
        return null;
      })
    }
        console.log(foundPeople);
        return null;
    })
  .then(() => {
    this.setState({
      people: [...foundPeople],
      loading: false,
      character: ''
    })
  })
  .catch(err => console.log(err.message))

}

  handleChange = event => {
    console.log(event.target.value);
    this.setState({
      character: event.target.value,
      nameError: '',
      characterError: ''
    });
  };

  render() {
    let { people, character, characterError } = this.state;

    return (
      <div className="search-form-results">
        <div className="search-error">{this.state.nameError}</div>

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
            <div className="loading">Loading...</div>
          ) : (
            <div>
              <ul>
                {characterError ? <li> character not found!</li> : people.map((person, idx) => {
                  return <li key={idx}>{person.name} weighs {person.mass > 0 ? Math.round((person.mass * 2.20462)) : '???'} lbs</li>;
                })}
                {/* {character.toLowerCase().includes('kuhn') ? <li>Bennett Kuhn weighs 500000 lbs fucking fatass!!!</li> : null}
                {character.toLowerCase().includes('clark') ? <li>Lee Clarke weighs 1 lb because all he eats is oatmeal</li> : null} */}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchForm;
