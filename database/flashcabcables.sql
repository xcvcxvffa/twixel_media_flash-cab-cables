-- ============================================================
-- FlashCab Cables — MySQL Database Schema & Seed Data
-- ============================================================
-- Compatible with MySQL 5.7+ and MySQL 8.0+
-- Import via: Hostinger phpMyAdmin → Import → Select this file
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ─── TABLES ──────────────────────────────────────────────────────────────────

-- Drop existing tables if re-importing
DROP TABLE IF EXISTS `contacts`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `users`;

-- Users table
CREATE TABLE `users` (
  `id`        INT(11)      NOT NULL AUTO_INCREMENT,
  `userName`  VARCHAR(100) NOT NULL,
  `email`     VARCHAR(150) NOT NULL,
  `password`  VARCHAR(255) NOT NULL,
  `authority` JSON         NOT NULL DEFAULT ('["admin","user"]'),
  `avatar`    VARCHAR(255) NOT NULL DEFAULT '/img/avatars/thumb-1.jpg',
  `title`     VARCHAR(150)          DEFAULT '',
  `timeZone`  VARCHAR(50)           DEFAULT 'GMT+8',
  `lang`      VARCHAR(10)           DEFAULT 'en',
  `syncData`  TINYINT(1)            DEFAULT 0,
  `createdAt` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_userName` (`userName`),
  UNIQUE KEY `uq_email`    (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products table
CREATE TABLE `products` (
  `id`                INT(11)      NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(255) NOT NULL,
  `slug`              VARCHAR(255)          DEFAULT '',
  `description`       LONGTEXT              DEFAULT NULL,
  `imgList`           JSON                  DEFAULT NULL,
  `applications`      JSON                  DEFAULT NULL,
  `technicalDetails`  JSON                  DEFAULT NULL,
  `features`          JSON                  DEFAULT NULL,
  `specificationHtml` LONGTEXT              DEFAULT NULL,
  `status`            TINYINT(1)            DEFAULT 0,
  `createdAt`         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contacts table
CREATE TABLE `contacts` (
  `id`        INT(11)      NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName`  VARCHAR(100) NOT NULL,
  `email`     VARCHAR(150) NOT NULL,
  `message`   TEXT         NOT NULL,
  `createdAt` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── SEED DATA ────────────────────────────────────────────────────────────────

-- ─── Admin User ───────────────────────────────────────────────────────────────
-- Default: username=admin, password=admin123
-- CHANGE THIS PASSWORD after first login!
INSERT INTO `users` (`userName`, `email`, `password`, `authority`, `avatar`, `title`) VALUES
(
  'admin',
  'admin@flashcabcables.com',
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
  '["admin","user"]',
  '/img/avatars/thumb-1.jpg',
  'Administrator'
);

-- ─── Products (11 static products from productData.js) ───────────────────────

-- 1. 11 KV HT Cable
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  '11 kv HT cable',
  '11kv-ht-cable',
  '11 KV HT Cable is engineered for reliable high-voltage power transmission across industrial, commercial, and infrastructure applications. With advanced XLPE insulation and robust construction, it ensures maximum safety, minimal power loss, and consistent performance over long distances. Suitable for: Industrial Plants, Infrastructure Projects, Renewable & Commercial Installations, Power Distribution.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/11 KV HT CABLE 2.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/11 KV HT CABLE 2.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Voltage Grade',    'value', '11 KV'),
    JSON_OBJECT('label', 'Operating Temp',   'value', '-15°C to +90°C'),
    JSON_OBJECT('label', 'Short Circuit Temp','value','Up to 250°C'),
    JSON_OBJECT('label', 'Installation',     'value', 'Indoor, Outdoor, Underground & Duct')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>XLPE (Cross Linked Polyethylene) Insulation</li><li>Galvanized Steel Wire / Steel Strip Armour</li><li>Stranded Class 2 Aluminium / Copper Conductor</li><li>By Color Coding Core Identification</li><li>Suitable for Indoor, Outdoor, Underground & Duct Installation</li><li>Short Circuit Temperature up to 250°C</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Aluminium / Copper (Class 2 Stranded)</li><li><b>Insulation:</b> XLPE (Cross Linked Polyethylene)</li><li><b>Armour:</b> Galvanized Steel Wire / Steel Strip Armour</li><li><b>Core Identification:</b> By Color Coding</li></ul>')
  ),
  '<table style="border-collapse:collapse;width:100%" border="1"><thead><tr><th>size</th><th>wires</th><th>insThick</th><th>coreOD</th><th>sheathThick</th><th>over3Core</th><th>over4Core</th><th>res</th><th>rating</th></tr></thead><tbody><tr><td>3C x 35</td><td>Stranded</td><td>3.40</td><td>18.5</td><td>1.80</td><td>45.0</td><td>N/A</td><td>0.868</td><td>110</td></tr><tr><td>3C x 50</td><td>Stranded</td><td>3.40</td><td>19.8</td><td>1.80</td><td>48.2</td><td>N/A</td><td>0.641</td><td>130</td></tr><tr><td>3C x 70</td><td>Stranded</td><td>3.40</td><td>21.6</td><td>2.0</td><td>52.5</td><td>N/A</td><td>0.443</td><td>160</td></tr><tr><td>3C x 95</td><td>Stranded</td><td>3.40</td><td>23.8</td><td>2.0</td><td>57.8</td><td>N/A</td><td>0.320</td><td>190</td></tr><tr><td>3C x 120</td><td>Stranded</td><td>3.40</td><td>25.4</td><td>2.20</td><td>61.5</td><td>N/A</td><td>0.253</td><td>220</td></tr><tr><td>3C x 150</td><td>Stranded</td><td>3.40</td><td>27.0</td><td>2.20</td><td>65.2</td><td>N/A</td><td>0.206</td><td>250</td></tr></tbody></table>',
  0
);

