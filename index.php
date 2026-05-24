<?php include 'includes/header.php'; ?>

<!-- 1. Dark Hero Section -->
<section class="dark-hero">
    <div class="hero-content-wrapper hero-animate" style="text-align: left; padding: 0 0 15px 25px; width: 100%;">
        <h1 class="hero-title" style="font-size: 6vw; line-height: 0.9; letter-spacing: -0.04em; color: white; margin-bottom: 5px; font-weight: 800; font-family: var(--font-heading);">EMPOWERING<br>CONNECTIVITY</h1>
        <p class="hero-desc" style="font-size: 20px; color: #fff; max-width: 700px; font-weight: 500; font-family: var(--font-body); letter-spacing: -0.02em;">Next-generation electrical and optical solutions built for the world's most demanding environments.</p>
    </div>
</section>

<!-- 2. About Us — Scroll-Expand Box -->
<!-- Spacer section used to give scroll room for the pinned animation -->
<section id="about-scroll-wrapper" class="about-scroll-wrapper">
    <div class="about-scroll-container">
        <!-- THE EXPANDING BOX -->
        <div id="about-box" class="about-box">
            <!-- LEFT: Image -->
            <div class="about-box-left">
                <img id="about-box-img" src="assets/images/hero_sharp.png" alt="Flash Cab" class="about-box-img">
                <div class="about-box-img-overlay"></div>
                <!-- Stats bar at bottom of image -->
                <div id="about-stats" class="about-stats">
                    <div class="about-stat-item">
                        <span class="about-stat-number">25+</span>
                        <span class="about-stat-label">Years</span>
                    </div>
                    <div class="about-stat-item">
                        <span class="about-stat-number">15K+</span>
                        <span class="about-stat-label">Projects</span>
                    </div>
                    <div class="about-stat-item">
                        <span class="about-stat-number">40+</span>
                        <span class="about-stat-label">Countries</span>
                    </div>
                </div>
            </div>

            <!-- RIGHT: Content -->
            <div id="about-box-content" class="about-box-content">
                <span class="about-box-tag">About Flash Cab</span>
                <h2 class="about-box-heading">
                    Engineering<br>
                    the <em class="about-box-highlight">Next Era</em><br>
                    of Connectivity
                </h2>
                <p class="about-box-text">
                    For over two decades, Flash Cab Cables has been at the forefront of engineering advanced electrical and optical solutions &mdash; driven by an unwavering commitment to quality and innovation.
                </p>
                <div class="about-box-divider"></div>
                <a href="#" class="btn btn-outline about-box-btn">Discover Our Story &rarr;</a>
            </div>
        </div>
    </div>
    <!-- Bottom padding so page doesn't jump -->
    <div class="about-scroll-spacer"></div>
</section>

<!-- 3. What We Do (Cards) -->
<section class="section-padding gsap-stagger-text" style="background: var(--bg-white);">
    <div class="container text-center">
        <h2 style="font-size: 42px; margin-bottom: 60px;">What We Do</h2>
        <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;" class="gsap-reveal">
            
            <div style="background: var(--bg-light); padding: 40px; border-radius: 20px; flex: 1; min-width: 250px; text-align: left;">
                <i class="fa-solid fa-bolt" style="font-size: 32px; color: var(--primary-color); margin-bottom: 20px;"></i>
                <h4 style="font-size: 20px; margin-bottom: 15px;">Power Transmission</h4>
                <p style="font-size: 14px; color: var(--text-light);">High voltage cables designed for massive infrastructural loads.</p>
            </div>
            
            <div style="background: var(--bg-light); padding: 40px; border-radius: 20px; flex: 1; min-width: 250px; text-align: left;">
                <i class="fa-solid fa-house-signal" style="font-size: 32px; color: var(--primary-color); margin-bottom: 20px;"></i>
                <h4 style="font-size: 20px; margin-bottom: 15px;">Domestic Wiring</h4>
                <p style="font-size: 14px; color: var(--text-light);">Flame retardant solutions ensuring safety in every home.</p>
            </div>

            <div style="background: var(--bg-light); padding: 40px; border-radius: 20px; flex: 1; min-width: 250px; text-align: left;">
                <i class="fa-solid fa-shield-halved" style="font-size: 32px; color: var(--primary-color); margin-bottom: 20px;"></i>
                <h4 style="font-size: 20px; margin-bottom: 15px;">Industrial Cables</h4>
                <p style="font-size: 14px; color: var(--text-light);">Heavy-duty flexible cables for machinery and automation.</p>
            </div>

        </div>
    </div>
