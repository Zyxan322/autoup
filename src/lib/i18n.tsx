import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "ar" | "en";

const EN_TO_AR: Record<string, string> = {
  Home: "الرئيسية",
  Gallery: "معرض الصور",
  "About Us": "من نحن",
  Contact: "تواصل معنا",
  "Request a Quote": "اطلب عرض سعر",
  "Request a Wholesale Quote": "اطلب عرض سعر بالجملة",
  "Request Wholesale Quote on WhatsApp": "اطلب عرض سعر بالجملة عبر واتساب",
  "Search products": "ابحث عن المنتجات",
  "Search products or categories (e.g. shampoo, wax, ChemX)...":
    "ابحث عن المنتجات أو الفئات (مثل الشامبو أو الشمع أو ChemX)...",
  "Search products or codes (e.g. ChemX, F55, G4)...":
    "ابحث عن المنتجات أو الرموز (مثل ChemX أو F55 أو G4)...",
  "Submit search": "تنفيذ البحث",
  "Toggle navigation menu": "فتح أو إغلاق قائمة التنقل",
  "Wholesale Quote List": "قائمة طلب عرض السعر",
  "Open quotation inquiry list, 0 items": "افتح قائمة طلب عرض السعر، لا توجد منتجات",
  "Wholesale prices and order availability are confirmed directly by AutoUp on WhatsApp.":
    "يؤكد فريق AutoUp أسعار الجملة وتوفر المنتجات مباشرةً عبر واتساب.",
  "Your wholesale quote list is empty.": "قائمة طلب عرض السعر فارغة.",
  "Browse products": "تصفح المنتجات",
  "Request Wholesale Quote": "اطلب عرض سعر بالجملة",
  "Clear quote list": "إفراغ القائمة",
  "Your quote list is empty — add a product first.": "قائمة عروض الأسعار فارغة — أضف منتجاً أولاً.",
  "Address to be confirmed": "سيُضاف العنوان بعد تأكيده",
  "Business hours to be confirmed": "سيتم تأكيد ساعات العمل",
  Explore: "تصفح",
  "Direct Contact": "تواصل مباشر",
  "Chat on WhatsApp": "تواصل عبر واتساب",
  "Care in Every Mile": "عناية ترافقك في كل رحلة",
  "Commercial Bulk Supply": "توريد تجاري بالجملة",
  "Professional Formulations": "تركيبات احترافية",
  "Products Catalog": "كتالوج المنتجات",
  "Visual Gallery": "معرض الصور",
  "About AutoUp": "عن AutoUp",
  "Wholesale Contact": "تواصل تجاري",
  "Instant Quote": "عرض سعر فوري",
  "All rights reserved.": "جميع الحقوق محفوظة.",
  "Automotive Showcase": "مختارات من عالم السيارات",
  "Good Care. Great Presence.": "عناية فائقة. حضور مميز.",
  "A visual showcase of automotive perfection across sports coupes, luxury SUVs, and preserved classics.":
    "مشاهد مختارة لسيارات رياضية وفاخرة وكلاسيكية تحظى بعناية استثنائية.",
  "Previous image": "الصورة السابقة",
  "Next image": "الصورة التالية",
  Previous: "السابق",
  Next: "التالي",
  "Automotive photography showcase": "معرض صور السيارات",
  "Page not found": "الصفحة غير موجودة",
  "The page you're looking for doesn't exist or has been moved.":
    "الصفحة التي تبحث عنها غير موجودة أو ربما نُقلت.",
  "Go home": "العودة للرئيسية",
  "This page didn't load": "تعذر تحميل الصفحة",
  "Something went wrong on our end. You can try refreshing or head back home.":
    "حدث خطأ من جانبنا. حاول تحديث الصفحة أو العودة للرئيسية.",
  "Try again": "حاول مجدداً",
  "Product not found": "المنتج غير موجود",
  "Back to products": "العودة إلى المنتجات",
  "Back to product catalog": "العودة إلى كتالوج المنتجات",
  "Product Code:": "رمز المنتج:",
  "Price and bulk availability confirmed on WhatsApp quotation.":
    "يُؤكَّد السعر والتوفر للطلبات بالجملة عبر عرض سعر على واتساب.",
  "Select Size / Package": "اختر الحجم / العبوة",
  "Add to Quote List": "أضف إلى قائمة عرض السعر",
  "How to Use & Application": "طريقة الاستخدام والتطبيق",
  "COMPLETE YOUR CARE ROUTINE": "أكمل روتين العناية",
  "You May Also Like": "قد يعجبك أيضاً",
  "Wholesale Pricing": "أسعار الجملة",
  "Quantity:": "الكمية:",
  "View Details": "عرض التفاصيل",
  Inquire: "استفسر",
  "No products match your search criteria.": "لا توجد منتجات تطابق معايير البحث.",
  "Reset filters": "إعادة ضبط التصفية",
  "Sort products": "ترتيب المنتجات",
  "Sort: Featured": "الترتيب: الأبرز",
  "Sort: Name": "الترتيب: الاسم",
  "Load More Products": "عرض مزيد من المنتجات",
  "Commercial Bulk Packaging": "عبوات تجارية كبيرة",
  "High Dilution Ratios": "تركيزات عالية التخفيف",
  "Surface-Safe Formulations": "تركيبات آمنة على الأسطح",
  "Car Shampoo": "شامبو سيارات",
  "Cleaning Chemicals": "مواد تنظيف كيميائية",
  "Car Wax & Polish": "شمع وملمع سيارات",
  "Interior Cleaners": "منظفات المقصورة",
  "Exterior Cleaners": "منظفات الهيكل الخارجي",
  "All Products": "جميع المنتجات",
  "AUTOMOTIVE SHOWCASE": "مختارات من عالم السيارات",
  "B2B Commercial Catalog": "كتالوج التوريد التجاري",
  "Professional Automotive Cleaning Products": "منتجات احترافية لتنظيف السيارات",
  "Commercial-grade concentrated shampoos, waxes, cleaners, and surface chemicals supplied in bulk containers (20L, 25L, 20KG) for business operations.":
    "شامبوهات مركزة وشموع ومنظفات ومواد معالجة للأسطح بجودة تجارية، متوفرة بعبوات كبيرة (20 لتر، 25 لتر، 20 كجم) لتلبية احتياجات الأعمال.",
  "High-Yield Formulations": "تركيبات عالية المردود",
  "B2B Commercial Supply": "توريد تجاري للشركات",
  "Wholesale Automotive Cleaning Products for Your Business.":
    "منتجات تنظيف سيارات بالجملة لأعمالك.",
  "Dedicated supply of concentrated car shampoos, waxes, degreasers, and surface chemicals packaged in 20L, 25L, and 20KG commercial containers.":
    "توريد متخصص لشامبو السيارات المركز والشموع ومزيلات الشحوم ومنظفات الأسطح بعبوات تجارية سعة 20 و25 لترًا و20 كجم.",
  "COMMERCIAL INQUIRY": "استفسار تجاري",
  "Provide your business requirements below to receive verified wholesale pricing, container availability, and volume supply terms directly from our team.":
    "أدخل احتياجات منشأتك أدناه ليزوّدك فريقنا بأسعار الجملة المؤكدة وتوفر العبوات وشروط التوريد بحسب الكميات.",
  "1. Business & Contact Information": "1. معلومات المنشأة والتواصل",
  "Phone / WhatsApp Number *": "رقم الهاتف / واتساب *",
  "Business Email (optional)": "البريد الإلكتروني للمنشأة (اختياري)",
  "City / Region *": "المدينة / المنطقة *",
  "Country (optional)": "الدولة (اختياري)",
  "2. Selected Products & Quantities": "2. المنتجات المختارة والكميات",
  "Add from catalog": "أضف من الكتالوج",
  "No products added yet. Add products to your wholesale quote list:":
    "لم تتم إضافة منتجات بعد. أضف المنتجات إلى قائمة عرض سعر الجملة:",
  "Wholesale pricing and stock availability are verified directly by our commercial team and sent to you via WhatsApp / email.":
    "يتحقق فريقنا التجاري مباشرةً من أسعار الجملة وتوفر المخزون، ثم يرسل التفاصيل عبر واتساب أو البريد الإلكتروني.",
  "Review Wholesale Quote Request": "مراجعة طلب عرض سعر الجملة",
  "Review Quotation Details": "مراجعة تفاصيل عرض السعر",
  "Confirm your business inquiry details before opening WhatsApp.":
    "تأكد من تفاصيل استفسارك التجاري قبل فتح واتساب.",
  Copied: "تم النسخ",
  Copy: "نسخ",
  "Company / Business Name": "اسم الشركة / المنشأة",
  "Contact Person Name": "اسم مسؤول التواصل",
  "Phone / WhatsApp Number": "رقم الهاتف / واتساب",
  "Business Email": "البريد الإلكتروني للمنشأة",
  "Estimated Order Volume / Frequency": "حجم / معدل الطلب المتوقع",
  "Additional Requirements / Inquiries": "متطلبات أو استفسارات إضافية",
  "Please select at least one product or describe your required items below.":
    "يرجى اختيار منتج واحد على الأقل أو وصف احتياجاتك أدناه.",
  "Contact name is required.": "يرجى إدخال اسم مسؤول التواصل.",
  "Company or business name is required.": "يرجى إدخال اسم الشركة أو المنشأة.",
  "Please enter a valid business phone / WhatsApp number.":
    "يرجى إدخال رقم هاتف أو واتساب صحيح للمنشأة.",
  "City is required.": "يرجى إدخال المدينة.",
  "Please enter a valid business email.": "يرجى إدخال بريد إلكتروني صحيح للمنشأة.",
  "Phone Inquiries": "استفسارات هاتفية",
  "Commercial sales line": "خط المبيعات التجارية",
  "B2B Product Supply": "توريد المنتجات للشركات",
  "Bulk containers (20L, 25L, 20KG)": "عبوات كبيرة (20 لترًا، 25 لترًا، 20 كجم)",
  Address: "العنوان",
  "Business Hours": "ساعات العمل",
  "BUSINESS INQUIRY": "استفسار تجاري",
  "Products of Interest & Estimated Volumes *": "المنتجات المطلوبة والكميات التقديرية *",
  "Send Inquiry via WhatsApp": "أرسل الاستفسار عبر واتساب",
  "Your inquiry will open directly in WhatsApp with our commercial team.":
    "سيُفتح استفسارك مباشرةً في محادثة واتساب مع فريقنا التجاري.",
  "COMMERCIAL FAQ": "الأسئلة التجارية الشائعة",
  "Frequently Asked Questions": "الأسئلة الشائعة",
  "Clear answers regarding our products, wholesale purchasing, and B2B ordering.":
    "إجابات واضحة حول منتجاتنا والشراء بالجملة وطلبات الشركات.",
  "Commercial Inquiries": "استفسارات تجارية",
  "Contact AutoUp Commercial Supply": "تواصل مع فريق توريد AutoUp",
  "Reach our B2B team for product availability, bulk purchasing inquiries, wholesale pricing, and container supply information.":
    "تواصل مع فريق الشركات لمعرفة توفر المنتجات وأسعار الجملة ومعلومات التوريد بالعبوات الكبيرة.",
  "WhatsApp Business Inquiry": "استفسارات الأعمال عبر واتساب",
  "Instant response for wholesale quotes": "استجابة سريعة لطلبات عروض أسعار الجملة",
  Location: "الموقع",
  "Looking for specific cleaning chemical formulas?": "هل تبحث عن تركيبات تنظيف كيميائية محددة؟",
  "Browse products catalog": "تصفح كتالوج المنتجات",
  "request a wholesale quote": "اطلب عرض سعر بالجملة",
  "Send a Wholesale Inquiry": "أرسل استفساراً عن البيع بالجملة",
  "Submit your company details and requirements to receive pricing and availability.":
    "أرسل بيانات منشأتك واحتياجاتها لمعرفة الأسعار والتوفر.",
  "AUTOMOTIVE CARE CATEGORY": "فئة العناية بالسيارات",
  "Key Advantages & Benefits": "أهم المزايا والفوائد",
  "Featured Product:": "المنتج المميز:",
  "TARGETED AUTOMOTIVE CARE": "عناية متخصصة بالسيارات",
  "Explore Our Car-Care Services": "اكتشف حلول العناية بالسيارات",
  "Add to Cart": "أضف إلى السلة",
  "Automotive cleaning chemicals for business supply.": "مواد تنظيف سيارات للتوريد التجاري.",
  "Full Payment": "الدفع الكامل",
  "Request Installment Quote": "اطلب عرض تقسيط",
  "Installment terms are not currently configured. Request a quotation and AutoUp will confirm whether an installment plan is available. No installment amount, fees, or schedule are being advertised.":
    "لم تُحدّد شروط التقسيط بعد. أرسل طلب عرض سعر ليتحقق فريق AutoUp من إمكانية توفير خطة تقسيط. لا توجد حالياً مبالغ أو رسوم أو مواعيد أقساط معلنة.",
  "Payment preference: full payment": "طريقة الدفع المفضلة: الدفع الكامل",
  "Payment preference: installment quotation requested (terms to be confirmed)":
    "طريقة الدفع المفضلة: طلب عرض تقسيط (الشروط بانتظار التأكيد)",
  "Installment plan": "خطة التقسيط",
  "A payment preference has been selected for this product. Final pricing and any available installment terms must be confirmed by AutoUp.":
    "تم تحديد طريقة الدفع المفضلة لهذا المنتج. يجب تأكيد السعر النهائي وأي شروط تقسيط متاحة من AutoUp.",
  "Automotive Care & Product Gallery": "معرض العناية بالسيارات والمنتجات",
  "Visual Portfolio": "معرض بصري",
  "Explore our curated visual showcase of vehicle finishes, commercial product packaging, surface restoration, and professional car wash results.":
    "تصفّح مجموعة مختارة من تشطيبات السيارات والعبوات التجارية وتجديد الأسطح ونتائج تنظيف السيارات الاحترافية.",
  "All Images": "كل الصور",
  Vehicles: "السيارات",
  Products: "المنتجات",
  Details: "التفاصيل",
  Craft: "العناية الاحترافية",
  "Showing 8 gallery assets": "يعرض 8 صور من المعرض",
  "View image": "عرض الصورة",
  "Commercial High-Throughput Wash": "غسيل تجاري عالي الإنتاجية",
  "High-dilution foam shampoo and paint preservation":
    "شامبو رغوي عالي التخفيف للمحافظة على الطلاء",
  "Precision Surface Glaze & Shine": "لمعان نهائي دقيق للأسطح",
  "Showroom mirror finish on deep metallic paint": "لمعان كالمرآة على طلاء معدني عميق",
  "Saddle Leather Interior": "مقصورة بجلد بلون السرج",
  "Conditioned with ChemX D2 vinyl and trim polish": "معالجة بملمع الفينيل والزخارف ChemX D2",
  "Performance Wheel & Caliper": "عجلة ومكبح عالي الأداء",
  "ChemX C2 chemical degreaser removing baked brake dust":
    "مزيل الشحوم ChemX C2 لإزالة غبار المكابح المتراكم",
  "Paint Reflection Inspection": "فحص انعكاس الطلاء",
  "F55 final touch wax delivering hologram-free finish":
    "شمع اللمسة النهائية F55 يمنح لمعاناً صافياً",
  "Exterior Clean Bodywork": "تنظيف الهيكل الخارجي",
  "Streak-free rinse with G4 glass and body finish": "شطف خالٍ من الخطوط بملمع الزجاج والهيكل G4",
  "Microfiber Buffing & Finish": "تلميع وتشطيب بالألياف الدقيقة",
  "Final touch inspection before vehicle handover": "الفحص النهائي قبل تسليم السيارة",
  "Engine Bay Cleanse": "تنظيف حجرة المحرك",
  "ChemX C2 all-purpose degreaser on mechanical assemblies":
    "مزيل الشحوم متعدد الاستخدامات ChemX C2 للأجزاء الميكانيكية",
  "Burgundy Classic Coupe": "سيارة كوبيه كلاسيكية بلون خمري",
  "Violet Sports Car": "سيارة رياضية بنفسجية",
  "Silver SUV": "سيارة دفع رباعي فضية",
  "Classic coupe in a garage": "سيارة كوبيه كلاسيكية في مرآب",
  "Leather interior": "مقصورة جلدية",
  "Teal sports car on the coast": "سيارة رياضية بلون فيروزي على الساحل",
  "Commercial-Grade Product Range": "مجموعة منتجات بجودة تجارية",
  "Dedicated B2B Supply Focus": "تركيز متخصص على توريد الشركات",
  "Transparent Inquiries & Direct Service": "استفسارات واضحة وخدمة مباشرة",
  "Who AutoUp Supplies": "الجهات التي نخدمها",
  "Bulk Inquiries & Packaging": "استفسارات الجملة والعبوات",
  "Looking for Automotive Cleaning Products for Your Business?":
    "تبحث عن منتجات تنظيف سيارات لمنشأتك؟",
  "Explore Our Products": "اكتشف منتجاتنا",
  "Order payment preference": "طريقة الدفع المفضلة للطلب",
  "Request installment quotation": "طلب عرض سعر بالتقسيط",
  "Not specified": "غير محدد",
  items: "منتجات",
  "Open photo": "افتح الصورة",
  "Go to slide 1": "انتقل إلى الشريحة 1",
  "Go to slide 2": "انتقل إلى الشريحة 2",
  "Go to slide 3": "انتقل إلى الشريحة 3",
  "Go to slide 4": "انتقل إلى الشريحة 4",
  "Professional Automotive Cleaning Products for Your Business":
    "منتجات احترافية لتنظيف السيارات لأعمالك",
  "B2B Automotive Cleaning Products": "منتجات تنظيف سيارات للشركات",
  "Discover commercial-grade cleaning products and bulk concentrates engineered for professional vehicle care.":
    "اكتشف منتجات تنظيف وتركيزات تجارية مطورة للعناية الاحترافية بالسيارات.",
  "Commercial Bulk Packaging (20L • 25L • 20KG)": "عبوات تجارية كبيرة (20 لتر • 25 لتر • 20 كجم)",
  "High-Yield Formulations for Wash Facilities": "تركيبات عالية المردود لمرافق الغسيل",
  "Concentrated shampoos, waxes, and specialized chemicals packaged for high-throughput commercial operations.":
    "شامبوهات مركزة وشموع ومواد كيميائية متخصصة بعبوات تلائم عمليات الغسيل التجارية عالية الإنتاجية.",
  "Wholesale & Business Supply": "توريد بالجملة وللأعمال",
  "Reliable Chemical Supply for Detailing Studios & Dealerships":
    "توريد موثوق للمواد الكيميائية لمراكز العناية ومعارض السيارات",
  "Supplying car washes, detailing centers, automotive workshops, and fleet operators with surface-safe cleaning solutions.":
    "نورد حلول تنظيف آمنة على الأسطح لمغاسل السيارات ومراكز العناية والورش ومشغلي الأساطيل.",
  "Direct Commercial Procurement": "توريد تجاري مباشر",
  "Equip Your Facility with Professional Auto-Care Products":
    "جهّز منشأتك بمنتجات احترافية للعناية بالسيارات",
  "Direct wholesale inquiries, flexible container volumes, and fast quotation confirmations via WhatsApp.":
    "استفسارات جملة مباشرة، وأحجام عبوات متنوعة، وتأكيد سريع لعروض الأسعار عبر واتساب.",
  "COMMERCIAL CATEGORIES": "فئات تجارية",
  "Product Categories": "فئات المنتجات",
  "Explore professional cleaning chemistry grouped by application surface and commercial wash requirements.":
    "تعرّف على مواد التنظيف الاحترافية المصنفة بحسب سطح الاستخدام واحتياجات الغسيل التجاري.",
  "ACTUAL PRODUCT CATALOG": "كتالوج المنتجات الفعلية",
  "Microfiber Towel": "منشفة ألياف دقيقة",
  "Car Polishing Cloth": "قطعة تلميع السيارات",
  "Chenille Microfiber": "ألياف دقيقة شينيل",
  "Blue Wash Mitt": "قفاز غسيل أزرق",
  "Car Drying Towel": "منشفة تجفيف السيارات",
  "Microfiber Drying Towel": "منشفة تجفيف من الألياف الدقيقة",
  "Red Wash Mitt": "قفاز غسيل أحمر",
  "Featured Automotive Cleaning Products": "منتجات مختارة لتنظيف السيارات",
  "Authentic LifeLines commercial formulations packaged in high-capacity containers for professional vehicle cleaning operations.":
    "تركيبات LifeLines التجارية الأصلية بعبوات كبيرة لعمليات تنظيف السيارات الاحترافية.",
  "View Full Catalog (10 Products)": "عرض الكتالوج كاملاً (10 منتجات)",
  "COMMERCIAL ADVANTAGES": "مزايا تجارية",
  "Why Businesses Choose AutoUp": "لماذا تختار الشركات AutoUp",
  "AutoUp supplies high-efficiency cleaning chemistry that allows professional wash and detailing teams to achieve superior surface shine, reduce chemical waste, and safeguard customer vehicles.":
    "توفر AutoUp مواد تنظيف عالية الكفاءة تساعد فرق الغسيل والعناية الاحترافية على تحقيق لمعان أفضل وتقليل هدر المواد وحماية سيارات العملاء.",
  "Commercial-Grade Bulk Containers": "عبوات كبيرة بجودة تجارية",
  "Standardized 20-litre, 25-litre, and 20-kilogram commercial containers designed specifically for high-frequency business usage.":
    "عبوات تجارية موحدة بسعة 20 و25 لتراً ووزن 20 كيلوجراماً، مصممة للاستخدام المتكرر في الأعمال.",
  "High Dilution Ratios & Economy": "نسب تخفيف عالية واقتصادية",
  "Formulations engineered for dilution rates up to 1:100 and 1:150, significantly reducing chemical cost per cleaned vehicle.":
    "تركيبات بنسب تخفيف تصل إلى 1:100 و1:150 لتقليل تكلفة المواد لكل سيارة يتم تنظيفها.",
  "Paint-Safe & Clear-Coat Tested": "آمنة على الطلاء والطبقة الشفافة",
  "Formulas engineered to preserve automotive paint, protect clear coats, and safely treat delicate vinyl, leather, and glass.":
    "تركيبات للمحافظة على طلاء السيارات وحماية طبقته الشفافة والعناية بأمان بالفينيل والجلد والزجاج.",
  "Direct WhatsApp Commercial Quotes": "عروض أسعار تجارية مباشرة عبر واتساب",
  "Fast, itemized quotation turnarounds with verified container stock and transparent supply information directly via WhatsApp.":
    "عروض أسعار مفصلة وسريعة، مع التحقق من توفر العبوات ومعلومات التوريد بوضوح عبر واتساب.",
  "Heavy-Duty Containers": "عبوات للاستخدام المكثف",
  "Standard 20L, 25L & 20KG Drums": "عبوات قياسية بسعة 20 و25 لتراً ووزن 20 كجم",
  "Engineered specifically for business inventory, automated dosing pumps, and commercial wash bays.":
    "مصممة لمخزون المنشآت ومضخات الجرعات الآلية ومرافق الغسيل التجارية.",
  "TARGET BUSINESS CLIENTELE": "القطاعات التجارية المستهدفة",
  "Our products are engineered to support commercial automotive facilities and high-volume vehicle cleaning operations across diverse business sectors.":
    "صُممت منتجاتنا لدعم مرافق السيارات التجارية وعمليات تنظيف المركبات بكميات كبيرة في قطاعات متنوعة.",
  "Car Wash Businesses": "مغاسل السيارات",
  "High-throughput automatic tunnel washes and manual hand wash bays requiring high-dilution shampoo concentrates.":
    "مغاسل الأنفاق الآلية وأحواض الغسيل اليدوي ذات الإنتاجية العالية، التي تحتاج إلى شامبو مركز عالي التخفيف.",
  "Automotive Detailing Studios": "مراكز العناية بالسيارات",
  "Specialized vehicle detailers demanding high-gloss finishing waxes, tire polishes, and interior conditioners.":
    "مراكز العناية المتخصصة التي تحتاج إلى شموع تشطيب عالية اللمعان وملمعات إطارات ومنظفات للمقصورة.",
  "Vehicle Dealerships": "معارض السيارات",
  "New and pre-owned vehicle showrooms preparing cars for customer handover with showroom surface gloss.":
    "معارض السيارات الجديدة والمستعملة التي تجهز المركبات لتسليمها للعملاء بمظهر لامع.",
  "Automotive Workshops": "ورش السيارات",
  "Service centers and mechanical garages requiring powerful degreasing chemicals for engine bays and rims.":
    "مراكز الخدمة والورش الميكانيكية التي تحتاج إلى مزيلات شحوم قوية لحجرات المحركات والجنوط.",
  "Fleet & Transport Operators": "مشغلو الأساطيل والنقل",
  "Commercial transport companies, taxi fleets, and rental operators maintaining fleets under rigorous daily schedules.":
    "شركات النقل التجاري وأساطيل سيارات الأجرة والتأجير التي تحافظ على مركباتها وفق جداول تشغيل يومية مكثفة.",
  "Distributors & Resellers": "الموزعون وتجار التجزئة",
  "Regional automotive product wholesalers and procurement teams sourcing reliable commercial-grade chemicals.":
    "تجار منتجات السيارات بالجملة وفرق المشتريات الباحثون عن مواد كيميائية تجارية موثوقة.",
  "ORDERING PROCESS": "خطوات الطلب",
  "Bulk and Wholesale Inquiries": "استفسارات التوريد بالجملة",
  "We make commercial chemical procurement straightforward, fast, and transparent. Learn how businesses contact AutoUp for product availability, container volumes, and pricing.":
    "نجعل شراء المواد الكيميائية التجارية سهلاً وسريعاً وواضحاً. تعرّف على كيفية تواصل المنشآت مع AutoUp للاستفسار عن توفر المنتجات وأحجام العبوات والأسعار.",
  "Select Products": "اختر المنتجات",
  "Review our 10 verified commercial product formulas and select the container quantities needed for your operation.":
    "استعرض تركيباتنا التجارية العشر المؤكدة واختر كميات العبوات المناسبة لاحتياجات منشأتك.",
  "Submit Business Information": "أرسل بيانات المنشأة",
  "Provide your company name, location, and estimated monthly or sample volume through our simple inquiry form.":
    "أدخل اسم الشركة وموقعها والكمية الشهرية التقديرية أو كمية العينة عبر نموذج الاستفسار.",
  "Receive Verified Quotation": "استلم عرض سعر مؤكداً",
  "Our commercial representative confirms stock availability, volume pricing, and logistics options directly on WhatsApp.":
    "يؤكد ممثلنا التجاري توفر المخزون وأسعار الكميات وخيارات الخدمات اللوجستية مباشرةً عبر واتساب.",
  "Contact on WhatsApp": "تواصل عبر واتساب",
  "Verified Container Sizing": "أحجام عبوات مؤكدة",
  "Every product is supplied in manufacturer-verified commercial capacities (20L, 25L, 20KG) matching industrial handling requirements.":
    "تُورّد المنتجات بسعات تجارية معتمدة من الشركة المصنّعة (20 لترًا، 25 لترًا، 20 كجم) بما يلائم متطلبات الاستخدام الصناعي.",
  "Flexible Order Volumes": "كميات طلب مرنة",
  "Whether requesting initial product test samples or scheduled pallet deliveries for multi-bay chains, we tailor supply arrangements to your operational scale.":
    "سواء كنت تطلب عينات أولية للاختبار أو توصيل منصات مجدولاً لفروع متعددة، ننسق التوريد بما يناسب حجم عملياتك.",
  "Accurate Label Data & Dilution Guidance": "بيانات دقيقة وإرشادات تخفيف واضحة",
  "Printed container instructions provide precise dilution ratios for high-pressure spray pumps, foam lances, and manual wash buckets.":
    "توضح إرشادات العبوات نسب التخفيف الدقيقة لمضخات الرش عالية الضغط ومدافع الرغوة وأحواض الغسيل اليدوي.",
  "COMPANY OVERVIEW": "نبذة عن الشركة",
  "AutoUp is a specialized B2B supplier of automotive cleaning products, concentrated detergents, and vehicle maintenance chemistry.":
    "AutoUp مورد متخصص للشركات لمنتجات تنظيف السيارات والمنظفات المركزة والمواد الكيميائية للعناية بالمركبات.",
  "Important Note:": "ملاحظة مهمة:",
  "AutoUp sells and supplies automotive cleaning products exclusively. We do NOT provide car washing, vehicle detailing, polishing, or mobile cleaning services to consumers.":
    "تبيع AutoUp منتجات تنظيف السيارات وتوردها حصراً. ولا تقدم خدمات غسل السيارات أو العناية بها أو تلميعها أو تنظيفها المتنقل للأفراد.",
  "By focusing strictly on product chemistry and wholesale supply, we ensure commercial buyers receive reliable stock, authentic LifeLines packaging, and verified chemical specifications.":
    "وبتركيزنا على تركيبات المنتجات والتوريد بالجملة، نحرص على حصول المشترين التجاريين على مخزون موثوق وعبوات LifeLines أصلية ومواصفات كيميائية مؤكدة.",
  "Read More About Us": "اقرأ المزيد عنا",
  "Contact Commercial Team": "تواصل مع الفريق التجاري",
  "QUESTIONS & ANSWERS": "أسئلة وإجابات",
  "Answers regarding our commercial product inventory, container sizes, and B2B ordering procedures.":
    "إجابات حول مخزون المنتجات التجارية وأحجام العبوات وإجراءات طلبات الشركات.",
  "COMMERCIAL VEHICLE CARE": "عناية تجارية بالسيارات",
  "Discover automotive cleaning products for professional use. Explore our product range and contact our team for business inquiries, bulk purchasing, and supply information.":
    "اكتشف منتجات تنظيف السيارات للاستخدام الاحترافي. تصفح مجموعتنا وتواصل مع فريقنا للاستفسارات التجارية والشراء بالجملة ومعلومات التوريد.",
  "COMMERCIAL SUPPLY": "توريد تجاري",
  "Interested in the Products Behind These Finishes?": "هل ترغب في المنتجات التي تمنح هذه النتائج؟",
  "Explore our complete collection of commercial automotive shampoos, waxes, and chemicals, or request wholesale quotations directly for your facility.":
    "اكتشف مجموعتنا الكاملة من شامبوهات السيارات التجارية والشموع والمواد الكيميائية، أو اطلب عرض سعر بالجملة لمنشأتك.",
  "Explore Products Catalog": "تصفح كتالوج المنتجات",
  "Commercial Automotive Cleaning Products Supplier": "مورد منتجات تنظيف السيارات التجارية",
  "Contact AutoUp — B2B Wholesale Automotive Cleaning Products":
    "تواصل مع AutoUp — منتجات تنظيف سيارات بالجملة للشركات",
  "About AutoUp — B2B Automotive Cleaning Products Supplier":
    "عن AutoUp — مورد منتجات تنظيف سيارات للشركات",
  "OUR BUSINESS IDENTITY": "تعريفنا التجاري",
  "A Dedicated Automotive Chemical & Wash Products Partner":
    "شريك متخصص في مواد تنظيف السيارات ومنتجات الغسيل",
  "AutoUp is a product supplier — we do not offer car washing, vehicle detailing, or mobile cleaning services to individual consumers. Instead, we equip commercial operators with the professional chemical formulations, bulk shampoo concentrates, surface glazes, and protective solutions they need to run high-efficiency, premium-finish cleaning operations.":
    "AutoUp مورد للمنتجات، ولا تقدم خدمات غسل السيارات أو العناية بها أو التنظيف المتنقل للأفراد. بل نوفر للمنشآت التجارية التركيبات الكيميائية الاحترافية وشامبو المركزات والملمعات وحلول الحماية اللازمة لتشغيل عمليات تنظيف عالية الكفاءة وذات تشطيب متميز.",
  "Automotive detailing & paint correction centers": "مراكز العناية بالسيارات وتصحيح الطلاء",
  "Automotive dealerships & showroom prep teams": "معارض السيارات وفرق تجهيز صالات العرض",
  "Automotive service centers & mechanic workshops": "مراكز خدمة السيارات والورش الميكانيكية",
  "Commercial transport fleets & logistics operators":
    "أساطيل النقل التجاري ومشغلو الخدمات اللوجستية",
  "Regional automotive product distributors & resellers":
    "موزعو منتجات السيارات الإقليميون وتجار إعادة البيع",
  "COMMERCIAL PARTNERSHIPS": "شراكات تجارية",
  "Our products are trusted by businesses that demand consistent cleaning performance, high dilution yields, and surface safety across hundreds of vehicles each week.":
    "تعتمد علينا منشآت تتطلب أداء تنظيف ثابتاً ومردود تخفيف عالياً وعناية آمنة بالأسطح لمئات المركبات أسبوعياً.",
  "All core formulas are packaged in high-capacity containers (20L, 25L, 20KG) to optimize shipping, storage, and per-liter dilution economics. Contact our commercial team to request custom quotes and logistics details for your facility.":
    "تتوفر التركيبات الأساسية بعبوات كبيرة (20 لترًا، 25 لترًا، 20 كجم) لتحسين الشحن والتخزين والكفاءة الاقتصادية بعد التخفيف. تواصل مع فريقنا التجاري لطلب عروض مخصصة وتفاصيل الخدمات اللوجستية لمنشأتك.",
  "Professional Automotive Cleaning Supply for Businesses.":
    "توريد منتجات تنظيف سيارات احترافية للمنشآت.",
  "AutoUp specializes in the wholesale supply of automotive cleaning chemicals and concentrates engineered for professional vehicle maintenance and commercial wash facilities.":
    "تتخصص AutoUp في توريد مواد تنظيف السيارات الكيميائية والمركزة بالجملة، والمصممة للعناية الاحترافية بالمركبات ومرافق الغسيل التجارية.",
  "Car wash businesses (automatic & manual systems)": "مغاسل السيارات (الأنظمة الآلية واليدوية)",
  "Commercial Grade Product Range": "مجموعة منتجات بجودة تجارية",
  "AutoUp specializes in automotive cleaning products for commercial operators.":
    "تتخصص AutoUp في منتجات تنظيف السيارات المخصصة للمنشآت التجارية.",
  "How can my business request wholesale pricing and quotations?":
    "كيف يمكن لمنشأتي طلب أسعار الجملة وعروض الأسعار؟",
  "You can submit a wholesale quote request through our website, or contact us directly on WhatsApp with your required products, container sizes, and estimated order volumes. Our team provides fast, itemized commercial quotations.":
    "يمكنك إرسال طلب عرض سعر بالجملة عبر موقعنا أو التواصل معنا مباشرةً على واتساب مع تحديد المنتجات وأحجام العبوات والكميات التقديرية. يقدم فريقنا عروضاً تجارية مفصلة بسرعة.",
  "What container sizes are available for commercial purchasing?":
    "ما أحجام العبوات المتاحة للشراء التجاري؟",
  "Our products are packaged in high-yield commercial volumes, including 20-litre and 25-litre drums as well as 20-kilogram containers for pre-wash concentrates and polishes, optimized for high-volume business usage.":
    "تتوفر منتجاتنا بأحجام تجارية عالية المردود، تشمل عبوات 20 و25 لتراً وعبوات 20 كيلوجراماً لمركزات ما قبل الغسيل والملمعات، بما يلائم الاستخدام التجاري بكميات كبيرة.",
  "What types of businesses does AutoUp supply?": "ما أنواع المنشآت التي تزودها AutoUp؟",
  "AutoUp supplies commercial car wash operations (automatic and manual), vehicle detailing studios, automotive dealerships, mechanic workshops, commercial transport fleets, and regional automotive product distributors.":
    "تزود AutoUp مغاسل السيارات التجارية الآلية واليدوية ومراكز العناية بالسيارات والمعارض والورش الميكانيكية وأساطيل النقل التجاري وموزعي منتجات السيارات الإقليميين.",
  "Does AutoUp provide consumer car wash or detailing services?":
    "هل تقدم AutoUp خدمات غسل السيارات أو العناية بها للأفراد؟",
  "No. AutoUp is strictly a product manufacturer and wholesale supplier. We do not offer car washing, vehicle detailing, polishing, or mobile cleaning services to individual retail consumers.":
    "لا. AutoUp مورد منتجات بالجملة. ولا نقدم خدمات غسل السيارات أو العناية بها أو تلميعها أو تنظيفها المتنقل للأفراد.",
  "How are shipping and delivery arranged?": "كيف يتم ترتيب الشحن والتوصيل؟",
  "Delivery arrangements, freight options, and regional logistics are coordinated and confirmed directly during the quotation process based on your business location and order volume.":
    "يتم تنسيق ترتيبات التوصيل وخيارات الشحن والخدمات اللوجستية الإقليمية وتأكيدها مباشرةً أثناء طلب عرض السعر، وفق موقع منشأتك وحجم طلبك.",
  "What products does AutoUp supply?": "ما المنتجات التي توفرها AutoUp؟",
  "AutoUp supplies commercial automotive cleaning products including concentrated car shampoos (Colour Wax Shampoo, Pre-Wash), all-purpose degreasers (ChemX C2), finishing waxes (F55), dashboard conditioners (ChemX D2), tire dressings (ChemX T1, O2 Solvent), and streak-free glass polish (G4).":
    "توفر AutoUp منتجات تنظيف سيارات تجارية تشمل شامبو السيارات المركز (Colour Wax Shampoo وPre-Wash)، ومزيلات الشحوم متعددة الاستخدامات (ChemX C2)، وشمع التشطيب (F55)، وملمع لوحة القيادة (ChemX D2)، وملمعات الإطارات (ChemX T1 وO2 Solvent)، وملمع الزجاج الخالي من الخطوط (G4).",
  "Does AutoUp provide consumer car washing or vehicle detailing services?":
    "هل تقدم AutoUp خدمات غسل السيارات أو العناية بها للأفراد؟",
  "No. AutoUp is strictly a B2B product supplier. We do not provide car washing, detailing, vehicle polishing, or in-person cleaning services to individual retail consumers.":
    "لا. AutoUp مورد منتجات للشركات فقط، ولا تقدم خدمات غسل السيارات أو العناية بها أو تلميعها أو تنظيفها حضورياً للأفراد.",
  "What container sizes are available for business purchasing?":
    "ما أحجام العبوات المتاحة للشراء التجاري؟",
  "Our products are supplied in heavy-duty commercial packaging: 20-litre liquid containers, 25-litre chemical drums, and 20-kilogram containers for pre-wash concentrates and polishes.":
    "تُورّد منتجاتنا بعبوات تجارية متينة: عبوات سوائل سعة 20 لتراً، وبراميل مواد كيميائية سعة 25 لتراً، وعبوات بوزن 20 كيلوجراماً لمركزات ما قبل الغسيل والملمعات.",
  "How can businesses request wholesale pricing?": "كيف يمكن للشركات طلب أسعار الجملة؟",
  "You can build an inquiry list on our website and click 'Request a Wholesale Quote', or message our team directly on WhatsApp. We provide itemized wholesale quotations based on your required products and order volume.":
    "يمكنك إنشاء قائمة استفسار على موقعنا واختيار «اطلب عرض سعر بالجملة»، أو مراسلة فريقنا مباشرةً عبر واتساب. نقدم عروض أسعار مفصلة بحسب المنتجات المطلوبة وحجم الطلب.",
  "What are the dilution recommendations for car wash operations?":
    "ما نسب التخفيف الموصى بها لعمليات غسيل السيارات؟",
  "Each product features specific dilution guidelines printed on the packaging. For example, our Colour Wax Shampoo dilutes at 1 litre to 100 litres of water for manual washing and 1:150 for pump systems, delivering cost-effective operational economics.":
    "تتضمن عبوة كل منتج إرشادات التخفيف الخاصة به. فعلى سبيل المثال، يخفف Colour Wax Shampoo بنسبة لتر واحد إلى 100 لتر ماء للغسيل اليدوي، وبنسبة 1:150 لأنظمة المضخات، بما يدعم كفاءة التشغيل.",
  "Are product prices shown on the website?": "هل تُعرض أسعار المنتجات على الموقع؟",
  "Because AutoUp is a B2B supplier, wholesale pricing is customized based on order volumes and delivery locations. Pricing is verified directly through our quotation and WhatsApp inquiry flow.":
    "بما أن AutoUp مورد للشركات، تُحدد أسعار الجملة وفق كميات الطلب ومواقع التوصيل. ويتم تأكيد الأسعار مباشرةً عبر طلب عرض السعر والتواصل على واتساب.",
  "Company / Business Name *": "اسم الشركة / المنشأة *",
  "Contact Person Name *": "اسم مسؤول التواصل *",
  "Business Phone / WhatsApp *": "هاتف المنشأة / واتساب *",
  "Please enter your business or company name.": "يرجى إدخال اسم الشركة أو المنشأة.",
  "Please enter contact person name.": "يرجى إدخال اسم مسؤول التواصل.",
  "Please enter a valid business phone number.": "يرجى إدخال رقم هاتف صحيح للمنشأة.",
  "Please enter your city.": "يرجى إدخال المدينة.",
  "Please write a short inquiry message.": "يرجى كتابة رسالة استفسار مختصرة.",
  "Quote request copied to clipboard!": "تم نسخ طلب عرض السعر.",
  "Request Category Quote": "اطلب عرض سعر للفئة",
  "View All Services": "عرض جميع الخدمات",
  "High-lubricity foam prevents swirl marks and wash scratches":
    "رغوة عالية الانزلاق تساعد على الحد من آثار الدوران وخدوش الغسيل",
  "pH-neutral formula safe for ceramic coatings, waxes and sealants":
    "تركيبة متعادلة الحموضة وآمنة على الطلاء الخزفي والشموع ومواد الحماية",
  "Effortlessly breaks down road film, grime, and environmental dust":
    "تساعد على تفكيك طبقة الطريق والأوساخ والغبار بسهولة",
  "Concentrated professional-grade formulas for maximum value":
    "تركيبات مركزة بجودة احترافية لتحقيق أفضل مردود",
  "Rapidly dissolves stubborn grease, brake fallout, and bug splatter":
    "تذيب سريعاً الشحوم العنيدة وبقايا المكابح وآثار الحشرات",
  "Safe for delicate automotive rubbers, alloys, plastics and paint":
    "آمنة على المطاط والسبائك والبلاستيك وطلاء السيارات",
  "Deep optical gloss with mirror-like carnauba wet look": "لمعان بصري عميق ومظهر رطب شبيه بالمرآة",
  "Hydrophobic ceramic-infused water beading protection":
    "حماية طاردة للماء بتأثير قطرات معززة بالخزف",
  "Shields automotive clear coats from UV fading and acid rain":
    "تحمي الطبقة الشفافة للطلاء من بهتان الأشعة فوق البنفسجية والأمطار الحمضية",
  "Restores OEM satin finish without greasy, slippery residue":
    "تعيد التشطيب الساتاني الأصلي دون بقايا دهنية أو زلقة",
  "Deep condition and nourish leather, vinyl, and modern trims":
    "تنظف الجلد والفينيل والزخارف الحديثة بعمق وتعتني بها",
  "Eliminates odors and blocks harsh sun degradation":
    "تساعد على إزالة الروائح والحد من أثر أشعة الشمس القوية",
  "Streak-free spot detailing on glass, body panels and chrome":
    "عناية موضعية بالزجاج وألواح الهيكل والكروم دون خطوط",
  "Anti-static dust-repelling formula keeps surfaces cleaner longer":
    "تركيبة مضادة للكهرباء الساكنة وطاردة للغبار تساعد على بقاء الأسطح أنظف",
  "Safe for vinyl wraps, badges, matte finishes and rubber moldings":
    "آمنة على أغلفة الفينيل والشعارات والتشطيبات غير اللامعة والقوالب المطاطية",
  "Fits effortlessly into your regular detailing routine":
    "تلائم بسهولة روتين العناية المعتاد بسيارتك",
  "Formulated specifically for the targeted vehicle surface": "تركيبة مخصصة لسطح السيارة المستهدف",
  "Direct quotation support with guaranteed product quality":
    "دعم مباشر لطلب عرض السعر وجودة منتجات موثوقة",
  "All formulations are tested for maximum surface safety and long-lasting optical clarity. Follow container dilution and application guidelines for optimum results.":
    "اختُبرت التركيبات لتوفير عناية آمنة بالأسطح ولمعان واضح يدوم طويلاً. اتبع إرشادات التخفيف والاستخدام المدونة على العبوة للحصول على أفضل النتائج.",
  "Silver Modern SUV": "سيارة دفع رباعي حديثة فضية",
  "Category:": "الفئة:",
  "4 Products": "4 منتجات",
  "ChemX Series": "سلسلة ChemX",
  "F55 Final Touch": "F55 Final Touch",
  "Tire & Glass Care": "العناية بالإطارات والزجاج",
  "20L & 20KG": "20 لتر و20 كجم",
  "25L Drum": "برميل 25 لترًا",
  "20L Container": "عبوة 20 لترًا",
  "20KG Drum": "عبوة 20 كجم",
  "Contact AutoUp on WhatsApp": "تواصل مع AutoUp عبر واتساب",
  "Chat with AutoUp on WhatsApp": "تحدث مع AutoUp عبر واتساب",
  "Company:": "الشركة:",
  "Phone:": "الهاتف:",
  "City:": "المدينة:",
  "Inquiry / Requirements:": "الاستفسار / المتطلبات:",
  "I have a business inquiry regarding your automotive cleaning products.":
    "لدي استفسار تجاري حول منتجات تنظيف السيارات لديكم.",
  "Please share product availability and pricing information.":
    "يرجى تزويدي بمعلومات توفر المنتجات والأسعار.",
  "Search products or categories": "ابحث عن المنتجات أو الفئات",
  "Send Quote Request on WhatsApp": "أرسل طلب عرض السعر عبر واتساب",
  "Edit Inquired Items & Details": "تعديل المنتجات المطلوبة والتفاصيل",
  "Payment option": "طريقة الدفع",
  "Installment quote requested": "طُلب عرض تقسيط",
  "Full payment": "الدفع الكامل",
  "Payment preference: installment quotation requested (terms to be confirmed).":
    "طريقة الدفع المفضلة: طلب عرض تقسيط (الشروط بانتظار التأكيد).",
  "Payment preference: full payment.": "طريقة الدفع المفضلة: الدفع الكامل.",
  "×": "×",
  "Switch language to English": "التبديل إلى الإنجليزية",
  "Switch language to Arabic": "التبديل إلى العربية",
  "Colour Wax Shampoo": "شامبو الشمع الملون",
  "Colour Wax Shampoo — Rose": "شامبو الشمع الملون — الورد",
  "Pre Wash Car Shampoo": "شامبو ما قبل الغسيل",
  "Waterless Car Wash": "غسيل سيارات دون ماء",
  "ChemX C2": "ChemX C2",
  "F55 Final Touch Wax": "شمع اللمسة النهائية F55",
  "ChemX D2": "ChemX D2",
  "ChemX T1": "ChemX T1",
  "O2 Solvent Tire Polish": "ملمع الإطارات بالمذيب O2",
  "G4 Car Glass Cleaner & Polish": "منظف وملمع زجاج السيارات G4",
  "Advanced formula that preserves paint and delivers a long-lasting attractive luster.":
    "تركيبة متطورة تحافظ على الطلاء وتمنحه لمعاناً جذاباً يدوم طويلاً.",
  "Same advanced wax shampoo formula in a signature rose fragrance.":
    "تركيبة شامبو الشمع المتطورة نفسها برائحة الورد المميزة.",
  "High-performance pre-wash for automatic and manual car wash systems.":
    "شامبو ما قبل الغسيل عالي الأداء لأنظمة الغسيل الآلية واليدوية.",
  "Wash your car without water — cleans, shines and protects in one step.":
    "نظّف سيارتك دون ماء — تنظيف ولمعان وحماية في خطوة واحدة.",
  "Chemical all-purpose cleaner for engines, rims, interiors and more.":
    "منظف كيميائي متعدد الاستخدامات للمحركات والجنوط والمقصورة وغيرها.",
  "Post-wash shine wax — instant gloss, no residue, dust-resistant.":
    "شمع لمعان بعد الغسيل — بريق فوري دون بقايا ومقاوم للغبار.",
  "Dashboard polish for vinyl, leather and plastic — long-lasting shine.":
    "ملمع للوحة القيادة والفينيل والجلد والبلاستيك يمنح لمعاناً يدوم طويلاً.",
  "Tire polish for deep, rich, long-lasting shine on rubber surfaces.":
    "ملمع إطارات يمنح الأسطح المطاطية لمعاناً عميقاً وغنياً يدوم طويلاً.",
  "Powerful solvent tire polish for deep shine and long-lasting protection.":
    "ملمع إطارات قوي بالمذيب يمنح لمعاناً عميقاً وحماية طويلة الأمد.",
  "Ammonia-free glass cleaner and polish — streak-free, long-lasting protection.":
    "منظف وملمع زجاج خالٍ من الأمونيا، لتنظيف بلا خطوط وحماية تدوم طويلاً.",
  "LifeLines Colour Wax Shampoo is a new and advanced formula that preserves the car paint and gives it an attractive luster that lasts for a long time. The formula has the ability to break up dirt, oil and grease with ease. pH-neutral — does not affect the hand at all.":
    "شامبو الشمع الملون من LifeLines تركيبة متطورة تحافظ على طلاء السيارة وتمنحه لمعاناً جذاباً يدوم طويلاً. تساعد تركيبته على تفكيك الأوساخ والزيوت والشحوم بسهولة. متعادل الحموضة ولطيف على اليدين.",
  "LifeLines Colour Wax Shampoo (Rose) preserves the car paint and gives it an attractive luster that lasts for a long time. Phosphate-free, concentrate formula — removes dirt, pH neutral, quick drying.":
    "يحافظ شامبو الشمع الملون من LifeLines برائحة الورد على طلاء السيارة ويمنحه لمعاناً جذاباً يدوم طويلاً. تركيبة مركزة خالية من الفوسفات ومتعادلة الحموضة، تزيل الأوساخ وتجف بسرعة.",
  "LifeLines Pre Wash Car Shampoo is a high-performance shampoo designed for use in automatic car wash systems and manual car wash systems. It effectively removes dirt, oil and road films, leaving the surface clean and ready for further treatment. High lubrication to reduce friction; easy to rinse; suitable for all types of vehicles.":
    "شامبو ما قبل الغسيل من LifeLines عالي الأداء ومناسب لأنظمة غسيل السيارات الآلية واليدوية. يزيل الأوساخ والزيوت وطبقة الطريق بفاعلية، ويترك السطح نظيفاً وجاهزاً للمعالجة التالية. يوفر انزلاقاً يساعد على تقليل الاحتكاك، وسهل الشطف ومناسب لجميع أنواع المركبات.",
  "LifeLines Waterless Car Wash Shampoo is a distinct and unique formula that has a high ability to break up dirt and remove it with ease. The formula also contains Wax to preserve the car's paint and give it a distinctive shine. Reduces water use and waste. Environmentally friendly.":
    "شامبو الغسيل دون ماء من LifeLines بتركيبة مميزة تساعد على تفكيك الأوساخ وإزالتها بسهولة. يحتوي أيضاً على الشمع للمساعدة في حماية طلاء السيارة ومنحها لمعاناً مميزاً. يقلل استهلاك المياه والهدر، وهو خيار ملائم للبيئة.",
  "LifeLines ChemX C2 is a Chemical All-Purpose Cleaner. It cleans engines, rims, linings, interior seats, leather and car floors according to the recommended dilution. An advanced American formula that preserves paint and car interior according to the manufacturer's recommended instructions.":
    "منظف ChemX C2 من LifeLines متعدد الاستخدامات؛ ينظف المحركات والجنوط والبطانات والمقاعد الداخلية والجلد وأرضيات السيارات وفق نسب التخفيف الموصى بها. تركيبة أمريكية متطورة، تُستخدم بما يتوافق مع تعليمات الشركة المصنّعة للمحافظة على الطلاء والمقصورة.",
  "LifeLines F55 Final Touch provides an exceptional final shine to cars after washing. Leaves the car's surface glossy and radiant while reducing dust and stain adhesion. Delivers instant shine. Easy to use after washing. Leaves no residue or unwanted marks. Protects the paint and reduces dust adhesion.":
    "يمنح F55 Final Touch من LifeLines السيارة لمعاناً نهائياً مميزاً بعد الغسيل. يترك السطح لامعاً ومشرقاً، ويساعد على الحد من التصاق الغبار والبقع. سهل الاستخدام بعد الغسيل، ولا يترك بقايا أو آثاراً غير مرغوبة.",
  "LifeLines ChemX D2 Dashboard Polish produces a deep, rich, long-lasting shine in all interior plastic and rubber surfaces, especially the dashboard. ChemX D2 will give you the desired results time after time. Suitable for Vinyl, Leather and Plastic surfaces. Cleans, conditions and protects.":
    "يمنح ملمع لوحة القيادة ChemX D2 من LifeLines الأسطح الداخلية البلاستيكية والمطاطية، ولا سيما لوحة القيادة، لمعاناً غنياً يدوم طويلاً. مناسب للفينيل والجلد والبلاستيك، وينظف الأسطح ويعتني بها ويحميها.",
  "LifeLines ChemX T1 Tire Polish produces a deep, rich, long-lasting shine in all exterior plastic and rubber surfaces. New or old. ChemX T1 will give you the desired results time after time. Ready to use without any dilution.":
    "يمنح ملمع الإطارات ChemX T1 من LifeLines الأسطح الخارجية البلاستيكية والمطاطية، الجديدة أو القديمة، لمعاناً غنياً يدوم طويلاً. جاهز للاستخدام دون تخفيف.",
  "LifeLines O2 Solvent is a powerful and effective tire polish that gives your car tires a deep shine and long-lasting protection, designed to resist dirt and water. Contains petroleum solvents, silicone oils and added stabilisers.":
    "ملمع الإطارات O2 Solvent من LifeLines فعال وقوي، يمنح الإطارات لمعاناً عميقاً وحماية طويلة الأمد ومقاومة للأوساخ والماء. يحتوي على مذيبات بترولية وزيوت سيليكون ومواد مثبتة.",
  "LifeLines G4 Car Glass Cleaner & Polish is specially formulated to efficiently remove stains, dust and fingerprints while leaving a protective layer that helps prevent dust from sticking for longer. Ammonia-free formula, safe for glass surfaces. Prevents streaks and watermarks after cleaning. Long-lasting protection against dust and dirt. Fast-drying; leaves no residue.":
    "منظف وملمع زجاج السيارات G4 من LifeLines مصمم لإزالة البقع والغبار وبصمات الأصابع بفاعلية، ويترك طبقة واقية تساعد على الحد من التصاق الغبار. تركيبة خالية من الأمونيا ومناسبة للأسطح الزجاجية، وتساعد على تجنب الخطوط وآثار الماء وتجف سريعاً دون بقايا.",
  "Remove accumulated dirt using a water pump first. Mix 1 litre of LifeLines shampoo with 100 litres of water for hand washing, or 1 litre with 150 litres for in-pump use. After spraying, leave for 3 minutes, then rinse and dry with a towel.":
    "أزل الأوساخ المتراكمة أولاً باستخدام مضخة الماء. اخلط لتراً واحداً من شامبو LifeLines مع 100 لتر من الماء للغسيل اليدوي، أو مع 150 لتراً للاستخدام في المضخة. اتركه 3 دقائق بعد الرش، ثم اشطف وجفف بمنشفة.",
  "Mix 1 litre with 100 litres of water for hand washing, or 1 litre with 150 litres for in-pump use. Leave on surface for 3 minutes, then rinse thoroughly and dry.":
    "اخلط لتراً واحداً مع 100 لتر من الماء للغسيل اليدوي، أو مع 150 لتراً للاستخدام في المضخة. اتركه على السطح 3 دقائق، ثم اشطف جيداً وجفف.",
  "Automatic car wash: 40–50 ml per car. Manual: 1 litre of shampoo to 100 litres of water. Dilute, spray onto the car, leave for no more than 2 minutes to react with dirt, then rinse thoroughly with water.":
    "الغسيل الآلي: 40–50 مل لكل سيارة. الغسيل اليدوي: لتر شامبو لكل 100 لتر ماء. خفف المنتج ورشه على السيارة، واتركه مدة لا تتجاوز دقيقتين ليتفاعل مع الأوساخ، ثم اشطف جيداً بالماء.",
  "Spray the product directly on the surface of the car from the outside, leave for 30 seconds, then wipe with a microfiber towel (preferably wet).":
    "رش المنتج مباشرة على السطح الخارجي للسيارة، واتركه 30 ثانية، ثم امسح بقطعة ألياف دقيقة (ويُفضّل أن تكون مبللة).",
  "After washing or during drying, spray an appropriate amount of product onto a clean, soft cloth. Wipe the car's surface in a circular motion for a perfect shine.":
    "بعد الغسيل أو أثناء التجفيف، رش كمية مناسبة على قطعة قماش نظيفة وناعمة. امسح سطح السيارة بحركة دائرية للحصول على لمعان متجانس.",
  "Shake the container before each use. Dilute 1:1 or use as-is for best results. For optimal results, apply the product evenly with a sponge and allow it to dry.":
    "رج العبوة قبل كل استخدام. خفف بنسبة 1:1 أو استخدمه كما هو للحصول على أفضل نتيجة. وزّع المنتج بالتساوي باستخدام إسفنجة واتركه حتى يجف.",
  "For best results, apply to a dry and clean surface. Spray evenly at all surfaces and let the product dry away from dust.":
    "لأفضل النتائج، ضع المنتج على سطح نظيف وجاف. رشه بالتساوي على الأسطح واتركه يجف بعيداً عن الغبار.",
  "1. Clean the tires thoroughly and ensure they are completely dry. 2. Spray the product onto the tire. 3. Spread it evenly using a sponge. For external use only. Flammable — keep away from heat and sparks.":
    "1. نظف الإطارات جيداً وتأكد من جفافها التام. 2. رش المنتج على الإطار. 3. وزعه بالتساوي باستخدام إسفنجة. للاستخدام الخارجي فقط. قابل للاشتعال — يُحفظ بعيداً عن الحرارة والشرر.",
  "1. Spray the polish directly onto the glass. 2. Wipe the glass with a soft, dry cloth in circular motions. 3. For best results, avoid direct sunlight during application. Avoid contact with eyes and skin.":
    "1. رش الملمع مباشرة على الزجاج. 2. امسح بقطعة قماش ناعمة وجافة بحركات دائرية. 3. للحصول على أفضل نتيجة، تجنب التطبيق تحت أشعة الشمس المباشرة. تجنب ملامسة العينين والجلد.",
  "Hello AutoUp, I am interested in your automotive cleaning products for business use. Please share product availability and pricing information.":
    "مرحباً AutoUp، أهتم بمنتجات تنظيف السيارات للاستخدام التجاري. يرجى تزويدي بمعلومات توفر المنتجات والأسعار.",
  "Hello AutoUp, I would like to inquire about bulk wholesale purchasing for automotive cleaning products.":
    "مرحباً AutoUp، أود الاستفسار عن شراء منتجات تنظيف السيارات بالجملة.",
  "Hello AutoUp,": "مرحباً AutoUp،",
  "Please share product availability, wholesale pricing, and supply information.":
    "يرجى تزويدي بمعلومات توفر المنتجات وأسعار الجملة والتوريد.",
  "Thank you.": "شكراً لكم.",
  "Requested Products:": "المنتجات المطلوبة:",
  "General Product Inquiry": "استفسار عام عن المنتجات",
  "Contact Name:": "اسم مسؤول التواصل:",
  "Company / Business:": "الشركة / المنشأة:",
  "Phone / WhatsApp:": "الهاتف / واتساب:",
  "Business Email:": "البريد الإلكتروني للمنشأة:",
  "Location:": "الموقع:",
  "Estimated Order Volume:": "حجم الطلب التقديري:",
  "Requirements & Message": "المتطلبات والرسالة",
  "Wholesale automotive cleaning products for business use.":
    "منتجات تنظيف سيارات بالجملة للاستخدام التجاري.",
  "B2B supplier of professional automotive cleaning products, concentrated shampoos, waxes, and specialized chemicals for commercial wash operations and detailing studios.":
    "مورد للشركات لمنتجات تنظيف السيارات الاحترافية والشامبو المركز والشموع والمواد الكيميائية المتخصصة لمغاسل السيارات ومراكز العناية.",
  "Contact AutoUp": "تواصل مع AutoUp",
  "Close quote drawer": "إغلاق قائمة عرض السعر",
  "Decrease quantity": "تقليل الكمية",
  "Increase quantity": "زيادة الكمية",
  "Remove item": "إزالة المنتج",
  Remove: "إزالة",
  "Open quotation inquiry list": "افتح قائمة طلب عرض السعر",
  "Concentrated foam shampoos and pre-washes formulated for automatic and manual wash systems.":
    "شامبوهات رغوية مركزة ومنتجات ما قبل الغسيل لأنظمة الغسيل الآلية واليدوية.",
  "Heavy-duty all-purpose cleaners (ChemX C2) for engines, rims, linings, and high-grime components.":
    "منظفات قوية متعددة الاستخدامات (ChemX C2) للمحركات والجنوط والبطانات والأجزاء شديدة الاتساخ.",
  "Post-wash final touch shine waxes (F55) delivering instant gloss, zero residue, and dust repellency.":
    "شموع لمعان نهائي بعد الغسيل (F55) تمنح بريقاً فورياً دون بقايا وتساعد على طرد الغبار.",
  "Dashboard and trim polishes (ChemX D2) engineered for vinyl, leather, and interior plastics.":
    "ملمعات لوحة القيادة والزخارف (ChemX D2) المصممة للفينيل والجلد والبلاستيك الداخلي.",
  "Solvent tire dressings (O2, ChemX T1) and ammonia-free streakless glass polishes (G4).":
    "ملمعات إطارات بالمذيب (O2 وChemX T1) وملمع زجاج خالٍ من الأمونيا والخطوط (G4).",
  "Automotive cleaning products available in bulk commercial packaging.":
    "منتجات تنظيف سيارات متوفرة بعبوات تجارية كبيرة.",
  "Standard commercial containers in 20L, 25L, and 20KG drums designed specifically for high-throughput business consumption.":
    "عبوات تجارية قياسية بسعة 20 و25 لتراً ووزن 20 كجم، مصممة لاحتياجات الأعمال ذات الاستهلاك المرتفع.",
  "Formulated for maximum yield per container, enabling cost-effective per-wash economics in both automated and manual washing systems.":
    "تركيبات تحقق مردوداً عالياً من كل عبوة وتدعم خفض تكلفة الغسيل في الأنظمة الآلية واليدوية.",
  "Engineered to protect customer vehicle finishes, ceramic coatings, and delicate interior surfaces while thoroughly lifting grime.":
    "مصممة للعناية بتشطيبات سيارات العملاء والطلاءات الخزفية والأسطح الداخلية الحساسة مع إزالة الأوساخ بفاعلية.",
  "e.g. Apex Wash Studio": "مثال: مركز أبيكس لغسيل السيارات",
  "e.g. Apex Car Wash / Star Detailing": "مثال: مغسلة أبيكس / مركز ستار للعناية",
  "e.g. Alex Rahman": "مثال: أحمد",
  "e.g. +971 50 123 4567": "مثال: ‎+971 50 123 4567",
  "e.g. Dubai / Riyadh / Dammam": "مثال: الرياض / جدة / الدمام",
  "e.g. Dubai / Riyadh / Sharjah": "مثال: الرياض / جدة / الشارقة",
  "e.g. United Arab Emirates": "مثال: المملكة العربية السعودية",
  "e.g. 5–10 containers monthly, sample order, or single bulk pallet":
    "مثال: 5–10 عبوات شهرياً، أو طلب عينة، أو منصة واحدة بالجملة",
  "Specify particular container requirements, delivery location, or specific product inquiries...":
    "حدد متطلبات العبوات أو موقع التوصيل أو استفسارك عن منتج معين...",
  "Tell us which products you need (e.g. Pre-Wash Shampoo, ChemX C2, F55 Wax) and expected container quantities or delivery city...":
    "اذكر المنتجات المطلوبة (مثل شامبو ما قبل الغسيل أو ChemX C2 أو شمع F55) والكميات المتوقعة أو مدينة التوصيل...",
  "procurement@company.com": "procurement@company.com",
  "LifeLines ChemX C2": "LifeLines ChemX C2",
  "First, clean the engines, rims and liners. Dilute 1 litre of the product to 5 litres of water. Spray, leave for a maximum of two minutes, then rinse thoroughly. For interior seats, leather and floors: use appropriate special brushes for tough dirt. For velvet chairs, fabrics and floor mats: dilute 1 litre of product in 10 litres of water.":
    "نظف المحركات والجنوط والبطانات أولاً. خفف لتراً واحداً من المنتج بخمسة لترات من الماء. رش واتركه مدة لا تتجاوز دقيقتين، ثم اشطف جيداً. للمقاعد الجلدية والأرضيات استخدم فرشاً مناسبة للأوساخ الصعبة. وللمقاعد المخملية والأقمشة وحصائر الأرضية، خفف لتراً واحداً من المنتج بعشرة لترات ماء.",
  "Teal Sports Car Coastal View": "سيارة رياضية فيروزية على الساحل",
  "Protected against coastal sea salt, UV, and heat":
    "حماية من أملاح الساحل والأشعة فوق البنفسجية والحرارة",
};

