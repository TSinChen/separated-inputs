import { KeyboardEvent, useState } from 'react';
import './style.scss';

const LENGTH = 6;
const CHARS_CAN_INPUT =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function App() {
	const [inputs, setInputs] = useState<string[]>(Array(LENGTH).fill(''));

	const handleChange = (
		{ key }: KeyboardEvent<HTMLDivElement>,
		index: number
	) => {
		const inputElements = document.querySelectorAll('input');
		const old = [...inputs];
		const prevInput = inputElements[Math.max(index - 1, 0)];
		const nextInput = inputElements[Math.min(index + 1, LENGTH - 1)];
		if (CHARS_CAN_INPUT.includes(key)) {
			old[index] = key;
			setInputs(old);
			if (index !== LENGTH - 1) {
				nextInput.focus();
			}
		} else if (key === 'ArrowLeft') {
			prevInput.focus();
		} else if (key === 'ArrowRight') {
			nextInput.focus();
		} else if (key === 'Backspace') {
			old[index] = '';
			setInputs(old);
			prevInput.focus();
		} else if (key === 'Delete') {
			old[index] = '';
			setInputs(old);
			nextInput.focus();
		}
	};

	return (
		<div style={{ display: 'flex', margin: '20px', columnGap: '16px' }}>
			{inputs.map((input, i) => (
				<input
					className="input"
					key={i}
					value={input}
					readOnly
					onKeyDown={(e) => handleChange(e, i)}
					onFocus={(e) => e.target.setSelectionRange(1, 1)}
				/>
			))}
		</div>
	);
}

export default App;