</section>

<!-- 4. A Decade of Excellence (Dark) -->
<section class="dark-section gsap-stagger-text" style="text-align: center;">
    <div class="container">
        <span style="color: var(--primary-color); font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">Since 1999</span>
        <h2 style="font-size: 64px; margin-top: 20px; margin-bottom: 40px; letter-spacing: -0.04em;">A Legacy of Excellence</h2>
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
            <div style="height: 2px; width: 100px; background: #333;"></div>
            <a href="about.php" class="btn btn-outline" style="color: white; border-color: white;">Our Journey</a>
            <div style="height: 2px; width: 100px; background: #333;"></div>
        </div>
    </div>
</section>

<!-- 5. Product Bands -->
<!-- Cables -->
<section class="product-band gsap-stagger-text">
    <div class="container">
        <h2 style="font-size: 54px; letter-spacing: -0.04em; color: #ccc;">CABLES</h2>
        <p style="margin-top: 10px; font-weight: 500;">Low Tension | High Tension | Extra High Voltage</p>
        <div class="product-band-items">
            <div class="product-band-item">
                <img src="assets/images/house_wiring.png" alt="FR Wires">
                <h5>FR Wires</h5>
            </div>
            <div class="product-band-item">
                <img src="assets/images/repair_service.png" alt="Submersible">
                <h5>Submersible</h5>
            </div>
            <div class="product-band-item">
                <img src="assets/images/industrial_cable.png" alt="Flexible">
                <h5>Flexible Multicore</h5>
            </div>
            <div class="product-band-item">
                <img src="assets/images/house_wiring.png" alt="Armoured">
                <h5>Armoured</h5>
            </div>
        </div>
        <a href="product.php" class="btn btn-primary anime-btn" style="margin-top: 40px;">View All Cables</a>
    </div>
</section>

<!-- Conductors -->
<section class="product-band gsap-stagger-text" style="background: var(--bg-white);">
    <div class="container">
        <h2 style="font-size: 54px; letter-spacing: -0.04em; color: #ccc;">CONDUCTORS</h2>
        <p style="margin-top: 10px; font-weight: 500;">AAC | AAAC | ACSR | HTLS Conductors</p>
        <div class="product-band-items">
            <!-- Using existing images as placeholders for conductors -->
            <div class="product-band-item">
                <img src="assets/images/industrial_cable.png" alt="AAC">
                <h5>AAC</h5>
            </div>
            <div class="product-band-item">
                <img src="assets/images/industrial_cable.png" alt="AAAC">
                <h5>AAAC</h5>
            </div>
            <div class="product-band-item">
                <img src="assets/images/industrial_cable.png" alt="ACSR">
                <h5>ACSR</h5>
            </div>
        </div>
        <a href="product.php" class="btn btn-outline anime-btn" style="margin-top: 40px;">Explore Conductors</a>
    </div>
</section>

<!-- OPGW -->
<section class="product-band gsap-stagger-text">
    <div class="container">
        <h2 style="font-size: 54px; letter-spacing: -0.04em; color: #ccc;">OPGW</h2>
        <p style="margin-top: 10px; font-weight: 500;">Optical Ground Wires for Telecommunication</p>
        <div class="product-band-items">
            <div class="product-band-item">
                <img src="assets/images/repair_service.png" alt="OPGW 24F">
                <h5>OPGW 24F</h5>
            </div>
            <div class="product-band-item">
                <img src="assets/images/repair_service.png" alt="OPGW 48F">
                <h5>OPGW 48F</h5>
            </div>
        </div>
        <a href="contact.php" class="btn btn-primary anime-btn" style="margin-top: 40px;">Inquire Now</a>
    </div>
