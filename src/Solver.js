import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Sudoku from './components/Sudoku';
import { solvePuzzle, clearPuzzles } from './actions/sudokuActions';
import './components/Solver.css';

class Solver extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="solver">
                    <header className="solver-header">
                        <h1 className="solver-title">Sudoku Solver</h1>
                    </header>
                <div className="solver-board-container">
                    <div className="solver-board">
                        <Sudoku title="Puzzle" type="input"/>
                    </div>
                <div className="solver-button">
                    <button id="clear" onClick={() => store.dispatch(solvePuzzle())}>
                        Clear
                    </button>
                </div>
                </div>
                <div className="solver-board">
                    <Sudoku title="Solution" type="output" />
                </div>
                </div>
            </Provider>
        )
    }
}

export default Solver; 