import { uidsByType } from '../../data/champions';
import guides from '../../data/guides';
import router from '../../service/router';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import ImageIcon from '../ImageIcon.jsx';
import { requestRedraw } from '../../util/animation';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const GuideMenu = {
    view(ctrl, { uid }) {
        const currentUid = uid;
        const options = [];
        options.push(
            <MenuHeader title="guides" />
        );
        uidsByType.forEach(({ typeId, uids }) => {
            options.push(
                <MenuSection title={ `type-${ typeId }-name` } />
            );
            uids.map((uid) => options.push(
                <MenuOption
                    key={ `guide-champion-${ uid }` }
                    icon={(
                        <ImageIcon src={ `images/champions/portrait_${ uid }.png` } icon="user" />
                    )}
                    invalid={ !guides[ uid ] }
                    title={ `champion-${ uid }-name` }
                    selected={ currentUid === uid }
                    href={ `/guide/${ uid }` }
                />
            ));
        });
        return (
            <div m="GuideMenu" key={ `guide-menu` }>
                { options }
            </div>
        );
    },
};

export default GuideMenu;