</section>

<!-- 6. Split News Section -->
<section class="section-padding" style="background: var(--bg-white);">
    <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;" class="gsap-reveal">
            
            <div style="background: url('assets/images/team_working.png') center/cover; height: 400px; border-radius: 20px; position: relative; overflow: hidden;">
                <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5);"></div>
                <div style="position: absolute; bottom: 40px; left: 40px; color: white;">
                    <span style="background: var(--primary-color); padding: 5px 15px; border-radius: 50px; font-size: 12px; font-weight: bold;">INNOVATION</span>
                    <h3 style="color: white; margin-top: 15px; font-size: 28px;">Smart City Solutions</h3>
                    <a href="blog.php" style="color: white; font-weight: 600; text-decoration: underline; margin-top: 15px; display: block;">Read Article</a>
                </div>
            </div>

            <div style="background: url('assets/images/industrial_cable.png') center/cover; height: 400px; border-radius: 20px; position: relative; overflow: hidden;">
                <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5);"></div>
                <div style="position: absolute; bottom: 40px; left: 40px; color: white;">
                    <span style="background: var(--primary-color); padding: 5px 15px; border-radius: 50px; font-size: 12px; font-weight: bold;">SUSTAINABILITY</span>
                    <h3 style="color: white; margin-top: 15px; font-size: 28px;">Green Manufacturing Process</h3>
                    <a href="about.php" style="color: white; font-weight: 600; text-decoration: underline; margin-top: 15px; display: block;">Learn More</a>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- 7. Client Grid Intentionally Removed -->

<!-- 8. Vertical Integration (Dark Circular) -->
<section class="dark-section circular-graphic-section gsap-stagger-text">
    <div class="container">
        <h2 style="font-size: 48px; letter-spacing: -0.03em; margin-bottom: 20px;">FULLY INTEGRATED,<br>VERTICALLY BACKWARDS</h2>
        <p style="color: #999; max-width: 600px; margin: 0 auto 60px;">From raw materials to finished products, our entire supply chain is optimized for unparalleled quality control.</p>
        
        <div class="circular-graphic">
            <img src="assets/images/team_working.png" alt="Integrated Facility" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover;">
        </div>
        
        <div style="display: flex; justify-content: center; gap: 40px;">
            <div>
                <i class="fa-solid fa-industry" style="font-size: 32px; color: #fff; margin-bottom: 15px;"></i>
                <h5 style="color: #fff; font-size: 18px;">Manufacturing</h5>
            </div>
            <div>
                <i class="fa-solid fa-microscope" style="font-size: 32px; color: #fff; margin-bottom: 15px;"></i>
                <h5 style="color: #fff; font-size: 18px;">R&D Center</h5>
            </div>
            <div>
                <i class="fa-solid fa-truck-fast" style="font-size: 32px; color: #fff; margin-bottom: 15px;"></i>
                <h5 style="color: #fff; font-size: 18px;">Global Logistics</h5>
            </div>
        </div>
    </div>
</section>

<!-- 9. Global Presence -->
<section class="dark-section gsap-stagger-text" style="padding-top: 0; padding-bottom: 150px;">
    <div class="container text-center">
        <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px dashed #333; border-radius: 50%;">
            <i class="fa-solid fa-globe" style="font-size: 120px; color: var(--primary-color);"></i>
        </div>
        <h2 style="font-size: 42px; margin-top: 60px; margin-bottom: 20px;">Electrifying The World</h2>
        <p style="color: #999;">Exporting to 50+ countries with uncompromising standards.</p>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
