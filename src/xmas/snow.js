import './snow.scss';
import { requestRender } from '../util/animation';

/**
 * Reset a snowflake element to a default random state.
 */
function resetSnowflake(element) {
    const snowflake = {
        element,
        opacity: Math.random() * 0.5 + 0.5,
        size: 1 + Math.random(),
        rotateX: Math.random(),
        rotateY: Math.random(),
        rotateZ: Math.random(),
        rotate: Math.random() * 360 | 0,
        rotateDelta: (Math.random() - 0.5) * 2,
        xScale: 0.5 + Math.random() * 0.5,
        xOffset: Math.random() * 360,
        x: Math.random() * 100,
    };
    element.style.opacity = snowflake.opacity;
    element.style.width = `${ snowflake.size }em`;
    element.style.height = `${ snowflake.size }em`;
    return snowflake;
}

/**
 * Create the snowflake elements and attach to the overlay
 */
const SNOWFLAKE_COUNT = 33;
const overlay = document.createElement('div');
overlay.className = 'xmas-snow';

let snowflakes = [];
for(let i = 0; i < SNOWFLAKE_COUNT; i++) {
    const element = document.createElement('div');
    element.className = 'xmas-snow-flake';
    overlay.appendChild(element);
    snowflakes[ i ] = {
        ...resetSnowflake(element),
        y: Math.random() * 100,
    };
}

/**
 * Handle the physics for snowflakes each frame tick.
 */
const DELTA_TIME = 16;

let currentTime = 0;
function tick() {
    currentTime += DELTA_TIME;
    snowflakes = snowflakes.map((snowflake) => {
        const { element, rotateX, rotateY, rotateZ, rotateDelta, xScale, xOffset } = snowflake;
        let { x, y, rotate } = snowflake;
        //move and rotate
        rotate += rotateDelta;
        x += Math.cos(currentTime / 360 + xOffset) * 0.25 * xScale;
        y += (DELTA_TIME) / 100;
        //apply the styles
        element.style.left = `${ x }%`;
        element.style.top = `${ y }%`;
        element.style.transform = `rotate3d(${ rotateX },${ rotateY },${ rotateZ },${ rotate }deg)`;
        //return the moved element or reset
        return (y > 100)? {
            ...resetSnowflake(element),
            y: -(5 + 10* Math.random()),
        }: {
            ...snowflake,
            x,
            y,
            rotate,
        };
    });
}

function letItSnow() {
    document.body.appendChild(overlay);
    requestRender({
        id: 'snow',
        callback: function animateSnow() {
            tick();
            requestRender({ id: 'snow', callback: animateSnow, delay: 2 });
        },
    });
}

export { letItSnow };
