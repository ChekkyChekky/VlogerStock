import React, { Component } from 'react';

class ResultItem extends Component {
    render() {
        if(this.props.result != undefined) {
            var result = <h1 style={{color: this.props.color}}>
                    <i className="fa fa-youtube" aria-hidden="true"></i>&nbsp;
                    <b>{this.props.result.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}</b>&nbsp;
                    <i className="fa fa-rub" aria-hidden="true"></i>
                </h1>
        }
        return <div>
            <div className="container block">
                <img className="img-response" src={this.props.img}/>
                <h1>{this.props.text}</h1>
                {result}
            </div>
        </div>
    }
}

class Result extends Component {
    render() {
        return <div>
            <ResultItem img={this.props.result.img} text={"Канал: " + this.props.result.title} />
            <ResultItem img="img/1.jpg" text="Видеоролик на канале" result={this.props.result.result} color="#ffd700"/>
            <ResultItem img="img/2.jpg" text="Интеграция в выпуск" result={this.props.result.result_product_placement} color="#c0c0c0"/>
            <ResultItem img="img/3.jpg" text="Упоминание в начале (20 сек.)" result={this.props.result.result_20sec_promo_start} color="#cd7f32"/>
            <ResultItem img="img/4.jpg" text="Упоминание в конце (20 сек.)" result={this.props.result.result_20sec_promo_end} color="#808000"/>
            <ResultItem img="img/5.jpg" text="Ссылка в описании (на 2 нед.)" result={this.props.result.result_ssylka_opis_2ned} color="#9b2d30"/>
            <ResultItem img="img/6.png" text="В избранное (на 2 нед.)" result={this.props.result.result_izbrannoe_2ned} color="#7f7679"/>
            <ResultItem img="img/7.png" text="Лайк + комментарий" result={this.props.result.result_likepluscomment_video} color="#30d5c8"/>
            <ResultItem img="img/8.png" text="Лайк" result={this.props.result.result_like_video} color="#50c878"/>
        </div>
    }
}

export default Result;