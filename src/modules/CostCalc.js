import React, { Component } from 'react';
import Table  from 'react-bootstrap/lib/Table';
import Label  from 'react-bootstrap/lib/Label';

class CostCalc extends Component{

    constructor(props) {
        super();

        this.state = {
            viewsSum: props.viewsSum,
            videosSum: props.videosSum,
            commentsSum: props.commentsSum,
            subsSum: props.subsSum,
            bmHumor: false
        };
    }

    render(){
        const {viewsSum, videosSum,commentsSum, subsSum, bmHumor} = this.props
        const cost_per_1000 = 0.5;
        let result = 0;

        if(videosSum!=0)
        {
            result = Math.round( viewsSum / videosSum * cost_per_1000);
            if( viewsSum / videosSum > 300.000 )
            {
                result = result / 2;
            }
        }
        else
        {
            result = subsSum * cost_per_1000;
        }
    /*    const interest = (commentsSum * 100) / viewsSum;
        const interest_growth = interest * subsSum;
        const interest_coeff = Math.pow(2.71, interest - 5); // interest coefficient
        console.log(interest_coeff, interest_growth, interest);
        //const upgrade_of_base_subscribe = (viewsSum / videosSum) - subsSum;
        //console.log(upgrade_of_base_subscribe);
        //const views_videos_subsribe_koeff = Math.pow(1.01, upgrade_of_base_subscribe);
        const prognoz_views = subsSum + interest_growth;
       // const prognoz_views = viewsSum * videosSum;
       console.log(interest_coeff, prognoz_views);
        result = prognoz_views * interest_coeff * cost_per_1000;*/


        const result_30sec_promo_start = Math.round(result/5.1);
        const result_product_placement = Math.round(result/3.5);
        const result_30sec_promo_end = Math.round(result/7.6);
        const result_ssylka_opis_2ned = Math.round(result/16);
        const result_izbrannoe_2ned = Math.round(result/20);
        const result_likepluscomment_video = Math.round(result/83.6);
        const result_like_video = Math.round(result/125.1);
        

        const resultStr = "" + result;
        const resultNew = resultStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_30sec_promo_startStr = "" + result_30sec_promo_start;
        const result_30sec_promo_startNew = result_30sec_promo_startStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_30sec_promo_endStr = "" + result_30sec_promo_end;
        const result_30sec_promo_endNew = result_30sec_promo_endStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_product_placementStr = "" + result_product_placement;
        const result_product_placementNew = result_product_placementStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_ssylka_opis_2nedStr = "" + result_ssylka_opis_2ned;
        const result_ssylka_opis_2nedNew = result_ssylka_opis_2nedStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_izbrannoe_2nedStr = "" + result_izbrannoe_2ned;
        const result_izbrannoe_2nedNew = result_izbrannoe_2nedStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_likepluscomment_videoStr = "" + result_likepluscomment_video;
        const result_likepluscomment_videoNew = result_likepluscomment_videoStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        const result_like_videoStr = "" + result_like_video;
        const result_like_videoNew = result_like_videoStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                                                            
        return (
                <Table responsive>
                    <thead>
                        <tr>
                            <th><h4><Label bsStyle="default" bsSize="sm">Тип рекламы</Label></h4></th>
                            <th><h4><Label bsStyle="default" bsSize="sm">Стоимость,руб.</Label></h4></th>
                        </tr>
                    </thead>

                        
                        {!bmHumor ?
                                (
                                <tbody>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Заказной ролик</Label></h4></td>
                                        <td><h4><Label bsStyle="success" bsSize="sm"> {resultNew}</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Интеграция</Label></h4></td>
                                        <td><h4><Label bsStyle="success" bsSize="sm">{result_product_placementNew}</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Упоминание в начале 15 сек.</Label></h4></td>
                                        <td><h4><Label bsStyle="success" bsSize="sm">{result_30sec_promo_startNew}</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Упоминание в конце 15 сек.</Label></h4></td>
                                        <td> <h4><Label bsStyle="success" bsSize="sm">{result_30sec_promo_endNew}</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Ссылка в описании, 2 нед.</Label></h4></td>
                                        <td> <h4><Label bsStyle="success" bsSize="sm">{result_ssylka_opis_2nedNew}</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">В избранное на 2 нед.</Label></h4></td>
                                        <td> <h4><Label bsStyle="success" bsSize="sm">{result_izbrannoe_2nedNew}</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Лайк + комментарий.</Label></h4></td>
                                        <td> <h4><Label bsStyle="success" bsSize="sm">{result_likepluscomment_videoNew}</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Лайк</Label></h4></td>
                                        <td> <h4><Label bsStyle="success" bsSize="sm">{result_like_videoNew}</Label></h4></td>
                                    </tr>
                                </tbody>
                                )
                            :
                            (
                                <tbody>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Заказной ролик</Label></h4></td>
                                        <td><h4><Label bsStyle="danger" bsSize="sm"> бесценно</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Интеграция</Label></h4></td>
                                        <td><h4><Label bsStyle="danger" bsSize="sm">бесценно</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Рекламное упоминание (начало)</Label></h4></td>
                                        <td><h4><Label bsStyle="danger" bsSize="sm">бесценно</Label></h4></td>
                                    </tr>
                                    <tr>
                                        <td><h4><Label bsStyle="info" bsSize="sm">Рекламное упоминание (конец)</Label></h4></td>
                                        <td> <h4><Label bsStyle="danger" bsSize="sm">бесценно</Label></h4></td>
                                    </tr>
                                </tbody>
                            )
                        }
                </Table>
    );
    }
}




export default CostCalc;

