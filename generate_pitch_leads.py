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
for i, lead in enumerate(top_100_leads, start=1):
    slug_url = f"{DEMO_BASE}/p/{lead['slug']}"
    
    pesan = (
        f"Halo Bro / Tim Manajemen *{lead['name']}*,\n\n"
        f"Salam kenal! Saya perhatikan *{lead['name']}* memiliki reputasi yang sangat keren di Google Maps "
        f"({lead['rating']:.1f} ⭐ dari {lead['reviews']:,} ulasan pelanggan di {lead['city_orig']}).\n\n"
        f"Melihat antusiasme pelanggan yang begitu tinggi, kami berinisiatif membuatkan preview website profil modern "
        f"khusus untuk *{lead['name']}*, lengkap dengan sistem reservasi WhatsApp otomatis langsung ke nomor Anda:\n\n"
        f"👉 Akses Website Demo Barbershop Anda di sini:\n"
        f"{slug_url}\n\n"
        f"Keunggulan sistem website ini:\n"
        f"• Desain Bersih & Elegan: Tampilan terang modern (Apple & Scandinavian style), sangat nyaman dibuka di smartphone\n"
        f"• Booking WhatsApp Otomatis: Calon pelanggan bisa pilih capster, jam, dan layanan—langsung masuk ke WA Anda ({lead['phone']})\n"
        f"• Menu Layanan & Harga Transparan: Menampilkan signature cut, shave, dan creambath\n"
        f"• Hairstyle Lookbook & Face-Shape Guide: Edukasi gaya rambut untuk pelanggan Anda\n"
        f"• Siap Dihubungkan ke Domain Resmi (contoh: www.{lead['slug'][:25]}.com)\n\n"
        f"Website ini sudah siap pakai dan siap kami serahkan. Jika Anda atau tim manajemen tertarik untuk mengaktifkannya, "
        f"bisa langsung hubungi WhatsApp saya di +62 857-1820-3535 atau klik tombol 'Klaim Website Ini' di halaman demo.\n\n"
        f"Terima kasih banyak bro, sukses terus untuk *{lead['name']}*! 🙏✂️"
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

leads_df = pd.DataFrame(rows)
output_excel = 'd:/barbershopsalon/100_LEADS_BARBERSHOP_PITCH_PROSPEK.xlsx'
leads_df.to_excel(output_excel, index=False)
print(f'Successfully generated pitch spreadsheet: {output_excel} with {len(rows)} leads!')
