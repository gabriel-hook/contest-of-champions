import './Message.scss';
import pure from '../util/pure';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Message = {
    view(ctrl, args) {
        const { value } = args;
        return (
            <div m="Message" class="message">
                { value }
            </div>
        );
    },
};

export default pure(Message);
