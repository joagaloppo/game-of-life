import { useState, useRef, useEffect } from 'react';
import './App.css';
import Box from './components/Box';
import Table from './components/Table';

function App() {
	const [data, setData] = useState({ cols: 50, rows: 30, speed: 300 });
	const [gen, setGen] = useState(0);
	const [alive, setAlive] = useState([]);
	const run = useRef(false);
	let all = Array.from({ length: data.cols * data.rows }, (_, i) => i + 1);

	const arr = {
		regular: [-data.cols - 1, -data.cols, -data.cols + 1, -1, 1, data.cols - 1, data.cols, data.cols + 1],
		top: [data.cols * data.rows - data.cols + 1, data.cols * data.rows - data.cols, data.cols * data.rows - data.cols - 1, -1, 1, data.cols - 1, data.cols, data.cols + 1],
		bottom: [-data.cols - 1,-data.cols,-data.cols + 1,-1,1,-data.cols * data.rows + data.cols - 1,-data.cols * data.rows + data.cols,-data.cols * data.rows + data.cols + 1],
		left: [-data.cols - 1, -data.cols, -data.cols * 2 + 1, -1, -data.cols + 1, data.cols - 1, data.cols, 1],
		right: [-1, -data.cols, -data.cols + 1, data.cols - 1, 1, data.cols * 2 - 1, data.cols, data.cols + 1],
		top_left: [data.cols * data.rows - 1,data.cols * data.rows - data.cols,data.cols * data.rows - data.cols + 1,data.cols - 1,1,data.cols * 2 - 1,data.cols,data.cols + 1],
		top_right: [data.cols * data.rows - data.cols - 1,data.cols * data.rows - data.cols,data.cols * data.rows - (data.cols * 2 - 1),-1,-data.cols + 1,data.cols - 1,data.cols,1],
		bottom_left: [-1,-data.cols,-data.cols + 1,data.cols - 1,1,-data.cols * data.rows + (data.cols * 2 - 1),-data.cols * data.rows + data.cols,-data.cols * data.rows + data.cols + 1],
		bottom_right: [-data.cols - 1,-data.cols,-data.cols * 2 + 1,-1,-data.cols + 1,-data.cols * data.rows + data.cols - 1,-data.cols * data.rows + data.cols,-data.cols * data.rows + 1],
	};

	const handleInput = (e) => {
		setData({ ...data, [e.target.name]: parseInt(e.target.value) || 0 });
	};

	const handleClick = (e) => {
		let newAlive = [...alive];
		if (e.target.classList.contains('true')) newAlive.splice(newAlive.indexOf(parseInt(e.target.id)), 1);
		else newAlive.push(parseInt(e.target.id));
		e.target.classList.toggle('false');
		e.target.classList.toggle('true');
		setAlive([...newAlive]);
	};

	const handleStart = () => {
		let newAlive = [];

		all.forEach((x) => {
			let check = arr.regular;
			if (x > 1 && x < data.cols) check = arr.top;
			if (x > data.cols * data.rows - (data.cols + 1) && x < data.cols * data.rows) check = arr.bottom;
			if (x % data.cols === 0) check = arr.left;
			if ((x - 1) % data.cols === 0) check = arr.right;
			if (x === 1) check = arr.top_left;
			if (x === data.cols) check = arr.top_right;
			if (x === data.cols * data.rows - data.cols + 1) check = arr.bottom_left;
			if (x === data.cols * data.rows) check = arr.bottom_right;

			let neighbors = 0;
			check.forEach((e) => {
				if (alive.includes(x + e)) {
					neighbors++;
				}
			});

			if (!alive.includes(x) && neighbors === 3) {
				document.getElementById(x).className = 'circle true';
				newAlive.push(x);
			} else if (alive.includes(x)) {
				if (neighbors > 3 || neighbors < 2) document.getElementById(x).className = 'circle false';
				else newAlive.push(x);
			}
		});

		setAlive([...newAlive]);
		setGen((prevGen) => prevGen + 1);
	};

	const handleStop = () => {
		clearTimeout(timer);
		run.current = false;
	};

	const handleRestart = () => {
		handleStop();
		[...document.getElementsByClassName('true')].forEach((e) => (e.className = 'circle false'));
		setGen(0);
		setAlive([]);
	};

	let timer = null;
	const handleRep = () => {
		run.current = true;
		timer = setTimeout(() => {
			handleStart();
		}, data.speed);
	};

	useEffect(() => {
		if (run.current) handleRep();
	}, [alive]);

	return (
		<div>
			<Box data={data} gen={gen} length={alive.length} run={run} handleInput={handleInput} handleStart={handleStart} handleStop={handleStop} handleRestart={handleRestart} handleRep={handleRep} />
			<Table data={data} current={run.current} handleClick={handleClick} />
		</div>
	);
}

export default App;