-- 2. 11 KV Medium Voltage Cable
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  '11 Kv Medium Voltage cable',
  '11kv-medium-voltage-cable',
  'Engineered for dependable power and control transmission, these cables perform efficiently in harsh industrial conditions. Their durable construction offers excellent resistance to temperature variations, moisture, and chemicals, ensuring safe, stable, and uninterrupted operation across industrial and automation applications. Suitable for: Industrial Facilities, Automation Systems, Heavy Machinery & Equipment, Power Distribution Panels.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/11 Kv Medium Voltage cable.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/11 KV MEDIUM VOLTAGE CABLE.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Voltage Grade',       'value', '11 KV'),
    JSON_OBJECT('label', 'Conductor Material',  'value', 'Aluminium / Aluminium Alloy'),
    JSON_OBJECT('label', 'Conductor Type',      'value', 'Stranded Compact'),
    JSON_OBJECT('label', 'Operating Temp',      'value', 'Up to 90°C'),
    JSON_OBJECT('label', 'Short Circuit Temp',  'value', 'Up to 250°C'),
    JSON_OBJECT('label', 'Installation',        'value', 'Overhead Distribution')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>XLPE / Covered Insulation</li><li>Weather Resistant PE / PVC Outer Covering</li><li>Stranded Compact Aluminium / Aluminium Alloy Conductor</li><li>Suitable for Overhead Distribution Installation</li><li>Operating Temperature up to 90°C</li><li>Short Circuit Temperature up to 250°C</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Aluminium / Aluminium Alloy (Stranded Compact)</li><li><b>Insulation:</b> XLPE / Covered Insulation</li><li><b>Outer Covering:</b> Weather Resistant PE / PVC</li><li><b>Core Identification:</b> By Color Coding</li></ul>')
  ),
  '',
  0
);

-- 3. Single Core & Multi Core Flexible Cables
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'Single Core & Multi Core Flexible Cables',
  'single-multi-flexible-cables',
  'Single Core & Multi Core Flexible Cables are designed for reliable power transmission with excellent flexibility and durability. Ideal for residential, commercial, and industrial applications, they ensure safe, efficient, and hassle-free installation in various electrical systems.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/Single Core & Multi Core Flexible Cables.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/Single Core & Multi Core Flexible Cables.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Conductor',         'value', 'High Purity Annealed Copper'),
    JSON_OBJECT('label', 'Insulation',        'value', 'PVC / HRPVC / XLPE'),
    JSON_OBJECT('label', 'Flexibility',       'value', 'High Flexibility for Easy Installation'),
    JSON_OBJECT('label', 'Flame Retardant',   'value', 'FR Grade Available'),
    JSON_OBJECT('label', 'Temperature Rating','value', 'Up to 70°C (PVC) / 90°C (XLPE)'),
    JSON_OBJECT('label', 'Voltage Grade',     'value', 'Up to 1100 V')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Highly Flexible Class 5 Bare Copper Conductor</li><li>Flame Retardant PVC Insulation & Sheath</li><li>Excellent Bending Radius & Flexibility</li><li>Resistance to Moisture, Abrasion & Oils</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Class 5 Flexible Bare Copper</li><li><b>Insulation:</b> PVC (Flame Retardant)</li><li><b>Outer Sheath:</b> PVC (FR / FRLS)</li><li><b>Core Identification:</b> Color coded / Numbered</li></ul>')
  ),
  '',
  0
);

