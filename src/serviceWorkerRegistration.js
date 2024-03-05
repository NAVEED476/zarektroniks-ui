export function register() {
    if ('serviceWorker' in navigator && 'onLine' in navigator && navigator.onLine) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('Service worker registered:', registration);
          })
          .catch(error => {
            console.error('Service worker registration failed:', error);
          });
      });
    } else {
      console.warn('Service worker registration skipped: Browser is offline or does not support service workers.');
    }
  }
  