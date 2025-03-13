<?php
session_start();
include 'dbhinc.php'; // Ensure this file is correctly included

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Query database using PDO
    $stmt = $pdo->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->execute([$email]); // Bind email to query
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($password, $user['password'])) { // Verify hashed password
            $_SESSION['user_id'] = $user['id'];
            header("Location: dashboard.php"); // Redirect to dashboard
            exit();
        } else {
            echo "Invalid credentials.";
        }
    } else {
        echo "No user found.";
    }
}
?>
