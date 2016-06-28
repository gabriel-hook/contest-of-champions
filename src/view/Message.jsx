import './Message.scss';
import pure from '../util/pure';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

const Message = {
    view(ctrl, { icon, value, alt }) {
        return (
            <div m="Message" class="message">
                { icon }
                { value }
                { alt && (
                    <div class="message-alt">{ alt }</div>
                ) || null }
            </div>
        );
    },
};

export default pure(Message);
