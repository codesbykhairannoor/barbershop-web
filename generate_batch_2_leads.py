import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import json
import urllib.parse
import os

def generate_batch_2():
    # 1. Load Batch 1 to ensure 100% ZERO overlap
    batch1_file = 'd:/barbershopsalon/100_LEADS_BARBERSHOP_PITCH_PROSPEK.xlsx'
    wb1 = openpyxl.load_workbook(batch1_file)
    ws1 = wb1.active
    batch1_rows = list(ws1.iter_rows(values_only=True))[1:]

    batch1_phones = set()
    batch1_names = set()
    batch1_slugs = set()

    for r in batch1_rows:
        batch1_names.add(str(r[1]).lower().strip())
        clean_p = ''.join(c for c in str(r[4]) if c.isdigit())
        if clean_p.startswith('0'): clean_p = '62' + clean_p[1:]
        elif clean_p.startswith('8'): clean_p = '62' + clean_p
        batch1_phones.add(clean_p)
        if r[5]:
            batch1_slugs.add(str(r[5]).split('/p/')[-1].strip().lower())

    print(f'Batch 1 loaded: {len(batch1_rows)} leads, {len(batch1_phones)} unique phones')

    # 2. Load all barbershop data
    with open('d:/barbershopsalon/src/data/barbershops.json', 'r', encoding='utf-8') as f:
        all_data = json.load(f)

    valid_pool = [b for b in all_data if b.get('clean_phone') and len(b['clean_phone']) >= 10]
    valid_pool.sort(key=lambda x: (x['reviews'], x['rating']), reverse=True)

    # 3. Select Batch 2 with 100% UNIQUE phone numbers (no duplicates within Batch 2, no duplicates with Batch 1)
    batch2_leads = []
    seen_phones = set()
    seen_names = set()
    seen_slugs = set()

    DEMO_BASE = "https://barbershop-web-demo.vercel.app"

    for b in valid_pool:
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

    print(f'Batch 2 selected: {len(batch2_leads)} leads, {len(seen_phones)} unique phones')
    print(f'Overlap check with Batch 1: {len(seen_phones.intersection(batch1_phones))} phone overlap')

    # 4. Build Excel Workbook
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Batch 2 (100 Leads Baru)"

    # Headers
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

    # Styling definitions
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

    # Format header row
    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = align_center
        cell.border = thin_border
    ws.row_dimensions[1].height = 28

    # Populate Data
    for idx, lead in enumerate(batch2_leads, start=1):
        row_num = idx + 1
        slug_url = f"{DEMO_BASE}/p/{lead['slug']}"
        rating_str = f"{lead['rating']:.1f} ⭐ ({lead['reviews']} Ulasan)"
        
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

    # Column widths
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

    output_path = 'd:/barbershopsalon/BATCH_2_100_LEADS_BARBERSHOP_PITCH_PROSPEK.xlsx'
    wb.save(output_path)
    print(f'Successfully saved: {output_path}')

    # Return leads for dashboard generation
    return batch2_leads

if __name__ == '__main__':
    generate_batch_2()
