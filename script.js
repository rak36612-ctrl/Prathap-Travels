
    // ============================================================
    // DATA
    // ============================================================
    const fleetData = [
        { name:'Kia Carens', type:'Premium MPV', seats:'7', ac:'Dual Zone AC', price:'₹18/km', features:['7 Seats','AC','USB Charging','Music System'], color:0x2a5a8c, bodyType:'mpv', image:'Kia%20Carens.jpg', desc:'Spacious MPV perfect for family trips and group travel. Modern interiors with advanced comfort features and ample luggage space.' },
        { name:'Toyota Innova Crysta', type:'Luxury MPV', seats:'7', ac:'Automatic Climate', price:'₹22/km', features:['Captain Seats','Premium AC','Entertainment','Spacious'], color:0xe8d5b7, bodyType:'mpv', image:'Toyota%20Innova%20Crysta%20launched%20with%20a%20bodykit%20in%20Thailand.jpg', desc:'The gold standard of Indian luxury travel. Captain seats, powerful engine, and supreme ride quality for the discerning traveler.' },
        { name:'Toyota Etios', type:'Comfort Sedan', seats:'4', ac:'Climate Control', price:'₹12/km', features:['4 Seats','AC','Spacious Boot','Fuel Efficient'], color:0xb8b8b8, bodyType:'sedan', image:'etios.jpg', desc:'Reliable and comfortable sedan ideal for city commutes and airport transfers. Known for exceptional reliability and comfort.' },
        { name:'Swift Dzire', type:'Executive Sedan', seats:'4', ac:'Auto Climate', price:'₹11/km', features:['4 Seats','AC','Infotainment','Comfortable'], color:0x4a7ab5, bodyType:'sedan', image:'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80', desc:'Elegant and nimble sedan perfect for daily commutes, airport runs, and short outstation trips in style.' },
        { name:'Mercedes Benz', type:'Ultra Luxury', seats:'4', ac:'Multi-Zone Climate', price:'₹65/km', features:['Leather Interior','Premium Sound','Luxury','Chauffeur'], color:0x1a1a1a, bodyType:'luxury', image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', desc:'The epitome of automotive luxury. For those who accept nothing less than perfection in every detail of their journey.' },
        { name:'BMW', type:'Performance Luxury', seats:'4', ac:'Dual Zone Automatic', price:'₹60/km', features:['Sport Mode','iDrive','Premium Interior','Dynamic'], color:0x0a2a4a, bodyType:'luxury', image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', desc:'Dynamic performance meets refined luxury. The ultimate driving machine for the discerning, performance-focused traveler.' }
    ];

    const servicesData = [
        { icon:'✈️', title:'Airport Taxi', desc:'Punctual airport pickups and drops with flight tracking. Never worry about delays or missed connections again.' },
        { icon:'🚗', title:'Pickup & Drop', desc:'Seamless point-to-point travel service. From doorstep to destination with comfort and precision.' },
        { icon:'🏨', title:'Hotel Transfers', desc:'Luxury hotel shuttle services for guests and tourists. Arrive in style at any premium hotel.' },
        { icon:'💼', title:'Corporate Travel', desc:'Dedicated corporate fleet management. Professional chauffeurs for executives and business events.' },
        { icon:'💒', title:'Wedding & Events', desc:'Decorated luxury cars for weddings and celebrations. Make your special day unforgettable.' },
        { icon:'🗺️', title:'Outstation Trips', desc:'Long-distance journeys with premium comfort. Explore destinations with curated outstation packages.' }
    ];

    const testimonialsData = [
        { name:'Rajesh Sharma', role:'Business Executive', text:'Pratap Travels redefines luxury travel. The Innova Crysta was immaculate and the chauffeur was incredibly professional.' },
        { name:'Ananya Patel', role:'Wedding Planner', text:'We booked 5 luxury cars for a grand wedding convoy. Every vehicle arrived on time, beautifully decorated. Absolutely stunning!' },
        { name:'Vikram Singh', role:'Corporate Client', text:'Our company exclusively uses Pratap Travels for all executive transportation. Reliability, luxury, and professionalism — they excel.' },
        { name:'Priya Nair', role:'Frequent Traveler', text:'From airport pickups to outstation trips, they handle everything perfectly. The Mercedes experience was out of this world.' },
        { name:'Suresh Kumar', role:'Tour Organizer', text:'Organized a group tour with Pratap Travels. Multiple Kia Carens for 30+ people — flawless coordination and happy travelers.' },
        { name:'Deepa Menon', role:'Hotel Manager', text:'We partner with Pratap Travels for all our guest transfers. The feedback from our guests has been overwhelmingly positive.' }
    ];

    let currentCarIndex = 0;
    let mouseX = 0, mouseY = 0;

    // ============================================================
    // RENDER: SERVICES, TESTIMONIALS
    // ============================================================
    const servicesGrid = document.getElementById('servicesGrid');
    servicesData.forEach(s => {
        const c = document.createElement('div'); c.className = 'service-card reveal';
        c.innerHTML = `<div class="service-icon">${s.icon}</div><div class="service-title">${s.title}</div><div class="service-desc">${s.desc}</div>`;
        servicesGrid.appendChild(c);
    });

    const testimonialTrack = document.getElementById('testimonialTrack');
    [...testimonialsData, ...testimonialsData].forEach(t => {
        const c = document.createElement('div'); c.className = 'testimonial-card';
        c.innerHTML = `<div class="testimonial-stars">${'<span class="star">★</span>'.repeat(5)}</div><div class="testimonial-text">"${t.text}"</div><div class="testimonial-author"><div class="testimonial-avatar">${t.name[0]}</div><div><div class="testimonial-name">${t.name}</div><div class="testimonial-role">${t.role}</div></div></div>`;
        testimonialTrack.appendChild(c);
    });

    // ============================================================
    // FLEET GRID INIT
    // ============================================================
    const fleetGrid = document.getElementById('fleetGrid');
    
    function initFleetGrid() {
        if(!fleetGrid) return;
        fleetData.forEach((car, index) => {
            const card = document.createElement('div');
            card.className = 'fleet-card reveal-up';
            card.onclick = (e) => {
                if(!e.target.closest('.btn-book')) {
                    openFleetModal(index);
                }
            };
            
            const specsHTML = [...car.features.slice(0,3), car.seats + ' Seats', car.ac].slice(0, 3).map(f => `<span class="fleet-spec-chip">${f}</span>`).join('');
            
            card.innerHTML = `
                <div class="fleet-img-wrap">
                    <img class="fleet-card-img" src="${car.image}" alt="${car.name}" loading="lazy" />
                </div>
                <div class="fleet-card-title">${car.name}</div>
                <div class="fleet-card-type">${car.type}</div>
                <div class="fleet-card-specs">${specsHTML}</div>
                <p class="fleet-card-desc">${car.desc}</p>
                <div class="fleet-card-actions">
                    <button class="fleet-card-btn btn-view" onclick="openFleetModal(${index}); event.stopPropagation();">View Details</button>
                    <a href="https://wa.me/919945966629?text=Hello%20Pratap%20Travels%2C%20I%20want%20to%20book%20a%20${encodeURIComponent(car.name)}" class="fleet-card-btn btn-book" target="_blank">Book Now</a>
                </div>
            `;
            fleetGrid.appendChild(card);
        });
    }

    // ============================================================
    // FLEET MODAL
    // ============================================================
    function openFleetModal(index) {
        const car = fleetData[index];
        const modal = document.getElementById('fleetModal');
        const modalImg = document.getElementById('modalImage');
        
        modalImg.src = car.image;

        // Render details
        document.getElementById('modalDetails').innerHTML = `
            <div class="modal-car-name">${car.name}</div>
            <div class="modal-car-type">${car.type}</div>
            <p class="modal-car-desc">${car.desc}</p>
            <div class="modal-specs-grid">
                <div class="modal-spec"><div class="modal-spec-value">${car.seats}</div><div class="modal-spec-label">Seats</div></div>
                <div class="modal-spec"><div class="modal-spec-value">${car.price}</div><div class="modal-spec-label">Starting Rate</div></div>
                <div class="modal-spec"><div class="modal-spec-value">${car.ac}</div><div class="modal-spec-label">Climate</div></div>
                <div class="modal-spec"><div class="modal-spec-value">${car.bodyType.toUpperCase()}</div><div class="modal-spec-label">Body Type</div></div>
            </div>
            <div style="display:flex; gap:14px; flex-wrap:wrap; margin-bottom:20px;">
                ${car.features.map(f => `<span class="spec-chip">${f}</span>`).join('')}
            </div>
            <a href="https://wa.me/919945966629?text=Hello%20Pratap%20Travels%2C%20I%20want%20to%20book%20a%20${encodeURIComponent(car.name)}." class="btn-primary" target="_blank" style="width:100%; text-align:center; display:flex; align-items:center; justify-content:center; gap:10px;">
                WhatsApp Us to Book
            </a>
        `;

        // Show modal
        modal.classList.add('active');
        gsap.to(modal, { opacity: 1, duration: 0.4 });
        gsap.to('#modalContent', { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.3)' });
    }

    function closeModal() {
        const modal = document.getElementById('fleetModal');
        gsap.to('#modalContent', { scale: 0.85, y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(modal, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: () => {
            modal.classList.remove('active');
        }});
    }
    document.getElementById('fleetModal').addEventListener('click', (e) => { if (e.target.id === 'fleetModal') closeModal(); });

    // ============================================================
    // SHOWROOM PARTICLES (2D Canvas overlay)
    // ============================================================
    (function showroomParticlesInit() {
        const c = document.getElementById('showroomParticles');
        const ctx = c.getContext('2d');
        const wrap = document.getElementById('showroomWrap');
        let w, h;
        const particles = [];
        function resize() { w = c.width = wrap.clientWidth; h = c.height = wrap.clientHeight; }
        resize(); window.addEventListener('resize', resize);
        for (let i = 0; i < 25; i++) {
            particles.push({ x: Math.random() * 1200, y: Math.random() * 700, vx: (Math.random() - 0.5) * 0.3, vy: -Math.random() * 0.4 - 0.1, r: Math.random() * 1.5 + 0.3, a: Math.random() * 0.4 + 0.1 });
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212,175,55,${p.a})`; ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    })();

    // ============================================================
    // BOOKING FORM → WHATSAPP
    // ============================================================
    function handleBooking(e) {
        e.preventDefault();
        const n = document.getElementById('bkName').value, p = document.getElementById('bkPhone').value;
        const pu = document.getElementById('bkPickup').value, dr = document.getElementById('bkDrop').value;
        const dt = document.getElementById('bkDate').value, v = document.getElementById('bkVehicle').value;
        const sv = document.getElementById('bkService').value;
        const msg = `Hello Pratap Travels!%0A%0A*New Booking*%0AName: ${n}%0APhone: ${p}%0APickup: ${pu}%0ADrop: ${dr}%0ADate: ${dt}%0AVehicle: ${v}%0AService: ${sv}%0A%0APlease confirm. Thank you!`;
        window.open(`https://wa.me/919945966629?text=${msg}`, '_blank');
    }

    // ============================================================
    // MOBILE MENU
    // ============================================================
    document.getElementById('mobileMenuBtn').addEventListener('click', () => document.getElementById('mobileNav').classList.toggle('active'));
    function closeMobileMenu() { document.getElementById('mobileNav').classList.remove('active'); }

    // ============================================================
    // CUSTOM CURSOR
    // ============================================================
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const mouseLight = document.getElementById('mouseLight');
    let ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursorDot.style.left = mouseX - 4 + 'px'; cursorDot.style.top = mouseY - 4 + 'px';
        mouseLight.style.left = mouseX + 'px'; mouseLight.style.top = mouseY + 'px';
    });
    function animateCursor() {
        ringX += (mouseX - ringX) * 0.12; ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX - 20 + 'px'; cursorRing.style.top = ringY - 20 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    document.querySelectorAll('a, button, .service-card, .contact-card, .testimonial-card, .social-icon, select, input, .nav-arrow, .nav-dot, canvas').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });

    // ============================================================
    // SCROLL PROGRESS & NAVBAR
    // ============================================================
    window.addEventListener('scroll', () => {
        const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scrollProgress').style.width = p + '%';
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
    });

    // ============================================================
    // INTRO ANIMATION
    // ============================================================
    const introTl = gsap.timeline({
        onComplete: () => {
            gsap.to('#intro-screen', { opacity: 0, duration: 0.8, ease: 'power2.inOut', onComplete: () => {
                document.getElementById('intro-screen').style.display = 'none';
                playHeroAnimations();
            }});
        }
    });
    const introParticles = document.getElementById('introParticles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div'); p.className = 'smoke-particle';
        const s = Math.random() * 80 + 20; p.style.width = s + 'px'; p.style.height = s + 'px';
        p.style.left = Math.random() * 100 + '%'; p.style.top = Math.random() * 100 + '%'; p.style.opacity = '0';
        introParticles.appendChild(p);
    }
    introTl
        .to('.intro-title', { opacity: 1, duration: 1, ease: 'power2.out' }, 0.3)
        .to('.intro-subtitle', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.8)
        .to('.smoke-particle', { opacity: () => Math.random() * 0.3 + 0.05, x: () => Math.random() * 100 - 50, y: () => Math.random() * 100 - 50, duration: 2, stagger: 0.03, ease: 'power1.out' }, 0.5)
        .to('.intro-car', { opacity: 1, left: '35%', duration: 2, ease: 'power2.out' }, 0.8)
        .to('.wheel', { rotation: 720, duration: 2, ease: 'power2.out' }, 0.8)
        .to('.headlight', { opacity: 1, duration: 0.3 }, 1.5)
        .to('.light-beam', { opacity: 1, duration: 0.5 }, 1.6)
        .to('.taillight', { opacity: 1, duration: 0.3 }, 1.7)
        .to('.intro-title', { textShadow: '0 0 60px rgba(212,175,55,0.6), 0 0 120px rgba(212,175,55,0.3)', duration: 0.8 }, 1.8)
        .to({}, { duration: 0.6 });

    function playHeroAnimations() {
        gsap.to('.hero-bg', { scale: 1.08, duration: 20, ease: 'none', repeat: -1, yoyo: true });
        gsap.timeline()
            .to('#heroBadge', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0)
            .fromTo('#heroTitle', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.2)
            .fromTo('#heroSubtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
            .fromTo('#heroButtons', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
            .fromTo('#heroScroll', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1);
    }

    // ============================================================
    // THREE.JS HERO PARTICLES
    // ============================================================
    (function () {
        const c = document.getElementById('hero-canvas');
        const s = new THREE.Scene(); const cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
        const r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true }); r.setSize(innerWidth, innerHeight); r.setPixelRatio(Math.min(devicePixelRatio, 2));
        const n = 600; const pos = new Float32Array(n * 3); const cols = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) { pos[i*3]=(Math.random()-0.5)*20; pos[i*3+1]=(Math.random()-0.5)*20; pos[i*3+2]=(Math.random()-0.5)*20; cols[i*3]=0.8+Math.random()*0.2; cols[i*3+1]=0.65+Math.random()*0.2; cols[i*3+2]=0.2+Math.random()*0.15; }
        const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
        const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.5, sizeAttenuation: true }));
        s.add(pts); cam.position.z = 5;
        let t = 0;
        function a() { requestAnimationFrame(a); t += 0.001; pts.rotation.y = t * 0.5; pts.rotation.x = Math.sin(t * 0.3) * 0.1; r.render(s, cam); }
        a();
        addEventListener('resize', () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); r.setSize(innerWidth, innerHeight); });
    })();

    // ============================================================
    // GSAP SCROLL ANIMATIONS
    // ============================================================
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.fromTo(el, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.fromTo(el, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.fromTo(el, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    gsap.utils.toArray('.parallax-bg').forEach(bg => {
        gsap.to(bg, { y: -100, ease: 'none', scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
    gsap.utils.toArray('.stat-number').forEach(el => {
        const tgt = parseInt(el.getAttribute('data-count'));
        const o = { val: 0 };
        gsap.to(o, { val: tgt, duration: 2.5, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' },
            onUpdate: () => { el.textContent = tgt >= 1000 ? Math.floor(o.val).toLocaleString() + '+' : Math.floor(o.val) + (tgt === 99 ? '%' : '+'); }
        });
    });
    ScrollTrigger.batch('.service-card', { start: 'top 85%', onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }) });
    gsap.utils.toArray('.parallax-number').forEach(el => {
        gsap.to(el, { y: -80, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });

    // Fleet showroom scroll-driven parallax
    ScrollTrigger.create({
        trigger: '#fleet',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
            if (typeof fleetImage !== 'undefined' && fleetImage) { fleetImage.style.transform = `scale(${1 + self.progress * 0.05})`; }
        }
    });

    // Smooth nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => { e.preventDefault(); const t = document.querySelector(link.getAttribute('href')); if (t) gsap.to(window, { duration: 1, scrollTo: { y: t, offsetY: 80 }, ease: 'power2.inOut' }); });
    });

    // ============================================================
    // BACKGROUND PARTICLES
    // ============================================================
    (function () {
        const c = document.createElement('canvas');
        c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.25;';
        document.body.appendChild(c); const ctx = c.getContext('2d'); let w, h; const ps = []; const cnt = 30;
        function res() { w = c.width = innerWidth; h = c.height = innerHeight; } res(); addEventListener('resize', res);
        for (let i = 0; i < cnt; i++) ps.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: Math.random() + 0.5, a: Math.random() * 0.4 + 0.05 });
        function d() { ctx.clearRect(0, 0, w, h); ps.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(212,175,55,${p.a})`; ctx.fill(); });
            for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, dist = Math.sqrt(dx * dx + dy * dy); if (dist < 150) { ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.strokeStyle = `rgba(212,175,55,${0.04 * (1 - dist / 150)})`; ctx.lineWidth = 0.5; ctx.stroke(); } }
            requestAnimationFrame(d);
        } d();
    })();

    // ============================================================
    // INIT
    // ============================================================
    initFleetGrid();
    