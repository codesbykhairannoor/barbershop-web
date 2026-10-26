import os
import re
import subprocess
from PIL import Image

def generate_svgs():
    # 1. Main Logo Icon (Square Badge - Perfect for Favicon, App Icon, and Navbar Avatar)
    badge_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <!-- Background Gradient: Deep Obsidian Stone -->
    <linearGradient id="badgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#24211e" />
      <stop offset="100%" stop-color="#141210" />
    </linearGradient>

    <!-- Warm Amber Gold Blade Gradient -->
    <linearGradient id="goldBlade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde68a" />
      <stop offset="45%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>

    <!-- Platinum Steel Blade Gradient -->
    <linearGradient id="steelBlade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#e7e5e4" />
      <stop offset="100%" stop-color="#a8a29e" />
    </linearGradient>

    <!-- Subtle Hairline Gold Border -->
    <linearGradient id="borderGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#b47820" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#78350f" stop-opacity="0.5" />
    </linearGradient>
  </defs>

  <!-- Outer Squircle Badge -->
  <rect x="5" y="5" width="118" height="118" rx="28" fill="url(#badgeBg)" stroke="url(#borderGold)" stroke-width="2" />
  
  <!-- Inner Framing Hairline -->
  <rect x="11" y="11" width="106" height="106" rx="22" fill="none" stroke="#f59e0b" stroke-opacity="0.12" stroke-width="1" />

  <!-- Diagonal Texture Stripes (Whisper opacity) -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1.5">
    <line x1="20" y1="108" x2="108" y2="20" />
    <line x1="32" y1="116" x2="116" y2="32" />
    <line x1="12" y1="96" x2="96" y2="12" />
  </g>

  <!-- Center Shears Artwork -->
  <!-- Blade 1: Platinum Steel (Angles from top-right to bottom-left) -->
  <g id="steel-shears">
    <!-- Pointed Cutting Blade -->
    <path d="M64 64 L90 28 C92 25 95 24 97 26 C99 28 98 31 95 34 L71 67 L53 91 C50 95 46 98 41 98 C34 98 29 93 29 86 C29 79 34 74 41 74 C44 74 48 76 51 79 Z" 
          fill="url(#steelBlade)" />
    <!-- Finger Ring Hole -->
    <circle cx="41" cy="86" r="6" fill="#181614" stroke="url(#steelBlade)" stroke-width="1.5" />
    <!-- Ergonomic Finger Rest (Tang) -->
    <path d="M29 86 C26 87 23 90 22 93 C21 95 23 96 25 95 C27 94 28 91 30 89 Z" fill="url(#steelBlade)" />
  </g>

  <!-- Blade 2: 24k Amber Gold (Angles from top-left to bottom-right) -->
  <g id="gold-shears">
    <!-- Pointed Cutting Blade -->
    <path d="M64 64 L38 28 C36 25 33 24 31 26 C29 28 30 31 33 34 L57 67 L75 91 C78 95 82 98 87 98 C94 98 99 93 99 86 C99 79 94 74 87 74 C84 74 80 76 77 79 Z" 
          fill="url(#goldBlade)" />
    <!-- Thumb Ring Hole -->
    <circle cx="87" cy="86" r="6" fill="#181614" stroke="url(#goldBlade)" stroke-width="1.5" />
  </g>

  <!-- Central Pivot Screw (Precision Barber Shear Ball Bearing) -->
  <circle cx="64" cy="64" r="6.5" fill="#f59e0b" stroke="#fef3c7" stroke-width="1" />
  <circle cx="64" cy="64" r="3.5" fill="#181614" />
  <circle cx="64" cy="64" r="1.5" fill="#f59e0b" />

  <!-- Heritage Star / Crown Accent at Top -->
  <g transform="translate(64, 19)">
    <polygon points="0,-4 1.2,-1 4,-1 1.8,0.8 2.6,3.5 0,1.8 -2.6,3.5 -1.8,0.8 -4,-1 -1.2,-1" fill="#f59e0b" />
  </g>