-- 4. Industrial Power & Control Cables
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'Industrial Power & Control Cables',
  'industrial-power-control-cables',
  'Engineered for performance. Built to last. Our industrial power and control cables deliver dependable power transmission and control signal integrity in the most demanding environments. Designed with advanced insulation and premium conductivity, they ensure maximum safety, operational reliability, and long service life across a wide range of industrial applications.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/cables.png'),
    JSON_OBJECT('img', '/assets/images/industrial_cable.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Voltage Grade',       'value', 'Up to 1.1 kV'),
    JSON_OBJECT('label', 'Conductor Material',  'value', 'Electrolytic Copper (Annealed)'),
    JSON_OBJECT('label', 'Conductor Type',      'value', 'Stranded / Flexible Class 5'),
    JSON_OBJECT('label', 'Insulation Type',     'value', 'LSZH / XLPE'),
    JSON_OBJECT('label', 'Shielding',           'value', 'Aluminium / Copper Tape or Braid'),
    JSON_OBJECT('label', 'Temperature Range',   'value', '-20°C to +90°C (LSZH)')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Electrolytic Copper Conductor (Annealed)</li><li>LSZH or XLPE Insulation Type</li><li>Aluminium or Copper Tape / Braid Shielding</li><li>Flame Retardant (FR / LSZH)</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Stranded / Flexible Class 5</li><li><b>Insulation:</b> LSZH / XLPE</li><li><b>Shielding:</b> Aluminium / Copper Tape/Braid</li></ul>')
  ),
  '',
  0
);

-- 5. Submersible Flat Cables
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'Submersible Flat Cables',
  'submersible-flat-cables',
  'Submersible Flat Cables are engineered for reliable power transmission in underwater and wet applications such as borewells, submersible pumps, and water treatment systems. Designed with a durable flat profile, they offer excellent flexibility, superior water resistance, and long-lasting performance in demanding environments.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/Submersible Flat Cables.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/Submersible Flat Cables.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Conductor Material',  'value', 'Annealed Copper'),
    JSON_OBJECT('label', 'Conductor Type',      'value', 'Flexible (Class 5)'),
    JSON_OBJECT('label', 'Insulation',          'value', 'PVC / XLPE'),
    JSON_OBJECT('label', 'Voltage Grade',       'value', 'Up to 1100 V'),
    JSON_OBJECT('label', 'Temperature Range',   'value', '-15°C to +70°C'),
    JSON_OBJECT('label', 'Application',         'value', 'Underwater & Wet Environments')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Flexible Class 5 bunch copper conductor</li><li>PVC / XLPE insulation</li><li>Flat profile configuration</li><li>Underwater & wet environments application</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Flexible Bare Bunch Copper as per IS:8130</li><li><b>Insulation:</b> PVC / XLPE</li><li><b>Outer Sheath:</b> PVC / Rubber</li></ul>')
  ),
  '<table style="border-collapse:collapse;width:100%" border="1"><thead><tr><th>size</th><th>wires</th><th>insThick</th><th>coreOD</th><th>sheathThick</th><th>over3Core</th><th>over4Core</th><th>res</th><th>rating</th></tr></thead><tbody><tr><td>1.0</td><td>14/0.30</td><td>0.60</td><td>2.60</td><td>0.90</td><td>9.90 X 4.70</td><td>N/A</td><td>18.1</td><td>11</td></tr><tr><td>1.5</td><td>22/0.30</td><td>0.60</td><td>2.80</td><td>0.90</td><td>10.50 X 4.80</td><td>N/A</td><td>12.1</td><td>14</td></tr><tr><td>2.5</td><td>36/0.30</td><td>0.70</td><td>3.35</td><td>1.0</td><td>12.60 X 5.90</td><td>N/A</td><td>7.41</td><td>18</td></tr><tr><td>4.0</td><td>56/0.30</td><td>0.80</td><td>4.0</td><td>1.0</td><td>14.50 X 6.70</td><td>N/A</td><td>4.95</td><td>26</td></tr><tr><td>6.0</td><td>84/0.30</td><td>0.80</td><td>5.0</td><td>1.0</td><td>17.50 X 7.50</td><td>N/A</td><td>3.30</td><td>31</td></tr><tr><td>10.0</td><td>140/0.30</td><td>1.0</td><td>6.5</td><td>1.40</td><td>22.80 X 9.90</td><td>N/A</td><td>1.91</td><td>42</td></tr></tbody></table>',
  0
);

