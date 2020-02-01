import React, { Component } from 'react';
import CellContainer from '../containers/CellContainer';
import './Grid.css'

/**
 * Represents one 3X3 grid of a Sudoku board.
 */

 export default class Grid extends Component {
     render() {
         return (
        <div className="grid">
             <div className="grid-row">
                 <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
                 <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
                 <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
             </div>
            <div className="grid-row">
                <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
                <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
                <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
            </div>
            <div className="grid-row">
                <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>                
                <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
                <CellContainer x={this.props.x} y={this.props.y} type={this.props.type}/>
            </div>
        </div>
         )
     }
 }