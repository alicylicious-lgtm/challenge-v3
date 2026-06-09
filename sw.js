// Flex Challenge Service Worker v1.2
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

// Handle background DATA messages - show exactly ONE notification
messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title || '🔥 Flex Challenge';
  const body = payload.data?.body || '';
  
  self.registration.showNotification(title, {
    body: body,
    icon: '/icon192.png',
    badge: '/icon192.png',
    vibrate: [200, 100, 200],
    data: { chatId: payload.data?.chatId || 'group' },
    tag: 'flex-chat',
    renotify: true
  });
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ action: 'openChat' });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/?openChat=true');
      }
    })
  );
});

const CACHE = 'flex-v2';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
