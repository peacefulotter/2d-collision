


export default class Vec2
{
    static ZERO = new Vec2(0, 0);

    x: number;
    y: number;

    constructor(x: number, y: number)
    {
        this.x = x;
        this.y = y;
    }

    add( other: Vec2 )
    {
        return new Vec2(this.x + other.x, this.y + other.y)
    }

    sub( other: Vec2 )
    {
        return this.add( new Vec2( -other.x, -other.y ) ) 
    }

    mul( factor: number )
    {
        return new Vec2(this.x * factor, this.y * factor);
    }

    div( factor: number ) 
    { 
        return this.mul( 1 / factor ); 
    }

    length()
    {
        return Math.sqrt( this.x * this.x + this.y * this.y );
    }

    length2()
    {
        const l = this.length()
        return l * l;
    }
}