console.log('manager loaded')

document.querySelector('#updateButton').addEventListener('click', updateEntry)

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