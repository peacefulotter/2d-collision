import reactRegl from "react-regl";
import { DefaultContext } from 'regl'
import { RGBA } from "./model";
import Point from "./models/Point";

const reduce = (points: Point[]) => points.reduce( ( prev, p ) => {
    prev.ps.push( [p.getPos().x, p.getPos().y] )
    prev.rs.push( p.radius );
    prev.cs.push( p.color );
    return prev;
}, { ps: [] as [number, number][], rs: [] as number[], cs: [] as RGBA[]  } )


const useCreateDots = ( points: Point[] ) => {

    let ps: [number, number][] = [];
    let rs: number[] = [];
    let cs: RGBA[] = [];

    const r = reduce( points )
    ps = r.ps;
    rs = r.rs;
    cs = r.cs;

    const updatePoints = ( points: Point[] ) => {
        const r = reduce(points)
        ps = r.ps;
        rs = r.rs;
        cs = r.cs;
    }

    const Dots = reactRegl({
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

            uniform float stageWidth;
            uniform float stageHeight;

            varying vec4 fragColor;

            vec2 normalizeCoords() {
                float x = position[0];
                float y = position[1];
                return vec2(
                    2.0 * ((x / stageWidth) - 0.5), 
                    -2.0 * ((y / stageHeight) - 0.5) 
                );
            }

            void main() {
                gl_PointSize = radius;
                fragColor = color;
                gl_Position = vec4(normalizeCoords(), 0.0, 1.0);
            }
            `,

        attributes: {
            position: () => ps,
            color: () => cs, 
            radius: () => rs,
        },

        uniforms: {
            stageWidth: ({viewportWidth}: DefaultContext) => viewportWidth, 
            stageHeight: ({viewportHeight}: DefaultContext) => viewportHeight,
        },

        count: points.length,
        primitive: 'points',
    } )

    return { Dots, updatePoints }
}

export default useCreateDots;