document.addEventListener('DOMContentLoaded', () => {
    const pgLists = document.getElementById('pg-list')

    function getPgLists() {
        db.collection("pgs").get().then((querySnapshot) => {
            pgLists.innerHTML = ''
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                const pgItem = document.createElement('div')
                pgItem.classList.add('pg')
                pgItem.innerHTML = `
                    <a href="pg.html?id=${doc.id}">
                    <img src=${data.image}/>
                    <h3>${data.name}</h3>
                    <p class="des">${data.description}</p>
                    <p class="price">Price: $${data.price}/month</p>
                    <p class="location">Location: ${data.location}</p>
                    <p class="contact">Contact: ${data.contact}</p>
                    <button>Book Now</button>
                    </a>
                `
                pgLists.appendChild(pgItem) 
            });
        });
    }

    getPgLists()
    
})