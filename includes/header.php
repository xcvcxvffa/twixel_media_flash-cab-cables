<?php
// Define base URL for assets if needed
$base_url = '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flash Cab Cables | Voltra Style Redesign</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="loading">
    <!-- Preloader -->
    <div id="custom-preloader" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #1a1a1a; z-index: 9999; display: flex; align-items: center; justify-content: flex-start;">

        
        <!-- Center Progress Line Background -->
        <div style="position: absolute; top: 50%; left: 0; width: 100%; height: 1px; background: rgba(255,255,255,0.1);"></div>
        
        <!-- Active Progress Line -->
        <div id="preloader-progress" style="position: absolute; top: 50%; left: 0; width: 0%; height: 1px; background: #ffffff; transition: width 0.1s ease;"></div>
        
        <!-- Bottom Right Counter -->
        <div id="preloader-counter" style="position: absolute; bottom: 30px; right: 40px; color: white; font-size: 54px; font-weight: 500; font-family: var(--font-body); letter-spacing: -0.02em;">0%</div>
    </div>
    
    <style>
        @keyframes spin { 100% { transform: rotate(360deg); } }
        body.loading { overflow: hidden; }
    </style>

    <!-- Main Header -->
    <header class="header">
        <div class="container header-inner" style="max-width: 100%; padding: 0 40px; justify-content: flex-start; gap: 40px;">
            <a href="index.php" class="logo" style="flex-shrink: 0; display: flex; align-items: center; overflow: hidden; height: 80px;">
                <img src="assets/images/logo_colored.png" alt="Flash Cab Cables" style="height: 200px; width: auto; object-fit: contain;">
            </a>
            
            <nav class="main-nav" style="margin-left: auto;">
                <ul style="display: flex; gap: 24px; margin: 0; padding: 0; align-items: center;">
                    <li class="has-mega-menu">
                        <a href="product.php" class="nav-link">Products <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 4px; color: #737373;"></i></a>
                        <!-- Sterlite Mega Menu for Products -->
                        <div class="mega-menu">
                            <div class="mega-menu-column">
                                <h4 class="mega-menu-title">Cables</h4>
                                <a href="product.php" class="mega-menu-card">
                                    <img src="assets/images/cables.png" alt="Cables">
                                </a>
                            </div>
                            <div class="mega-menu-column">
                                <h4 class="mega-menu-title">Conductors</h4>
                                <a href="product.php" class="mega-menu-card">
                                    <img src="assets/images/conductors.png" alt="Conductors">
                                </a>
                            </div>
                            <div class="mega-menu-column">
                                <h4 class="mega-menu-title">OPGW</h4>
                                <a href="product.php" class="mega-menu-card">
                                    <img src="assets/images/opgw.png" alt="OPGW">
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="has-mega-menu">
                        <a href="product.php" class="nav-link">Services <i class="fa-solid fa-chevron-down" style="font-size: 10px; margin-left: 4px; color: #737373;"></i></a>
                    </li>
                    <li><a href="news.php" class="nav-link">News</a></li>
                    <li><a href="about.php" class="nav-link">About Us</a></li>
                    <li><a href="contact.php" class="nav-link">Contact Us</a></li>
                </ul>
            </nav>
            
            <div class="mobile-toggle"><i class="fa-solid fa-bars"></i></div>
        </div>
    </header>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const mainNavUl = document.querySelector('.main-nav ul');
        if(mobileToggle && mainNavUl) {
            mobileToggle.addEventListener('click', function() {
                mainNavUl.classList.toggle('show-mobile-menu');
            });
        }

        // Scroll hide/show header
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                if (window.scrollY > lastScrollY) {
                    // Scrolling down - hide header
                    header.classList.add('header-hidden');
                } else {
                    // Scrolling up - show header
                    header.classList.remove('header-hidden');
                }
            } else {
                 header.classList.remove('header-hidden');
            }
            lastScrollY = window.scrollY;
        });
    });
    </script>
