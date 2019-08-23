
const locForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

locForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const loc = search.value
    
    msg1.textContent = 'loading'
    msg2.textContent = ''
        
    fetch(`/weather?address=${loc}`).then((response) => {
    response.json().then((data) =>{
        if(data.error){
            msg1.textContent = data.error
        } else{
            msg1.textContent = data.location 
            msg2.textContent = data.forecast
            
        }
    })
})
})