-- 6. Ariel Bunched Cables
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'Ariel Bunched Cables',
  'ariel-bunched-cables',
  'Aerial Bunched Cables (ABC) are designed for safe and reliable overhead power distribution. Their insulated bundled construction minimizes power theft, short circuits, and environmental damage while ensuring reduced maintenance and enhanced operational safety. Ideal for urban, rural, and residential electrification projects.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/Ariel Bunched Cables.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/Ariel Bunched Cables.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Conductor Material','value', 'Aluminium (Stranded Compact)'),
    JSON_OBJECT('label', 'Insulation',        'value', 'XLPE / Weather Resistant HDPE'),
    JSON_OBJECT('label', 'Voltage Grade',     'value', 'Up to 1100 V'),
    JSON_OBJECT('label', 'Temperature Range', 'value', '-15°C to +70°C')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Stranded Compact Aluminium Conductor</li><li>High-density Polyethylene (HDPE) or XLPE Insulation</li><li>Messenger Wire of Aluminium Alloy</li><li>Anti-theft and highly safe overhead system</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Stranded Compact Aluminium (Class 2)</li><li><b>Insulation:</b> XLPE / Weather Resistant HDPE</li><li><b>Messenger Wire:</b> Standard Aluminium Alloy (Stranded)</li><li><b>Core Identification:</b> By longitudinal ribs</li></ul>')
  ),
  '',
  0
);

-- 7. House Wires
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'House Wires',
  'house-wires',
  'House wires are electrical cables designed for internal wiring in residential buildings. Built with high-quality insulation to ensure safety, these wires are used for distributing electricity to outlets, lights, and appliances within a home. They are flame-resistant, durable, and come in various colors for easy identification during installation.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/House Wires.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/House Wires.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Conductor Material','value', 'Annealed Copper'),
    JSON_OBJECT('label', 'Conductor Type',    'value', 'Flexible (Class 5)'),
    JSON_OBJECT('label', 'Insulation',        'value', 'PVC / XLPE'),
    JSON_OBJECT('label', 'Voltage Grade',     'value', 'Up to 1100 V'),
    JSON_OBJECT('label', 'Temperature Range', 'value', '-15°C to +70°C'),
    JSON_OBJECT('label', 'Standard',          'value', 'IS 694:2010')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Flame Retardant (FR) / Flame Retardant Low Smoke (FRLS) PVC</li><li>Class 5 High Conductivity Copper Conductor</li><li>Anti-rodent and Anti-termite properties</li><li>High insulation resistance prevents leakage</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Class 5 Flexible Bare Copper</li><li><b>Insulation:</b> FR / FRLSH PVC Compound</li><li><b>Coil Length:</b> 90 m, 180 m, or project reels</li></ul>')
  ),
  '',
  0
);

-- 8. DC Solar Cable
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'DC Solar cable - (singal core)',
  'dc-solar-cable',
  'Specifically designed for cabling solar panels in photovoltaic plants, solar parks, and commercial/residential solar rooftops. Suitable for direct burial or cable trays.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/DC Solar cable.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/DC Solar cable.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Voltage Grade',      'value', '1.5 KV DC (1.8 KV max)'),
    JSON_OBJECT('label', 'Operating Temp',     'value', '-40°C to +90°C'),
    JSON_OBJECT('label', 'Short Circuit Temp', 'value', '250°C'),
    JSON_OBJECT('label', 'Expected Lifespan',  'value', '25 Years')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Tinned Flexible Copper Conductor for oxidation resistance</li><li>Cross-linked Polyolefin (XLPO) Insulation & Sheath</li><li>Halogen-free and Low Smoke emission</li><li>Excellent UV, Ozone, and weather resistance</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Class 5 Flexible Tinned Copper</li><li><b>Insulation:</b> Halogen-Free Cross-Linked Polyolefin (XLPO)</li><li><b>Outer Sheath:</b> Halogen-Free Cross-Linked Polyolefin (XLPO)</li><li><b>Coils/Drums:</b> 1000m on non-returnable wooden/plastic drums</li></ul>')
  ),
  '',
  0
);

