CREATE DATABASE motorcycle_inventory;
USE motorcycle_inventory;

CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL
);



/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

/* Header with Logo */
#headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #3498db;
  color: white;
  border-bottom: 2px solid #2980b9;
}

#headerContainer h1 {
  font-size: 20px;
  margin: 0;
}

#inventoryLogo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* Inventory Table */
#inventoryList {
  width: 100%;
  border-collapse: collapse;
  display: block;
  overflow-x: auto; /* Allows horizontal scrolling */
}

#inventoryList th, #inventoryList td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

#inventoryList th {
  background-color: #2980b9;
  color: white;
}

/* Make Table Scrollable on Small Screens */
@media (max-width: 768px) {
  #inventoryList {
      display: block;
      overflow-x: auto;
      white-space: nowrap; /* Prevents table from breaking */
  }
}

/* Buttons */
button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #2980b9;
}

/* Floating Add Button */
#addButton {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

#addButton:hover {
  background-color: #2980b9;
}

/* Responsive Form */
#formContainer {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

#formContainer input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Mobile Adjustments */
@media (max-width: 480px) {
  #headerContainer {
      flex-direction: column;
      text-align: center;
  }

  #inventoryLogo {
      margin-top: 10px;
  }

  button {
      font-size: 14px;
      padding: 10px;
  }
} 
