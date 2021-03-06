import React, { Component } from 'react';
import Table  from 'react-bootstrap/lib/Table';
import Label  from 'react-bootstrap/lib/Label';

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
        const cost_per_1000 = 0.5;
        const result = Math.round( viewsSum / videosSum * cost_per_1000);
        const result_30sec_promo_start = Math.round(result/6);
        const result_30sec_promo_end = Math.round(result/10);
        const result_product_placement = Math.round(result/4);

        const resultStr = "" + result;
        const resultNew = resultStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_30sec_promo_startStr = "" + result_30sec_promo_start;
        const result_30sec_promo_startNew = result_30sec_promo_startStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_30sec_promo_endStr = "" + result_30sec_promo_end;
        const result_30sec_promo_endNew = result_30sec_promo_endStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_product_placementStr = "" + result_product_placement;
        const result_product_placementNew = result_product_placementStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                                                            
        return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th><h4><Label bsStyle="default" bsSize="large">Тип рекламы</Label></h4></th>
                            <th><h4><Label bsStyle="default" bsSize="large">Стоимость,руб.</Label></h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><h4><Label bsStyle="info" bsSize="large">Заказной ролик</Label></h4></td>
                            <td><h4><Label bsStyle="success" bsSize="large"> {resultNew}</Label></h4></td>
                        </tr>
                        <tr>
                            <td><h4><Label bsStyle="info" bsSize="large">Интеграция</Label></h4></td>
                            <td><h4><Label bsStyle="success" bsSize="large">{result_product_placementNew}</Label></h4></td>
                        </tr>
                        <tr>
                            <td><h4><Label bsStyle="info" bsSize="large">Рекламное упоминание(начало)</Label></h4></td>
                            <td><h4><Label bsStyle="success" bsSize="large">{result_30sec_promo_startNew}</Label></h4></td>
                        </tr>
                        <tr>
                            <td><h4><Label bsStyle="info" bsSize="large">Рекламное упоминание(конец)</Label></h4></td>
                            <td> <h4><Label bsStyle="success" bsSize="large">{result_30sec_promo_endNew}</Label></h4></td>
                        </tr>
                    </tbody>
                </Table>
    );
    }
}




export default CostCalc;

