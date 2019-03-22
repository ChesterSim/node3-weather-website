// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if(data.errorMessage){
//             console.log(data.errorMessage);
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From JavaScript';


weatherForm.addEventListener('submit', (e) => { // e for event
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = "";
    const location = search.value;

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.errorMessage){
                messageOne.textContent = data.errorMessage;
                // console.log(data.errorMessage);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                // console.log(data.location);
                // console.log(data.forecast);
            }
        })
    })
})