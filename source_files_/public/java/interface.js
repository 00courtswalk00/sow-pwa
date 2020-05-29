//searchbar source: https://www.youtube.com/watch?v=3NG8zy0ywIk&t=207s
const list = document.querySelector( '#temp-name' ); //grabbing the div with all the 
const searchField = document.forms[ 'searchbar' ].querySelector( 'input' ); //grabbing the form from the document, the querying the input field. 
searchField.addEventListener( 'keyup', ( e ) => { //attaching a keyup event 
	const term = e.target.value.toLowerCase(); //getting the value from the input field and converting the string to lowercase. 
	const templates = list.getElementsByTagName( 'li' ); //getting all the li tags with the template titles in, in '#temp-name'. 
	Array.from( templates )
		.forEach( ( temp ) => { // creating an array from the templates. Each iteration round, want to check if the template is equal to the input field.
			const title = temp.firstElementChild.textContent; //getting the span class name and title.
			if ( title.toLowerCase()
				.indexOf( term ) != -1 ) { //checking if term is in the template title, if the term is not equal to -1 (is there in the string).
				temp.parentElement.parentElement.parentElement.parentElement.style.display = 'block'; //if it is, show the whole template card.
			} else {
				temp.parentElement.parentElement.parentElement.parentElement.style.display = 'none'; //If it isn't, get rid of the entire template card, as it doesn't match the search query. 
			}
		} );
} );
//heart trigger
document.querySelectorAll( '.heart' )
	.forEach( item => { //for each heart element that is clicked.
		item.addEventListener( 'click', ( e ) => { //add an event listener to the heart button.
			window.alert( "Template has been added to your favourites" ) //notify the user the template "has been added".
		} )
	} )