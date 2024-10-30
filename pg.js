document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
    const pgDetails = document.getElementById('pg-details')
    let userUid = null

    const pgData = []

    function getPgDoc() {
        const docRef = db.collection("pgs").doc(id);
        docRef.get().then((doc) => {
            if (doc.exists) {
                pgDetails.innerHTML = ''
                const data = doc.data()
                const pgItem = document.createElement('div')
                pgItem.innerHTML = `
                    <div class="pg-header">
                        <img src=${data.image} alt="PG Image" class="pg-image">
                        <div class="pg-info">
                            <h1>${data.name}</h1>
                            <p class="location">Location: ${data.location}</p>
                            <p class="price">$${data.price}/month</p>
                            <button class="book-now">Book Now</button>
                        </div>
                    </div>
                    <div class="pg-content">
                        <h2>Description</h2>
                        <p>${data.description}</p>
                    </div>
                `
                pgDetails.appendChild(pgItem)
                pgData.push(data)
            } else {
                
            }
        }).catch((error) => {
            window.alert('No such document')
        });
    }

    getPgDoc()

    function isSignedUp() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                userUid = uid
            } else {
                window.location.href = "./signup/signup.html"
            }
        });
    }
    
    isSignedUp()

    pgDetails.addEventListener('click', (e) => { 
        const bookingDetails = {
            pgId: id,
            uid: userUid 
        }
        if (e.target.tagName === 'BUTTON') {
            db.collection("booking").add(bookingDetails)
                .then((docRef) => {
                    window.alert("Added Successfully!")
                })
                .catch((error) => {
                    window.alert("Error adding document");
                });
        }
    })
})
