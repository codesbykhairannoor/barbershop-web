import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import json
import urllib.parse
import os

DEMO_BASE = "https://barbershop-web-demo.vercel.app"

def create_lead_message(lead):
    slug_url = f"{DEMO_BASE}/p/{lead['slug']}"
    return (
        f"Halo Mas / Tim *{lead['name']}*, salam kenal! 👋\n\n"
        f"Saya perhatikan reputasi Google Maps kalian mantap banget ya (⭐ {lead['rating']:.1f} dari {lead['reviews']:,} ulasan di {lead['city_orig']}).\n\n"
        f"Karena reputasinya udah top, saya iseng bikinin website profil modern khusus buat *{lead['name']}*, lengkap sama sistem booking online yang langsung nyambung ke WA kalian ini:\n\n"
        f"👉 {slug_url}\n\n"
        f"Coba buka lewat HP deh Mas, tampilannya bersih & mewah banget. Kalau cocok dan mau disambungkan ke domain resmi toko kalian, kabari saya ya. Sukses terus buat {lead['name']}! 💈✂️"
    )

def write_styled_excel(file_path, sheet_title, leads):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = sheet_title

    headers = [
        "No",
        "Nama Barbershop",
        "Kota",
        "Rating & Ulasan Google",
        "WhatsApp Barbershop (Prospek)",
        "Link Demo Pendek (Branded)",
        "Pesan WhatsApp Personalisasi (Siap Kirim)",
        "Link Klik Langsung Kirim WA",
        "Alamat Lengkap",
        "Status Follow-up",
        "Catatan"
    ]
    ws.append(headers)

    header_fill = PatternFill(start_color="18181B", end_color="18181B", fill_type="solid")
    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    data_font = Font(name="Calibri", size=10)
    bold_font = Font(name="Calibri", size=10, bold=True)
    link_font = Font(name="Calibri", size=10, color="0000EE", underline="single")
    button_font = Font(name="Calibri", size=10, bold=True, color="0070BA", underline="single")

    align_center = Alignment(horizontal="center", vertical="center")
    align_left = Alignment(horizontal="left", vertical="center")
    align_wrap = Alignment(horizontal="left", vertical="top", wrap_text=True)

    thin_border = Border(
        left=Side(style='thin', color='E2E8F0'),
        right=Side(style='thin', color='E2E8F0'),
        top=Side(style='thin', color='E2E8F0'),
        bottom=Side(style='thin', color='E2E8F0')
    )

    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = align_center
        cell.border = thin_border
    ws.row_dimensions[1].height = 28

    for idx, lead in enumerate(leads, start=1):
        row_num = idx + 1
        slug_url = f"{DEMO_BASE}/p/{lead['slug']}"
        rating_str = f"{lead['rating']:.1f} ⭐ ({lead['reviews']} Ulasan)"
        pesan = create_lead_message(lead)
        encoded_pesan = urllib.parse.quote(pesan)
        link_kirim_wa = f"https://wa.me/{lead['clean_phone']}?text={encoded_pesan}"

        ws.cell(row=row_num, column=1, value=idx).alignment = align_center
        ws.cell(row=row_num, column=2, value=lead['name']).alignment = align_left
        ws.cell(row=row_num, column=3, value=lead['city_orig']).alignment = align_center
        ws.cell(row=row_num, column=4, value=rating_str).alignment = align_center
        ws.cell(row=row_num, column=5, value=lead['phone']).alignment = align_center

        # Col 6: Link Demo
        c6 = ws.cell(row=row_num, column=6, value=slug_url)
        c6.hyperlink = slug_url
        c6.font = link_font
        c6.alignment = align_left

        # Col 7: Pesan WhatsApp
        c7 = ws.cell(row=row_num, column=7, value=pesan)
        c7.alignment = align_wrap

        # Col 8: Link Klik Langsung Kirim WA
        c8 = ws.cell(row=row_num, column=8, value="💬 Klik Chat WA Sekarang")
        c8.hyperlink = link_kirim_wa
        c8.font = button_font
        c8.alignment = align_center

        # Col 9: Alamat
        ws.cell(row=row_num, column=9, value=lead['address']).alignment = align_left

        # Col 10: Status
        c10 = ws.cell(row=row_num, column=10, value="Belum Dihubungi")
        c10.alignment = align_center
        c10.font = bold_font

        # Col 11: Catatan
        ws.cell(row=row_num, column=11, value="").alignment = align_left

        for c_idx in range(1, len(headers) + 1):
            cell = ws.cell(row=row_num, column=c_idx)
            cell.border = thin_border
            if c_idx not in (6, 8, 10):
                cell.font = data_font

        ws.row_dimensions[row_num].height = 45

    col_widths = {
        1: 6,   # No
        2: 32,  # Nama
        3: 16,  # Kota
        4: 24,  # Rating
        5: 22,  # WA
        6: 38,  # Link Demo
        7: 48,  # Pesan WA
        8: 26,  # Link Klik Kirim
        9: 45,  # Alamat
        10: 18, # Status
        11: 20  # Catatan
    }
    for col_idx, width in col_widths.items():
        ws.column_dimensions[get_column_letter(col_idx)].width = width

    wb.save(file_path)
    print(f"Saved: {file_path}")

