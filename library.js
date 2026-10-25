/* =========================================================================
   سجاد ثامر — الملف الرئيسي للمكتبة  (library.js)
   =========================================================================
   هذا هو المكان الوحيد اللي تعدّل عليه حتى تضيف كتاب جديد
   أو تغيّر روابط التواصل.

   لإضافة كتاب:
     ١) انسخ أي ملف موجود داخل مجلد  books/  وسمِّه باسم جديد
        (مثال:  books/my-book.js)
     ٢) افتح الملف وعدّل بياناته (الاسم، الكاتب، الحلقات...)
     ٣) زيد اسم الملف هنا بالقائمة تحت  BOOK_FILES  بسطر واحد فقط.

   خلص! التطبيق راح يحمّل الكتاب تلقائيًا للمستخدمين.
   ========================================================================= */

window.SAJJAD = window.SAJJAD || { books: [] };

/* دالة التسجيل — كل ملف كتاب ينادي SAJJAD.register(...) حتى يضيف نفسه */
window.SAJJAD.register = function (book) {
  window.SAJJAD.books.push(book);
};

/* -------------------------------------------------------------------------
   قائمة ملفات الكتب — رتّبها بالترتيب اللي تحب يظهر بيه بالمكتبة.
   ------------------------------------------------------------------------- */
window.SAJJAD.BOOK_FILES = [
  'books/book-02.js',
  // 'books/my-new-book.js',   ← أضف كتبك الجديدة هنا
];

/* -------------------------------------------------------------------------
   روابط التواصل مع الكاتب (تظهر في صفحة الإعدادات).
   حط الرابط الكامل بين العلامتين '' — واترك '' فارغ للزر اللي ما تريده
   يشتغل بعد (راح يظهر للمستخدم "الرابط غير مضاف بعد").

   أمثلة:
     whatsapp : 'https://wa.me/9647XXXXXXXXX'      (الرقم بصيغة دولية بدون + أو أصفار)
     telegram : 'https://t.me/username'
     instagram: 'https://instagram.com/username'
     tiktok   : 'https://tiktok.com/@username'
     snapchat : 'https://snapchat.com/add/username'
     facebook : 'https://facebook.com/username'
   ------------------------------------------------------------------------- */
window.SAJJAD.contacts = {
  whatsapp: 'https://wa.me/905511980947',
  tiktok: 'https://tiktok.com/@sajad.author0',
  instagram: 'https://instagram.com/sajad.author',
  snapchat: 'https://snapchat.com/add/sd.kgx1',
  facebook: 'https://www.facebook.com/share/1JCVPFMFHr/',
  telegram: 'https://t.me/@MrBlueeYT',
};

/* -------------------------------------------------------------------------
   مُحمّل الكتب — لا تعدّله. يحمّل كل الملفات أعلاه ثم يشغّل التطبيق.
   ------------------------------------------------------------------------- */
window.SAJJAD.load = function () {
  return new Promise(resolve => {
    const files = window.SAJJAD.BOOK_FILES || [];
    let remaining = files.length;
    if (!remaining) return resolve(window.SAJJAD.books);
    files.forEach(src => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = s.onerror = () => { if (--remaining === 0) resolve(window.SAJJAD.books); };
      document.head.appendChild(s);
    });
  });
};
