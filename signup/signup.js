document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form')
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const signupSubmitBtn = document.getElementById('signup-submit-btn')

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        const password = passwordInput.value.trim()

        if (name !== '' && email !== '' && password !== '') {

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.updateProfile({
                        displayName: name
                    })
                    .then(() => {
                        window.location.href = "../index.html";                        
                    })
                    .catch((error) => {
                    });             
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    window.alert(errorMessage)
                });
        }
        
    })

    
    function isSignedUp() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                window.location.href = "../index.html"
            } 
        });
    }
    
    isSignedUp()
    
})


