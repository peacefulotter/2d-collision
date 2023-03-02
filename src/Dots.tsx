import { useState } from "react";
import regl from "react-regl";
import useWindowSize from "./hooks/useWindowSize";

type RGBA = [number, number, number, number]

interface Dot {
    x: number;
    y: number;
    r: number;
    c: RGBA
}

interface Props {
    stageWidth: number, 
    stageHeight: number
}

const N = 100_000

const points: Dot[] = Array
    .from(new Array(N), (_, index) => index + 1)
    .map( i => ({
        x: Math.random(), 
        y: Math.random(), 
        r: 15 * Math.random() + 10, 
        c: [Math.random(), Math.random(), Math.random(), 1]
    }))


const useDots = () => {

    const [dots, setDots] = useState<Dot[]>(points)

    return regl({
        frag: `
            precision highp float;
            varying vec4 fragColor;
            void main() {
                float r = 0.0, delta = 0.0, alpha = 1.0;
                vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                r = dot(cxy, cxy);
                if (r > 1.0) {
                    discard;
                }
                gl_FragColor = fragColor;
            }
            `,

        vert: `
            attribute vec2 position;
            attribute vec4 color;
            attribute float radius;
            varying vec4 fragColor;

            vec2 normalizeCoords(vec2 position) {
                float x = position[0];
                float y = position[1];
                return vec2(  2.0 * (x - 0.5), -2.0 * (y - 0.5) );
            }

            void main() {
                gl_PointSize = radius;
                fragColor = color;
                gl_Position = vec4(normalizeCoords(position), 0.0, 1.0);
            }
            `,

        attributes: {
            position: dots.map(d => [d.x, d.y]),
            color: dots.map(d => d.c),
            radius: dots.map(d => d.r)
        },

        uniforms: {
        },
    
        count: dots.length,
        primitive: 'points',
    } )
}

export default useDots;