<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405); // Method Not Allowed
    exit;
}

// Check if the request is from the same domain
if (!isset($_SERVER['HTTP_REFERER']) || parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) != $_SERVER['SERVER_NAME']) {
    http_response_code(403); // Forbidden
    exit;
}

$email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$tel     = filter_input(INPUT_POST, 'tel', FILTER_SANITIZE_NUMBER_INT);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
$message = nl2br($message);

// Validate inputs
if (empty($email) || empty($tel) || empty($message)) {
    http_response_code(400); // Bad Request
    exit;
}

$mail = new PHPMailer\PHPMailer\PHPMailer();

$mail->isSMTP();
$mail->Host       = $_ENV['SMTP_HOST'];
$mail->SMTPAuth   = true;
$mail->Username   = $_ENV['SMTP_USER'];
$mail->Password   = $_ENV['SMTP_PASSWORD'];
$mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port       = $_ENV['SMTP_PORT'];

$mail->setFrom($_ENV['EMAIL_FROM'], 'flashtech.pt');
$mail->addAddress($_ENV['EMAIL_TO']);
$mail->addReplyTo($email);

$mail->isHTML(true);
$mail->CharSet = 'UTF-8';

$mail->Subject = 'Requisição de Serviço';
$mail->Body    = "Email: $email<br>Contacto Móvel: <a href=\"tel:$tel\">$tel</a><br>Mensagem: $message";

if (!$mail->send()) {
	error_log("Failed to send email. Error: " . $mail->ErrorInfo);

	http_response_code(500); // Internal Server Error
	exit;
}

http_response_code(200); // OK
?>