// Flex Challenge Service Worker v1.1
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

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🔥 Flex Challenge', {
    body: body || '',
    icon: icon || '/icon192.png',
    badge: '/icon192.png',
    vibrate: [200, 100, 200],
    data: { url: '/', chatId: payload.data?.chatId || 'group' },
    tag: 'flex-chat'
  });
});

// Handle notification click - open app and navigate to chat
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ action: 'openChat' });
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow('/?openChat=true');
      }
    })
  );
});

// Cache for offline support
const CACHE = 'flex-v1';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