const AR_TO_EN = new Map(Object.entries(EN_TO_AR).map(([english, arabic]) => [arabic, english]));
const STORAGE_KEY = "autoup-language";
const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void } | null>(
  null,
);

export function translateText(text: string, locale: Locale) {
  const normalized = text.replace(/\s+/g, " ").trim();
  const english = AR_TO_EN.get(normalized) ?? normalized;
  return locale === "ar" ? (EN_TO_AR[english] ?? english) : english;
}

function translateDom(locale: Locale) {
  const root = document.body;
  const textStates = new WeakMap<Text, { source: string; translated: string }>();
  const attributeStates = new WeakMap<
    Element,
    Map<string, { source: string; translated: string }>
  >();

  const applyText = (node: Text) => {
    const current = node.nodeValue ?? "";
    if (!current.trim()) return;
    const previous = textStates.get(node);
    const original = previous && current === previous.translated ? previous.source : current;
    const leading = original.match(/^\s*/)?.[0] ?? "";
    const trailing = original.match(/\s*$/)?.[0] ?? "";
    const content = original.trim();
    const translated = translateText(content, locale);
    const next = `${leading}${translated}${trailing}`;
    textStates.set(node, { source: original, translated: next });
    if (current !== next) node.nodeValue = next;
  };

  const applyAttributes = (element: Element) => {
    let states = attributeStates.get(element);
    if (!states) {
      states = new Map();
      attributeStates.set(element, states);
    }
    for (const name of ["aria-label", "placeholder", "title", "alt"]) {
      const current = element.getAttribute(name);
      if (current === null) continue;
      const previous = states.get(name);
      const original = previous && current === previous.translated ? previous.source : current;
      const translated = translateText(original, locale);
      states.set(name, { source: original, translated });
      if (translated !== current) element.setAttribute(name, translated);
    }
  };

  const visit = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (
        !["SCRIPT", "STYLE", "NOSCRIPT"].includes((node.parentElement?.tagName ?? "").toUpperCase())
      ) {
        applyText(node as Text);
      }
      return;
    }
    if (node instanceof Element) applyAttributes(node);
    node.childNodes.forEach(visit);
  };

  visit(root);
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "characterData" && record.target instanceof Text) {
        applyText(record.target);
      } else if (record.type === "attributes" && record.target instanceof Element) {
        applyAttributes(record.target);
      } else {
        record.addedNodes.forEach(visit);
      }
    }
  });
  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["aria-label", "placeholder", "title", "alt"],
  });
  return () => observer.disconnect();
}

export function LocaleProvider({
  children,
  initialLocale = "ar",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setCurrentLocale] = useState<Locale>(initialLocale);

  const setLocale = (next: Locale) => {
    setCurrentLocale(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (error) {
      console.error("Unable to save AutoUp language preference.", error);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") setCurrentLocale(saved);
    } catch (error) {
      console.error("Unable to load AutoUp language preference.", error);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    let timer: number | undefined;
    let stopTranslating: (() => void) | undefined;
    const startTranslation = () => {
      timer = window.setTimeout(() => {
        stopTranslating = translateDom(locale);
      }, 100);
    };

    if (document.readyState === "complete") {
      startTranslation();
    } else {
      window.addEventListener("load", startTranslation, { once: true });
    }

    return () => {
      window.removeEventListener("load", startTranslation);
      if (timer !== undefined) window.clearTimeout(timer);
      stopTranslating?.();
    };
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
