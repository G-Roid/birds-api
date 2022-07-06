window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    getBirds()
});


console.log('manager loaded')

document.querySelector('#updateButton').addEventListener('click', updateEntry)
document.querySelector('#deleteButton').addEventListener('click', deleteEntry)

async function updateEntry(){
    console.log('things got updated')
    try{
        const response = await fetch('/updateEntry', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            birdName: document.getElementsByName("birdName")[0].value,
            scifiName: document.getElementsByName("scifiName")[0].value,
            image: document.getElementsByName("image")[0].value,
            description: document.getElementsByName("description")[0].value,
        })
    })
    const data = await response.json()
    console.log(data)
    location.reload()

    }catch(err){
        console.log(err)
    }
}

async function deleteEntry() {
    console.log('delayte...')
    // const input = document.querySelector('#deleteInput')
    const input = document.querySelector('#birdSelect')
    try {
        const respose = fetch('/deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                birdName: input.value
            })        
        })
        location.reload()
        

    } catch(err) {
        console.log(err)
    }
}


async function getBirds() {
    try {        
        const response = await fetch(`https://bird-api-aus.herokuapp.com/api`)
        const data = await response.json()

        console.log(Object.keys(data).length)
        

        for (key in data) {   
            // console.log(data[key].birdName)
            let newOption = document.createElement('option')

            let optionText = document.createTextNode(`${data[key].birdName}`)      
            newOption.appendChild(optionText) 
    

            document.querySelector('#birdSelect').appendChild(newOption) 
            console.log(newOption)        
        }

    } catch(error) {
        console.error(error)
    }
}