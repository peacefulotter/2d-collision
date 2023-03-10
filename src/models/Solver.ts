import Point from "./Point";
import Vec2 from "./Vec2";




export default class Solver
{
    substeps: number = 2;
    gravity: Vec2 = new Vec2(0, 9.81 * 100);
    private objects: Point[] = [];

    addPoint( p: Point )
    {
        this.objects.push( p );
    }
    
    update( dt: number )
    {
        const sub_dt = dt / this.substeps;

        for (let i = 0; i < this.substeps; i++) {
            this.applyGravity();
            this.applyConstraint();
            this.updatePositions(sub_dt);            
        }
        
        return this.objects;
    }

    private applyConstraint()
    {
        const center = new Vec2(500, 400)
        const radius = 280 / 2;
        this.objects.forEach( obj => {
           const toObj = obj.getPos().sub( center );
           const dist = toObj.length();
           if ( dist > (radius - obj.radius) )
           {
                const dist2 = toObj.length2();
                const n = toObj.mul( 1 / dist2 );
                const newPos = center.add( n.mul( dist2 - obj.radius ) );
                obj.setPos( newPos )
           } 
        });
    }

    private updatePositions( dt: number )
    {
        this.objects.forEach( obj => obj.updatePosition(dt) );
    }

    private applyGravity()
    {
        this.objects.forEach( obj => obj.accelerate( this.gravity ) )
    }
}