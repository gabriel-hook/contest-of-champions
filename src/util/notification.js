import lang from '../service/lang';

let notify = function() { };
let denotify = function() { };

const notifications = {};

function isNewNotificationSupported() {
    if (!window.Notification || !Notification.requestPermission)
        return false;
    if (Notification.permission === 'granted')
        throw new Error('You must only call this *before* calling Notification.requestPermission(), otherwise this feature detect would bug the user with an actual notification!');
    try {
        new Notification('');
    }
    catch (e) {
        if (e.name === 'TypeError')
            return false;
    }
    return true;
}

if('Notification' in window) {

    if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }

    const removeNotification = ({ tag = 'default' }) => {
        if(notifications[ tag ]) {
            notifications[ tag ].forEach((notification) => notification.close && notification.close());
            notifications[ tag ] = [];
        }
    };

    const createNotification = ({ message, tag = 'default', icon = 'images/icon.png', onclick }) => {
        if('ServiceWorkerRegistration' in window && ServiceWorkerRegistration.showNotification) {
            ServiceWorkerRegistration.showNotification(`${ lang.get('champions') }\n${ message }`, { tag, icon });
        }
        else {
            const notification = new Notification(`${ lang.get('champions') }\n${ message }`, { tag, icon });
            if (onclick) {
                notification.onclick = function() {
                    onclick();
                    notification.close();
                };
            }
            notifications[ tag ] = [
                ...(notifications[ tag ] || []),
                notification,
            ];
        }
    };

    denotify = (notification) => {
        let ran = false;
        if(Notification.permission === 'granted') {
            removeNotification(notification);
            ran = true;
        }
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
            if(Notification.permission === 'granted' && !ran) {
                removeNotification(notification);
            }
        });
    };

    notify = (notification) => {
        let ran = false;
        if(Notification.permission === 'granted') {
            ran = true;
            createNotification(notification);
        }
        Notification.requestPermission((status) => {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
            if(Notification.permission === 'granted' && !ran) {
                createNotification(notification);
            }
        });
    };
}

export { notify, denotify };
