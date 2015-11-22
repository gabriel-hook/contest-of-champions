
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

export { shuffle };
