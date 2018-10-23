const wp_woocommerce_hash = getCookie('woocommerce_cart_hash');
const wp_woocommerce_session = getCookie('wp_woocommerce_session_[^=]+');

if(wp_woocommerce_session)
{
    const sessionId = (wp_woocommerce_session.split('%7C%7C'))[0];
    console.log(sessionId);
}
else
{
	throw Error('No sessions found.');
}

function getCookie(name) {
     
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    
    return v ? v[2] : null;
}