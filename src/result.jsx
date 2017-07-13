import React, { Component } from 'react';

class ResultItem extends Component {
    render() {
        return <div className="col-sm-6" style={{padding: 0}}>
            <div className={this.props.left?"block left-block":"block right-block"}>
                <h4>{this.props.text}
                    <div style={{color: this.props.color}}>
                        <i className="fa fa-youtube" aria-hidden="true"></i>&nbsp;
                        <b>{this.props.result.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}</b>&nbsp;
                        <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                </h4>
            </div>
        </div>
    }
}

class ResultChanel extends Component {
    render() {
        return <div>
            <div className="block">
                <img className="img-response" src={this.props.result.img}/>
                <h3>Канал: {this.props.result.title}</h3>
                <h3>Прогноз охвата: {this.props.prognosis.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}</h3>
            </div>
        </div>
    }
}

class Result extends Component {
    render() {
        return <div className="container">
            <ResultChanel result={this.props.result} prognosis={this.props.prognosis}/>
            <ResultItem text="Видеоролик на канале" left={true} result={this.props.result.result} color="#ffd700"/>
            <ResultItem text="Интеграция в выпуск" left={false} result={this.props.result.result_product_placement} color="#c0c0c0"/>
            <ResultItem text="Упоминание в начале (20 сек.)" left={true} result={this.props.result.result_20sec_promo_start} color="#cd7f32"/>
            <ResultItem text="Упоминание в конце (20 сек.)" left={false} result={this.props.result.result_20sec_promo_end} color="#808000"/>
            <ResultItem text="Ссылка в описании (на 2 нед.)" left={true} result={this.props.result.result_ssylka_opis_2ned} color="#9b2d30"/>
            <ResultItem text="В избранное (на 2 нед.)" left={false} result={this.props.result.result_izbrannoe_2ned} color="#7f7679"/>
            <ResultItem text="Лайк + комментарий" left={true} result={this.props.result.result_likepluscomment_video} color="#30d5c8"/>
            <ResultItem text="Лайк" left={false} result={this.props.result.result_like_video} color="#50c878"/>
        </div>
    }
}

export default Result;