export class GraphicsManager {
    _canvas: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D;

    constructor() {
        this._canvas = document.querySelector("canvas") as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    init(): void {
        let ratio = window.devicePixelRatio || 1;

        this._canvas.width = 1024 * ratio;
        this._canvas.height = 768 * ratio;

        this._canvas.style.width = "1024px";
        this._canvas.style.height = "768px";

        this._ctx.scale(ratio, ratio);

        this._ctx.imageSmoothingEnabled = false;
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }
}