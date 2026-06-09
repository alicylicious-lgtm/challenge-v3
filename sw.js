// Flex Challenge Service Worker v1.0
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
  self.registration.showNotification(title || '⚡ Flex Challenge', {
    body: body || '',
    icon: icon || '/icon192.png',
    badge: '/icon192.png',
    vibrate: [200, 100, 200],
    data: payload.data
  });
});

// Cache for offline support
const CACHE = 'flex-v1';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
