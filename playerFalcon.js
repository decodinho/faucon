window.lancerStreaming = function(url) {
    // 1. Création immédiate de l'interface
    const overlay = document.createElement('div');
    overlay.id = "falcon-overlay";
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.97);z-index:10000;display:flex;align-items:center;justify-content:center;flex-direction:column;";
    
    overlay.innerHTML = `
        <div style="width:90%; max-width:960px; position:relative;">
            <button id="close-player" style="position:absolute; top:-45px; right:0; background:#40E0D0; border:none; color:white; padding:10px 20px; cursor:pointer; border-radius:4px; font-weight:bold; z-index:10001;">FERMER ✕</button>
            <div data-vjs-player>
                <video id="falcon-video" class="video-js vjs-default-skin vjs-big-play-centered" playsinline style="width:100%; min-height:300px;"></video>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // 2. Initialisation Différée (Crucial pour que l'ID soit trouvé)
    setTimeout(() => {
        try {
            const player = videojs('falcon-video', {
                autoplay: true,
                controls: true,
                fluid: true,
                responsive: true,
                sources: [{ src: url, type: 'application/x-mpegURL' }]
            });

            // 3. Gestion de la fermeture
            document.getElementById('close-player').onclick = function() {
                player.dispose(); // Supprime le player proprement
                overlay.remove(); // Enlève l'overlay
            };
        } catch (e) {
            console.error("Erreur d'initialisation Video.js :", e);
        }
    }, 50); // Un délai de 50ms suffit pour "peindre" le DOM
};
