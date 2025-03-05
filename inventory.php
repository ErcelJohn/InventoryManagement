<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$database = "inventory_db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST["action"] ?? "";

    if ($action === "add") {
        if (!isset($_POST["name"], $_POST["price"], $_POST["quantity"])) {
            echo json_encode(["success" => false, "message" => "Missing required fields"]);
            exit;
        }

        $name = trim($_POST["name"]);
        $price = floatval($_POST["price"]);
        $quantity = intval($_POST["quantity"]);

        if ($name === "" || $price <= 0 || $quantity < 0) {
            echo json_encode(["success" => false, "message" => "Invalid input values"]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO inventory (name, price, quantity) VALUES (?, ?, ?)");
        $stmt->bind_param("sdi", $name, $price, $quantity);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Error adding item: " . $stmt->error]);
        }
        $stmt->close();
    }
    elseif ($action === "edit") {
        if (!isset($_POST["id"], $_POST["name"], $_POST["price"], $_POST["quantity"])) {
            echo json_encode(["success" => false, "message" => "Missing required fields"]);
            exit;
        }
        
        $id = intval($_POST["id"]);
        $name = trim($_POST["name"]);
        $price = floatval($_POST["price"]);
        $quantity = intval($_POST["quantity"]);

        if ($id <= 0 || $name === "" || $price <= 0 || $quantity < 0) {
            echo json_encode(["success" => false, "message" => "Invalid input values"]);
            exit;
        }

        $stmt = $conn->prepare("UPDATE inventory SET name=?, price=?, quantity=? WHERE id=?");
        $stmt->bind_param("sdii", $name, $price, $quantity, $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Error updating item: " . $stmt->error]);
        }
        $stmt->close();
    }
    elseif ($action === "delete") {
        if (!isset($_POST["id"])) {
            echo json_encode(["success" => false, "message" => "Missing required fields"]);
            exit;
        }

        $id = intval($_POST["id"]);
        if ($id <= 0) {
            echo json_encode(["success" => false, "message" => "Invalid item ID"]);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM inventory WHERE id=?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting item: " . $stmt->error]);
        }
        $stmt->close();
    }
} else {
    $result = $conn->query("SELECT * FROM inventory");
    
    if (!$result) {
        echo json_encode(["success" => false, "message" => "Database query failed"]);
        exit;
    }

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    echo json_encode($items);
}

$conn->close();
?>
