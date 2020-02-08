import { createStore } from 'redux';
import { SET_VALUE, SELECT_CELL, SOLVE_PUZZLE, CLEAR_PUZZLES } from '../actions/sudokuActions';
import  {isValidValue, isCellValid, getPeers, solve } from './solverUtils';
import { defaultCipherList } from 'constants';
import { create } from 'domain';

export let initialState = {
    // state of the input board
    input: [
        [8, 5, 6, '', 1, 4, 7, 3, ''],
        ['', 9, '', '', '', '', '', '', ''],
        [2, 4, '', '', '', '', 1, 6, ''],
        ['', 6, 2, '', 5, 9, 3, '', ''],
        ['', 3, 1, 8, '', 2, 4, 5, ''],
        ['', '', 5, 3, 4, '', 9, 2, ''],
        ['', 2, 4, '', '', '', '', 7, 3],
        ['', '', '', '', '', '', '', 1, ''],
        ['', 1, 8, 6, 3, '', 2, 9, 4], 
    ],
    // highlight state for all squares. THis is used to provide peer highlighting.
    highlight: [
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
        [false, false, false,false, false, false,false, false, false,],
    ],
    //the solution board
    output: [
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
        ['', '', '', '', '', '', '', '', '',],
    ],
}

export function solver(state = initialState, action) {
    switch (action.type) {
        case SET_VALUE: {
            const { x, y } = action.payload
            //using '' to denote blank cells
            const newValue = action.payload.value ? action.payload.value: ''
            // copy state to avoid mutations
            let nextState = {
                input: [
                    [...state.input[0]],
                    [...state.input[1]],
                    [...state.input[2]],
                    [...state.input[3]],
                    [...state.input[4]],
                    [...state.input[5]],
                    [...state.input[6]],
                    [...state.input[7]],
                    [...state.input[8]],
                ],
                output: [
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                ],
                highlight: [...state.highlight],
            }
            // add users value
            nextState.input[x][y] = newValue
            // only update board of it is valid
            if (isValidValue(newValue) && isCellValid (x, y, nextState.input)) {
                return {
                    ...nextState
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case SELECT_CELL: {
            // copy state to avoid mutations
            let nextSelectedState = {
                input: [...state.input],
                output: [...state.output],
                highlight: [
                    [...initialState.highlight[0]],
                    [...initialState.highlight[1]],
                    [...initialState.highlight[2]],
                    [...initialState.highlight[3]],
                    [...initialState.highlight[4]],
                    [...initialState.highlight[5]],
                    [...initialState.highlight[6]],
                    [...initialState.highlight[7]],
                    [...initialState.highlight[8]],
                ],
            }
            // add selected cell to highlight
            nextSelectedState.highlight[action.payload.x][action.payload.y] = true
            // highlight all peers of this cell
            const peers = getPeers(action.payload.x, action.payload.y)
            for (const peer of peers) {
                nextSelectedState.highlight[peer.x][peer.y] = true
            }
            return nextSelectedState
        }
        case SOLVE_PUZZLE: {
            const output = solve(state.input)
            const solvedState = {
                input: [...state.input],output, 
                highlight: [...state.highlight]
            }
            return solvedState 
        }
        case CLEAR_PUZZLES: {
            const clearedState = {
                input: [
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                ],
                output: [
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                    ['', '', '', '', '', '', '', '', '',],
                ], 
                highlight: [...initialState.highlight]
            }
            return clearedState
        }
        default: 
        return state
    }
}

export default createStore(solver)