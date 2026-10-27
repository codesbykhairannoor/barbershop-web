import pandas as pd
import json
import re
import urllib.parse
import os

excel_file = 'd:/barbershopsalon/listing.xlsx'
df = pd.read_excel(excel_file, sheet_name='Barbershop & Salon')

exclude_non_barber = ['Restoran Spanyol', 'Klub Spa dan Kesehatan']
df = df[~df['Jenis Usaha'].isin(exclude_non_barber)].copy()

def generate_slug(name, id_num):
    s = str(name).lower()
    # clean brackets, quotes, punctuation
    s = re.sub(r'[\(\)\[\]\{\}\'\"\|&/\\,.:;]', ' ', s)
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s-]+', '-', s).strip('-')
    if not s:
        s = f'barber-{id_num}'
    return s[:45]

def to_title_case(s):
    if not s: return ''
    parts = re.split(r'([\s\-–—/()&.,|]+)', s)
    res = []
    is_first = True
    for p in parts:
        if not p or re.match(r'^[\s\-–—/()&.,|]+$', p):
            res.append(p)
        elif is_first:
            is_first = False
            if re.match(r'^(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)$', p.lower()):
                res.append(p.upper())
            else:
                res.append(p.capitalize())
        elif p.lower() in ['dan', 'di', 'ke', 'dari', 'yang', 'and', 'of', 'in', 'the', 'at', 'by', '&']:
            res.append(p.lower())
        elif re.match(r'^(i|ii|iii|iv|v|vi|vii|viii|ix|x|xi|xii)$', p.lower()):
            res.append(p.upper())
        elif p.isupper() and len(p) >= 2:
            res.append(p.capitalize())
        elif p.islower():
            res.append(p.capitalize())
        else:
            res.append(p)
    return ''.join(res)

all_items = []
used_slugs = set()

for idx, row in df.iterrows():
    raw_name = str(row['Nama Usaha']).strip() if pd.notnull(row['Nama Usaha']) else ''
    name = to_title_case(raw_name)
    if not name or name == 'nan':
        continue
    
    city_raw = str(row['Kota / Kabupaten']).strip() if pd.notnull(row['Kota / Kabupaten']) else 'Jakarta Selatan'
    city_en = 'South Jakarta' if 'Jakarta' in city_raw else 'Bandung'
    
    phone = str(row['Nomor Telepon']).strip() if pd.notnull(row['Nomor Telepon']) else ''
    if phone.endswith('.0'): phone = phone[:-2]
    
    clean_phone = re.sub(r'[^0-9]', '', phone)
    if clean_phone.startswith('0'):
        clean_phone = '62' + clean_phone[1:]
    elif clean_phone.startswith('8'):
        clean_phone = '62' + clean_phone
        
    wa_url = ''
    if len(clean_phone) >= 10:
        wa_url = f'https://wa.me/{clean_phone}'
    elif str(row['Link WhatsApp']).startswith('http'):
        wa_url = str(row['Link WhatsApp']).strip()
        
    rating = 4.8
    if pd.notnull(row['Rating']):
        try:
            rating = float(row['Rating'])
        except:
            rating = 4.8
            
    reviews = 0
    if pd.notnull(row['Jumlah Ulasan']):
        try:
            reviews = int(float(row['Jumlah Ulasan']))
        except:
            reviews = 0
            
    address = str(row['Alamat Lengkap']).strip() if pd.notnull(row['Alamat Lengkap']) and str(row['Alamat Lengkap']) != 'nan' else ''
    maps = str(row['Link Google Maps']).strip() if pd.notnull(row['Link Google Maps']) and str(row['Link Google Maps']).startswith('http') else ''
    
    # Generate unique slug
    base_slug = generate_slug(name, len(all_items) + 1)
    slug = base_slug
    counter = 1
    while slug in used_slugs:
        slug = f'{base_slug}-{counter}'
        counter += 1
    used_slugs.add(slug)
    
    all_items.append({
        'id': len(all_items) + 1,
        'slug': slug,
        'name': name,
        'service_type': str(row['Jenis Usaha']).strip() if pd.notnull(row['Jenis Usaha']) else 'Barbershop',
        'city': city_en,
        'city_orig': city_raw,
        'rating': round(rating, 1),
        'reviews': reviews,
        'phone': phone,
        'clean_phone': clean_phone,
        'whatsapp_url': wa_url,
        'address': address,
        'maps_url': maps,
        'is_top_rated': rating >= 4.8 and reviews >= 20
    })

