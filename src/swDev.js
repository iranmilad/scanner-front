// service worker for development mode

export default function swDev(){
  let swURL = `${process.env.PUBLIC_URL}/serviceWorker.js`;
  navigator.serviceWorker.register(swURL).then(res => {
    console.log(`service worker development mode`);
  })
}