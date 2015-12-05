
function pageView() {
    if(location.hostname === 'localhost')
        return;
    /* eslint-disable no-undef */
    ga('send', 'pageview', {
        'page': location.pathname + location.hash,
    });
    /* eslint-disable no-undef */
}

export { pageView };
