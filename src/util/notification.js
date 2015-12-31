import lang from '../service/lang';

let notify = function() { };
let denotify = function() { };

if('Notification' in window) {

    if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }

    const removeNotification = (tag) => {
        const notification = new Notification('', { tag });
        setTimeout(() => notification.close());
    };

    const createNotification = ({ message, tag, onclick }) => {
        const notification = new Notification(`${ lang.get('champions') }\n${ message }`, {
            tag,
            icon: 'images/icon.png',
        });
        if(onclick) {
            notification.onclick = function() {
                onclick();
                notification.close();
            };
        }
    };

    denotify = (tag) => {
        if(Notification.permission === 'granted') {
            removeNotification(tag);
        }
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
            if(Notification.permission === 'granted') {
                removeNotification(tag);
            }
        });
    };

    notify = (notification) => {
        if(Notification.permission === 'granted') {
            createNotification(notification);
        }
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
            if(Notification.permission === 'granted') {
                createNotification(notification);
            }
        });
    };
}

export { notify, denotify };