def main():
    with open('d:/barbershopsalon/src/data/barbershops.json', 'r', encoding='utf-8') as f:
        all_data = json.load(f)

    valid_pool = [b for b in all_data if b.get('clean_phone') and len(b['clean_phone']) >= 10]
    valid_pool.sort(key=lambda x: (x['reviews'], x['rating']), reverse=True)

    # 1. Batch 1: Natural top 100
    batch1_leads = valid_pool[:100]
    batch1_phones = set(b['clean_phone'] for b in batch1_leads)
    batch1_names = set(b['name'].lower().strip() for b in batch1_leads)
    batch1_slugs = set(b['slug'].lower().strip() for b in batch1_leads)

    # 2. Batch 2: Next 100 with strictly UNIQUE phone numbers, names, and slugs
    batch2_leads = []
    seen_phones = set()
    seen_names = set()
    seen_slugs = set()

    for b in valid_pool[100:]:
        p = b['clean_phone']
        n = b['name'].lower().strip()
        s = b['slug'].lower().strip()

        if p in batch1_phones or p in seen_phones:
            continue
        if n in batch1_names or n in seen_names:
            continue
        if s in batch1_slugs or s in seen_slugs:
            continue

        seen_phones.add(p)
        seen_names.add(n)
        seen_slugs.add(s)
        batch2_leads.append(b)

        if len(batch2_leads) == 100:
            break

    print(f"Batch 1 count: {len(batch1_leads)}")
    print(f"Batch 2 count: {len(batch2_leads)}")
    print(f"Batch 1 & 2 phone overlap: {len(batch1_phones.intersection(seen_phones))}")

    # Write Excels
    excel_batch1 = 'd:/barbershopsalon/100_LEADS_BARBERSHOP_PITCH_PROSPEK.xlsx'
    excel_batch2 = 'd:/barbershopsalon/BATCH_2_100_LEADS_BARBERSHOP_PITCH_PROSPEK.xlsx'

    write_styled_excel(excel_batch1, "100 Leads Pitch", batch1_leads)
    write_styled_excel(excel_batch2, "Batch 2 (100 Leads Baru)", batch2_leads)

    # Format data for JSON / Web Dashboard
    combined_leads = []
    for idx, b in enumerate(batch1_leads, start=1):
        msg = create_lead_message(b)
        combined_leads.append({
            'batch': 1,
            'no': idx,
            'name': b['name'],
            'city': b['city_orig'],
            'rating': b['rating'],
            'reviews': b['reviews'],
            'phone': b['phone'],
            'clean_phone': b['clean_phone'],
            'slug': b['slug'],
            'demo_url': f"{DEMO_BASE}/p/{b['slug']}",
            'message': msg,
            'wa_url': f"https://wa.me/{b['clean_phone']}?text={urllib.parse.quote(msg)}",
            'address': b['address']
        })

    for idx, b in enumerate(batch2_leads, start=1):
        msg = create_lead_message(b)
        combined_leads.append({
            'batch': 2,
            'no': idx,
            'name': b['name'],
            'city': b['city_orig'],
            'rating': b['rating'],
            'reviews': b['reviews'],
            'phone': b['phone'],
            'clean_phone': b['clean_phone'],
            'slug': b['slug'],
            'demo_url': f"{DEMO_BASE}/p/{b['slug']}",
            'message': msg,
            'wa_url': f"https://wa.me/{b['clean_phone']}?text={urllib.parse.quote(msg)}",
            'address': b['address']
        })

    json_path = 'd:/barbershopsalon/src/data/pitch_leads.json'
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(combined_leads, f, ensure_ascii=False, indent=2)
    print(f"Saved: {json_path}")

    # Generate updated HTML dashboard with Batch 1 / Batch 2 tabs
    dashboard_html = f'''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>1-Click WhatsApp Pitch Dashboard | 200 Leads Barbershop</title>
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
    .batch-selector {{
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
    }}
    .batch-tab {{
      flex: 1;
      padding: 14px 20px;
      border-radius: 16px;
      font-size: 14px;
      font-weight: 700;
      border: 2px solid #e2e8f0;
      background: white;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }}
    .batch-tab.active {{
      background: #0f172a;
      color: white;
      border-color: #0f172a;
      box-shadow: 0 4px 12px rgba(15,23,42,0.15);
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
    .tag-batch {{
      background: #e0e7ff;
      color: #3730a3;
      font-weight: 700;
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
      <p>Pilih Batch 1 atau Batch 2. Tinggal klik tombol hijau <strong>"Chat WA Langsung"</strong> untuk membuka WhatsApp dengan pesan terpersonalisasi yang sudah siap kirim.</p>
    </div>

    <div class="batch-selector">
      <button class="batch-tab active" id="tabBatch2" onclick="setBatchFilter(2)">✨ Batch 2 (100 Leads Baru)</button>
      <button class="batch-tab" id="tabBatch1" onclick="setBatchFilter(1)">📁 Batch 1 (100 Leads Awal)</button>
      <button class="batch-tab" id="tabBatchAll" onclick="setBatchFilter('all')">🌐 Semua (200 Leads)</button>
    </div>

    <div class="controls">
      <div class="search-box">
        <input type="text" id="searchInput" placeholder="Cari nama barbershop atau alamat..." oninput="filterLeads()">
      </div>
      <div class="filter-tabs">
        <button class="filter-btn active" onclick="setCityFilter('all')">Semua Kota</button>
        <button class="filter-btn" onclick="setCityFilter('Jakarta')">Jakarta</button>
        <button class="filter-btn" onclick="setCityFilter('Bandung')">Bandung</button>
      </div>
    </div>

    <div class="card-list" id="cardList"></div>
  </div>

  <div class="toast" id="toast">Pesan berhasil disalin! Siap dipaste ke WA.</div>

  <script>
    const leadsData = {json.dumps(combined_leads, ensure_ascii=False)};
    let activeBatch = 2;
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
                  <span class="tag-batch">Batch ${{lead.batch}}</span>
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
            <button class="btn-copy" onclick="copyMessage(${{lead.batch}}, ${{lead.no}})">
              <span>📋</span>
              <span>Salin Pesan</span>
            </button>
          </div>
        `;
        container.appendChild(card);
      }});
    }}

    function copyMessage(batch, num) {{
      const lead = leadsData.find(l => l.batch === batch && l.no === num);
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

    function setBatchFilter(b) {{
      activeBatch = b;
      document.getElementById('tabBatch1').classList.toggle('active', b === 1);
      document.getElementById('tabBatch2').classList.toggle('active', b === 2);
      document.getElementById('tabBatchAll').classList.toggle('active', b === 'all');
      filterLeads();
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
        const matchBatch = activeBatch === 'all' || lead.batch === activeBatch;
        const matchCity = activeCity === 'all' || lead.city.toLowerCase().includes(activeCity.toLowerCase());
        const matchQuery = lead.name.toLowerCase().includes(query) || lead.address.toLowerCase().includes(query);
        return matchBatch && matchCity && matchQuery;
      }});
      renderLeads(filtered);
    }}

    renderLeads(leadsData.filter(l => l.batch === 2));
  </script>
</body>
</html>'''

    dashboard_path = 'd:/barbershopsalon/pitch_dashboard.html'
    with open(dashboard_path, 'w', encoding='utf-8') as f:
        f.write(dashboard_html)
    print(f"Saved: {dashboard_path}")

if __name__ == '__main__':
    main()
