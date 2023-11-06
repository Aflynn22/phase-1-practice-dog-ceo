console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
let dogImages
let dogBreeds
let dropDown
let filter
document.addEventListener("DOMContentLoaded", ()=>{
    dogImages = document.querySelector("#dog-image-container")
    dogBreeds = document.querySelector("#dog-breeds")
    dropDown = document.querySelector("#breed-dropdown")
    dropDown.addEventListener("change", (e)=>{
        dogBreeds.textContent = ""
        filter = e.target.value
        filterDogBreeds()
    })
    fetchDogImages()
    .then((json)=>{
        renderDogImages(json)
    })

    fetchDogBreeds()
    .then((json)=>{
        renderDogBreeds(json)
    })
})


async function fetchDogImages(){
    return fetch(imgUrl)
    .then((resp)=>resp.json())
    .then((json)=>json.message)
}

async function fetchDogBreeds(){
    return fetch(breedUrl)
    .then((resp)=>resp.json())
    .then((json)=>(Object.keys(json.message)))
}

function renderDogImages(dogPictureArray){
    dogPictureArray.forEach(dogPicture => {
        let img = document.createElement("img")
        img.src = dogPicture
        dogImages.appendChild(img)
    });
}

function renderDogBreeds(listOfBreeds){
    listOfBreeds.forEach(breed =>{
        let li = document.createElement("li")
        li.addEventListener("click",(e)=>{
            e.target.style.color = "magenta"
        })
        li.textContent = `${breed}`
        dogBreeds.appendChild(li)
    })
}

function filterDogBreeds(){
    fetchDogBreeds()
    .then((json)=>{
        return json.filter((breed)=>breed[0] === filter)
    }).then((filteredBreeds)=>renderDogBreeds(filteredBreeds))
}








