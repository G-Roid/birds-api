// Global variables
document.querySelector('#searchButton').addEventListener('click', searchForBird)

function searchForBird() {
    const bird = document.querySelector('#searchInput').value
    console.log(bird)
    fetch(`https://bird-api-aus.herokuapp.com/api/${bird}`)
        .then(response => {
            console.log(typeof response)
            console.log(response)
            return response.json()

        })
        .then(data => {
            console.log(data)
            document.querySelector('#birdName').textContent = data.birdName
            document.querySelector('#image').setAttribute('src', data.image)
            document.querySelector('#scifiName').textContent = data.scifiName
            document.querySelector('#description').textContent = data.description

            

            document.querySelector('#searchInput').value  = ''


        })
        
}
