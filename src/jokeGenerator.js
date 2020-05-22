import React from 'react';
import Axios from 'axios';

import Joke from "./joke";

export default class JokeGenerator extends React.Component {
    state = {
        joke: null,
        loading: false
    };

    loadJoke = async () => {
        this.setState({ loading:true });

        const { data: { value: { joke }}} = await Axios.get("http://api.icndb.com/jokes/random");

        this.setState({ loading: false, joke });
    };

    render() {
        const { joke, loading } = this.state;

        return ( <React.Fragment>
            { !joke && <div>You haven't loaded any joke yet!</div>}
            {loading && <div>Loading...</div>}
            {joke && !loading && <Joke text = {joke} />}

            <button onClick={this.loadJoke} type="submit">
                Load a random joke
            </button>
        </React.Fragment>
        );
    }
 }