-- 9. Round Flexible Cable
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'Round flexible cable',
  'round-flexible-cable',
  'Round Flexible Cables are manufactured for applications requiring superior flexibility and dependable electrical performance. Built with high-quality copper conductors and durable PVC insulation, these cables provide excellent resistance to moisture, abrasion, and mechanical stress, making them ideal for industrial and domestic use.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/Round flexible cable.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/Round flexible cable.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Standard',              'value', 'IS 694:2010 / BS 6500'),
    JSON_OBJECT('label', 'Conductor',             'value', 'Flexible Bare Copper'),
    JSON_OBJECT('label', 'Voltage Grade',         'value', '1.1 KV'),
    JSON_OBJECT('label', 'Working Temperature',   'value', 'Up to +70°C'),
    JSON_OBJECT('label', 'Core Configuration',    'value', '2 Core / 3 Core / 4 Core'),
    JSON_OBJECT('label', 'Packing Length',        'value', '100m / 200m / 300m / 500m / 1000m')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Multi-core configuration in a round profile</li><li>High flexibility and smooth outer finish</li><li>FR PVC insulation and sheath compounds</li><li>Durable structure resists kinking and twists</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Flexible Bare Copper (Class 5)</li><li><b>Insulation:</b> FR PVC Compound</li><li><b>Outer Sheath:</b> FR PVC (White, Black, or Gray)</li></ul>')
  ),
  '',
  0
);

-- 10. Welding Cable
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'Welding cable',
  'welding-cable',
  'Designed for the secondary (high current) connection to automatic or hand-held metal arc welding electrodes. It is suitable for flexible use under rugged conditions, on assembly lines & conveyor systems, in machine tool and automatically operated line & spot welding machines.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/Welding cable.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/Welding cable.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Operating Temp',       'value', '-20°C to max.+90°C'),
    JSON_OBJECT('label', 'Nominal Voltage',      'value', '600 V'),
    JSON_OBJECT('label', 'Spark Test',           'value', '3.0 KV(ac)'),
    JSON_OBJECT('label', 'Min. Bending Radius',  'value', '6 x Cable Diameter')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Ultra high performance flexible welding lead, double insulated</li><li>Better flame retardant properties</li><li>Outstanding toughness & durability</li><li>High resistance to cuts, tears & abrasion</li><li>Resistance to oil, solvents and chemicals</li><li>Excellent ozone and weather resistant</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Coils:</b> 100, 200, 300 and 500m</li><li><b>Conductor:</b> High conductivity, bare annealed copper flexible conductor</li><li><b>Separation:</b> Polyester tape</li><li><b>Insulation:</b> Double Insulated / single insulated flexible Nitrile rubber HOFR</li></ul>')
  ),
  '<table style="border-collapse:collapse;width:100%" border="1"><thead><tr><th>size</th><th>innerIns</th><th>sheath</th><th>diaSingle</th><th>diaDouble</th><th>res</th><th>cur100%</th><th>cur85%</th><th>cur60%</th><th>cur30%</th><th>cur20%</th><th>nonWelding</th></tr></thead><tbody><tr><td>10.0</td><td>1.0</td><td>1.10</td><td>7.0</td><td>8.50</td><td>1.910</td><td>105</td><td>115</td><td>135</td><td>190</td><td>235</td><td>110</td></tr><tr><td>16.0</td><td>1.10</td><td>1.30</td><td>9.0</td><td>10.0</td><td>1.210</td><td>135</td><td>145</td><td>175</td><td>245</td><td>302</td><td>138</td></tr><tr><td>25.0</td><td>1.20</td><td>1.40</td><td>10.30</td><td>12.0</td><td>0.780</td><td>180</td><td>195</td><td>230</td><td>330</td><td>402</td><td>187</td></tr><tr><td>35.0</td><td>1.20</td><td>1.60</td><td>11.85</td><td>13.50</td><td>0.554</td><td>225</td><td>245</td><td>290</td><td>410</td><td>503</td><td>233</td></tr><tr><td>50.0</td><td>1.30</td><td>1.70</td><td>14.0</td><td>15.20</td><td>0.386</td><td>285</td><td>310</td><td>370</td><td>520</td><td>637</td><td>295</td></tr><tr><td>70.0</td><td>1.40</td><td>1.80</td><td>15.80</td><td>18.0</td><td>0.272</td><td>355</td><td>385</td><td>460</td><td>650</td><td>794</td><td>372</td></tr><tr><td>95.0</td><td>1.80</td><td>2.0</td><td>17.70</td><td>20.60</td><td>0.206</td><td>430</td><td>470</td><td>560</td><td>790</td><td>961</td><td>449</td></tr><tr><td>120.0</td><td>2.0</td><td>2.10</td><td>19.50</td><td>23.0</td><td>0.161</td><td>500</td><td>540</td><td>650</td><td>910</td><td>1118</td><td>523</td></tr></tbody></table>',
  0
);

