// سكربت إرسال إشعار عبر FCM (HTTP v1 API)
// التشغيل:  node send-notification.js
//
// المتطلبات:
//   1. npm install firebase-admin
//   2. حمّل ملف مفتاح الخدمة من Firebase Console:
//      إعدادات المشروع > حسابات الخدمة > "إنشاء مفتاح خاص" واحفظه باسم service-account-key.json
//      في نفس مجلد هذا الملف.
//   3. ضع Token المستخدم في المتغير TARGET_TOKEN أدناه.
//
// ⚠️ ملاحظة أمنية: لا تشارك ملف service-account-key.json مع أي أحد ولا ترفعه إلى GitHub.

const admin = require('firebase-admin');

const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// ✍️ ضع هنا الـ Token الذي يظهر في Console المتصفح بعد تفعيل التنبيهات
const TARGET_TOKEN = 'PASTE_DEVICE_TOKEN_HERE';

// ✍️ عدّل نص الإشعار هنا
const title = 'Cash Mobile';
const body = 'عرض جديد! خصم 20% اليوم فقط 🎉';
const imageUrl = 'https://imtn.mtnsyr.com:16060/customerCare/static/Application/17497251519929157.png';

// نرسل رسالة notification: يعرضها المتصفح تلقائياً (موثوقية أعلى)،
// والـ Service Worker لا يعرضها مجدداً لمنع التكرار.
const message = {
    notification: {
        title,
        body,
        image: imageUrl
    },
    webpush: {
        notification: {
            title,
            body,
            icon: 'https://cashappsy.github.io/Test/icon-192.png',
            tag: 'cash-mobile',
            renotify: false
        }
    },
    data: {
        click_action: 'https://cashappsy.github.io/Test/'
    },
    token: TARGET_TOKEN
};

admin.messaging()
    .send(message)
    .then((response) => {
        console.log('✅ تم الإرسال بنجاح. معرف الرسالة:', response);
    })
    .catch((error) => {
        console.error('❌ فشل الإرسال:', error);
    });