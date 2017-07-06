import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import Advert from './Advert.jsx'
import IndexComp from './Index.jsx'



class App extends Component {

    componentWillMount(){
        if(document.getElementById('index_id') != undefined){
            this.setState({pageIndex: true});
        }
        else{
            this.setState({pageIndex: false});
        }
    }

    constructor(props) {
        super();

        this.state = {
            pageIndex: true,
        
        };
    }


   

    render() {
    const {pageIndex} = this.state;
    
     return (
            <div>
                {pageIndex ?
                    (
                    <IndexComp
                    />
                    ) : 
                    <Advert
                    />
                } 
            </div>
            );

    }
}



ReactDOM.render(
    <App />,
    document.getElementById("container")
)

