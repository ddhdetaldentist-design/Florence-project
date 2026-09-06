# دليل ربط وتشغيل Supabase لمشروع فلورنس للمطابخ (Florence Kitchen)

تهانينا! تم بناء وهيكلة المشروع بالكامل باستخدام **Next.js (App Router)** مع لوحة تحكم متطورة لإدارة وعرض المنتجات.

---

## 📌 الخطوة 1: إنشاء مشروع جديد على Supabase

1. ادخل على [Supabase](https://supabase.com) وسجل الدخول أو أنشئ حساباً جديداً مجاناً.
2. اضغط على **"New Project"**.
3. اختر اسماً لمشروعك (مثال: `florence-kitchen`) وحدد كلمة سر قوية لقاعدة البيانات (Database Password).
4. اختر المنطقة الجغرافية الأقرب (مثال: Frankfurt أو London).

---

## 📌 الخطوة 2: تشغيل كود قاعدة البيانات (SQL Schema)

لقد قمنا بتجهيز ملف SQL شامل في المشروع باسم [`supabase_schema.sql`](file:///e:/My-Work/ended%20projects/Florence-project/supabase_schema.sql).

1. في لوحة تحكم Supabase، اذهب إلى القائمة الجانبية واضغط على **SQL Editor**.
2. اضغط على **New query**.
3. انسخ كامل محتويات ملف `supabase_schema.sql` والصقها هناك.
4. اضغط على زر **Run** في أسفل اليمين.

**ما الذي يفعله هذا الكود تلقائياً؟**
- إنشاء جدول المنتجات `products` وجدول الرسائل `inquiries`.
- إعداد حماية البيانات (Row Level Security - RLS).
- إنشاء حاوية تخزين الصور `product-images` (Storage Bucket) وصلاحيات الرفع للوحة التحكم.
- إدراج 5 مشاريع أولية حقيقية لشركة فلورنس مع الصور والمواصفات.

---

## 📌 الخطوة 3: نسخ مفاتيح الربط (API Keys)

1. من القائمة الجانبية في Supabase، اذهب إلى **Project Settings** (أيقونة الترس ⚙️) ثم اختر **API**.
2. ستجد هناك:
   - **Project URL**
   - **Project API Keys** -> انسخ مفتاح `anon` `public`
   - انسخ مفتاح `service_role` (سري للسيرفر)

---

## 📌 الخطوة 4: وضع المفاتيح في ملف `.env.local`

افتح ملف [`.env.local`](file:///e:/My-Work/ended%20projects/Florence-project/.env.local) في المشروع واستبدل القيم كالتالي:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 📌 الخطوة 5: إنشاء حساب المشرف (Admin) للدخول إلى لوحة التحكم

1. من لوحة تحكم Supabase، اذهب إلى **Authentication** ثم **Users**.
2. اضغط على **Add User** ثم **Create User**.
3. أدخل بريدك الإلكتروني وكلمة المرور الخاصة بك كمدير للموقع، واضغط إنشاء (تأكد من تفعيل خيار Auto Confirm User).
4. الآن يمكنك التوجه إلى صفحة تسجيل الدخول في الموقع:
   👉 `http://localhost:3000/login`
   وادخل ببريدك وكلمة المرور للتحكم في كافة المنتجات والصور!

---

## 💡 وضع المعاينة بدون Supabase (Fallback Mode):
المشروع مبرمج بذكاء بحيث يعمل مباشرة حتى لو لم تقم بإدخال مفاتيح Supabase بعد؛ حيث يعرض البيانات المخزنة محلياً ويسمح لك بمعاينة وتجربة لوحة التحكم والمتجر بكامل وظائفهما فوراً!
