<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Allow: POST');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false]);
    exit;
}

if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

function clean(string $value, int $max): string
{
    $value = trim(strip_tags($value));
    $value = str_replace(["\r", "\n"], ' ', $value);
    if (function_exists('mb_substr') && mb_strlen($value) > $max) {
        return mb_substr($value, 0, $max);
    }
    return strlen($value) > $max ? substr($value, 0, $max) : $value;
}

$kind = (($data['kind'] ?? '') === 'dealer') ? 'Bayi başvurusu' : 'İletişim';
$name = clean((string) ($data['name'] ?? ''), 120);
$email = clean((string) ($data['email'] ?? ''), 160);
$phone = clean((string) ($data['phone'] ?? ''), 40);
$company = clean((string) ($data['company'] ?? ''), 160);
$city = clean((string) ($data['city'] ?? ''), 80);
$message = trim(strip_tags((string) ($data['message'] ?? '')));
if (function_exists('mb_substr') && mb_strlen($message) > 4000) {
    $message = mb_substr($message, 0, 4000);
} elseif (strlen($message) > 4000) {
    $message = substr($message, 0, 4000);
}

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false]);
    exit;
}

$body = "Tür: {$kind}\nAd: {$name}\nE-posta: {$email}\nTelefon: {$phone}\nFirma: {$company}\nŞehir: {$city}\n\n{$message}\n";
$subject = '=?UTF-8?B?' . base64_encode("Asel web sitesi: {$kind}") . '?=';
$headers = "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nReply-To: {$email}\r\n";
$sent = @mail('info@aselelaletleri.com', $subject, $body, $headers);

if (!$sent) {
    http_response_code(502);
    echo json_encode(['ok' => false]);
    exit;
}

echo json_encode(['ok' => true]);
