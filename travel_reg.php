<?php
$servername = "localhost";
$username = "root";
$password = "Sql*#A1060";

$conn = new mysqli($servername, $username,$password,"carpool");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



$Name = $_GET['Name'];
$Number = $_GET['contact_number'];
$destination=$_GET['destination'];
$date = $_GET['date'];
$time = $_GET['time'];



$sql = "INSERT INTO carpoolers VALUES ('$Name','$Number','$destination','$date','$time')";

if ($conn->query($sql) == TRUE) {
    echo "Database updated successfully.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
