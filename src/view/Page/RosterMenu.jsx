import roster from '../../service/roster.js';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const ie = (
    window.navigator.userAgent.indexOf('MSIE ') !== -1 ||
    window.navigator.userAgent.indexOf('Edge ') !== -1 ||
    navigator.userAgent.match(/Trident.*rv\:11\./)
)? true: false;

function importCSV() {
    /* eslint-disable no-invalid-this */
    const file = this.files && this.files[ 0 ];
    /* eslint-enable no-invalid-this */
    if (file) {
        const importer = document.getElementById('roster-importer');
        const reader = new FileReader();
        reader.onload = ({ target }) => {
            roster.fromCSV(target.result);
            m.redraw();
        };
        reader.readAsText(file);
        importer.value = '';
    }
}

const RosterMenu = {
    view(/* ctrl, args */) {
        const options = [];
        if (window.FileReader) {
            const importClick = () => {
                const importer = document.getElementById('roster-importer');
                const event = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true,
                });
                importer.dispatchEvent(event);
            };
            options.push(
                <MenuOption
                    icon={(
                        <Icon icon="clipboard" />
                    )}
                    title="import-csv"
                    onclick={ importClick }
                />
            );
            options.push(
                <input
                    id="roster-importer"
                    style="display:none"
                    type="file"
                    accept=".csv"
                    onchange={ importCSV }
                />
            );
        }
        if(window) {
            const exportCSV = (event) => {
                if(ie) {
                    const csv = roster.toCSV('\r\n');
                    const exporter = document.getElementById('roster-exporter');
                    exporter.document.open('text/html', 'replace');
                    exporter.document.write(`sep=,\r\n${ csv }`);
                    exporter.document.close();
                    exporter.focus();
                    exporter.document.execCommand('SaveAs', true, 'champions.csv');
                }
                else {
                    const { target } = event;
                    const csv = roster.toCSV();
                    target.setAttribute('download', 'champions.csv');
                    target.setAttribute('href', `data:text/csv;charset=utf-8,${ encodeURIComponent(csv) }`);
                }
            };
            options.push(
                <MenuOption
                    icon={(
                            <Icon icon="floppy-o" />
                        )}
                    title="export-csv"
                    onclick={ exportCSV }
                />
            );
        }
        return (
            <div>
                <MenuHeader title="roster" />
                { options }
                <MenuOption
                    icon={(
                        <Icon icon="user-times" />
                    )}
                    title="delete-all"
                    onclick={ () => roster.clear() }
                />
            </div>
        );
    },
};

export default RosterMenu;
