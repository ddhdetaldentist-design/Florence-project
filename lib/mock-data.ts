import { Product } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1a2b3c4d-0001-4000-8000-000000000001',
    title: 'مطبخ أكريليك مودرن - رمادي وخشب طبيعي',
    slug: 'modern-acrylic-kitchen-grey-wood',
    category: 'kitchens',
    description: 'تصميم وتنفيذ مطبخ مودرن يجمع بين شياكة الأكريليك التركي عالي اللمعان باللون الرمادي، مع دفء خامات الخشب الطبيعي المعالج ضد الرطوبة والحرارة. يحتوي على وحدات تخزين ذكية، بانسيابية ومفصلات سوفت كلوز بلوم نمساوي لضمان راحة الاستخدام لسنوات طويلة.',
    thumbnail: '/img/1.jpg',
    images: ['/img/1.jpg', '/img/1-1.jpg', '/img/1-2.jpg', '/img/1-3.jpg'],
    specs: {
      material: 'أكريليك تركي عالي اللمعان مقاوم للخدوش',
      accessories: 'مفصلات ومجاري بلوم Blum نمساوي أصلية Soft-Close',
      countertop: 'كوارتز أبيض إسباني مقاوم للبقع',
      warranty: 'ضمان شامل 10 سنوات',
      location: 'مدينة العبور - الحي التاسع',
      color: 'رمادي مطفي مع خشب دافئ'
    },
    price: null,
    featured: true,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: '1a2b3c4d-0002-4000-8000-000000000002',
    title: 'مطبخ كلاسيك راقي - خشب أبيض مع تطعيمات ذهبية',
    slug: 'classic-luxury-white-kitchen',
    category: 'kitchens',
    description: 'تحفة كلاسيكية راقية بدهانات دوكو فرن مقاومة للرطوبة، تشطيبات دقيقة ومقابض نحاسية مذهبة، مع جزيرة وسطى مجهزة بمساحات تخزين واسعة ورخام كارارا إيطالي فاخر.',
    thumbnail: '/img/2.jpg',
    images: ['/img/2.jpg', '/img/img-2.jpg', '/img/img-3.jpg'],
    specs: {
      material: 'خشب زان أحمر طبيعي مطعم بألواح HPL ألمانية',
      accessories: 'إكسسوارات إيطالية هيدروليك كاملة',
      countertop: 'رخام طبيعي كارارا إيطالي أصلي',
      warranty: 'ضمان 10 سنوات',
      location: 'التجمع الخامس',
      color: 'أبيض ملكي مطعم بالذهبي'
    },
    price: null,
    featured: true,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: '1a2b3c4d-0003-4000-8000-000000000003',
    title: 'دريسنج روم مودرن مع إضاءات ليد بروفايل',
    slug: 'modern-luxury-dressing-room',
    category: 'dressing-rooms',
    description: 'غرفة ملابس (Dressing Room) ذكية بتقسيمات هندسية مدروسة للأحذية والملابس والإكسسوارات، مع زجاج سيكوريت عسلي عاكس وإضاءات ليد بروفايل مدمجة بمستشعرات حركة آلية.',
    thumbnail: '/img/3.jpg',
    images: ['/img/3.jpg', '/img/img-4.jpg', '/img/img-5.jpg'],
    specs: {
      material: 'خشب كاونتر مستورد عالي الكثافة مكسو HPL',
      lighting: 'شريط LED Profile مخفي مع سينسور فتح الأبواب',
      accessories: 'مجاري أدراج هيدروليك ثقيلة وسلات تنظيم',
      warranty: 'ضمان 5 سنوات',
      location: 'مدينة نصر',
      color: 'رمادي داكن مع زجاج عسلي'
    },
    price: null,
    featured: true,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
  },
  {
    id: '1a2b3c4d-0004-4000-8000-000000000004',
    title: 'وحدة تلفزيون وديكور ليفنج مودرن ببديل الرخام والخشب',
    slug: 'modern-tv-unit-living-room',
    category: 'living-rooms',
    description: 'ديكور حوائط ووحدة تلفزيون متكاملة ببديل الرخام UV وبديل الخشب WPC مع إضاءة دافئة ووحدات سفلية معلقة عصرية تمنح غرفة المعيشة إحساساً بالفخامة والاتساع.',
    thumbnail: '/img/img-6.jpg',
    images: ['/img/img-6.jpg', '/img/img-7.jpg'],
    specs: {
      material: 'بديل رخام تركي UV مع بديل خشب WPC خارجي وداخلي',
      lighting: 'إنارة دافئة مخفية Warm White 3000K',
      accessories: 'حوامل شاشة معلقة ومخارج كابلات مخفية',
      warranty: 'ضمان 3 سنوات',
      location: 'الشيخ زايد',
      color: 'أسود ورخامي كلكتا مع أخشاب طبيعية'
    },
    price: null,
    featured: false,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: '1a2b3c4d-0005-4000-8000-000000000005',
    title: 'مطبخ بولي لاك عصري مقاوم للحرارة والبخار',
    slug: 'polylac-modern-kitchen',
    category: 'kitchens',
    description: 'مطبخ مصنع من ألواح البولي لاك الكورية المقاومة بنسبة 100% للخدوش وبخار الماء والحرارة، تصميم مفتوح بتوزيع هندسي يراعي مثلث الحركة ويوفر أقصى استغلال لكل سنتيمتر في المطبخ.',
    thumbnail: '/img/portfolio-1.jpg',
    images: ['/img/portfolio-1.jpg', '/img/portfolio-2.jpg', '/img/portfolio-3.jpg'],
    specs: {
      material: 'بولي لاك كوري عالي اللمعان والصلابة',
      countertop: 'جرانيت دبل بلاك هندي معالج ومضاد للبكتيريا',
      accessories: 'مفصلات هيدروليك إيطالية FGV',
      warranty: 'ضمان شامل 10 سنوات',
      location: 'مصر الجديدة',
      color: 'بيج كابتشينو مع أسود فاحم'
    },
    price: null,
    featured: true,
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
  }
];

export const CATEGORIES = [
  { id: 'all', nameAr: 'الكل', nameEn: 'All Projects' },
  { id: 'kitchens', nameAr: 'مطابخ حديثة', nameEn: 'Modern Kitchens' },
  { id: 'dressing-rooms', nameAr: 'دريسنج روم', nameEn: 'Dressing Rooms' },
  { id: 'living-rooms', nameAr: 'غرف معيشة وديكور', nameEn: 'Living Rooms & Decor' },
  { id: 'bedrooms', nameAr: 'غرف نوم', nameEn: 'Bedrooms' },
  { id: 'furniture', nameAr: 'أثاث مخصص', nameEn: 'Custom Furniture' },
];
