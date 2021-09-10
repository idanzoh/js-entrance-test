//Constants
const searchButton = document.getElementById("btnSearch");
const searchBox = document.getElementById("txtSearch");
const resultsArea = document.getElementById("spnResults");


let renderResults =(data) => {
    let bookImage,bookDesc;
    resultsArea.innerHTML = "";
    for(let i=0; i<data.items.length; i++) {
        console.log(data.items);
        // Check if there's a book image
        if (data.items[i].volumeInfo.imageLinks) {bookImage=`<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`} else {bookImage = "<p>No Image</p>"}
        // Check if there's a book description
        if (data.items[i].volumeInfo.description) {bookDesc=data.items[i].volumeInfo.description} else {bookDesc = "No Description"}
        // Render Book
        resultsArea.innerHTML += `<h2 class="card"> ${bookImage} <p>${data.items[i].volumeInfo.title}</p> <p>${bookDesc}</p></h2>`;
    }
}

let searchFunction = (evt)=> {
    if (searchBox.value) {
        searchButton.value = "Searching"
    let input = searchBox.value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
    .then(response => response.json())
    .then(data => renderResults(data));

    evt.preventDefault();
}

else {
    alert("Search box is empty!");
}
}



searchButton.addEventListener("click", searchFunction);
