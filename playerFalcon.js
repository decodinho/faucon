window.lancerStreaming = function(url) {
    // 1. TECHNIQUE DE SECOURS : Si videojs manque, on l'injecte de force
    if (typeof videojs === 'undefined') {
        console.warn("Video.js manquant. Injection automatique en cours...");
        
        // On injecte le CSS
        if (!document.getElementById('vjs-css')) {
            const link = document.createElement('link');
            link.id = 'vjs-css';
            link.rel = 'stylesheet';
            link.href = 'https://vjs.zencdn.net';
            document.head.appendChild(link);
        }

        // On injecte le JS
        const script = document.createElement('script');
        script.src = 'https://vjs.zencdn.net';
        script.onload = () => {
            console.log("Video.js chargé avec succès ! Lancement du flux...");
            window.lancerStreaming(url); // On relance une fois chargé
        };
        document.head.appendChild(script);
        return;
    }

    // 2. CRÉATION DE L'INTERFACE (Ton code corrigé)
    const overlay = document.createElement('div');
    overlay.id = "falcon-overlay";
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;";
    
    overlay.innerHTML = `
        <div style="width:90%; max-width:960px; position:relative;">
            <button id="close-player" style="position:absolute; top:-45px; right:0; background:#40E0D0; border:none; color:white; padding:8px 15px; cursor:pointer; border-radius:4px; font-weight:bold; z-index:10000;">FERMER ✕</button>
            <div data-vjs-player>
                <video id="falcon-video" class="video-js vjs-default-skin vjs-big-play-centered" playsinline style="width:100%;"></video>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // 3. INITIALISATION DU LECTEUR
    const player = videojs('falcon-video', {
        autoplay: true,
        controls: true,
        fluid: true,
        responsive: true,
        sources: [{ src: url, type: 'application/x-mpegURL' }]
    });

    // 4. FERMETURE ET NETTOYAGE
    document.getElementById('close-player').onclick = function() {
        player.dispose(); // Détruit le player proprement
        overlay.remove(); // Enlève le fond noir
    };
};
