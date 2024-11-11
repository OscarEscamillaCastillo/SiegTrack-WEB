<?php
header('Content-Type: application/json');

// Configuración de la base de datos
$servidor = "byn4dclpfaabvnhymxuv-mysql.services.clever-cloud.com";
$usuario = "uoohs7rnxjdmz2vr";
$contrasena = "AK1UMX27nnz0dsOF10gR";
$base_datos = "byn4dclpfaabvnhymxuv";

// Conectar a la base de datos
$conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener datos del formulario
$usuario = $_POST['usuario'];
$password = $_POST['password'];

// Consulta para verificar usuario y contraseña
$sql = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND contraseña = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ss", $usuario, $password);
$stmt->execute();
$resultado = $stmt->get_result();

// Validar credenciales
if ($resultado->num_rows > 0) {
    echo json_encode(["status" => "success", "message" => "Credenciales correctas"]);
} else {
    echo json_encode(["status" => "error", "message" => "Usuario o contraseña incorrectos"]);
}

$stmt->close();
$conexion->close();
?>
