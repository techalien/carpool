<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Student Car pooling</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <style>
    body {
        padding-top: 70px;
        /* Required padding for .navbar-fixed-top. Remove if using .navbar-static-top. Change if height of navigation changes. */
    }
    </style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
<!--
    <div style='position:absolute;z-index:0;left:0;top:0;width:100%;height:100%'>
        <img class="img-responsive" src='bg.jpg' style='width:100%;height:100%' alt='[]' />
    </div>-->

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">CAR Pooling</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="register.html">Register</a>
                    </li>
                    <li>
                        <a href="find.html">Find</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container-fluid">
      <table class="table table-striped table-hover ">
  <thead>
    <tr>

      <th>Name</th>
      <th>Contact</th>
      <th>Date</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    <?php
    $servername = "localhost";
    $username = "root";
    $password = "Sql*#A1060";
    $conn = new mysqli($servername, $username,$password,"carpool");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $date = $_GET['date'];
    $destination = $_GET['destination'];
    $time = $_GET['time'];

    $sql = "SELECT Name,Number,Date,Time from carpoolers where Destination = '$destination'";
    $result = $conn->query($sql);
    while($row = $result->fetch_assoc()) {
      $Name = $row['Name'];
      $Number = $row['Number'];
      $Date = $row['Date'];
      $Time = $row['Time'];
      echo "<tr><td>".$Name."</td><td>".$Number."</td><td>".$Date."</td><td>".$Time."</td></tr>";
    }
    ?>
  </tbody>
</table>

    </div>
    <!-- /.container -->

    <!-- jQuery Version 1.11.1 -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <script src="assets/js/jquery.backstretch.min.js"></script>
    <!-- Count Down - Time Circles  -->
    <script src="assets/js/TimeCircles.js"></script>
    <!-- WOW - Reveal Animations When You Scroll -->
    <script src="assets/js/wow.min.js"></script>
    <!-- Smooth scroll -->
    <script src="assets/js/smoothscroll.js"></script>

</body>

</html>
