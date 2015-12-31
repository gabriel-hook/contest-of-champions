import lang from '../service/lang';

let notify = function() { };

if('Notification' in window) {

    if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }

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

export { notify };
