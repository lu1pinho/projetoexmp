<?php

require_once 'C:\xampp\htdocs\projetoexmp\vendor\autoload.php';
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../projetoexmp/');
$dotenv->load();

// Configurações de conexão
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];

// Conexão com o banco de dados
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
} else {
    $conn->set_charset("utf8");

    $status = isset($_ENV['SHOW_CONNECTION_STATUS']) ? $_ENV['SHOW_CONNECTION_STATUS'] : 'false';
    if (filter_var($status, FILTER_VALIDATE_BOOLEAN)) {
        echo '<div style="background-color: green; color: white; padding: 2px;">
            <center><p style="font-family: Arial, sans-serif; font-size: 12px">Conexão com o banco de dados estabelecida com sucesso!</p></center>
          </div>';
    }
}

function getConnection() {
    global $conn;
    if ($conn && !$conn->connect_error) {
        return $conn;
    } else {
        die("Erro: Não foi possível estabelecer uma conexão com o banco de dados.");
    }
}