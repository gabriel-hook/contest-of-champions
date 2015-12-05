
function pageView() {
    /* eslint-disable no-undef */
    ga('send', 'pageview', {
        'page': location.pathname + location.hash,
    });
    /* eslint-disable no-undef */
}

export default {
    pageView,
};
