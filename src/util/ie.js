export default (
    window.navigator.userAgent.indexOf('MSIE ') !== -1 ||
    window.navigator.userAgent.indexOf('Edge ') !== -1 ||
    navigator.userAgent.match(/Trident.*rv\:11\./)
)? true: false;
