
import { useState } from "react";
import Point from "../models/Point";
import Vec2 from "../models/Vec2";


const N = 100_000

const points: Point[] = Array
    .from(new Array(N), (_, index) => index + 1)
    .map( i => {
        const p = new Point();
        p.translate( new Vec2(Math.random(), Math.random()) )
        p.color = [Math.random(), Math.random(), Math.random(), 1]
        return p;
    } )


const useDots = () => {

    const [dots, setDots] = useState<Point[]>(points)

}


export default useDots;