import React, { Component } from 'react';
import Grid from './Grid';
import Sudoko from './Sudoku.css';

/**
 * Represents a 9x9 sudoku board
 */

 export default class Sudoku extends Component {
     render() {
         return (
            <div>
                <div className="Sudoku-Title">
                    {this.props.title}
                </div>
                
            </div>
         )
     }
 }