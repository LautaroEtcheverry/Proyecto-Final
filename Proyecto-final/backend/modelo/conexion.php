<?php
// Archivo de conexión sencillo a MySQL
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'maderera_barrio_parque';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}
?>