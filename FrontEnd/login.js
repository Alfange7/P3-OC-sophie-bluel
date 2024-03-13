// Add an event listener to the form to handle the form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Send the data to the server
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Identifiants incorrects');
        }
        return response.json();
    })
    .then(data => {
        // Store the token in the local storage
        localStorage.setItem('token', data.token);

        // Redirect the user to the right page
        window.location.href = 'index.html'; // a modifier quand j'aurai fait la suite
    })
    .catch(error => {
        alert(error.message);
    });
});
