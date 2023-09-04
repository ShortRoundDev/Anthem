import { ASSET, GFX } from "../../managers";
import { PhysObject } from "./PhysObject";

export class Animation {
    constructor(
        public start: number,
        public end: number,
        public speed: number
    ) {

    }
}

export class AnimationDescription {
    public frame: number = 0.0;
    public currentAnimation: Animation;

    setAnimation(name: string) {
        if(this.currentAnimationName === name) {
            return;
        }
        this.currentAnimationName = name;
        this.currentAnimation = this.animations.get(name) as Animation;
        this.frame = 0.0;
    }

    constructor(
        public spriteWidth: number,
        public animations: Map<string, Animation>,
        private currentAnimationName: string
    ){
        this.currentAnimation = this.animations.get(currentAnimationName) as Animation;
    }
}

export abstract class Actor extends PhysObject {
    image?: HTMLImageElement;
    animationDescription?: AnimationDescription;
    angle: number = 0.0;

    constructor(
        x: number, y: number,
        w: number, h: number,
        image: string | null,
        animationDescription: AnimationDescription | null
    ) {
        super(x, y, w, h);
        if(image) {
            console.log(ASSET);
            let imageElement = ASSET.getImage(image);
            if(imageElement) {
                this.image = imageElement;
            }
        }
        
        if(animationDescription) {
            this.animationDescription = animationDescription;
        }
    }

    protected updateFrame(): void {
        if(!this.animationDescription){
            return;
        }
        let animation = this.animationDescription.currentAnimation;
        let frame = this.animationDescription.frame;

        frame += animation.speed;

        let diff = animation.end - animation.start;
        if (frame >= diff + 1) {
            frame -= (diff + 1);
        }
        this.animationDescription.frame = frame;
    }

    public draw(): void {
        if(!this.animationDescription){
            return;
        }
        let animation = this.animationDescription.currentAnimation;
        let frame = this.animationDescription.frame;
        let spriteWidth = this.animationDescription.spriteWidth;

        let x = (animation.start * spriteWidth) + (Math.floor(frame) * spriteWidth);
        let y = 0;

        if(this.image){
            GFX.ctx.save();
            {
                GFX.ctx.translate(this.aabb.x + this.aabb.h/2, this.aabb.y + this.aabb.h/2);
                GFX.ctx.rotate(this.angle);
                
                GFX.ctx.drawImage(this.image,
                    x, y, spriteWidth, spriteWidth,
                    -this.aabb.w/2, -this.aabb.h/2, this.aabb.w, this.aabb.h
                );
            }
            GFX.ctx.restore();

        }
    }
}