//Offline alert/notofication. Source https://medium.com/@tylerargo/how-to-add-an-offline-notification-to-your-pwa-c11ee640822b
window.addEventListener( "load", () => { // event is fired when the page loads 
	function handleNetworkChange( event ) {
		if ( navigator.onLine ) { // returns a boolean value regarding the online status of the broswer.
			document.body.classList.remove( "offline" ); // if true, remove offline notification.
		} else { // 
			document.body.classList.add( "offline" ); // if false, add offline notification. 
		}
	}
	window.addEventListener( "online", handleNetworkChange );
	window.addEventListener( "offline", handleNetworkChange );
} );
//   customsied install. Source: https://web.dev/customize-install/
window.addEventListener('beforeinstallprompt', (e) => {
	e.preventDefault(); // Prevents immediate prompt display
	var button = document.querySelector( 'button' ); //getting the install button
	button.removeAttribute( 'hidden' ); 
	button.addEventListener( 'click', () => {
		e.prompt(); 
		button.setAttribute( 'hidden', true ); // hiding the button once the user has clicked it 
	} );
} );

