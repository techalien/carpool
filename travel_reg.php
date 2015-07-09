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
    echo "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
<html>
<head>
<title>Redirect</title>
<meta http-equiv="refresh" content="1; URL=index.html">

</head>
<body>
If your browser doesn't automatically go there within a few seconds,
you may want to go to
<a href="index.html">the destination</a>
manually.
</body>
</html>
