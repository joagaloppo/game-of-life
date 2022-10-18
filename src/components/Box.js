import React from 'react';

function Box(props) {
	return (
		<div className="box">
			<button onClick={() => (props.run.current ? null : props.handleRep())}>Start</button>
			<button onClick={() => (props.run.current ? props.handleStop() : null)}>Stop</button>
			<button onClick={() => props.handleRestart()}>Restart</button>
			<button onClick={() => (props.run.current ? null : props.handleStart())}>Next</button>
			<span>Gen: {props.gen}</span>
			<span>Alive: {props.length}</span>
			<label>Columns</label>
			<input
				name="cols"
				onChange={(e) => (props.run.current ? null : props.handleInput(e))}
				value={props.data.cols}
			/>
			<label>Rows</label>
			<input
				name="rows"
				onChange={(e) => (props.run.current ? null : props.handleInput(e))}
				value={props.data.rows}
			/>
			<label>Speed</label>
			<input
				name="speed"
				onChange={(e) => (props.run.current ? null : props.handleInput(e))}
				value={props.data.speed}
			/>
		</div>
	);
}

export default Box;
