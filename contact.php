<?php include 'includes/header.php'; ?>

<!-- Page Header -->
<div class="page-header" style="background-color: var(--bg-light); padding: 120px 0 60px; text-align: center; border-bottom: 1px solid var(--border-color);">
    <div class="container">
        <h1 style="font-size: 64px; margin-bottom: 20px; letter-spacing: -0.04em;">Get in Touch</h1>
        <div class="breadcrumb" style="font-family: var(--font-heading); font-size: 15px; font-weight: 500;">
            <a href="index.php" style="color: var(--text-light);">Home</a>
            <span style="margin: 0 15px; color: var(--border-color);">/</span>
            <span style="color: var(--primary-color);">Contact</span>
        </div>
    </div>
</div>

<!-- Contact Section (Sterlite Split Screen) -->
<section class="section-padding">
    <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 100px;">
            
            <!-- Left: Minimalist Info -->
            <div class="gsap-reveal">
                <h2 style="font-size: 36px; margin-bottom: 40px; letter-spacing: -0.02em;">Reach out to our experts.</h2>
                
                <div style="margin-bottom: 40px;">
                    <span style="font-size: 13px; font-weight: 600; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px;">Corporate Office & Factory</span>
                    <p style="font-size: 18px; color: var(--secondary-color); margin-top: 10px; font-weight: 500;">Plot No. 3, G.I.D.C-2, Jamwadi,<br>Gondal, Rajkot, Gujarat - 360311</p>
                </div>

                <div style="margin-bottom: 40px;">
                    <span style="font-size: 13px; font-weight: 600; color: var(--text-light); text-transform: uppercase; letter-spacing: 1px;">Sales & Inquiry</span>
                    <p style="font-size: 24px; color: var(--primary-color); margin-top: 10px; font-weight: 600;">+91 99999 99999</p>
                    <p style="font-size: 18px; color: var(--secondary-color); font-weight: 500;">flashcab12@gmail.com</p>
                </div>
            </div>

            <!-- Right: Clean Form -->
            <div class="gsap-reveal" style="background: var(--bg-light); padding: 50px; border-radius: 30px;">
                <form action="#" method="POST">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 10px; color: var(--secondary-color);">First Name</label>
                            <input type="text" style="width: 100%; padding: 18px; border: 1px solid var(--border-color); border-radius: 12px; background: var(--bg-white); font-family: var(--font-body); font-size: 16px; outline: none;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 10px; color: var(--secondary-color);">Last Name</label>
                            <input type="text" style="width: 100%; padding: 18px; border: 1px solid var(--border-color); border-radius: 12px; background: var(--bg-white); font-family: var(--font-body); font-size: 16px; outline: none;">
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 10px; color: var(--secondary-color);">Email Address</label>
                        <input type="email" style="width: 100%; padding: 18px; border: 1px solid var(--border-color); border-radius: 12px; background: var(--bg-white); font-family: var(--font-body); font-size: 16px; outline: none;">
                    </div>
                    
                    <div style="margin-bottom: 40px;">
                        <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 10px; color: var(--secondary-color);">Your Message</label>
                        <textarea rows="5" style="width: 100%; padding: 18px; border: 1px solid var(--border-color); border-radius: 12px; background: var(--bg-white); font-family: var(--font-body); font-size: 16px; outline: none; resize: none;"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary anime-btn" style="width: 100%;">Send Inquiry</button>
                </form>
            </div>
            
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
