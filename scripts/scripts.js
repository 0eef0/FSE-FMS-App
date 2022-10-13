// sample code for moving dot
setInterval(() => {
    document.getElementById("d1").style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
    document.getElementById("d1").style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
}, 5000);