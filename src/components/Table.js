import React from 'react';

function Table(props) {
	return (
		<div className="table">
			{Array(props.data.rows)
				.fill(true)
				.map((_, index) => {
					return (
						<div className="row" key={index + 1}>
							{Array(props.data.cols * props.data.rows)
								.fill(false)
								.slice(props.data.cols * index, props.data.cols * (index + 1))
								.map((e, i) => {
									return (
										<div
											className={`circle ${e}`}
											id={i + 1 + index * props.data.cols}
											key={i + 1 + index * props.data.cols}
											onClick={(e) => (props.current ? null : props.handleClick(e))}
										/>
									);
								})}
						</div>
					);
				})}
		</div>
	);
}

export default Table;
