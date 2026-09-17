import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { 
  SiteSettings, 
  TestimonialItem, 
  TeamMemberItem, 
  Inquiry 
} from '@/types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contact: {
    phone: '01065772456',
    phoneDisplay: '0106 577 2456',
    whatsapp: '201065772456',
    email: 'florencenew2020@gmail.com',
    address: 'Obour City - Ninth District - Qatar Al Nada Street',
  },
  social: {
    facebook: 'https://www.facebook.com/Florencekitchenandfurniture',
    instagram: 'https://www.instagram.com/florence_new_2020/',
    linkedin: 'https://www.linkedin.com/in/hassan-samhan-194889247/',
    youtube: '#',
    twitter: '#',
    tiktok: '',
  },
  heroSlides: [
    {
      id: 'slide-1',
      image: '/img/1.jpg',
      badge: 'FLORENCE KITCHEN & FURNITURE',
      subtitle: 'Creative Interior Design',
      title: 'Make Your Home Better',
      desc: 'Top-tier modern kitchen designs with premium Acrylic & HPL materials, Austrian hardware, and a 10-year certified warranty.',
      btnText: 'Explore Our Projects',
      btnLink: '/products',
      waBtnText: 'Book Free Consultation',
    },
    {
      id: 'slide-2',
      image: '/img/2.jpg',
      badge: 'LUXURY LIVING & DRESSING',
      subtitle: 'Creative Interior Design',
      title: 'Stay At Home In Peace',
      desc: 'Bespoke dressing rooms and contemporary furniture combining daily comfort with flawless architectural aesthetics.',
      btnText: 'Explore Our Projects',
      btnLink: '/products',
      waBtnText: 'Book Free Consultation',
    },
  ],
  about: {
    yearsExperience: '40+',
    experienceBadge: 'Learn About Us',
    experienceSubtitle: 'Years Experience',
    tagline: 'In Kitchen Manufacturing & Modern Furniture',
    title: 'We Are The Best Furniture and kitchen design In Your City',
    description: 'Florence is a premier manufacturer and designer of custom modern kitchens, dressing rooms, and architectural furniture based in Obour City. We fuse European design aesthetics with authentic waterproof, heat-resistant materials and original Blum soft-close fittings backed by a 10-year warranty.',
    pillars: [
      { title: 'Project Planning', subtitle: 'Precise engineering', icon: 'flaticon-house' },
      { title: 'Interior Design', subtitle: 'Realistic 3D preview', icon: 'flaticon-stairs' },
      { title: 'Best Price & Value', subtitle: 'Direct factory pricing', icon: 'flaticon-office' },
      { title: 'Furniture Design', subtitle: 'Custom built to order', icon: 'flaticon-living-room' },
    ],
  },
  offerings: {
    badge: 'WHAT WE OFFER AT FLORENCE KITCHEN',
    title: 'What We Offer at Florence Kitchen',
    description: 'Integrated solutions for the modern home blending elegance with practical functionality, manufactured with state-of-the-art Italian CNC machinery.',
    items: [
      {
        id: 'offer-1',
        badge: 'Top Demand',
        title: 'Modern & Classic Kitchens',
        description: 'Acrylic, PolyLac, HPL, and natural wood engineered with Austrian soft-close hardware and ergonomic storage workflows.',
        image: '/img/1.jpg',
        link: '/products?category=kitchens',
        tagColor: '#DFB163',
      },
      {
        id: 'offer-2',
        badge: 'Smart Organization',
        title: 'Dressing Rooms (Walk-In)',
        description: 'Intelligent compartmentalization, tinted securit glass doors, and frosted LED profile illumination for apparel & luxury accessories.',
        image: '/img/3.jpg',
        link: '/products?category=dressing-rooms',
        tagColor: '#252531',
      },
      {
        id: 'offer-3',
        badge: 'Modern Decor',
        title: 'TV Units & Feature Walls',
        description: 'UV marble alternative cladding, warm fluted wood panels, concealed cable conduits, and floating console storage.',
        image: '/img/img-6.jpg',
        link: '/products?category=living-rooms',
        tagColor: '#DFB163',
      },
      {
        id: 'offer-4',
        badge: 'Full Bespoke',
        title: 'Custom Furniture & Fitouts',
        description: 'Comprehensive architectural woodwork, bespoke dining buffets, entrance consoles, and full interior manufacturing.',
        image: '/img/portfolio-4.jpg',
        link: '/products?category=furniture',
        tagColor: '#252531',
      },
    ],
  },
  whyChooseUs: {
    badge: 'Why Choose Us?',
    title: '40+ Years Experience In Furniture and kitchen design',
    description: 'At Florence, we prioritize long-term durability and client peace of mind. Every project is executed strictly on schedule using certified materials with dedicated after-sales support.',
    videoUrl: '/video/VE Project 2-2.mp4',
    videoTitle: 'Florence Factory & Showroom Tour',
    features: [
      {
        title: '40+ Years Experience & Real 10-Year Warranty',
        desc: 'Comprehensive coverage on wood boards, finishes, and movement hardware.',
      },
      {
        title: 'Best Interior 3D Design & Virtual Preview',
        desc: 'Photorealistic rendering before manufacturing so you see your space in advance.',
      },
      {
        title: '100% Customer Satisfaction & Strict Punctuality',
        desc: 'On-time delivery commitment backed by our long-standing industry reputation.',
      },
    ],
  },
};

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Afaf Abdelmoneam',
    image: '/img/1-1.jpg',
    title: 'Verified Client - Acrylic Kitchen',
    text: 'Thank you so much Eng. Mohamed for the excellent kitchen design and high-quality materials exactly as requested. You truly cared about delivering the best outcome and were strictly on time.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Yomna Osama',
    image: '/img/1-2.jpg',
    title: 'Verified Client - Kitchen & Dressing Room',
    text: 'An exceptional company with great dedication to quality. The materials are top European grade, prices are fair, and Eng. Mohamed Atef is very professional and respectful. Delivery was right on schedule.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Mando Kamal',
    image: '/img/1-3.jpg',
    title: 'Verified Client - Furniture & Interior Decor',
    text: 'I would like to thank everyone at Florence for product quality, adherence to specs, easy handling of modifications, and sticking to agreed pricing. Outstanding work and best wishes.',
    rating: 5,
  },
];

