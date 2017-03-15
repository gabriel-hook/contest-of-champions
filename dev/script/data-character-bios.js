import fs from 'fs';
import ID_MAP from './data-id-map.json';

const INPUT_FILE = process.argv[ 2 ]; // eslint-disable-line
const OUTPUT_FILE = 'src/data/lang/en.json';

try {
    const source = require(`../../${ OUTPUT_FILE }`);
    const append = (JSON.parse(fs.readFileSync(INPUT_FILE).toString()).strings || [])
        .reduce((data, { k, v }) => {
            let key;
            if (k.startsWith('ID_CHARACTER_BIOS_')) {
                const id = ID_MAP[ k.slice('ID_CHARACTER_BIOS_'.length) ];
                if (id) {
                    key = `champion-${ id }-description`;
                    data[ key ] = v;
                }
            }
            return data;
        }, {});
    const json = { ...source, ...append };

    fs.writeFileSync(`./${ OUTPUT_FILE }`, `${ JSON.stringify(json, null, 4) }\n`);

    console.log('Character bios written.'); //eslint-disable-line
}
catch (error) {
    console.error(error); //eslint-disable-line
}
