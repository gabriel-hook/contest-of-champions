import roster from '../../service/roster.js';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import Icon from '../Icon.jsx';
import { requestRedraw } from '../../util/animation';
import { clickElementById } from '../../util/element';
import { loadFileFromInput, saveFileEventHandler } from '../../util/io';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view(/* ctrl, args */) {
        const options = [];
        if (window.FileReader) {
            const handleTextInput = (text) => roster.fromCSV(text);
            options.push(
                <MenuOption
                    icon={(
                        <Icon icon="clipboard" />
                    )}
                    title="import-csv"
                    onclick={ () => {
                        clickElementById('roster-importer');
                        requestRedraw(5);
                    }}
                />
            );
            options.push(
                <input
                    id="roster-importer"
                    style="display:none"
                    type="file"
                    accept=".csv"
                    onchange={ function() {
                        /* eslint-disable no-invalid-this */
                        loadFileFromInput((this.files && this.files[ 0 ]), handleTextInput);
                        /* eslint-enable no-invalid-this */
                    }}
                />
            );
        }
        options.push(
            <MenuOption
                icon={(
                        <Icon icon="floppy-o" />
                    )}
                title="export-csv"
                download="champions.csv"
                onclick={ (event) => {
                    saveFileEventHandler(event, 'text/csv', 'champions.csv', roster.toCSV('\r\n'));
                    requestRedraw(5);
                }}
            />
        );
        return (
            <div key="roster-menu">
                <MenuHeader title="roster" />
                { options }
                <MenuOption
                    icon={(
                        <Icon icon="user-times" />
                    )}
                    title="delete-all"
                    onclick={ () => roster.clear() }
                    red="true"
                />
            </div>
        );
    },
};

export default RosterMenu;