-- 11. Auto Cable
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'auto cable',
  'auto-cable',
  'Auto Cables are designed for automotive wiring and harness applications, offering reliable electrical performance and long service life. Made with flexible bare copper conductors and durable PVC insulation, they provide excellent flexibility, durability, and resistance to heat, oil, and mechanical stress. Ideal for use in various vehicle electrical systems.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/auto cable.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/auto cable.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Conductor',          'value', 'Flexible (Class 5)'),
    JSON_OBJECT('label', 'Insulation',         'value', 'Double Insulated Rubber'),
    JSON_OBJECT('label', 'Temperature Range',  'value', '-20°C to +90°C'),
    JSON_OBJECT('label', 'Packing Length',     'value', '100m / 200m / 500m / 1000m Coils')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Thin-wall insulation reduces overall cable diameter & weight</li><li>Highly flexible conductor design</li><li>Excellent resistance to heat, fuel, oil, and battery acid</li><li>Mechanically tough and abrasion resistant</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Class 5 Flexible Bare Copper</li><li><b>Insulation:</b> Auto Grade PVC / Cross-linked PVC</li><li><b>Coils:</b> 100m, 500m spool reels</li></ul>')
  ),
  '',
  0
);

-- 12. Battery Cable
INSERT INTO `products` (`name`, `slug`, `description`, `imgList`, `technicalDetails`, `features`, `specificationHtml`, `status`) VALUES
(
  'Battery cable',
  'battery-cable',
  'Battery Cables are specially designed for low-voltage automotive electrical systems, delivering reliable power transmission and excellent flexibility. Manufactured using flexible bare copper conductors with high-quality insulation, these cables offer superior resistance to water, petrol, diesel, acids, lubricating oils, grease, and mechanical stress.',
  JSON_ARRAY(
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/VERTICAL/Battery cable.png'),
    JSON_OBJECT('img', '/assets/images/WEB WIRE IMAGE/HORIZONTAL/Battery cable.png')
  ),
  JSON_ARRAY(
    JSON_OBJECT('label', 'Standard',              'value', 'SAE J1127, VDE 0295, IEC 60228, IS 2465'),
    JSON_OBJECT('label', 'Conductor',             'value', 'Flexible Bare Copper (Class 5 / Class 6)'),
    JSON_OBJECT('label', 'Insulation',            'value', 'HR PVC / HOFR (TPR Rubber)'),
    JSON_OBJECT('label', 'Temperature Range',     'value', '20°C to 105°C'),
    JSON_OBJECT('label', 'Electrical Performance','value', 'Excellent Flame Retardant Properties')
  ),
  JSON_ARRAY(
    JSON_OBJECT('title', 'Salient Features', 'description', '<ul class="list-disc pl-5"><li>Extra flexible large cross-section conductor</li><li>Excellent resistance to battery acid, gasoline, and grease</li><li>Heavy-duty insulation resists cracking and high currents</li><li>Outstanding durability under engine hood temperatures</li></ul>'),
    JSON_OBJECT('title', 'Standard Packing', 'description', '<ul class="list-disc pl-5"><li><b>Conductor:</b> Flexible Bare Copper (Class 5/6)</li><li><b>Insulation:</b> Heavy-duty Automotive PVC / TPE / Rubber</li><li><b>Coils:</b> 30m, 50m, 100m reels</li></ul>')
  ),
  '',
  0
);

SET FOREIGN_KEY_CHECKS = 1;

-- ─── Verify ───────────────────────────────────────────────────────────────────
SELECT 'Users created:' AS '', COUNT(*) AS count FROM users;
SELECT 'Products created:' AS '', COUNT(*) AS count FROM products;
