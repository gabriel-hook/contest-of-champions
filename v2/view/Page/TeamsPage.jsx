import './TeamsPage.scss';
import Message from '../Message.jsx';
import lang from '../../service/lang.js';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Teams = {
    view(/* ctrl, args */) {

        return (
            <div class="teams">
                <Message value={ `${ 0 } ${ lang.get('teams') }` } />
                <div class="clear"></div>
            </div>
        );
    },
};

export default Teams;
