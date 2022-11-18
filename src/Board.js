import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.2 }) => {
	const [ board, setBoard ] = useState([]);
	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	const createBoard = () => {
		let initialBoard = [];
		// TODO: create array-of-arrays of true/false values
		for (let y = 0; y < nrows; y++) {
			let newRow = [];
			for (let x = 0; x < ncols; x++) {
				newRow.push(Math.random() < chanceLightStartsOn);
			}
			initialBoard.push(newRow);
      initialBoard = createBoard
		}
		return createBoard;
	};

	// createBoard();

	const hasWon = () => {
		// TODO: check the board in state to determine whether the player has won.
		board.every((newRow) => newRow.every((cell) => !Cell));
	};

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [ y, x ] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			let boardCopy = oldBoard.map((newRow) => [ ...newRow ]);
			// TODO: in the copy, flip this cell and the cells around it
			// Obtained this info from https://codesandbox.io/s/react-lights-out-game-omfyt?file=/src/Board.js:1802-2003
			flipCell(y, x); // flip initial cell
			flipCell(y, x - 1); // flip left cell
			flipCell(y, x + 1); // flip right cell
			flipCell(y + 1, x); // flip cell above
			flipCell(y - 1, x); // flip cell below

			// TODO: return the copy
			return boardCopy;
		});
	}

	// if the game is won, just show a winning msg & render nothing else
	if (hasWon()) {
		return <div> You Won The Game!</div>;
	}

	// make table board
	const makeHTMLBoard = () => {
		let tableBoard = [];
		for (let y = 0; y < nrows; y++) {
			let newRow = [];
			for (let x = 0; x < ncols; x++) {
				let coord = `${x} + ${y}`;
				newRow.push(<Cell key={coord} litCell={board[x][y]} flipping={flipCellsAround(coord)} />);
			}
			console.log(newRow);
			tableBoard.push(<tr key={`newRow${y}`}>{newRow}</tr>);
		}
		return tableBoard;
	};

	return (
			<table className="Board">
				<tbody>{makeHTMLBoard()}</tbody>
			</table>
		)
};

export default Board;
