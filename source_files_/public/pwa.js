// Registering service worker.
// Navigator is an object in java that represents the browser and info about it. 
if ('serviceWorker' in navigator) { // Checking if the SW propety exists in on this navigator object. 
	navigator.serviceWorker.register('/sw.js') // '.register' is how to register a SW. An argument is then passed containing the path to the SW. This line is an asynchronous task, which then returns a promise.  
		.then((reg) => console.log('service worker registered', reg)) // Passing a callback function that executes when the promise resolves.
		.catch((err) => console.log('service worker not registered', err)); // '.catch' is added to catch any errors, if the promise is rejected. 
} else {
	console.log('service worker not supported')
} // This code will only execute if the broswer the user is in, supports service workers. 

// Checking if notification API exists in the browser. Source: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
Notification.requestPermission(result => {
	if (result === 'granted') {
		if ('Notification' in window) { 
			navigator.serviceWorker.ready.then(registration => { // Upon the service worker registration being detected in the broswer, show the welcome notification.
				registration.showNotification('SOW Templates', { 
					icon: '/images/icons/icon-72.png', // Icon that appears in the notification. 
					body: 'Welcome to SOW Templates!', // Message that apperas in the body.
					tag: 'Sow templates!' 
				});
			});
		}
	}
});

