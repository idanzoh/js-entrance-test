    //Constants
    const searchButton = document.getElementById("btnSearch");
    const searchBox = document.getElementById("txtSearch");
    const resultsArea = document.getElementById("spnResults");


    let renderResults =(data) => {
        let bookImage,bookDesc;
        searchButton.innerText = "Search"
        searchBox.value = ""
        resultsArea.innerHTML = "";
        for(let i=0; i<data.items.length; i++) {
            // Check if there's a book image
            if (data.items[i].volumeInfo.imageLinks) {bookImage=`<img src="${data.items[i].volumeInfo.imageLinks.thumbnail}">`} else {bookImage = "<p>No Image</p>"}
            // Check if there's a book description
            if (data.items[i].volumeInfo.description) {bookDesc=data.items[i].volumeInfo.description} else {bookDesc = "No Description"}
            // Render Book
            resultsArea.innerHTML += `<h2 class="card"> <div>${bookImage}</div> <p>${data.items[i].volumeInfo.title}</p> <p class="bookDesc">${bookDesc}</p></h2>`;
        }
    }

    let searchFunction = (evt)=> {
        if (searchBox.value) {
            searchButton.innerText = "Searching"
        let input = searchBox.value;

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}`).then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong');
            }
          })
          .then((responseJson) => {
            // Do something with the response
            renderResults(responseJson)
          })
          .catch((error) => {
            console.log(error)
          });
        
        evt.preventDefault();
    }

    else {
        evt.preventDefault();
        searchBox.classList.add("warning");
    }
    }

    searchButton.addEventListener("click", searchFunction);
    searchBox.addEventListener("click", ()=> {searchBox.classList.remove("warning");})
