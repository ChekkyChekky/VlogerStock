import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Top from './top'
import Result from './result'
import Feedback from './feedback'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: undefined
        }
        this.search = this.search.bind(this);
    }

    search(query) {
        var that = this;
        fetch(`/search?query=${query}`, { method: 'GET' })
            .then((response) => response.json())
            .then(function (responseJson) {
                that.setState({ result: responseJson });
            });
    }

    render() {
        if (this.state.result) {
            var result = <div>
                <Result result={this.state.result} />
                <Feedback />
            </div>
        }

        return <div>
            <Top search={query => this.search(query)} />
            {result}
        </div>
    }
}

ReactDOM.render(
    <div>
        <App />
    </div>,
    document.getElementById('root')
)