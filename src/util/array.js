function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;
        if(index !== counter) {
            const temp = array[ counter ];
            array[ counter ] = array[ index ];
            array[ index ] = temp;
        }
    }
}
const flatten = (array) => array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export { shuffle, flatten };
