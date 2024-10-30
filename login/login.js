document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const loginSubmitBtn = document.getElementById('login-submit-btn')

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = emailInput.value.trim()
        const password = passwordInput.value.trim()

        if (email !== '' && password !== '') {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    window.location.href = "../index.html"
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
                
        }
    })

    function isLogedIn() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                window.location.href = "../index.html"
            } 
        });
    }
    
    isLogedIn()

})