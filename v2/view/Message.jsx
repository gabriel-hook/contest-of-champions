import './Message.scss';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Message = {
    view(ctrl, args) {
        const { value } = args;
        return (
            <div class="message">
                { value }
            </div>
        );
    },
};

export default Message;
