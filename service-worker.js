self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return new Response('This app requires an internet connection to function.');
      })
  );
});