// player-falcon.js
window.lancerStreaming = function(url) {
    // 1. Création de l'interface (Overlay)
    const overlay = document.createElement('div');
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;";
    
    overlay.innerHTML = `
        <div style="width:80%; max-width:960px; position:relative;">
            <button id="close-player" style="position:absolute; top:-40px; right:0; background:#40E0D0; border:none; color:white; padding:8px 15px; cursor:pointer; border-radius:4px; font-weight:bold;">FERMER ✕</button>
            <video id="falcon-video" class="video-js vjs-big-play-centered vjs-theme-city" playsinline></video>
        </div>
    `;

    document.body.appendChild(overlay);

    // 2. Initialisation de Video.js (Moteur HLS)
    const player = videojs('falcon-video', {
        autoplay: true,
        controls: true,
        fluid: true,
        sources: [{ src: url, type: 'application/x-mpegURL' }]
    });

    // 3. Nettoyage automatique
    document.getElementById('close-player').onclick = function() {
        player.dispose(); // Coupe le flux CloudFront (Arrête de payer la bande passante)
        overlay.remove(); // Supprime l'interface
    };
};
