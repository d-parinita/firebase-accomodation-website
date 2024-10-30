document.addEventListener('DOMContentLoaded', () => {
    const bookingList = document.getElementById('booking-list')
    const noBooking = document.getElementById('no-booking')
    let userUid = null

    function isSignedUp() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                userUid = uid
                getBookedPg()
            } 
        });
    }
    
    isSignedUp()

    function getBookedPg() {
        db.collection("booking").where("uid", "==", userUid)
            .get()
            .then((querySnapshot) => {
                bookingList.innerHTML = ''
                querySnapshot.forEach((bookingDoc) => {
                    if(bookingDoc.exists){
                        bookingList.classList.remove('hidden')
                        noBooking.classList.add('hidden')
                    }
                    const docData = bookingDoc.data()
                    const docRef = db.collection("pgs").doc(docData.pgId);
                    docRef.get().then((doc) => {
                        if (doc.exists) {
                            const data = doc.data()
                            const bookedPg = document.createElement('div')
                            bookedPg.classList.add('booking-item')
                            bookedPg.innerHTML = `
                                <img src=${data.image}">
                                <div class="booking-details">
                                    <h3>${data.name}</h3>
                                    <p class="description">${data.description}</p>
                                    <p class="price">Price: $${data.price}/month</p>
                                    <button class="cancel-btn" data-id=${bookingDoc.id}>Cancel Booking</button>
                                </div>
                            `
                        bookingList.appendChild(bookedPg) 
                        }
                    })
                });
            })
            .catch((error) => {
                
            });
    }

    bookingList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.getAttribute('data-id')
            db.collection("booking").doc(id).delete().then(() => {
                window.location.reload()
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    })

})
