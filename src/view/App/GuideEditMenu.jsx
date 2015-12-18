import router from '../../service/router';
import guides from '../../data/guides';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import ImageIcon from '../ImageIcon.jsx';
import Icon from '../Icon.jsx';
import isIE from '../../util/ie';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const GuideMenu = {
    view(ctrl, args) {
        const { uid } = args;
        const options = [];
        options.push(
            <MenuHeader
                icon={(
                        <ImageIcon src={ `images/champions/portrait_${ uid }.png` } icon="user" />
                    )}
                title={ `champion-${ uid }-name` }
            />
        );
        options.push(
            <MenuOption
                icon={(
                    <Icon icon="user" />
                )}
                title="view-guide"
                onclick={ () => {
                    router.setRoute(`/guide/${ uid }`);
                    requestRedraw();
                }}
            />
        );
        const exportJSON = (event) => {
            const filename = `${ uid }.json`;
            const json = JSON.stringify(guides[ uid ] || {}, null, 4);
            if(isIE) {
                const exporter = document.getElementById('roster-exporter');
                exporter.document.open('text/html', 'replace');
                exporter.document.write(`sep=,\r\n${ json }`);
                exporter.document.close();
                exporter.focus();
                exporter.document.execCommand('SaveAs', true, filename);
            }
            else {
                const { target } = event;
                target.setAttribute('download', filename);
                target.setAttribute('href', `data:text/csv;charset=utf-8,${ encodeURIComponent(json) }`);
            }
            requestRedraw();
        };
        options.push(
            <MenuOption
                icon={(
                        <Icon icon="floppy-o" />
                    )}
                title="export-json"
                onclick={ exportJSON }
            />
        );
        return (
            <div key={ `guide-menu` }>
                { options }
            </div>
        );
    },
};

export default GuideMenu;
