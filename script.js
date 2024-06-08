import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
const appSettings = {
    databaseURL: "https://grocery-shopping-list-5c574-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
//it intializes our app and takes an argument
const app = initializeApp(appSettings);
//it takes the database link from the app
const db = getDatabase(app)
//it takes to arguments one the database and the reference
// A Reference represents a specific location in your database and allows you to read or write data at that location
const itemsinDB = ref(db, "items")
//push allows to push data at a specific location or the reference in the database 
const input = document.querySelector('input')
const btn = document.querySelector('button')
const itemArea = document.querySelector('ul')
btn.addEventListener('click', () => {
    if (input.value != "") {
        push(itemsinDB, input.value)
        input.value = " "
    } else {
        alert('Enter the name of the item in the input box')
    }
})
//onValue helps in fetching data from the database
//it runs whenever the database is changed
onValue(itemsinDB, function (snapshot) {
    if (snapshot.exists()) {
        while (itemArea.firstChild) {
            itemArea.removeChild(itemArea.firstChild)
        }
        const itemsstoredinDB = Object.entries(snapshot.val())
        for (let i = 0; i < itemsstoredinDB.length; i++) {
            const currentItem = itemsstoredinDB[i];
            appendingItem(currentItem)
        }
    } else {
        itemArea.innerHTML = "No items her yet..."
    }
})
function appendingItem(item) {
    const itemID = item[0]
    const itemValue = item[1]
    const listItem = document.createElement('li')
    listItem.innerHTML = `${itemValue}`
    itemArea.appendChild(listItem)
    listItem.addEventListener('dblclick', () => {
        const exactloactionOfItem = ref(db, `items/${itemID}`)
        remove(exactloactionOfItem)
    })
}