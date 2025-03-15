import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/Product.js';

dotenv.config();

// All 95 products from the catalog
const allProducts = [
    // ELECTRONICS (20)
    { name: 'Ultra-Wide Curved Monitor', description: '34-inch 144Hz curved gaming monitor with OLED tech.', price: 899.99, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Vision', stock: 5, isLatest: true },
    { name: 'Noise Cancelling Headphones', description: 'Active noise cancellation with 40h battery life.', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Sonic', stock: 12 },
    { name: 'Mechanical RGB Keyboard', description: 'Hot-swappable switches with customizable lighting.', price: 149.00, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Clicky', stock: 20 },
    { name: 'Ergonomic Wireless Mouse', description: 'High precision sensor with ergonomic thumb rest.', price: 79.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Precision', stock: 35 },
    { name: 'Portable SSD 2TB', description: 'Rugged external SSD with blazing fast 1000MB/s speeds.', price: 189.00, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'SafeData', stock: 15 },
    { name: '4K Mirrorless Camera', description: 'Professional grade sensor with 4K 60fps video capability.', price: 1299.00, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Optic', stock: 3, isLatest: true },
    { name: 'Smart Watch Series 5', description: 'Health tracking, GPS, and cellular connectivity.', price: 399.00, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Pulse', stock: 10 },
    { name: 'Drone with 4K Camera', description: 'Foldable quadcopter with 30-min flight time.', price: 549.00, image: 'https://images.unsplash.com/photo-1524143909107-160759f3f4fd?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'SkyView', stock: 7 },
    { name: 'Bluetooth Soundbar', description: 'Immersive home theater sound in a compact design.', price: 229.00, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Sonic', stock: 18 },
    { name: 'VR Headset Pro', description: 'Next-gen virtual reality with 5K resolution.', price: 799.00, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Virtualis', stock: 5, isLatest: true },
    { name: 'Tablet Air 11', description: 'Super thin tablet with vibrant Retina display.', price: 599.00, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'TabCo', stock: 25 },
    { name: 'Video Game Console Elite', description: 'The fastest console with 8K support and SSD.', price: 499.00, image: 'https://images.unsplash.com/photo-1485479455574-f06a14717185?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'PlayZone', stock: 8 },
    { name: 'Streaming Microphone', description: 'Studio quality condenser mic for podcasts and streaming.', price: 129.00, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'AudioPro', stock: 14 },
    { name: 'Graphic Tablet', description: 'Pressure sensitive drawing surface for artists.', price: 349.00, image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'DrawPad', stock: 11 },
    { name: 'E-Reader Paper', description: 'High resolution e-ink screen that reads like paper.', price: 129.00, image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'InkWell', stock: 40 },
    { name: 'External GPU Box', description: 'Boost your laptop graphics performance.', price: 299.00, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Vision', stock: 4 },
    { name: 'Smart Thermostat', description: 'Energy saving thermostat with mobile control.', price: 199.00, image: 'https://images.unsplash.com/photo-1567928263652-ad06173031ff?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'EcoHome', stock: 22 },
    { name: 'Webcam 4K Ultra', description: 'Crystal clear video for conferences and streaming.', price: 89.00, image: 'https://images.unsplash.com/photo-1587840171670-8bdf568677c7?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'ViewMax', stock: 30 },
    { name: 'Mesh WiFi System', description: 'Whole-home coverage with seamless roaming.', price: 249.00, image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Connect', stock: 16 },
    { name: 'Bone Conduction Headphones', description: 'Open-ear safety with great audio quality.', price: 159.00, image: 'https://images.unsplash.com/photo-1628155930542-3c7a6402c0b7?auto=format&fit=crop&q=80&w=800', category: 'Electronics', brand: 'Audia', stock: 12 },

    // APPAREL (20)
    { name: 'Premium Oversized Hoodie', description: 'Heavyweight streetwear hoodie in stone grey.', price: 85.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Urban', stock: 45, isLatest: true },
    { name: 'Tailored Wool Coat', description: 'Italian wool blend overcoat for winter.', price: 350.00, image: 'https://images.unsplash.com/photo-1539533377285-b040bf554030?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Classy', stock: 10 },
    { name: 'Linen Button-Down', description: 'Breathable summer shirt in sand beige.', price: 65.00, image: 'https://images.unsplash.com/photo-1594932224030-9409539fe5e0?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Nordic', stock: 25 },
    { name: 'Selvedge Denim Jeans', description: 'Raw denim that ages beautifully with wear.', price: 140.00, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Indigo', stock: 15 },
    { name: 'Cashmere Sweater', description: 'Ultra-soft sustainable cashmere knitwear.', price: 195.00, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Luxe', stock: 8 },
    { name: 'Vintage Band Tee', description: 'Washed cotton graphic tee for a retro look.', price: 38.00, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Heritage', stock: 30 },
    { name: 'Cargo Joggers', description: 'Functional pants with multiple tactical pockets.', price: 75.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143af7be?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Urban', stock: 20 },
    { name: 'Leather Biker Jacket', description: 'Genuine leather jacket with asymmetrical zippers.', price: 450.00, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Wild', stock: 5 },
    { name: 'Silk Floral Dress', description: 'Elegant mid-length dress for spring events.', price: 125.00, image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Flora', stock: 12 },
    { name: 'Active Performance Leggings', description: 'High-waist moisture wicking gym leggings.', price: 55.00, image: 'https://images.unsplash.com/photo-1506629082925-ef404544d6da?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Motion', stock: 50 },
    { name: 'Harrington Jacket', description: 'Classic lightweight jacket with tartan lining.', price: 110.00, image: 'https://images.unsplash.com/photo-1544022613-e87fd75a784a?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Londoner', stock: 18 },
    { name: 'Puffer Vest', description: 'Water resistant down-filled vest for layering.', price: 95.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aec16adcd?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Apex', stock: 15 },
    { name: 'Chino Shorts', description: 'Stretch cotton shorts in classic khaki.', price: 45.00, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Basics', stock: 40 },
    { name: 'Pleated Trousers', description: 'Modern silhouette with relaxed fit through hips.', price: 90.00, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Nordic', stock: 22 },
    { name: 'Ribbed Knit Scarf', description: 'Extra long wool scarf for extreme cold.', price: 40.00, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Arctic', stock: 60 },
    { name: 'Canvas Tote Bag', description: 'Heavy duty cotton tote with interior pockets.', price: 25.00, image: 'https://images.unsplash.com/photo-1544816153-09730bc546a1?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Eco', stock: 100 },
    { name: 'Denim Shirt', description: 'Western style denim shirt with pearl snaps.', price: 70.00, image: 'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Indigo', stock: 20 },
    { name: 'Formal Blazer', description: 'Slim fit navy blazer for professional settings.', price: 180.00, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Classy', stock: 12 },
    { name: 'Turtleneck Top', description: 'Soft modal blend essential layering piece.', price: 32.00, image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Basics', stock: 45 },
    { name: 'Beanie Hat', description: 'Sustainable recycled polyester ribbed beanie.', price: 22.00, image: 'https://images.unsplash.com/photo-1576871337622-983ef3c411b9?auto=format&fit=crop&q=80&w=800', category: 'Apparel', brand: 'Arctic', stock: 80 },

    // HOME & KITCHEN (20)
    { name: 'Ceramic Pour-Over Set', description: 'Handcrafted ceramic coffee dripper and carafe.', price: 45.00, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Artisan', stock: 20 },
    { name: 'Linen Bedding Set', description: '100% French linen duvet cover and pillowcases.', price: 210.00, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Sleep', stock: 15, isLatest: true },
    { name: 'Soy Wax Candle', description: 'Minimalist glass jar with sandalwood scent.', price: 28.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Glow', stock: 50 },
    { name: 'Matte Black Cutler Set', description: '24-piece stainless steel flatware for 6.', price: 89.00, image: 'https://images.unsplash.com/photo-1596450514735-2440214e2d3a?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Dine', stock: 12 },
    { name: 'Woven Wall Tapestry', description: 'Large abstract fiber art for modern living rooms.', price: 155.00, image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Artisan', stock: 5 },
    { name: 'Glass Electric Kettle', description: 'Tempered glass with quick boil technology.', price: 55.00, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Brew', stock: 30 },
    { name: 'Velvet Throw Pillow', description: 'Luxurious velvet cover in deep forest green.', price: 35.00, image: 'https://images.unsplash.com/photo-1584180864415-45554a1801c1?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Pillow', stock: 40 },
    { name: 'Abstract Ceramic Vase', description: 'Sculptural matte white vase for dried florals.', price: 48.00, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf907442?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Artisan', stock: 25 },
    { name: 'Turkish Cotton Towels', description: 'Set of 4 plush, quick-dry bath towels.', price: 75.00, image: 'https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Bath', stock: 18 },
    { name: 'Cast Iron Skillet', description: 'Pre-seasoned heavy duty pan for searing.', price: 65.00, image: 'https://images.unsplash.com/photo-1590118280758-2cd2392ee0ca?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Chef', stock: 22 },
    { name: 'Mid-Century Desk Lamp', description: 'Adjustable brass lamp with marble base.', price: 120.00, image: 'https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Lume', stock: 14 },
    { name: 'Smart Air Purifier', description: 'HEPA filter with real-time air quality monitor.', price: 299.00, image: 'https://images.unsplash.com/photo-1585771724684-252702b3abc5?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Pure', stock: 8 },
    { name: 'Bamboo Cutting Board', description: 'Naturally antimicrobial set of 3 boards.', price: 32.00, image: 'https://images.unsplash.com/photo-1595231712325-9fdec20d182a?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Green', stock: 45 },
    { name: 'Glass Food Containers', description: '10-piece set with airtight bamboo lids.', price: 58.00, image: 'https://images.unsplash.com/photo-1605917402c01-7299a4163013?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Organize', stock: 35 },
    { name: 'Wool Area Rug', description: 'Hand-knotted geometric rug 5x7 ft.', price: 450.00, image: 'https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Floor', stock: 3 },
    { name: 'Automatic Espresso Machine', description: 'One-touch bean-to-cup coffee maker.', price: 799.00, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Brew', stock: 6, isLatest: true },
    { name: 'Cotton Rope Basket', description: 'Decorative storage for blankets and toys.', price: 29.00, image: 'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Organize', stock: 50 },
    { name: 'Silicone Cookware Set', description: 'Heat-resistant kitchen utensils with wood handles.', price: 42.00, image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Dine', stock: 30 },
    { name: 'Adjustable Standing Desk', description: 'Dual motor electric desk frame with oak top.', price: 550.00, image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Work', stock: 10 },
    { name: 'Indoor Herb Garden kit', description: 'Hydroponic system with built-in LED light.', price: 89.00, image: 'https://images.unsplash.com/photo-1533215234256-f9492167fc7e?auto=format&fit=crop&q=80&w=800', category: 'Home', brand: 'Green', stock: 15 },

    // ACCESSORIES & BAGS (20)
    { name: 'Minimalist Leather Backpack', description: 'Full grain leather backpack with laptop compartment.', price: 129.99, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800', category: 'Bags', brand: 'Nordic', stock: 10 },
    { name: 'Silver Herringbone Chain', description: 'Sterling silver delicately crafted necklace.', price: 65.00, image: 'https://images.unsplash.com/photo-1515562141207-7a8847ce33b7?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Sparkle', stock: 25 },
    { name: 'Canvas Weekender Bag', description: 'Spacious duffel for 72-hour trips.', price: 110.00, image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800', category: 'Bags', brand: 'Escape', stock: 15, isLatest: true },
    { name: 'Aviator Sunglasses', description: 'Polished gold frames with polarized lenses.', price: 185.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'SunGuard', stock: 30 },
    { name: 'Slim Leather Wallet', description: 'Minimalist bi-fold wallet for 8 cards.', price: 45.00, image: 'https://images.unsplash.com/photo-1627123424574-18bd75f2b952?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Nordic', stock: 40 },
    { name: 'Silk Pocket Square', description: 'Hand-rolled edges with geometric pattern.', price: 32.00, image: 'https://images.unsplash.com/photo-1598501022229-39770a305591?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Classy', stock: 50 },
    { name: 'Corduroy Tote Bag', description: 'Soft textured bag with magnetic closure.', price: 38.00, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800', category: 'Bags', brand: 'Urban', stock: 28 },
    { name: 'Matte Black Cufflinks', description: 'Modern design for minimalist formal wear.', price: 55.00, image: 'https://images.unsplash.com/photo-1620606134371-1e967520e7a2?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Classy', stock: 15 },
    { name: 'Roll-top Camera Bag', description: 'Modular padded interior for gear protection.', price: 145.00, image: 'https://images.unsplash.com/photo-1510332219808-724d9c49d83d?auto=format&fit=crop&q=80&w=800', category: 'Bags', brand: 'Optic', stock: 8 },
    { name: 'Watch Roll Case', description: 'Italian leather travel storage for 3 watches.', price: 95.00, image: 'https://images.unsplash.com/photo-1622398925373-3f91b13f8cd2?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Timeless', stock: 12 },
    { name: 'Anti-Theft Backpack', description: 'Hidden zippers and cut-proof fabric.', price: 85.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800', category: 'Bags', brand: 'Connect', stock: 20 },
    { name: 'Gold Signet Ring', description: '14k solid gold ring with flat top.', price: 320.00, image: 'https://images.unsplash.com/photo-1611955158732-28c175b2ffda?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Sparkle', stock: 5 },
    { name: 'Cotton Scarf', description: 'Lightweight breathable scarf in indigo.', price: 28.00, image: 'https://images.unsplash.com/photo-1520630591147-36e76555474d?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Indigo', stock: 35 },
    { name: 'Leather Passport Holder', description: 'Travel essential with two card slots.', price: 35.00, image: 'https://images.unsplash.com/photo-1544391490-9f1707328682?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Escape', stock: 50 },
    { name: 'Tech Organizer Kit', description: 'Elastic loops and pockets for cables.', price: 42.00, image: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'SafeData', stock: 45 },
    { name: 'Suede Messenger Bag', description: 'Rustic brown suede for office and daily use.', price: 165.00, image: 'https://images.unsplash.com/photo-1548863227-3af567fc3b27?auto=format&fit=crop&q=80&w=800', category: 'Bags', brand: 'Vintage', stock: 6 },
    { name: 'Belt with Steel Buckle', description: 'Full grain leather belt in dark brown.', price: 49.00, image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5ea3?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Nordic', stock: 30 },
    { name: 'Wool Fedora Hat', description: 'Classic hat with silk ribbon trim.', price: 85.00, image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Heritage', stock: 10 },
    { name: 'Laptop Sleeve 13 inch', description: 'Water resistant neoprene with soft lining.', price: 25.00, image: 'https://images.unsplash.com/photo-1568202525543-7f153a6b5711?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'TabCo', stock: 80 },
    { name: 'Key Organizer', description: 'Noisy key management solved with leather.', price: 38.00, image: 'https://images.unsplash.com/photo-1613141411244-0e4ac259d24d?auto=format&fit=crop&q=80&w=800', category: 'Accessories', brand: 'Nordic', stock: 50 },

    // SHOES & SPORTS (15)
    { name: 'Cloud-Run Sneakers', description: 'Ultimate comfort for long distance running.', price: 155.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Stride', stock: 20 },
    { name: 'Leather Chelsea Boots', description: 'Timeless boots with elastic side panels.', price: 195.00, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Classy', stock: 12 },
    { name: 'Lightweight Yoga Mat', description: 'Anti-tear surface with aligning markers.', price: 48.00, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800', category: 'Sports', brand: 'Zen', stock: 35 },
    { name: 'Adjustable Dumbbells', description: '5-50lb range in a single space-saving set.', price: 350.00, image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&q=80&w=800', category: 'Sports', brand: 'Apex', stock: 6, isLatest: true },
    { name: 'High-Top Basketball Shoes', description: 'Superior ankle support with responsive air unit.', price: 140.00, image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Hoops', stock: 15 },
    { name: 'Carbon Fiber Bike Helmet', description: 'Aerodynamic safety for professional cyclists.', price: 180.00, image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800', category: 'Sports', brand: 'Velo', stock: 8 },
    { name: 'Canvas Slip-Ons', description: 'Ethically made casual summer sneakers.', price: 55.00, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Basics', stock: 45 },
    { name: 'Professional Skipping Rope', description: 'High speed steel cable for cardio intense workouts.', price: 22.00, image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&q=80&w=800', category: 'Sports', brand: 'Apex', stock: 100 },
    { name: 'Classic Derby Shoes', description: 'Polished calfskin leather for formal events.', price: 175.00, image: 'https://images.unsplash.com/photo-1531310197839-ccf5463ee5da?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Classy', stock: 10 },
    { name: 'Snowboard Pro 155', description: 'All-mountain board with hybrid camber.', price: 420.00, image: 'https://images.unsplash.com/photo-1520625358631-789a62259162?auto=format&fit=crop&q=80&w=800', category: 'Sports', brand: 'Apex', stock: 4, isLatest: true },
    { name: 'Minimalist Trainers', description: 'Barefoot style training shoes for lifting.', price: 110.00, image: 'https://images.unsplash.com/photo-1539185441755-769473a23a5e?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Pulse', stock: 18 },
    { name: 'Heavy Punching Bag', description: 'Durable synthetic leather for boxing training.', price: 125.00, image: 'https://images.unsplash.com/photo-1517438322307-e67300a3177c?auto=format&fit=crop&q=80&w=800', category: 'Sports', brand: 'Wild', stock: 7 },
    { name: 'Hiking Boots', description: 'Waterproof trek gear with Vibram soles.', price: 165.00, image: 'https://images.unsplash.com/photo-1549476464-37392f717551?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Arctic', stock: 12 },
    { name: 'Resistance Band Set', description: '5 levels of tension for home physiotherapy.', price: 35.00, image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800', category: 'Sports', brand: 'Motion', stock: 60 },
    { name: 'Vintage High-Tops', description: 'Classic 80s inspired retro sneakers.', price: 95.00, image: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?auto=format&fit=crop&q=80&w=800', category: 'Shoes', brand: 'Heritage', stock: 22 }
];

async function seed() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected!');

        console.log('🗑️  Clearing existing products...');
        await Product.deleteMany({});

        // Add sellerId to each product
        const productsWithSeller = allProducts.map(product => ({
            ...product,
            sellerId: new mongoose.Types.ObjectId()
        }));

        console.log(`📦 Inserting ${productsWithSeller.length} products...`);
        const result = await Product.insertMany(productsWithSeller);
        console.log(`✅ Successfully seeded ${result.length} products!`);

        // Show statistics
        const categories = [...new Set(result.map(p => p.category))];
        console.log(`📊 Categories (${categories.length}): ${categories.join(', ')}`);

        const latestCount = result.filter(p => p.isLatest).length;
        console.log(`⭐ Latest products: ${latestCount}`);

        await mongoose.disconnect();
        console.log('👋 Done! All 95 products from your catalog are now in the database.');
        console.log('🔄 Refresh your browser to see the full catalog!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seed();
