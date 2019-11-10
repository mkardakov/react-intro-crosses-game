import React from 'react';
import './App.css';
import Cell from './Cell';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.gameMap = {
            'x' : [],
            'o' : []
        };
        this.move = 0;
        this.state = {};
        this.winningCombination = false;
    }

    render() {
        let cells = [];
        for (let i = 0; i < this.props.width; ++i) {
            let line = [];
            for (let j = 0; j < this.props.height; ++j) {
                line.push(<Cell
                    clickCounter={this.handleClick.bind(this)}
                    getCounter={this.getCounter.bind(this)}
                    getWinningCombination={this.getWinningCombination.bind(this)}
                    key={i*this.props.width+j}
                    index={i*this.props.width+j+1}
                    gameOver={() => this.state.game_over}
                    />
                    );
            }
            cells.push(<div className='line' key={i}>{line}</div>);
        }

        return (
            <div className="App">
                {cells}
            </div>
        );
    }

    handleClick(type, index) {
        this.setState({move: this.move});
        this.move++;
        console.log(this.move);
        this.gameMap[type].push(index);
        console.log(this.gameMap);
        let win = this.__isWinner();
        if (win) {
            alert(`the ${win.winner} is the winner!`);
            this.winningCombination = win.combination;
            this.setState({game_over: true});

        }
    }

    getWinningCombination() {
        return this.winningCombination;
    }

    getCounter() {
        return this.move;
    }


    __isWinner() {
        if (this.move < 5) {
            return;
        }
        const winning = [
            [1, 2 ,3],
            [4, 5 ,6],
            [7, 8 ,9],
            [1, 4 ,7],
            [2, 5 ,8],
            [3, 6 ,9],
            [1, 5 ,9],
            [3, 5, 7]
        ];
        for (let winner in this.gameMap) {
            let indexSet = this.gameMap[winner];
            console.log(indexSet);
            NextCombination:
            for (const combination of winning) {
                for (const combinationId of combination) {
                    if (!indexSet.includes(combinationId)) {
                        continue NextCombination;
                    }
                }
                return {
                    winner : winner,
                    combination: combination
                };
            }
        }
        return false;
    }
}



export default App;
