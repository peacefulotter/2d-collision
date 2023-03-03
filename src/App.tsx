
import { ReglFrame } from 'react-regl';
import useCreateDots from './Dots';
import Point from './models/Point';
import Vec2 from './models/Vec2';
import Solver from './models/Solver';
import { DefaultContext, Regl } from 'regl';

import './App.css';

const center = new Point();
center.color = [0, 0.4, 0, 1];
center.radius = 250;
center.setPos(new Vec2(500, 400))

const p = new Point();
p.color = [1, 0, 1, 1]
p.translate( new Vec2(600, 400) )

const solver = new Solver();
solver.addPoint( p );

const points = [ p, center ]

let oldTime = 0;

function App() {

	const { Dots, updatePoints } = useCreateDots( points )

	const onFrame = ( { time }: DefaultContext, regl: Regl ) => {
		const dt = time - oldTime;
		oldTime = time;

		regl.clear( { color: [0, 0, 0, 1], depth: 1 } )

		const objects = solver.update(dt);
		updatePoints( [...objects, center] )
	  }

	return (
		<div className="App">
			{/* <button onClick={toggle} style={{position: "absolute", top: '10px', right: '10px'}}>toggle</button> */}
			<ReglFrame onFrame={onFrame}>
				<Dots />
			</ReglFrame>
		</div>
	);
}

export default App;
