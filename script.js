import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGYOSk7MyC5baRN7ggWb8cmjIaiorEjmU",
    authDomain: "inventory-management-94965.firebaseapp.com",
    projectId: "inventory-management-94965",
    storageBucket: "inventory-management-94965.firebasestorage.app",
    messagingSenderId: "575556038366",
    appId: "1:575556038366:web:44c8b8bd5c932fd5731c4f",
    measurementId: "G-L5HQC1XC37"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const inventoryCollection = collection(db, "inventory");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("itemForm");
    const inventoryList = document.getElementById("inventoryList").getElementsByTagName("tbody")[0];
    const totalItems = document.getElementById("totalItems");
    const totalValue = document.getElementById("totalValue");
    const searchBox = document.getElementById("searchBox");
    const searchButton = document.getElementById("searchButton");
    const sortOptions = document.getElementById("sortOptions");
    let inventoryData = [];

    loadInventory();

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newItem = {
            name: document.getElementById("itemName").value,
            price: parseFloat(document.getElementById("itemPrice").value),
            quantity: parseInt(document.getElementById("itemQuantity").value)
        };

        try {
            await addDoc(inventoryCollection, newItem);
            loadInventory();
            form.reset();
        } catch (error) {
            console.error("Error adding item:", error);
        }
    });

    async function loadInventory() {
        try {
            const querySnapshot = await getDocs(inventoryCollection);
            inventoryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            applyFiltersAndSort();
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    }

    function applyFiltersAndSort() {
        let filteredData = inventoryData;
        if (searchBox.value.trim() !== "") {
            filteredData = filteredData.filter(item => 
                item.name.toLowerCase().includes(searchBox.value.toLowerCase())
            );
        }
        sortInventory(filteredData);
    }

    function sortInventory(data) {
        const sortValue = sortOptions.value;
        if (sortValue === "nameAsc") {
            data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === "nameDesc") {
            data.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortValue === "priceAsc") {
            data.sort((a, b) => a.price - b.price);
        } else if (sortValue === "priceDesc") {
            data.sort((a, b) => b.price - a.price);
        }
        displayInventory(data);
    }

    function displayInventory(data) {
        inventoryList.innerHTML = "";
        let itemCount = 0;
        let inventoryValue = 0;

        data.forEach((item) => {
            const row = inventoryList.insertRow();
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button onclick="editItem('${item.id}')" class="edit-btn">Edit</button>
                    <button onclick="deleteItem('${item.id}')" class="delete-btn">Delete</button>
                </td>
            `;
            itemCount += item.quantity;
            inventoryValue += item.price * item.quantity;
        });

        totalItems.textContent = itemCount;
        totalValue.textContent = inventoryValue.toFixed(2);
    }

    searchButton.addEventListener("click", () => {
        applyFiltersAndSort();
    });

    sortOptions.addEventListener("change", () => {
        applyFiltersAndSort();
    });

    window.editItem = async (id) => {
        const newName = prompt("Enter new name:");
        const newPrice = prompt("Enter new price:");
        const newQuantity = prompt("Enter new quantity:");

        if (newName && newPrice && newQuantity) {
            try {
                const itemRef = doc(db, "inventory", id);
                await updateDoc(itemRef, {
                    name: newName,
                    price: parseFloat(newPrice),
                    quantity: parseInt(newQuantity)
                });
                loadInventory();
            } catch (error) {
                console.error("Error updating item:", error);
            }
        }
    };

    window.deleteItem = async (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                const itemRef = doc(db, "inventory", id);
                await deleteDoc(itemRef);
                loadInventory();
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };
});
