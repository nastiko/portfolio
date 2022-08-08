<?php
if ($_POST['name'] && $_POST['email'] && $_POST['message']) {
    mail(
        'anastasia.hrynkevich@outlook.com',
        'Website form submission from `' . htmlspecialchars($_POST['name']) . ' (' . htmlspecialchars($_POST['email']) . ')',
        htmlspecialchars($_POST['subject']) . htmlspecialchars($_POST['message'])
    );
}