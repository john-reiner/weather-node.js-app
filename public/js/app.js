const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.getElementById('message-one')
const messageTwo = document.getElementById('message-two')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    locationSearch = searchTerm.value

    messageOne.innerText = 'loading...'
    messageTwo.innerText = ''

    fetch(`/weather?address=${locationSearch}`)
    .then(response => response.json())
    .then(data =>{
        if (data.error) {
            messageOne.innerText = data.error
            
        } else {
            messageOne.innerText = data.location
            messageTwo.innerText = data.forecast
        }
    })
})