# Save JSON files
os.makedirs('d:/barbershopsalon/src/data', exist_ok=True)
with open('d:/barbershopsalon/src/data/barbershops.json', 'w', encoding='utf-8') as f:
    json.dump(all_items, f, ensure_ascii=False, indent=2)

with open('d:/barbershopsalon/public/barbershops.min.json', 'w', encoding='utf-8') as f:
    json.dump(all_items, f, ensure_ascii=False, separators=(',', ':'))

print(f'Successfully updated barbershops.json with slugs! Total: {len(all_items)}')

# Generate 100 Top Leads Excel for Pitching
MY_PHONE = "6285718203535"
DEMO_BASE = "https://barbershop-web-demo.vercel.app"

# Filter items with valid phone number and sort by reviews & rating descending
valid_leads = [i for i in all_items if len(i['clean_phone']) >= 10]
valid_leads.sort(key=lambda x: (x['reviews'], x['rating']), reverse=True)
top_100_leads = valid_leads[:100]

rows = []
dashboard_leads = []

for i, lead in enumerate(top_100_leads, start=1):
    slug_url = f"{DEMO_BASE}/p/{lead['slug']}"
    
    # Pesan WA Singkat, Menggiurkan, To The Point, & Anti-Basa-Basi
    pesan = (
        f"Halo Mas / Tim *{lead['name']}*, salam kenal! 👋\n\n"
        f"Saya perhatikan reputasi Google Maps kalian mantap banget ya (⭐ {lead['rating']:.1f} dari {lead['reviews']:,} ulasan di {lead['city_orig']}).\n\n"
        f"Karena reputasinya udah top, saya iseng bikinin website profil modern khusus buat *{lead['name']}*, lengkap sama sistem booking online yang langsung nyambung ke WA kalian ini:\n\n"
        f"👉 {slug_url}\n\n"
        f"Coba buka lewat HP deh Mas, tampilannya bersih & mewah banget. Kalau cocok dan mau disambungkan ke domain resmi toko kalian, kabari saya ya. Sukses terus buat {lead['name']}! 💈✂️"
    )
    
    encoded_pesan = urllib.parse.quote(pesan)
    link_kirim_wa = f"https://wa.me/{lead['clean_phone']}?text={encoded_pesan}"
    
    rows.append({
        'No': i,
        'Nama Barbershop': lead['name'],
        'Kota': lead['city_orig'],
        'Rating & Ulasan Google': f"{lead['rating']:.1f} ⭐ ({lead['reviews']} Ulasan)",
        'WhatsApp Barbershop (Prospek)': lead['phone'],
        'Link Demo Pendek (Branded)': slug_url,
        'Pesan WhatsApp Personalisasi (Siap Kirim)': pesan,
        'Link Klik Langsung Kirim WA': link_kirim_wa,
        'Alamat Lengkap': lead['address'],
        'Status Follow-up': 'Belum Dihubungi',
        'Catatan': ''
    })

    dashboard_leads.append({
        'no': i,
        'name': lead['name'],
        'city': lead['city_orig'],
        'rating': lead['rating'],
        'reviews': lead['reviews'],
        'phone': lead['phone'],
        'clean_phone': lead['clean_phone'],
        'demo_url': slug_url,
        'message': pesan,
        'wa_url': link_kirim_wa,
        'address': lead['address']
    })

