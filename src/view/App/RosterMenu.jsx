import { TYPE_VALUES } from '../../data/model/Type';
import { typeIcon } from '../../data/types';
import roster from '../../service/roster.js';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import MenuOptionGroup from '../Menu/MenuOptionGroup.jsx';
import Icon from '../Icon.jsx';
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
            const handleTextInput = (text) => {
                roster.fromCSV(text);
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
                onclick={ (event) => {
                    saveFileEventHandler(event, 'text/csv', 'champions.csv', roster.toCSV('\r\n'));
                    requestRedraw(5);
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
                TYPE_VALUES.map((type) => (
                    <MenuOption
                        icon={(
                            <Icon icon={ typeIcon(type) } />
                        )}
                        info={ `type-${ type }-name` }
                        selected={ roster.getFilter(type) }
                        onclick={ () => {

                            roster.setFilter(type, !roster.getFilter(type));
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
