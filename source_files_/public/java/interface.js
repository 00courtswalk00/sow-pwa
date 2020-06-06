// Searchbar source: https://www.youtube.com/watch?v=3NG8zy0ywIk&t=207s
const list = document.querySelector( '#temp-name' ); // Grabbing the div with all the templates in. 
const searchField = document.forms[ 'searchbar' ].querySelector( 'input' ); // Grabbing the form from the document. 
searchField.addEventListener( 'keyup', ( e ) => { // Attaching a keyup event. 
	const term = e.target.value.toLowerCase(); // Getting the value from the input field and converting the string to lowercase. 
	const templates = list.getElementsByTagName( 'li' ); // Getting all the li tags with the template titles in, in the div with the id '#temp-name'. 
	Array.from( templates )
		.forEach( ( temp ) => { // Creating an array from the templates. Each iteration round, want to check if the template is equal to the input field.
			const title = temp.firstElementChild.textContent; // Getting the span class name and title.
			if ( title.toLowerCase()
				.indexOf( term ) != -1 ) { // Checking if term is in the template title, if the term is not equal to -1 (is there in the string).
				temp.parentElement.parentElement.parentElement.parentElement.style.display = 'block'; // If it is, show the whole template card.
			} else {
				temp.parentElement.parentElement.parentElement.parentElement.style.display = 'none'; //If it isn't, get rid of the entire template card, as it doesn't match the search query. 
			}
		} );
} );
// Heart trigger.
document.querySelectorAll( '.heart' )
	.forEach( item => { // For each heart element that is clicked.
		item.addEventListener( 'click', ( e ) => { // Add an event listener to the heart button.
			window.alert( "Template has been added to your favourites" ) // Notify the user the template "has been added".
		} )
	} )