leads_df = pd.DataFrame(rows)
output_excel = 'd:/barbershopsalon/100_LEADS_BARBERSHOP_PITCH_PROSPEK.xlsx'

# Write to Excel with formatting
with pd.ExcelWriter(output_excel, engine='openpyxl') as writer:
    leads_df.to_excel(writer, index=False, sheet_name='100 Leads Pitch')
    ws = writer.sheets['100 Leads Pitch']
    
    # Auto adjust column widths & styling
    for col in ws.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = col[0].column_letter
        ws.column_dimensions[col_letter].width = min(max(max_len + 3, 12), 45)

print(f'Successfully generated pitch spreadsheet: {output_excel} with {len(rows)} leads!')

# Also generate interactive Pitch Dashboard HTML
dashboard_html = f'''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>1-Click WhatsApp Pitch Dashboard | 100 Leads Barbershop</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 24px 16px 80px;
    }}
    .container {{
      max-width: 1080px;
      margin: 0 auto;
    }}
    .header {{
      background: linear-gradient(135deg, #18181b 0%, #27272a 100%);
      color: white;
      padding: 32px 24px;
      border-radius: 24px;
      margin-bottom: 24px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
    }}
    .header h1 {{
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .header p {{
      color: #a1a1aa;
      font-size: 14px;
      line-height: 1.5;
    }}
    .controls {{
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 20px;
      align-items: center;
      justify-content: space-between;
    }}
    .search-box {{
      flex: 1;
      min-width: 260px;
      position: relative;
    }}
    .search-box input {{
      width: 100%;
      padding: 12px 16px;
      border-radius: 14px;
      border: 1px solid #cbd5e1;
      font-size: 14px;
      outline: none;
      background: white;
      transition: all 0.2s;
    }}
    .search-box input:focus {{
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
    }}
    .filter-tabs {{
      display: flex;
      gap: 8px;
    }}
    .filter-btn {{
      padding: 10px 18px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid #cbd5e1;
      background: white;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s;
    }}
    .filter-btn.active {{
      background: #0f172a;
      color: white;
      border-color: #0f172a;
    }}
    .card-list {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }}
    .card {{
      background: white;
      border-radius: 20px;
      padding: 20px 24px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }}
    .card:hover {{
      border-color: #cbd5e1;
      box-shadow: 0 8px 20px rgba(0,0,0,0.06);
    }}
    .card-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }}
    .badge-num {{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #f1f5f9;
      font-weight: 700;
      font-size: 12px;
      color: #334155;
    }}
    .shop-title {{
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
    }}
    .shop-meta {{
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: 12px;
      color: #64748b;
      flex-wrap: wrap;
    }}
    .tag-rating {{
      background: #fef3c7;
      color: #b45309;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 6px;
    }}
    .tag-city {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 6px;
    }}
    .preview-msg {{
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      white-space: pre-line;
      max-height: 100px;
      overflow-y: auto;
    }}
    .card-actions {{
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }}
    .btn-wa {{
      background: #25D366;
      color: white;
      font-weight: 700;
      font-size: 13px;
      padding: 10px 18px;
      border-radius: 12px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      box-shadow: 0 4px 12px rgba(37,211,102,0.25);
    }}
    .btn-wa:hover {{
      background: #20ba59;
      transform: translateY(-1px);
    }}
    .btn-demo {{
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 600;
      font-size: 13px;
      padding: 10px 16px;
      border-radius: 12px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }}
    .btn-demo:hover {{
      background: #e2e8f0;
    }}
    .btn-copy {{
      background: white;
      border: 1px solid #cbd5e1;
      color: #475569;
      font-weight: 600;
      font-size: 13px;
      padding: 10px 14px;
      border-radius: 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }}
    .btn-copy:hover {{
      background: #f8fafc;
      border-color: #94a3b8;
    }}
    .toast {{
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0f172a;
      color: white;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 9999;
    }}
    .toast.show {{
      transform: translateY(0);
      opacity: 1;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>💈 1-Click WhatsApp Pitch Engine</h1>
      <p>100 Prospek Barbershop Terbaik (Rating 4.8 - 5.0). Tinggal klik tombol hijau <strong>"Chat WA Langsung"</strong> untuk membuka WhatsApp dengan pesan personalisasi yang sudah terisi otomatis.</p>
    </div>

    <div class="controls">
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Cari nama barbershop atau alamat..." oninput="filterLeads()">
      </div>
      <div class="filter-tabs">
        <button class="filter-btn active" onclick="setCityFilter('all')">Semua (100)</button>
        <button class="filter-btn" onclick="setCityFilter('Jakarta')">Jakarta</button>
        <button class="filter-btn" onclick="setCityFilter('Bandung')">Bandung</button>
      </div>
    </div>

    <div class="card-list" id="cardList"></div>
  </div>

  <div class="toast" id="toast">Pesan berhasil disalin! Siap dipaste ke WA.</div>

  <script>
    const leadsData = {json.dumps(dashboard_leads, ensure_ascii=False)};
    let activeCity = 'all';

    function renderLeads(leads) {{
      const container = document.getElementById('cardList');
      container.innerHTML = '';

      if (leads.length === 0) {{
        container.innerHTML = '<div style="text-align:center; padding: 48px; color:#64748b;">Tidak ada data yang cocok dengan pencarian.</div>';
        return;
      }}

      leads.forEach(lead => {{
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-header">
            <div style="display:flex; gap:12px; align-items:flex-start;">
              <span class="badge-num">${{lead.no}}</span>
              <div>
                <h2 class="shop-title">${{lead.name}}</h2>
                <div class="shop-meta">
                  <span class="tag-rating">⭐ ${{lead.rating.toFixed(1)}} (${{lead.reviews.toLocaleString()}} ulasan)</span>
                  <span class="tag-city">${{lead.city}}</span>
                  <span>📱 ${{lead.phone}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="preview-msg">${{lead.message}}</div>

          <div class="card-actions">
            <a href="${{lead.wa_url}}" target="_blank" class="btn-wa">
              <span>💬</span>
              <span>Chat WA Langsung</span>
            </a>
            <a href="${{lead.demo_url}}" target="_blank" class="btn-demo">
              <span>🌐</span>
              <span>Buka Demo Web</span>
            </a>
            <button class="btn-copy" onclick="copyMessage(${{lead.no}})">
              <span>📋</span>
              <span>Salin Pesan</span>
            </button>
          </div>
        `;
        container.appendChild(card);
      }});
    }}

    function copyMessage(num) {{
      const lead = leadsData.find(l => l.no === num);
      if (lead) {{
        navigator.clipboard.writeText(lead.message).then(() => {{
          showToast('Pesan untuk ' + lead.name + ' berhasil disalin!');
        }});
      }}
    }}

    function showToast(text) {{
      const toast = document.getElementById('toast');
      toast.textContent = text;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }}

    function setCityFilter(city) {{
      activeCity = city;
      document.querySelectorAll('.filter-btn').forEach(btn => {{
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(city.toLowerCase()) || (city === 'all' && btn.textContent.includes('Semua')));
      }});
      filterLeads();
    }}

    function filterLeads() {{
      const query = document.getElementById('searchInput').value.toLowerCase();
      const filtered = leadsData.filter(lead => {{
        const matchCity = activeCity === 'all' || lead.city.toLowerCase().includes(activeCity.toLowerCase());
        const matchQuery = lead.name.toLowerCase().includes(query) || lead.address.toLowerCase().includes(query);
        return matchCity && matchQuery;
      }});
      renderLeads(filtered);
    }}

    renderLeads(leadsData);
  </script>
</body>
</html>'''

dashboard_path = 'd:/barbershopsalon/pitch_dashboard.html'
with open(dashboard_path, 'w', encoding='utf-8') as f:
    f.write(dashboard_html)
print(f'Successfully generated interactive dashboard: {dashboard_path}')

