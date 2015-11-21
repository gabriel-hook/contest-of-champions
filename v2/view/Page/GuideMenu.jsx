import MenuSection from '../App/Menu/MenuSection.jsx';
import MenuOption from '../App/Menu/MenuOption.jsx';
import MenuIcon from '../App/Menu/MenuIcon.jsx';
import MenuImage from '../App/Menu/MenuImage.jsx';
import { uidsByType } from '../../data/champions.js';
import router from '../../service/router.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const GuideMenu = {
    view(ctrl, args) {
        const { uid } = args;
        const currentUid = uid;
        const options = [];
        options.push(
            <MenuSection
                icon={(
                    <MenuIcon icon="user"/>
                )}
                title="guides"
            />
        );
        uidsByType.forEach(({ typeId, uids }) => {
            options.push(
                <MenuSection title={ `type-${ typeId }-name` } />
            );
            uids.map((uid) => options.push(
                <MenuOption
                    icon={(
                        <MenuImage src={ `images/champions/portrait_${ uid }.png` } />
                    )}
                    title={ `champion-${ uid }-name` }
                    selected={ currentUid === uid }
                    onclick={ () => router.setRoute(`/guide/${ uid }`) }
                />
            ));
        });
        return (
            <div>
                { options }
            </div>
        );
    },
};

export default GuideMenu;
