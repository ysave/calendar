const form = document.getElementById('register-form')
form.addEventListener('sumbit', registerUser)

async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById('name').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            email
        })
    }).then(res => res.json())

    console.log(result)
}
const loginform = document.getElementById('login-form')
loginform.addEventListener('submit', login)

async function login(event) {
    event.preventDefault()
    const username = document.getElementById('name').value
    const password = document.getElementById('password').value

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        console.log('Got the token: ', result.data)
        localStorage.setItem('token', result.data)
        alert('Success')
    } else {
        alert(result.error)
    }
}