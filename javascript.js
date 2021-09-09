console.log('loaded');
const searchButton = document.getElementById("btnSearch");
const searchBox = document.getElementById("txtSearch");
const resultsArea = document.getElementById("spnResults");


let renderResults =(data) => {
    for(var i=0; i<data.items.length; i++) {
        console.log(data.items);
        resultsArea.innerHTML += `<h2><img src="${data.items[i].volumeInfo.imageLinks.thumbnail}"></h2>`;
        resultsArea.innerHTML += `<h2>${data.items[i].volumeInfo.title}</h2>`;
        resultsArea.innerHTML += `<h2>${data.items[i].volumeInfo.description}</h2>`;
    }
}

let searchFunction = (evt)=> {
    if (searchBox.value) {
    alert("Searching");
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
