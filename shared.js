// Unified header/footer injector for the Web Programming Lab
// - Injects a consistent navbar and footer
// - Handles dark mode toggle and mobile menu
// - Avoids duplication if a navbar/footer already exists

(function () {
	// Helpers
	function el(tag, attrs = {}, html = '') {
		const node = document.createElement(tag);
		Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
		if (html) node.innerHTML = html;
		return node;
	}

	function cleanupLegacy() {
		document.querySelectorAll('nav').forEach(nav => {
			if (!nav.dataset.shared) nav.remove();
		});
		document.querySelectorAll('footer').forEach(footer => {
			if (!footer.dataset.shared) footer.remove();
		});
		document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
			const href = link.getAttribute('href') || '';
			if (href.includes('modern-style.css')) return;
			if (/universal-footer|landing\\.css|login_page\\.css|routine\\.css|layout\\.css|style\\.css|form\\.css/i.test(href)) {
				link.remove();
			}
		});
	}

	function injectNavbar() {
		if (document.querySelector('nav[data-shared=\"true\"]')) return;

		const nav = el('nav', { class: 'navbar' });
		nav.innerHTML = `
			<div class="navbar-container">
				<a href="${rootPath('landing.html')}" class="navbar-brand">
					<i class="fas fa-laptop-code"></i>
					<span>Web Programming Lab</span>
				</a>
				<button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle mobile menu">
					<i class="fas fa-bars"></i>
				</button>
				<ul class="navbar-menu" id="navbarMenu">
					<li><a href="${rootPath('index.html')}" class="navbar-link"><i class="fas fa-home"></i> Home</a></li>
					<li><a href="${rootPath('index.html#notes')}" class="navbar-link"><i class="fas fa-book"></i> Notes</a></li>
					<li><a href="${rootPath('index.html#code')}" class="navbar-link"><i class="fas fa-code"></i> Code</a></li>
					<li><a href="${rootPath('index.html#assignments')}" class="navbar-link"><i class="fas fa-tasks"></i> Assignments</a></li>
					<li><a href="${rootPath('index.html#lab-tasks')}" class="navbar-link"><i class="fas fa-flask"></i> Lab Tasks</a></li>
				</ul>
				<button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
					<i class="fas fa-moon"></i>
				</button>
			</div>
		`;
		nav.dataset.shared = 'true';
		document.body.prepend(nav);

		// Highlight active item
		const currentPath = location.pathname.replace(/index\\.html$/, '').replace(/\\/$/, '');
		nav.querySelectorAll('.navbar-link').forEach(link => {
			const href = link.getAttribute('href');
			if (!href) return;
			if (href.includes('#')) return;
			const url = new URL(rootPath(href), location.origin);
			const normalized = url.pathname.replace(/index\\.html$/, '').replace(/\\/$/, '');
			if (normalized === currentPath) {
				link.classList.add('active');
			}
		});
	}

	function injectFooter() {
		if (document.querySelector('footer[data-shared=\"true\"]')) return;

		const footer = el('footer', { class: 'footer' });
		footer.innerHTML = `
			<div class="footer-content">
				<div class="footer-grid">
					<div class="footer-section">
						<h3><i class="fas fa-laptop-code"></i> Web Programming Lab</h3>
						<p>Clean, consistent, and responsive academic portfolio with modern UI and optional dark mode.</p>
						<p style="margin-top: 1rem;">
							<strong>Student:</strong> Majharul Islam<br>
							<strong>ID:</strong> 232002256
						</p>
					</div>
					<div class="footer-section">
						<h3>Quick Links</h3>
						<ul class="footer-links">
							<li><a href="${rootPath('index.html')}"><i class="fas fa-th-large"></i> Portfolio</a></li>
							<li><a href="${rootPath('HTML_Documentation/index.html')}"><i class="fas fa-book-open"></i> Docs</a></li>
							<li><a href="${rootPath('main_website/index.html')}"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
						</ul>
					</div>
					<div class="footer-section">
						<h3>University</h3>
						<p>Green University of Bangladesh<br>Department of CSE</p>
					</div>
				</div>
				<div class="footer-bottom">
					<p>&copy; 2025 Web Programming Lab</p>
					<p>Built with HTML5, CSS3 & JavaScript</p>
				</div>
			</div>
		`;
		footer.dataset.shared = 'true';
		document.body.append(footer);
	}

	// Root path resolver (works from nested directories)
	function rootPath(path) {
		try {
			// If already absolute http(s), return as is
			if (/^https?:\\/\\//.test(path)) return path;
			// Compute base depth
			const current = location.pathname; // e.g., /web_programming_lab/classes/class_03/form.html
			// Find project root by locating '/web_programming_lab/'
			const marker = '/web_programming_lab/';
			const idx = current.indexOf(marker);
			if (idx !== -1) {
				const base = current.substring(0, idx + marker.length);
				return base + path;
			}
			// Fallback: relative from current directory
			if (path.startsWith('/')) return path;
			return path;
		} catch {
			return path;
		}
	}

	function ensureTheme() {
		const html = document.documentElement;
		if (!html.hasAttribute('data-theme')) {
			html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
		}
	}

	function enhanceContent() {
		const body = document.body;
		body.classList.add('page-shell');

		let main = document.querySelector('main');
		if (!main) {
			main = document.createElement('main');
			main.classList.add('page-main');
			const moveNodes = Array.from(body.children).filter(node => {
				const tag = node.tagName;
				if (!tag) return false;
				if (tag === 'NAV' || tag === 'FOOTER' || tag === 'SCRIPT') return false;
				return true;
			});
			if (moveNodes.length) {
				const anchor = Array.from(body.children).find(node => node.tagName === 'SCRIPT');
				moveNodes.forEach(node => main.appendChild(node));
				if (anchor) {
					body.insertBefore(main, anchor);
				} else {
					body.appendChild(main);
				}
			} else {
				body.appendChild(main);
			}
		}
		main.classList.add('page-main');

		main.querySelectorAll(':scope > .container').forEach(container => {
			if (!container.classList.contains('content-container')) {
				container.classList.add('content-container');
			}
		});
		main.querySelectorAll('.section').forEach(section => {
			if (section.tagName !== 'SECTION') {
				section.classList.add('content-section');
			}
		});
		main.querySelectorAll('.code-box, pre').forEach(block => block.classList.add('code-block'));
		main.querySelectorAll('table').forEach(table => {
			if (!table.classList.contains('data-table')) table.classList.add('data-table');
		});
		main.querySelectorAll('form').forEach(form => form.classList.add('content-form'));
	}

	function wireInteractions() {
		const mobileMenuToggle = document.getElementById('mobileMenuToggle');
		const navbarMenu = document.getElementById('navbarMenu');
		if (mobileMenuToggle && navbarMenu) {
			mobileMenuToggle.addEventListener('click', () => {
				navbarMenu.classList.toggle('active');
				const icon = mobileMenuToggle.querySelector('i');
				if (icon) {
					icon.classList.toggle('fa-bars');
					icon.classList.toggle('fa-times');
				}
			});
		}

		const themeToggle = document.getElementById('themeToggle');
		const html = document.documentElement;
		if (themeToggle) {
			const setIcon = () => {
				const icon = themeToggle.querySelector('i');
				if (!icon) return;
				const theme = html.getAttribute('data-theme');
				icon.classList.remove('fa-moon', 'fa-sun');
				icon.classList.add(theme === 'light' ? 'fa-moon' : 'fa-sun');
			};
			setIcon();
			themeToggle.addEventListener('click', () => {
				const current = html.getAttribute('data-theme') || 'light';
				const next = current === 'light' ? 'dark' : 'light';
				html.setAttribute('data-theme', next);
				localStorage.setItem('theme', next);
				setIcon();
			});
		}

		// Navbar shadow on scroll
		window.addEventListener('scroll', () => {
			const navbar = document.querySelector('.navbar');
			if (!navbar) return;
			if (window.scrollY > 50) navbar.classList.add('scrolled');
			else navbar.classList.remove('scrolled');
		});

		// Reveal animations for cards/stats
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) entry.target.classList.add('visible');
			});
		}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

		document.querySelectorAll('.card, .stat-card').forEach((el, i) => {
			el.classList.add('fade-in');
			el.style.transitionDelay = `${i * 0.08}s`;
			observer.observe(el);
		});
	}

	function ensureAssets() {
		// Load Font Awesome if missing
		if (!document.querySelector('link[href*=\"font-awesome\"], link[href*=\"fontawesome\"]')) {
			const fa = el('link', {
				rel: 'stylesheet',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
			});
			document.head.appendChild(fa);
		}
		// Ensure modern-style.css is present
		if (!document.querySelector('link[href$=\"modern-style.css\"]')) {
			// Try relative from current page towards project root
			const link = el('link', { rel: 'stylesheet', href: rootPath('modern-style.css') });
			document.head.appendChild(link);
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		cleanupLegacy();
		ensureAssets();
		ensureTheme();
		enhanceContent();
		injectNavbar();
		injectFooter();
		wireInteractions();
	});
})(); 

