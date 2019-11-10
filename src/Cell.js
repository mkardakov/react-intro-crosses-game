import React from 'react';

export default class Cell extends React.Component {

    constructor(props)
    {
        super(props);
        this.clicked = false;
        this.gameOver = false;
        this.state = {
            draw: '',
            win: false
        };
    }

    render() {
        let combination = this.props.getWinningCombination();
        if (combination.length && combination.includes(this.props.index)) {
            this.gameOver = true;
        }
        return (<div className={'cell ' + this.state.draw + '-icon' + ' ' + (this.gameOver ? 'win':'')}
                     onClick={this.onClickHandler.bind(this)}>{this.state.draw}
        </div>);
    }

    onClickHandler() {
        if (!this.clicked && !this.props.gameOver()) {
            let type = this.props.getCounter()%2===0?'x':'o';
            this.setState({'draw': type});
            this.props.clickCounter(type, this.props.index);
        }
        this.clicked = true;
    }
}

export {Cell};