// fetch("http://puzzle.mead.io/puzzle").then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })
// });

// fetch("http://localhost:4200/weather?address=reston").then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     });
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const m1 = document.querySelector('#message-1');
const m2  = document.querySelector('#message-2');
console.log(search.value);
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    m1.textContent = '...Loading';
    m2.textContent = '';
    fetch(`/weather?address=${search.value}`).then((res) => {
        res.json().then((data) => {
            console.log(data);
            m1.textContent = data.location;
            m2.textContent = data.forecast;
        })
    })
})