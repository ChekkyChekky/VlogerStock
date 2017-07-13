import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Top from './top'
import Search from './search'
import Result from './result'
import Feedback from './feedback'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: undefined,
            prognosis: ''
        }
        this.search = this.search.bind(this);
    }

    search(query) {
        var that = this;
        fetch(`/search?query=${query}`, { method: 'GET' })
            .then((response) => response.json())
            .then(function (responseJson) {
                that.setState({ prognosis: '' });
                return that.setState({ result: responseJson });
            })
            .then(function(result) {
                fetch(`/prognosis?id=${that.state.result.id}`, { method: 'GET' })
                    .then((response) => response.json())
                    .then(function (responseJson) {
                        console.log(responseJson.result);
                        if(responseJson.result == -1) {
                            that.setState({ prognosis: (that.state.result.result*1.6).toFixed() });
                        } else {
                            that.setState({ prognosis: responseJson.result });
                        }
                    });
            });        
    }

    render() {
        if (this.state.result) {
            var result = <div>
                <Result result={this.state.result} prognosis={this.state.prognosis}/>
                <Feedback title={this.state.result.title}/>
            </div>
        }

        return <div>
            <Top search={query => this.search(query)} />
            <Search search={query => this.search(query)} />
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