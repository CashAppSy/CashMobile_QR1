importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// إعدادات مشروع Firebase (نفس القيم الموجودة في index.html)
firebase.initializeApp({
    apiKey: 'AIzaSyDeQqbytuAjm7qQpHwSfeXIUmYuXobeQgg',
    authDomain: 'test-d371d.firebaseapp.com',
    projectId: 'test-d371d',
    storageBucket: 'test-d371d.firebasestorage.app',
    messagingSenderId: '549208423494',
    appId: '1:549208423494:web:f353d8d3555ca146ef1e47',
    measurementId: 'G-CCJYPD8PPY'
});

const messaging = firebase.messaging();

// أيقونة التطبيق الرسمية (تُستخدم دائماً حتى لو لم يُرسل image)
const APP_ICON = './icon-192.png';

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] استقبال إشعار في الخلفية: ', payload);

    // منع الإشعار المكرر: إذا احتوت الرسالة حقل notification
    // فإن المتصفح يعرضها تلقائياً — لذلك لا نعرضها مرة أخرى.
    if (payload.notification) return;

    const d = payload.data || {};

    const notificationOptions = {
        body: d.body || '',
        // الأيقونة الصغيرة دائماً شعار التطبيق، والصورة الكبيرة (image) اختيارية
        icon: d.icon || APP_ICON,
        badge: APP_ICON,
        image: d.image || undefined,
        // tag: يمنع تكديس إشعارات متشابهة فوق بعضها (يستبدل السابق بدل تراكمه)
        tag: d.tag || 'cash-mobile',
        renotify: false,
        requireInteraction: false,
        silent: false,
        data: d
    };

    self.registration.showNotification(d.title || 'Cash Mobile', notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = (event.notification.data && event.notification.data.click_action)
        ? event.notification.data.click_action
        : 'https://devdigitalmtn.github.io/cash_mobile/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
            for (const c of list) {
                if (c.url === url && 'focus' in c) return c.focus();
            }
            return clients.openWindow(url);
        })
    );
});
