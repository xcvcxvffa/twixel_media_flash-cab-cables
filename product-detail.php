<?php include 'includes/header.php'; ?>

<!-- Page Header (Sterlite Style) -->
<div class="page-header" style="background-color: var(--bg-light); padding: 120px 0 60px; border-bottom: 1px solid var(--border-color);">
    <div class="container">
        <div class="breadcrumb" style="font-family: var(--font-heading); font-size: 14px; font-weight: 500; margin-bottom: 30px;">
            <a href="index.php" style="color: var(--text-light);">Home</a>
            <span style="margin: 0 15px; color: var(--border-color);">/</span>
            <a href="product.php" style="color: var(--text-light);">Products</a>
            <span style="margin: 0 15px; color: var(--border-color);">/</span>
            <span style="color: var(--primary-color);">FR House Wires</span>
        </div>
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 60px; align-items: end;">
            <div>
                <span class="subtitle">Domestic Cables</span>
                <h1 style="font-size: 64px; margin-bottom: 20px; letter-spacing: -0.04em; color: var(--secondary-color);">FR (Flame Retardant) House Wires</h1>
                <p style="font-size: 20px; color: var(--text-light); max-width: 600px;">Engineered with 99.9% pure electrolytic grade copper and highly insulated FR PVC compound for maximum residential safety.</p>
            </div>
            <div style="text-align: right; padding-bottom: 10px;">
                <a href="contact.php" class="btn btn-primary anime-btn">Request a Quote</a>
            </div>
        </div>
    </div>
</div>

<!-- Product Detail Visual Section -->
<section class="section-padding">
    <div class="container">
        
        <!-- Large Visual Banner -->
        <div class="gsap-reveal" style="width: 100%; height: 500px; background-color: var(--bg-light); border-radius: 30px; overflow: hidden; margin-bottom: 100px; display: flex; align-items: center; justify-content: center; padding: 60px;">
            <img src="assets/images/house_wiring.png" alt="FR House Wires" style="max-height: 100%; mix-blend-mode: multiply; object-fit: contain; transform: scale(1.2);">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 80px;">
            
            <!-- Left: Description & Features -->
            <div class="gsap-reveal">
                <h2 style="font-size: 36px; margin-bottom: 30px;">Product Overview</h2>
                <p style="font-size: 16px; margin-bottom: 30px; line-height: 1.8;">Our Flame Retardant (FR) house wires are meticulously manufactured to ensure they do not propagate fire. These cables are essential for ensuring the highest degree of safety in high-density residential buildings, individual homes, and critical indoor installations.</p>
                
                <h3 style="font-size: 24px; margin-bottom: 20px; margin-top: 50px;">Core Features</h3>
                <ul style="border-top: 1px solid var(--border-color);">
                    <li style="padding: 20px 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 20px;">
                        <i class="fa-solid fa-fire-extinguisher" style="font-size: 24px; color: var(--primary-color);"></i>
                        <span style="font-size: 18px; font-weight: 500; color: var(--secondary-color);">Flame Retardant Insulation</span>
                    </li>
                    <li style="padding: 20px 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 20px;">
                        <i class="fa-solid fa-bolt" style="font-size: 24px; color: var(--primary-color);"></i>
                        <span style="font-size: 18px; font-weight: 500; color: var(--secondary-color);">99.9% High Conductivity Copper</span>
                    </li>
                    <li style="padding: 20px 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 20px;">
                        <i class="fa-solid fa-shield-halved" style="font-size: 24px; color: var(--primary-color);"></i>
                        <span style="font-size: 18px; font-weight: 500; color: var(--secondary-color);">High Insulation Resistance</span>
                    </li>
                </ul>
                
                <div style="margin-top: 40px;">
                    <a href="#" class="btn btn-outline anime-btn" style="width: 100%; border-radius: 12px;"><i class="fa-solid fa-file-pdf"></i> Download Technical Datasheet (PDF)</a>
                </div>
            </div>
            
            <!-- Right: Minimalist Spec Grid -->
            <div class="gsap-reveal">
                <h2 style="font-size: 36px; margin-bottom: 30px;">Specifications</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
                    <div style="background: var(--bg-light); padding: 40px 30px; border-radius: 20px;">
                        <span style="font-size: 13px; font-weight: 600; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px;">Voltage Grade</span>
                        <h4 style="font-size: 36px; color: var(--primary-color); margin-top: 10px;">1100 V</h4>
                    </div>
                    <div style="background: var(--bg-light); padding: 40px 30px; border-radius: 20px;">
                        <span style="font-size: 13px; font-weight: 600; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px;">Standard</span>
                        <h4 style="font-size: 36px; color: var(--primary-color); margin-top: 10px;">IS 694</h4>
                    </div>
                </div>

                <div style="background: var(--bg-white); border: 1px solid var(--border-color); border-radius: 20px; padding: 40px;">
                    <h3 style="font-size: 20px; margin-bottom: 30px;">Size & Rating Chart</h3>
                    
                    <!-- Clean Row Data instead of a basic table -->
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 15px;">
                        <span style="font-weight: 600; color: var(--secondary-color);">1.0 sq.mm</span>
                        <span style="color: var(--text-light);">14/0.30 strands • 12 Amps</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 15px;">
                        <span style="font-weight: 600; color: var(--secondary-color);">1.5 sq.mm</span>
                        <span style="color: var(--text-light);">22/0.30 strands • 16 Amps</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 15px; margin-bottom: 15px;">
                        <span style="font-weight: 600; color: var(--secondary-color);">2.5 sq.mm</span>
                        <span style="color: var(--text-light);">36/0.30 strands • 22 Amps</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-bottom: 5px;">
                        <span style="font-weight: 600; color: var(--secondary-color);">4.0 sq.mm</span>
                        <span style="color: var(--text-light);">56/0.30 strands • 29 Amps</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
