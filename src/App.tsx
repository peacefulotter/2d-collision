import './App.css';

import regl, { ReglFrame } from 'react-regl';
import Triangle from './Triangle';
import useDots from './Dots';

function App() {
	const Dots = useDots();
	return (
		<div className="App">
			<ReglFrame>
				<Dots />
			</ReglFrame>
		</div>
	);
}

export default App;
