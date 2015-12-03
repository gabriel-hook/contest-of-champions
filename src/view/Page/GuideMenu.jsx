import { uidsByType } from '../../data/champions';
import router from '../../service/router';
import MenuHeader from '../Menu/MenuHeader.jsx';
import MenuSection from '../Menu/MenuSection.jsx';
import MenuOption from '../Menu/MenuOption.jsx';
import ImageIcon from '../ImageIcon.jsx';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const GuideMenu = {
    view(ctrl, args) {
        const { uid } = args;
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
                    icon={(
                        <ImageIcon src={ `images/champions/portrait_${ uid }.png` } icon="user" />
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
