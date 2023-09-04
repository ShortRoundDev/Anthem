import { GAME, GFX, WND, initManagers } from './managers';

async function main(): Promise<void> {
    await initManagers();

    run();
}

let acc = 0;
let last = performance.now();

function run() {    
    let now = performance.now();
    let dt = now - last;
    last = now;
    acc += dt;
    if(acc >= 16) {
        acc -= 16;
        GFX.clear();
        GAME.update();
        GAME.draw();
    }
    requestAnimationFrame(run);
}

window.onload = main;