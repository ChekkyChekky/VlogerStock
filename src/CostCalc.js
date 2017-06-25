import React, { Component } from 'react';

class CostCalc extends Component{

    constructor(props) {
        super();

        this.state = {
            likesSum: props.likesSum,
            viewsSum: props.viewsSum,
            commentsSum: props.commentsSum,
            subscriberSum: props.subscriberSum,
            videosSum: props.videosCount
        };
    }

    render(){
        const {likesSum, viewsSum, commentsSum, subscriberSum, videosSum} = this.props
        const cost_per_1000 = 30;
        const result = Math.round( viewsSum / videosSum * cost_per_1000 / 1000);
    
        
        const result_30sec_promo_start = Math.round(result/6);
        const result_30sec_promo_end = Math.round(result/10);
        const result_product_placement = Math.round(result/4);
                                                            
        return (
        <div className = "container">
                <div className = "row">
                    <h1>Оценка стоимости рекламы на Youtube</h1>
                </div>
                <div className = "row">
                    <div>
                        <h3> Целиковый ролик:</h3><div> {result} тыс. руб </div>            
                    </div>                       
                </div>
                <div className = "row">
                    <div>
                        <h3> Промо 30 секунд в начале:</h3><div>  {result_30sec_promo_start} тыс. руб</div>
                    </div>
                </div>
                <div className = "row">
                    <div>
                        <h3>Продакт-плейсмент:</h3><div> {result_product_placement} тыс. руб</div>
                    </div>
                </div>
                <div className = "row">
                    <div>
                        <h3> Промо 30 секунд в конце:</h3><div> {result_30sec_promo_end} тыс. руб</div>
                    </div>
                </div>
        </div>
    );
    }
}

export default CostCalc;