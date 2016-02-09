import deepEqual from 'deep-equal';
import lang from '../service/lang';

const pure = (Component) => ({
    controller(args) {
        this.pure = true;
        if(Component.controller) {
            Component.controller.call(this, args);
        }
        this.state = { };
    },
    view(ctrl, args) {
        let controller;
        if(!ctrl.state.view || !deepEqual(ctrl.state.args, args) || !deepEqual(ctrl.state.ctrl, controller = {
            ...ctrl,
            lang: lang.current,
            state: null,
        })) {
            ctrl.state.ctrl = controller;
            ctrl.state.args = args;
            ctrl.state.view = Component.view.call(this, ctrl, args);
        }
        else {
            return {
                ...ctrl.state.view,
                children: {
                    subtree: 'retain',
                },
            };
        }
        return ctrl.state.view;
    },
});

export default pure;
