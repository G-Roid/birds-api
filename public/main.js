// Global variables
document.querySelector('#searchButton').addEventListener('click', searchForBird)

function searchForBird() {
    const bird = String(document.querySelector('#searchInput').value).toLowerCase()
    console.log(bird)
    fetch(`https://bird-api-aus.herokuapp.com/api/${bird}`)
        .then(response => {
            console.log(typeof response)
            console.log(response)
            return response.json()

        })
        .then(data => {
            console.log(data)

            document.querySelector('#birdName').textContent = capitalizeFirstLetter(data.birdName)
            document.querySelector('#image').setAttribute('src', data.image)
            document.querySelector('#scifiName').textContent = data.scifiName
            document.querySelector('#description').textContent = data.description
     

            document.querySelector('#searchInput').value  = ''


        })
        
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
