import React, { Component } from 'react';

class CostCalc extends Component{

    constructor(props) {
        super();

        this.state = {
            viewsSum: props.viewsSum,
            videosSum: props.videosCount
        };
    }

    render(){
        const {viewsSum, videosSum} = this.props
        const cost_per_1000 = 0.25;
        const result = Math.round( viewsSum / videosSum * cost_per_1000);
    
        
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
                        <h3> Заказной ролик:</h3><div> {result} руб </div>            
                    </div>                       
                </div>
                <div className = "row">
                    <div>
                        <h3>Продакт-плейсмент:</h3><div> {result_product_placement} руб</div>
                    </div>
                </div>
                <div className = "row">
                    <div>
                        <h3> Промо 30 секунд в начале:</h3><div>  {result_30sec_promo_start} руб</div>
                    </div>
                </div>
                <div className = "row">
                    <div>
                        <h3> Промо 30 секунд в конце:</h3><div> {result_30sec_promo_end} руб</div>
                    </div>
                </div>
        </div>
    );
    }
}

export default CostCalc;