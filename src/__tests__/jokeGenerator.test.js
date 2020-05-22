import React from 'react';
import { render, Simulate, wait } from "react-testing-library";
import "dom-testing-library/extend-expect";
import * as axios from "axios";
import MockAxios from "axios-mock-adapter";
import Joke from "../joke";
import JokeGenerator from "../jokeGenerator";
const mock = new MockAxios(axios, { delayResponse: Math.random() * 500 });

afterAll(() => mock.restore());

test ("Joke component receives props and then renders text", () => {
    //Renders Joke component with some text prop
    const { getByTestId } = render(
        <Joke text="The funniest joke this year." />
    );

    // Expects Joke component to render correct text.
    expect (getByTestId("joke-text")).toHaveTextContent(
        "The funniest joke this year."
    );
});

mock.onGet().replyOnce(200, {
    value: {
        joke: "Really funny joke!"
    }
});

test ("'JokeGenerator' component fetches a random joke a renders it", async () => {
    // Renderaing Jokegenerator component
    

    const { getByText, queryByTestId, queryByText } = render(<JokeGenerator />);

    await wait(() => expect(queryByText("Loading...")).not.toBeInTheDOM());
    expect (queryByTestId("joke-text")).not.toBeInTheDOM();


    expect (getByText("You haven't loaded any joke yet!")).toBeInTheDOM();


    
    Simulate.click(getByText("Load a random Joke"));
    expect(queryByText("You haven't loaded any joke yet!")).toBeInTheDOM();
    expect(queryByText("Loading...")).toBeInTheDOM();

});
   

