<?php include 'includes/header.php'; ?>

<!-- Page Header (Minimalist Sterlite) -->
<div class="page-header" style="background-color: var(--bg-light); padding: 120px 0 80px; text-align: center; border-bottom: 1px solid var(--border-color);">
    <div class="container">
        <h1 style="font-size: 64px; margin-bottom: 20px; letter-spacing: -0.04em;">Our Products</h1>
        <div class="breadcrumb" style="font-family: var(--font-heading); font-size: 15px; font-weight: 500;">
            <a href="index.php" style="color: var(--text-light);">Home</a>
            <span style="margin: 0 15px; color: var(--border-color);">/</span>
            <span style="color: var(--primary-color);">Products</span>
        </div>
    </div>
</div>

<!-- Products Section -->
<section class="section-padding">
    <div class="container">
        
        <!-- Category Filter -->
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; margin-bottom: 70px;" class="gsap-reveal">
            <button class="btn btn-primary filter-btn active" data-filter="all">All Cables</button>
            <button class="btn btn-outline filter-btn" data-filter="domestic">House Wires</button>
            <button class="btn btn-outline filter-btn" data-filter="commercial">Industrial</button>
            <button class="btn btn-outline filter-btn" data-filter="specialty">Submersible</button>
        </div>

        <div class="services-grid">
            
            <!-- Product 1 -->
            <div class="service-item product-item gsap-stagger" data-category="domestic">
                <div class="service-img">
                    <img src="assets/images/house_wiring.png" alt="House Wire">
                </div>
                <div class="service-content">
                    <span class="subtitle" style="font-size: 11px; padding: 6px 14px; margin-bottom: 15px;">Domestic</span>
                    <h3 style="font-size: 24px; letter-spacing: -0.02em;"><a href="product-detail.php">FR House Wires</a></h3>
                    <p style="margin-bottom: 30px; font-size: 15px;">High-grade PVC insulation to prevent electrical fires in residential buildings.</p>
                    <a href="product-detail.php" class="btn btn-outline anime-btn" style="width: 100%;">View Specifications</a>
                </div>
            </div>

            <!-- Product 2 -->
            <div class="service-item product-item gsap-stagger" data-category="commercial">
                <div class="service-img">
                    <img src="assets/images/industrial_cable.png" alt="Industrial Cable">
                </div>
                <div class="service-content">
                    <span class="subtitle" style="font-size: 11px; padding: 6px 14px; margin-bottom: 15px;">Commercial</span>
                    <h3 style="font-size: 24px; letter-spacing: -0.02em;"><a href="product-detail.php">Multicore Flexible Cables</a></h3>
                    <p style="margin-bottom: 30px; font-size: 15px;">Ideal for machine tools, appliances, and control panels demanding flexibility.</p>
                    <a href="product-detail.php" class="btn btn-outline anime-btn" style="width: 100%;">View Specifications</a>
                </div>
            </div>

            <!-- Product 3 -->
            <div class="service-item product-item gsap-stagger" data-category="specialty">
                <div class="service-img">
                    <img src="assets/images/repair_service.png" alt="Submersible Cable">
                </div>
                <div class="service-content">
                    <span class="subtitle" style="font-size: 11px; padding: 6px 14px; margin-bottom: 15px;">Specialty</span>
                    <h3 style="font-size: 24px; letter-spacing: -0.02em;"><a href="product-detail.php">3 Core Submersible Cables</a></h3>
                    <p style="margin-bottom: 30px; font-size: 15px;">Tough outer sheath specifically designed to withstand prolonged water exposure.</p>
                    <a href="product-detail.php" class="btn btn-outline anime-btn" style="width: 100%;">View Specifications</a>
                </div>
            </div>

        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
