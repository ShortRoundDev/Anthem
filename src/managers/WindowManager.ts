export class KeyInfo {
    constructor(
        public isDown: boolean,
        public eventTime: number,
        public edge: boolean
    ) {
    }
}

export class MouseInfo {
    constructor(
        public isDown: boolean,
        public eventTime: number,
        public edge: boolean,
        public x: number,
        public y: number
    ) {

    }
}

export class WindowManager {
    keyMap: Map<string, KeyInfo>;
    mouse: MouseInfo;
    timeStamp: number;
    debug: boolean = false;

    constructor() {
        this.keyMap = new Map<string, KeyInfo>();
        this.timeStamp = performance.now();
        this.mouse = new MouseInfo(false, this.timeStamp, false, 0, 0);
    }

    init(): void {
        window.addEventListener("keydown", (e) => {
            if (!this.keyMap.has(e.key)) {
                this.keyMap.set(e.key, new KeyInfo(true, this.timeStamp, true));
            }
            let key = this.keyMap.get(e.key);
            if(!key!.isDown) {
                key!.edge       = true;
                key!.isDown     = true;
                key!.eventTime  = e.timeStamp;
            };
        });
        
        window.addEventListener("keyup", (e) => {
            if (!this.keyMap.has(e.key)) {
                this.keyMap.set(e.key, new KeyInfo(false, this.timeStamp, true));
            }
            let key = this.keyMap.get(e.key);
            if(key!.isDown) {
                key!.edge       = true;
                key!.isDown     = false;
                key!.eventTime  = e.timeStamp;
            };
        });

        window.addEventListener("mousemove", (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener("mousedown", (e) => {
            this.mouse.isDown = true;
            this.mouse.edge = true;
            this.mouse.eventTime = e.timeStamp;
        });
        window.addEventListener("mouseup", (e) => {
            this.mouse.isDown = false;
            this.mouse.edge = true;
            this.mouse.eventTime = e.timeStamp;
        });
    }

    update(): void {
        this.timeStamp = performance.now();
    }

    keyDown(key: string): boolean {
        if(!this.keyMap.has(key)) {
            return false;
        }
        return this.keyMap.get(key)!.isDown;
    }

    keyUp(key: string): boolean {
        if(!this.keyMap.has(key)) {
            return false;
        }
        return !this.keyMap.get(key)!.isDown;
    }

    mouseDown(): boolean {
        return this.mouse.isDown;
    }

    mouseUp(): boolean {
        return !this.mouse.isDown;
    }

    mousePos(): { x: number, y: number } {
        return { x: this.mouse.x, y: this.mouse.y };
    }
}