import './snow.scss';
import { requestRender } from '../util/animation';

const SNOWFLAKE_CHARS = [ '❅', '❆' ];
const SNOWFLAKE_COUNT = 25;
const DELTA_TIME = 16;

/**
 * Reset a snowflake element to a default random state.
 */
function resetSnowflake(element) {
    element.style.opacity = Math.random() * 0.25 + 0.75;
    element.style.fontSize = `${ 1 + Math.random() }em`;
    element.innerHTML = SNOWFLAKE_CHARS[ Math.random() * SNOWFLAKE_CHARS.length | 0 ];
    return {
        element,
        opacity: Math.random() * 0.5 + 0.5,
        size: 1 + Math.random(),
        rotateXYZ: `${ Math.random() },${ Math.random() },${ Math.random() }`,
        rotateDelta: (Math.random() - 0.5) * 2,
        rotate: Math.random() * 360 | 0,
        xOffset: Math.random() * 360,
        xScale: 0.5 + Math.random() * 0.5,
        x: Math.random() * 100,
    };
}

/**
 * Create the snowflake elements and attach to the overlay
 */
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

function tick() {
    const time = tick.time = (tick.time || 0) + DELTA_TIME;
    snowflakes = snowflakes.map((snowflake) => {
        const { element, rotateXYZ, rotateDelta, xScale, xOffset } = snowflake;
        let { x, y, rotate } = snowflake;
        //move and rotate
        rotate += rotateDelta;
        x += Math.cos(time / 360 + xOffset) * 0.25 * xScale;
        y += (DELTA_TIME) / 100;
        //apply the styles
        element.style.left = `${ x }%`;
        element.style.top = `${ y }%`;
        element.style.transform = `rotate3d(${ rotateXYZ },${ rotate }deg)`;
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
        callback: function animate() {
            tick();
            requestRender({ id: 'snow', callback: animate });
        },
    });
}

export { letItSnow };
