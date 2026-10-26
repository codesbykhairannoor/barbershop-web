export interface Barbershop {
  id: number;
  name: string;
  service_type: string;
  city: 'South Jakarta' | 'Bandung';
  city_orig: string;
  rating: number;
  reviews: number;
  phone: string;
  whatsapp_url: string;
  address: string;
  nearby_campus: string;
  nearby_office: string;
  website?: string;
  maps_url: string;
  tags?: string[];
  is_top_rated: boolean;
}