export const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: 'team-1',
    name: 'Eng. Mohamed Atef',
    role: 'Owner & General Manager',
    image: '/img/prof.jpg',
    facebook: 'https://www.facebook.com/Florencekitchenandfurniture',
    whatsapp: 'https://wa.me/201065772456',
  },
  {
    id: 'team-2',
    name: 'Hassan Samhan',
    role: 'Sales & Design Consultant',
    image: '/img/prof.jpg',
    linkedin: 'https://www.linkedin.com/in/hassan-samhan-194889247/',
    whatsapp: 'https://wa.me/201065772456',
  },
];

const SETTINGS_KEY = 'florence_site_settings_v2';
const TESTIMONIALS_KEY = 'florence_testimonials_v2';
const TEAM_KEY = 'florence_team_v2';
const INQUIRIES_KEY = 'florence_inquiries_v2';

function isSchemaOrTableMissing(msg?: string): boolean {
  if (!msg) return false;
  const lower = msg.toLowerCase();
  return (
    lower.includes('schema cache') ||
    lower.includes('could not find the table') ||
    (lower.includes('relation') && lower.includes('does not exist')) ||
    lower.includes('pgrst205') ||
    lower.includes('pgrst200') ||
    lower.includes('42p01')
  );
}

// In-memory runtime fallbacks with browser localStorage persistence
let localSiteSettings: SiteSettings = { ...DEFAULT_SITE_SETTINGS };
let localTestimonials: TestimonialItem[] = [...DEFAULT_TESTIMONIALS];
let localTeamMembers: TeamMemberItem[] = [...DEFAULT_TEAM_MEMBERS];
let localInquiries: Inquiry[] = [];

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(`Failed to read ${key} from localStorage`, e);
    }
  }
  return fallback;
}

