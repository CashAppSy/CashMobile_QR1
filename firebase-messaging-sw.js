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

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] استقبال إشعار في الخلفية: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
        badge: payload.notification.image,
        data: payload.data || {}
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data && event.notification.data.click_action
        ? event.notification.data.click_action
        : 'https://devdigitalmtn.github.io/cash_mobile/';
    event.waitUntil(clients.openWindow(url));
});