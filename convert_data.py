import pandas as pd
import json
import re

excel_file = 'd:/barbershopsalon/listing.xlsx'
df = pd.read_excel(excel_file, sheet_name='Barbershop & Salon')

# Exclude non-relevant businesses if any
exclude_non_barber = ['Restoran Spanyol', 'Klub Spa dan Kesehatan']
df = df[~df['Jenis Usaha'].isin(exclude_non_barber)].copy()

items = []
for idx, row in df.iterrows():
    name = str(row['Nama Usaha']).strip() if pd.notnull(row['Nama Usaha']) else ''
    if not name or name == 'nan':
        continue
    
    jenis = str(row['Jenis Usaha']).strip() if pd.notnull(row['Jenis Usaha']) else 'Barbershop'
    city_raw = str(row['Kota / Kabupaten']).strip() if pd.notnull(row['Kota / Kabupaten']) else 'Jakarta Selatan'
    city_en = 'South Jakarta' if 'Jakarta' in city_raw else 'Bandung'
    
    phone = str(row['Nomor Telepon']).strip() if pd.notnull(row['Nomor Telepon']) else ''
    if phone.endswith('.0'): 
        phone = phone[:-2]
    
    wa_url = str(row['Link WhatsApp']).strip() if pd.notnull(row['Link WhatsApp']) and str(row['Link WhatsApp']).startswith('http') else ''
    if not wa_url and phone:
        clean_num = re.sub(r'[^0-9]', '', phone)
        if clean_num.startswith('0'):
            clean_num = '62' + clean_num[1:]
        elif clean_num.startswith('8'):
            clean_num = '62' + clean_num
        if len(clean_num) >= 10:
            wa_url = f'https://wa.me/{clean_num}'
            
    rating = 4.6
    if pd.notnull(row['Rating']):
        try:
            rating = float(row['Rating'])
        except:
            rating = 4.6
            
    reviews = 0
    if pd.notnull(row['Jumlah Ulasan']):
        try:
            reviews = int(float(row['Jumlah Ulasan']))
        except:
            reviews = 0
            
    address = str(row['Alamat Lengkap']).strip() if pd.notnull(row['Alamat Lengkap']) and str(row['Alamat Lengkap']) != 'nan' else ''
    campus = str(row['Kampus Terdekat']).strip() if pd.notnull(row['Kampus Terdekat']) and str(row['Kampus Terdekat']) != 'nan' else ''
    office = str(row['Kawasan Perkantoran Terdekat']).strip() if pd.notnull(row['Kawasan Perkantoran Terdekat']) and str(row['Kawasan Perkantoran Terdekat']) != 'nan' else ''
    website = str(row['Website']).strip() if pd.notnull(row['Website']) and str(row['Website']) != 'nan' else ''
    maps = str(row['Link Google Maps']).strip() if pd.notnull(row['Link Google Maps']) and str(row['Link Google Maps']).startswith('http') else ''
    
    # Categorization tags
    tags = []
    lower_name = name.lower()
    if 'studio' in lower_name:
        tags.append('Studio')
    elif 'vintage' in lower_name or 'classic' in lower_name:
        tags.append('Classic Heritage')
    elif 'premium' in lower_name or 'exclusive' in lower_name or 'luxe' in lower_name:
        tags.append('Luxury Grooming')
    else:
        tags.append('Gentlemen Cuts')
        
    if rating >= 4.8:
        tags.append('Elite 4.8+★')
    if campus:
        tags.append(f'Near {campus[:18]}')

    items.append({
        'id': len(items) + 1,
        'name': name,
        'service_type': jenis,
        'city': city_en,
        'city_orig': city_raw,
        'rating': round(rating, 1),
        'reviews': reviews,
        'phone': phone,
        'whatsapp_url': wa_url,
        'address': address,
        'nearby_campus': campus,
        'nearby_office': office,
        'website': website,
        'maps_url': maps,
        'tags': tags,
        'is_top_rated': rating >= 4.8 and reviews >= 20
    })

# Save to JSON
with open('d:/barbershopsalon/barbershops.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

print(f'Successfully exported {len(items)} barbershops to barbershops.json')
jakarta_count = sum(1 for i in items if i['city'] == 'South Jakarta')
bandung_count = sum(1 for i in items if i['city'] == 'Bandung')
top_count = sum(1 for i in items if i['is_top_rated'])
print(f'South Jakarta: {jakarta_count}, Bandung: {bandung_count}, Top Rated: {top_count}')