function saveToStorage(key: string, data: any) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed to save ${key} to localStorage`, e);
    }
  }
}

// ================= SITE SETTINGS =================

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('data')
        .eq('id', 'general')
        .single();

      if (!error && data && data.data) {
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...data.data,
          contact: { ...DEFAULT_SITE_SETTINGS.contact, ...data.data.contact },
          social: { ...DEFAULT_SITE_SETTINGS.social, ...data.data.social },
          about: { ...DEFAULT_SITE_SETTINGS.about, ...data.data.about },
          offerings: { ...DEFAULT_SITE_SETTINGS.offerings, ...data.data.offerings },
          whyChooseUs: { ...DEFAULT_SITE_SETTINGS.whyChooseUs, ...data.data.whyChooseUs },
        };
      }
    } catch (err) {
      console.warn('Supabase fetch site settings failed, using local cache', err);
    }
  }
  localSiteSettings = loadFromStorage(SETTINGS_KEY, localSiteSettings);
  return localSiteSettings;
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; error: string | null; settings?: SiteSettings }> {
  localSiteSettings = {
    ...localSiteSettings,
    ...settings,
    contact: { ...localSiteSettings.contact, ...(settings.contact || {}) },
    social: { ...localSiteSettings.social, ...(settings.social || {}) },
  };
  saveToStorage(SETTINGS_KEY, localSiteSettings);

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: 'general',
          data: localSiteSettings,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          console.warn('Supabase site_settings table missing, saved locally:', error.message);
          return { success: true, error: null, settings: localSiteSettings };
        }
        return { success: false, error: error.message, settings: localSiteSettings };
      }
      return { success: true, error: null, settings: localSiteSettings };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return { success: true, error: null, settings: localSiteSettings };
      }
      return { success: false, error: err.message || 'Database error', settings: localSiteSettings };
    }
  }

  return { success: true, error: null, settings: localSiteSettings };
}

// ================= TESTIMONIALS =================

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as TestimonialItem[];
      }
    } catch (err) {
      console.warn('Supabase fetch testimonials failed', err);
    }
  }
  localTestimonials = loadFromStorage(TESTIMONIALS_KEY, localTestimonials);
  return localTestimonials;
}

export async function createTestimonial(item: Omit<TestimonialItem, 'id'>): Promise<{ item: TestimonialItem | null; error: string | null }> {
  const newItem: TestimonialItem = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `test_${Date.now()}`,
    ...item,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .insert([item])
        .select()
        .single();

      if (!error && data) {
        return { item: data as TestimonialItem, error: null };
      }
      if (error && isSchemaOrTableMissing(error.message)) {
        console.warn('Supabase testimonials table missing, saved locally:', error.message);
        localTestimonials = [newItem, ...loadFromStorage(TESTIMONIALS_KEY, localTestimonials)];
        saveToStorage(TESTIMONIALS_KEY, localTestimonials);
        return { item: newItem, error: null };
      }
      return { item: null, error: error?.message || 'Failed to save testimonial' };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        localTestimonials = [newItem, ...loadFromStorage(TESTIMONIALS_KEY, localTestimonials)];
        saveToStorage(TESTIMONIALS_KEY, localTestimonials);
        return { item: newItem, error: null };
      }
      return { item: null, error: err.message };
    }
  }

  localTestimonials = [newItem, ...loadFromStorage(TESTIMONIALS_KEY, localTestimonials)];
  saveToStorage(TESTIMONIALS_KEY, localTestimonials);
  return { item: newItem, error: null };
}

export async function updateTestimonial(id: string, item: Partial<TestimonialItem>): Promise<{ item: TestimonialItem | null; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .update(item)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return { item: data as TestimonialItem, error: null };
      }
      if (error && isSchemaOrTableMissing(error.message)) {
        console.warn('Supabase testimonials table missing, updating locally');
        return updateLocalTestimonial(id, item);
      }
      return { item: null, error: error?.message || 'Failed to update' };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return updateLocalTestimonial(id, item);
      }
      return { item: null, error: err.message };
    }
  }

  return updateLocalTestimonial(id, item);
}

function updateLocalTestimonial(id: string, item: Partial<TestimonialItem>): { item: TestimonialItem | null; error: string | null } {
  localTestimonials = loadFromStorage(TESTIMONIALS_KEY, localTestimonials);
  const idx = localTestimonials.findIndex((t) => t.id === id);
  if (idx !== -1) {
    localTestimonials[idx] = { ...localTestimonials[idx], ...item };
    saveToStorage(TESTIMONIALS_KEY, localTestimonials);
    return { item: localTestimonials[idx], error: null };
  }
  return { item: null, error: 'Item not found' };
}

export async function deleteTestimonial(id: string): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          console.warn('Supabase testimonials table missing, deleting locally');
          return deleteLocalTestimonial(id);
        }
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return deleteLocalTestimonial(id);
      }
      return { success: false, error: err.message };
    }
  }

  return deleteLocalTestimonial(id);
}

function deleteLocalTestimonial(id: string): { success: boolean; error: string | null } {
  localTestimonials = loadFromStorage(TESTIMONIALS_KEY, localTestimonials).filter((t) => t.id !== id);
  saveToStorage(TESTIMONIALS_KEY, localTestimonials);
  return { success: true, error: null };
}

// ================= TEAM MEMBERS =================

export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as TeamMemberItem[];
      }
    } catch (err) {
      console.warn('Supabase fetch team members failed', err);
    }
  }
  localTeamMembers = loadFromStorage(TEAM_KEY, localTeamMembers);
  return localTeamMembers;
}

export async function createTeamMember(item: Omit<TeamMemberItem, 'id'>): Promise<{ item: TeamMemberItem | null; error: string | null }> {
  const newItem: TeamMemberItem = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `team_${Date.now()}`,
    ...item,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('team_members')
        .insert([item])
        .select()
        .single();

      if (!error && data) return { item: data as TeamMemberItem, error: null };
      if (error && isSchemaOrTableMissing(error.message)) {
        localTeamMembers = [...loadFromStorage(TEAM_KEY, localTeamMembers), newItem];
        saveToStorage(TEAM_KEY, localTeamMembers);
        return { item: newItem, error: null };
      }
      return { item: null, error: error?.message || 'Failed to save member' };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        localTeamMembers = [...loadFromStorage(TEAM_KEY, localTeamMembers), newItem];
        saveToStorage(TEAM_KEY, localTeamMembers);
        return { item: newItem, error: null };
      }
      return { item: null, error: err.message };
    }
  }

  localTeamMembers = [...loadFromStorage(TEAM_KEY, localTeamMembers), newItem];
  saveToStorage(TEAM_KEY, localTeamMembers);
  return { item: newItem, error: null };
}

export async function updateTeamMember(id: string, item: Partial<TeamMemberItem>): Promise<{ item: TeamMemberItem | null; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('team_members')
        .update(item)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) return { item: data as TeamMemberItem, error: null };
      if (error && isSchemaOrTableMissing(error.message)) {
        return updateLocalTeamMember(id, item);
      }
      return { item: null, error: error?.message || 'Failed to update' };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return updateLocalTeamMember(id, item);
      }
      return { item: null, error: err.message };
    }
  }

  return updateLocalTeamMember(id, item);
}

function updateLocalTeamMember(id: string, item: Partial<TeamMemberItem>): { item: TeamMemberItem | null; error: string | null } {
  localTeamMembers = loadFromStorage(TEAM_KEY, localTeamMembers);
  const idx = localTeamMembers.findIndex((m) => m.id === id);
  if (idx !== -1) {
    localTeamMembers[idx] = { ...localTeamMembers[idx], ...item };
    saveToStorage(TEAM_KEY, localTeamMembers);
    return { item: localTeamMembers[idx], error: null };
  }
  return { item: null, error: 'Member not found' };
}

export async function deleteTeamMember(id: string): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          return deleteLocalTeamMember(id);
        }
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return deleteLocalTeamMember(id);
      }
      return { success: false, error: err.message };
    }
  }

  return deleteLocalTeamMember(id);
}

function deleteLocalTeamMember(id: string): { success: boolean; error: string | null } {
  localTeamMembers = loadFromStorage(TEAM_KEY, localTeamMembers).filter((m) => m.id !== id);
  saveToStorage(TEAM_KEY, localTeamMembers);
  return { success: true, error: null };
}

// ================= INQUIRIES =================

export async function getInquiries(): Promise<Inquiry[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Inquiry[];
      }
    } catch (err) {
      console.warn('Supabase fetch inquiries failed', err);
    }
  }
  localInquiries = loadFromStorage(INQUIRIES_KEY, localInquiries);
  return localInquiries;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'closed'): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id);

      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          return updateLocalInquiryStatus(id, status);
        }
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return updateLocalInquiryStatus(id, status);
      }
      return { success: false, error: err.message };
    }
  }

  return updateLocalInquiryStatus(id, status);
}

function updateLocalInquiryStatus(id: string, status: 'new' | 'contacted' | 'closed'): { success: boolean; error: string | null } {
  localInquiries = loadFromStorage(INQUIRIES_KEY, localInquiries);
  const idx = localInquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    localInquiries[idx].status = status;
    saveToStorage(INQUIRIES_KEY, localInquiries);
    return { success: true, error: null };
  }
  return { success: false, error: 'Inquiry not found' };
}

export async function deleteInquiry(id: string): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (error) {
        if (isSchemaOrTableMissing(error.message)) {
          return deleteLocalInquiry(id);
        }
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      if (isSchemaOrTableMissing(err?.message)) {
        return deleteLocalInquiry(id);
      }
      return { success: false, error: err.message };
    }
  }

  return deleteLocalInquiry(id);
}

function deleteLocalInquiry(id: string): { success: boolean; error: string | null } {
  localInquiries = loadFromStorage(INQUIRIES_KEY, localInquiries).filter((i) => i.id !== id);
  saveToStorage(INQUIRIES_KEY, localInquiries);
  return { success: true, error: null };
}
