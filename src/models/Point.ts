import { RGBA } from "../model";
import Vec2 from "./Vec2";

export default class Point {
    private pos: Vec2;
    private oldPos: Vec2;
    private acc: Vec2;

    color: RGBA;
    radius: number;

    constructor()
    {
        this.pos = Vec2.ZERO;
        this.oldPos = Vec2.ZERO;
        this.acc = Vec2.ZERO;
        this.color = [1, 1, 1, 1];
        this.radius = 32;
    }

    getPos() { return this.pos; }

    setPos( pos: Vec2 ) { 
        this.pos = pos; 
    }

    translate( vec: Vec2 )
    {
        this.pos = this.pos.add( vec );
        this.oldPos = this.oldPos.add( vec );
    }

    updatePosition( dt: number )
    {
        const vel: Vec2 = this.pos.sub( this.oldPos );
        this.oldPos = this.pos;
        this.pos = this.pos.add( vel ).add( this.acc.mul(dt * dt) )
        this.acc = Vec2.ZERO;
    }

    accelerate( acc: Vec2 )
    {
        this.acc = this.acc.add( acc );
    }
}