</svg>"""

    # 2. Transparent Icon Mark (For versatile overlays)
    transparent_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="goldBladeT" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde68a" />
      <stop offset="45%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="steelBladeT" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#e7e5e4" />
      <stop offset="100%" stop-color="#78716c" />
    </linearGradient>
  </defs>

  <!-- Outer Round Enclosure Ring -->
  <circle cx="64" cy="64" r="58" fill="#181614" stroke="#d97706" stroke-width="2.5" />
  <circle cx="64" cy="64" r="52" fill="none" stroke="#f59e0b" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="3 3" />

  <!-- Blade 1: Platinum Steel -->
  <path d="M64 64 L90 28 C92 25 95 24 97 26 C99 28 98 31 95 34 L71 67 L53 91 C50 95 46 98 41 98 C34 98 29 93 29 86 C29 79 34 74 41 74 C44 74 48 76 51 79 Z" fill="url(#steelBladeT)" />
  <circle cx="41" cy="86" r="6" fill="#181614" stroke="url(#steelBladeT)" stroke-width="1.5" />
  <path d="M29 86 C26 87 23 90 22 93 C21 95 23 96 25 95 C27 94 28 91 30 89 Z" fill="url(#steelBladeT)" />

  <!-- Blade 2: Amber Gold -->
  <path d="M64 64 L38 28 C36 25 33 24 31 26 C29 28 30 31 33 34 L57 67 L75 91 C78 95 82 98 87 98 C94 98 99 93 99 86 C99 79 94 74 87 74 C84 74 80 76 77 79 Z" fill="url(#goldBladeT)" />
  <circle cx="87" cy="86" r="6" fill="#181614" stroke="url(#goldBladeT)" stroke-width="1.5" />

  <!-- Pivot Screw -->
  <circle cx="64" cy="64" r="6.5" fill="#f59e0b" stroke="#fef3c7" stroke-width="1" />
  <circle cx="64" cy="64" r="3.5" fill="#181614" />
  <circle cx="64" cy="64" r="1.5" fill="#f59e0b" />

  <!-- Star Accent -->
  <polygon points="64,15 65.2,18 68,18 65.8,19.8 66.6,22.5 64,20.8 61.4,22.5 62.2,19.8 60,18 62.8,18" fill="#f59e0b" />
</svg>"""

    # 3. Horizontal Full Lockup SVG (For header or footer optional use)
    full_logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 64" width="340" height="64" fill="none">
  <!-- Embedded Icon Mark -->
  <g transform="translate(4, 4) scale(0.4375)">
    <rect width="128" height="128" rx="28" fill="#1c1917" stroke="#b47820" stroke-width="2" />
    <path d="M64 64 L90 28 C92 25 95 24 97 26 C99 28 98 31 95 34 L71 67 L53 91 C50 95 46 98 41 98 C34 98 29 93 29 86 C29 79 34 74 41 74 C44 74 48 76 51 79 Z" fill="#fafaf9" />
    <circle cx="41" cy="86" r="6" fill="#1c1917" stroke="#fafaf9" stroke-width="1.5" />
    <path d="M64 64 L38 28 C36 25 33 24 31 26 C29 28 30 31 33 34 L57 67 L75 91 C78 95 82 98 87 98 C94 98 99 93 99 86 C99 79 94 74 87 74 C84 74 80 76 77 79 Z" fill="#f59e0b" />
    <circle cx="87" cy="86" r="6" fill="#1c1917" stroke="#f59e0b" stroke-width="1.5" />
    <circle cx="64" cy="64" r="6.5" fill="#f59e0b" stroke="#fef3c7" stroke-width="1" />
    <circle cx="64" cy="64" r="3.5" fill="#1c1917" />
  </g>

  <!-- Typography -->
  <text x="74" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#1c1917" letter-spacing="-0.5">THE MODERN CUT</text>
  <text x="74" y="48" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10.5" fill="#b47820" letter-spacing="2">BARBER &amp; GROOMING ATELIER</text>
</svg>"""

    # Write SVGs
    paths = {
        'public/logo.svg': badge_svg,
        'public/logo-round.svg': transparent_svg,
        'public/logo-full.svg': full_logo_svg,
        'src/app/icon.svg': badge_svg,
    }

    for path, content in paths.items():
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Created SVG: {path}")

def render_pngs_with_edge():
    # Use msedge in headless mode with screenshot to rasterize pixel-perfect PNGs
    edge_bin = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    
    # We will create an HTML wrapper with high DPI / exact dimensions
    sizes = [
        (512, 'public/logo-512.png'),
        (192, 'public/logo-192.png'),
        (64, 'public/logo.png'),
        (32, 'public/favicon-32x32.png'),
        (16, 'public/favicon-16x16.png'),
        (512, 'src/app/apple-icon.png'),
        (192, 'src/app/icon.png'),
    ]

    html_template = """<!DOCTYPE html>
<html>
<head>
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    html, body {{ width: 100%; height: 100%; background: transparent; overflow: hidden; display: flex; align-items: center; justify-content: center; }}
    img {{ width: {size}px; height: {size}px; display: block; }}
  </style>
</head>
<body>
  <img src="file:///{svg_path}" />
</body>
</html>"""

    svg_abs = os.path.abspath('public/logo.svg').replace('\\', '/')
    tmp_html = os.path.abspath('temp_render.html')

    for size, out_rel in sizes:
        with open(tmp_html, 'w', encoding='utf-8') as f:
            f.write(html_template.format(size=size, svg_path=svg_abs))

        out_abs = os.path.abspath(out_rel)
        cmd = [
            edge_bin,
            '--headless',
            '--disable-gpu',
            '--force-device-scale-factor=1',
            f'--window-size={size},{size}',
            f'--screenshot={out_abs}',
            f'file:///{tmp_html.replace("\\", "/")}'
        ]
        res = subprocess.run(cmd, capture_output=True)
        if os.path.exists(out_abs):
            print(f"Rendered PNG ({size}x{size}): {out_rel}")
        else:
            print(f"Warning: Failed to render {out_rel}")

    if os.path.exists(tmp_html):
        os.remove(tmp_html)

    # Generate multi-frame favicon.ico using PIL
    try:
        img512 = Image.open('public/logo-512.png')
        icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
        img512.save('public/favicon.ico', format='ICO', sizes=icon_sizes)
        img512.save('src/app/favicon.ico', format='ICO', sizes=icon_sizes)
        print("Generated multi-size favicon.ico in public/ and src/app/")
    except Exception as e:
        print("Favicon.ico generation error:", e)

if __name__ == '__main__':
    generate_svgs()
    render_pngs_with_edge()
