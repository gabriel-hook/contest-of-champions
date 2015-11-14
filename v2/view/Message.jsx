import './Message.scss';
import m from 'mithril';

const Message = {
	view(ctrl, args) {
		const { value } = args;
		return (
			<div class="message">
				{ value }
			</div>
		);
	}
}

export default Message;
