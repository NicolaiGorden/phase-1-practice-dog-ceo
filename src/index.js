console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", function(){

    let dogUl = document.getElementById("dog-breeds");
    
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(handleImageAppending)

    makeFetch()
    .then(response => {
        let arrOfDogNames = Object.keys(response.message);
        arrOfDogNames.forEach(breed => {
            dogUl.innerHTML += `<li data-info="breed">${breed}</li>`
        });
    });

    dogUl.addEventListener("click", function(event){
        if (event.target.dataset.info === "breed"){
            event.target.style.color = "blue"
        }
    });

    let breedDropdown = document.getElementById("breed-dropdown")
    breedDropdown.addEventListener('change', (event) => {
        makeFetch()
        .then(response => {
            let arrOfDogNames = Object.keys(response.message);
            let filteredArray = arrOfDogNames.filter(breed=> {
                return breed.startsWith(event.target.value)
            })
            removeChildNodes(dogUl)
            filteredArray.forEach(breed => {
                dogUl.innerHTML += `<li data-info="breed">${breed}</li>`
            });
        });
    });
    //DOMcontentloaded
});

let elements = document.getElementById("li")


function handleImageAppending(jsonObject){
    let dogImageContainer = document.getElementById("dog-image-container");
    let arrOfDogsURLs = jsonObject.message
    arrOfDogsURLs.forEach(url => dogImageContainer.innerHTML += makeImageTagString(url))
}


function makeImageTagString(url){
    return `<img src="${url}"/>`
}

function makeFetch() {
    return fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}