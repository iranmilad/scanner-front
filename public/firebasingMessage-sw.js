importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')

const firebaseConfig = {
  apiKey: "AIzaSyCUeAzBeT7uEsk5EjrJAlfthZQlZPDXVKI",
  authDomain: "tseshow-996c6.firebaseapp.com",
  projectId: "tseshow-996c6",
  storageBucket: "tseshow-996c6.appspot.com",
  messagingSenderId: "668483339651",
  appId: "1:668483339651:web:b09e115814d98600c922b6"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.openWindow(event.action)
  }
  event.notification.close()
})