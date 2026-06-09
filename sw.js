// Flex Challenge Service Worker v1.3
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA5-KCa7NwlMYnWjYjF3phc6BOTH6v1iTU",
  authDomain: "challenge-v3.firebaseapp.com",
  projectId: "challenge-v3",
  storageBucket: "challenge-v3.firebasestorage.app",
  messagingSenderId: "596884638595",
  appId: "1:596884638595:web:3ccd38a2fb72f5b41744b6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title || '🔥 Flex Challenge';
  const body = payload.data?.body || '';
  const chatId = payload.data?.chatId || 'group';
  
  self.registration.showNotification(title, {
    body: body,
    icon: '/icon192.png',
    badge: '/icon192.png',
    vibrate: [200, 100, 200],
    data: { chatId: chatId },
    tag: 'flex-chat-' + chatId,
    renotify: true
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const chatId = event.notification.data?.chatId || 'group';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ action: 'openChat', chatId: chatId });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/?openChat=' + encodeURIComponent(chatId));
      }
    })
  );
});

const CACHE = 'flex-v3';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
