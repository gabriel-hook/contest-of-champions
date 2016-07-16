import { championTypeMap } from '../../data/champions';
import guides from '../../data/guides';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import ImageIcon from '../ImageIcon.jsx';
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
        championTypeMap.forEach(({ typeId, uids }) => {
            options.push(
                <MenuSection title={ `type-${ typeId }-name` } />
            );
            uids.map((uid) => options.push(
                <MenuOption
                    key={ `guide-champion-${ uid }` }
                    icon={(
                        <ImageIcon src={ `images/champions/portrait_${ uid }.png` } icon="user" before />
                    )}
                    invalid={ !guides[ uid ] || guides[ uid ].invalid }
                    title={ `champion-${ uid }-name` }
                    selected={ currentUid === uid }
                    href={ `/guide/${ uid }` }
                />
            ));
        });
        return (
            <div m="GuideMenu" key={ 'guide-menu' }>
                { options }
            </div>
        );
    },
};

export default GuideMenu;
