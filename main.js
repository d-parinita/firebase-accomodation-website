document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const loginBtn = document.getElementById('login-btn')
    const signupBtn = document.getElementById('signup-btn')
    const logoutBtn = document.getElementById('logout-btn')
    const nameDisplay = document.getElementById('name-display')

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    function isSignedUp() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                loginBtn.classList.add('hidden')
                signupBtn.classList.add('hidden')
                logoutBtn.classList.remove('hidden')
                nameDisplay?.classList.remove('hidden')
            } 
        });
    }
    
    isSignedUp()

    function logOut() {
        firebase.auth().signOut()
            .then(() => {
                window.location.href = "index.html"
            })
            .catch(e => {
                window.alert('Error in logout')
            });
    }

    logoutBtn.addEventListener('click', () => {
        logOut()
    })
})

