import fs from 'fs';
import ID_MAP from './data-id-map.json';

const INPUT_FILE = process.argv[ 2 ]; // eslint-disable-line
const OUTPUT_FILE = 'src/data/lang/en.json';

try {
    const source = require(`../../${ OUTPUT_FILE }`);
    const append = (JSON.parse(fs.readFileSync(INPUT_FILE).toString()).strings || [])
        .reduce((data, { k, v }) => {
            let key;
            if (k.startsWith('ID_UI_STAT_SIGNATURE_') && k.endsWith('_TITLE_LOWER')) {
                const id = ID_MAP[ k.slice('ID_UI_STAT_SIGNATURE_'.length, -('_TITLE_LOWER'.length)) ];
                if (id) {
                    key = `champion-signature-${ id }-name`;
                    data[ key ] = v;
                }
            }
            else if (k.startsWith('ID_UI_STAT_SIGNATURE_') && k.endsWith('_SHORT')) {
                const id = ID_MAP[ k.slice('ID_UI_STAT_SIGNATURE_'.length, -('_SHORT'.length)) ];
                if (id && !data[ key ]) {
                    key = `champion-signature-${ id }-name`;
                    data[ key ] = v.slice(0, -3);
                }
            }
            else if (k.startsWith('ID_UI_STAT_SIG_') && k.endsWith('_SHORT')) {
                const id = ID_MAP[ k.slice('ID_UI_STAT_SIG_'.length, -('_SHORT'.length)) ];
                if (id && !data[ key ]) {
                    key = `champion-signature-${ id }-name`;
                    data[ key ] = v.slice(0, -3);
                }
            }
            else if (k.startsWith('ID_UI_STAT_ATTRIBUTE_') && k.endsWith('_SIGNATURE_TITLE_LOWER')) {
                const id = ID_MAP[ k.slice('ID_UI_STAT_ATTRIBUTE_'.length, -('_SIGNATURE_TITLE_LOWER'.length)) ];
                if (id && !data[ key ]) {
                    key = `champion-signature-${ id }-name`;
                    data[ key ] = v;
                }
            }
            else if (k.startsWith('ID_UI_STAT_SIGNATURE_') && k.endsWith('_SIMPLE')) {
                const id = ID_MAP[ k.slice('ID_UI_STAT_SIGNATURE_'.length, -('_SIMPLE'.length)) ];
                if (id) {
                    key = `champion-signature-${ id }-description`;
                    data[ key ] = v;
                }
            }
            else if (k.startsWith('ID_UI_STAT_SIG_') && k.endsWith('_SIMPLE')) {
                const id = ID_MAP[ k.slice('ID_UI_STAT_SIG_'.length, -('_SIMPLE'.length)) ];
                if (id && !data[ key ]) {
                    key = `champion-signature-${ id }-description`;
                    data[ key ] = v;
                }
            }
            else if (k.startsWith('ID_UI_STAT_ATTRIBUTE_') && k.endsWith('_SIGNATURE_SIMPLE')) {
                const id = ID_MAP[ k.slice('ID_UI_STAT_ATTRIBUTE_'.length, -('_SIGNATURE_SIMPLE'.length)) ];
                if (id && !data[ key ]) {
                    key = `champion-signature-${ id }-description`;
                    data[ key ] = v;
                }
            }

            return data;
        }, {});
    const json = { ...source, ...append };

    fs.writeFileSync(`./${ OUTPUT_FILE }`, `${ JSON.stringify(json, null, 4) }\n`);

    console.log('Character signatures written.'); //eslint-disable-line
}
catch (error) {
    console.error(error); //eslint-disable-line
}
