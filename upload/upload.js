document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form')
    const pgNameInput = document.getElementById('pg-name')
    const pgDescriptionInput = document.getElementById('pg-description')
    const pgPriceInput = document.getElementById('pg-price')
    const pgLocationInput = document.getElementById('pg-location')
    const contactInfoInput = document.getElementById('contact-info')
    const pgImageInput = document.getElementById('pg-image')

    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = pgNameInput.value.trim()
        const description = pgDescriptionInput.value.trim()
        const price = parseInt(pgPriceInput.value.trim())
        const location = pgLocationInput.value.trim()
        const contact = parseInt(contactInfoInput.value.trim())
        const image = pgImageInput.files[0]  
        
        if(name !== '' && description !== '' && location !== '' && !isNaN(contact) && !isNaN(price) && price > 0 && image) {
                const storageRef = firebase.storage().ref(`images/${image.name}_${Date.now()}`)
                const upload = storageRef.put(image)
        
                upload.on('state_changed', (snapshot) => {
                    upload.snapshot.ref.getDownloadURL().then((url) => {
                        const newPgList = {
                            id: Date.now(),
                            name: name,
                            description: description,
                            price: price,
                            location: location,
                            contact: contact,
                            image: url
                        }
            
                        db.collection("pgs").add(newPgList)
                            .then((docRef) => {
                                pgNameInput.value = ''
                                pgDescriptionInput.value = ''
                                pgPriceInput.value = ''
                                pgLocationInput.value = ''
                                contactInfoInput.value = ''
                                pgImageInput.value = ''
                                window.location.reload()
                            })
                            .catch((error) => {
                                window.alert("Error adding document");
                            });            
                    })
                }, (error) => {                  
                    window.alert('Error uploading the file')
                })        
        }       
    })
})


