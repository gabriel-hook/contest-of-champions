import TYPES, { typeIcon } from '../../data/types';
import lang from '../../service/lang';
import roster from '../../service/roster';
import router from '../../service/router';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
import { notify } from '../../util/notification';
import { requestRedraw } from '../../util/animation';
import { clickElementById } from '../../util/element';
import { loadFileFromInput, saveFileEventHandler } from '../../util/io';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const RosterMenu = {
    view() {
        const options = [];
        if (window.FileReader) {
            const handleTextInput = (text, filename) => {
                try {
                    roster.fromCSV(text, filename);
                    notify({
                        message: lang.string('notification-roster-import'),
                        tag: 'roster-import',
                        onclick: () => router.setRoute('/roster'),
                    });
                }
                catch (error) {
                    /* eslint-disable no-console */
                    console.error(error.stack || error);
                    /* eslint-enable no-console */
                    notify({
                        message: lang.string('notification-roster-import-failed')
                            .replace(/\%error\%/g, error),
                        tag: 'roster-import',
                    });
                }
                requestRedraw(5);
            };
            options.push(
                <MenuOption
                    icon={(
                        <Icon icon="clipboard" before />
                    )}
                    title="import-csv"
                    onclick={ () => {
                        clickElementById('roster-importer');
                        m.redraw.strategy('none');
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
                        loadFileFromInput(this, handleTextInput);
                        /* eslint-enable no-invalid-this */
                    }}
                />
            );
        }
        options.push(
            <MenuOption
                icon={(
                    <Icon icon="floppy-o" before />
                )}
                title="export-csv"
                download="champions.csv"
                onclick={ ({ target }) => {
                    saveFileEventHandler(target, 'text/csv', 'champions.csv', roster.toCSV('\r\n'));
                    m.redraw.strategy('none');
                }}
                oncontextmenu={ ({ target }) => {
                    saveFileEventHandler(target, 'text/csv', 'champions.csv', roster.toCSV('\r\n'));
                    m.redraw.strategy('none');
                }}
            />
        );
        options.push(
            <MenuOption
                icon={(
                    <Icon icon="upload" before />
                )}
                title="export-alliance"
                onclick={ () => {
                    const csvElement = document.getElementById('roster-exporter-alliance-csv');
                    csvElement.value = roster.toCSV('\r\n');
                    clickElementById('roster-exporter-alliance-submit');
                    m.redraw.strategy('none');
                }}
            />
        );
        options.push(
            <form
                action="http://coc.frogspawn.de/player/csv_import.php"
                method="post"
                target="_blank"
                style="display:none"
            >
                <textarea id="roster-exporter-alliance-csv" name="csv_string" type="text" />
                <input id="roster-exporter-alliance-submit" type="submit" />
            </form>
        );
        options.push(
            <MenuOption
                icon={(
                    <Icon icon="user-times" before />
                )}
                title="delete-all"
                onclick={ () => {
                    roster.clear();
                    requestRedraw();
                }}
                red="true"
            />
        );
        options.push(
            <MenuSection title="show" />
        );
        const showUpgrades = roster.getUpgrades();
        options.push(
            <MenuOption
                icon={(
                    <Icon icon="arrow-circle-up" before />
                )}
                title="show-upgrades"
                selected={ showUpgrades }
                onclick={ () => {
                    roster.setUpgrades(!showUpgrades);
                    requestRedraw(5);
                }}
            />
        );
        options.push(
            <MenuSection title="sort" />
        );
        const sort = roster.getSort();
        options.push(
            <MenuOption
                icon={(
                    <Icon
                        icon={ (sort.key === 'pi' && sort.direction === 'asc')? 'sort-numeric-asc': 'sort-numeric-desc' }
                        before
                     />
                )}
                title="pi"
                selected={ sort.key === 'pi' }
                onclick={ () => {
                    roster.setSort('pi', (sort.key === 'pi' && sort.direction === 'desc')? 'asc': 'desc');
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuOption
                icon={(
                    <Icon
                        icon={ (sort.key === 'stars' && sort.direction === 'asc')? 'sort-amount-asc': 'sort-amount-desc' }
                        before
                    />
                )}
                title="stars"
                selected={ sort.key === 'stars' }
                onclick={ () => {
                    roster.setSort('stars', (sort.key === 'stars' && sort.direction === 'desc')? 'asc': 'desc');
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuOption
                icon={(
                    <Icon
                        icon={ (sort.key === 'name' && sort.direction === 'desc')? 'sort-alpha-desc': 'sort-alpha-asc' }
                        before
                    />
                )}
                title="name"
                selected={ sort.key === 'name' }
                onclick={ () => {
                    roster.setSort('name', (sort.key === 'name' && sort.direction === 'asc')? 'desc': 'asc');
                    requestRedraw();
                }}
            />
        );
        options.push(
            <MenuSection title="filter" />
        );
        options.push(
            <MenuOptionGroup options={
                [ 1, 2, 3, 4, 5 ].map((star) => (
                    <MenuOption
                        raw={ `${ star }★` }
                        selected={ roster.getFilter(star) }
                        onclick={ () => {
                            roster.setFilter(star, !roster.getFilter(star));
                            requestRedraw();
                        }}
                    />
                ))
            } />
        );
        options.push(
            <MenuOptionGroup options={
                TYPES.map((type) => (
                    <MenuOption
                        icon={(
                            <Icon icon={ typeIcon(type.attr.uid) } />
                        )}
                        info={ `type-${ type.attr.uid }-name` }
                        selected={ roster.getFilter(type.attr.uid) }
                        onclick={ () => {

                            roster.setFilter(type.attr.uid, !roster.getFilter(type.attr.uid));
                            requestRedraw();
                        }}
                    />
                ))
            } />
        );
        return (
            <div m="RosterMenu" key="roster-menu">
                <MenuHeader title="roster" />
                { options }
            </div>
        );
    },
};

export default RosterMenu;
