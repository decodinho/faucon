window.lancerStreaming = function(url) {
    // 1. Ajout des dépendances (CSS et JS pour la résolution) dans le <head> si absentes
    if (!document.getElementById('vjs-quality-script')) {
        const qualityLevels = document.createElement('script');
        qualityLevels.src = "https://unpkg.com";
        document.head.appendChild(qualityLevels);

        const qualitySelector = document.createElement('script');
        qualitySelector.id = 'vjs-quality-script';
        qualitySelector.src = "https://unpkg.com";
        document.head.appendChild(qualitySelector);
        
        const qualityCSS = document.createElement('link');
        qualityCSS.rel = "stylesheet";
        qualityCSS.href = "https://unpkg.com";
        document.head.appendChild(qualityCSS);
    }

    // 2. Création de l'interface (Inchangée selon vos besoins)
    const overlay = document.createElement('div');
    overlay.id = "falcon-overlay";
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.98);z-index:10000;display:flex;align-items:center;justify-content:flex-start;padding-left:5cm;box-sizing:border-box;font-family:sans-serif;";
    
    overlay.innerHTML = `
        <div style="width:95%; max-width:1300px; display:flex; align-items:center; gap:40px; position:relative;">
            <button id="close-player" style="position:absolute; top:-60px; right:0; background:#40E0D0; border:none; color:black; padding:8px 20px; cursor:pointer; border-radius:30px; font-weight:bold; z-index:10001;">FERMER ✕</button>
            <div style="flex: 3;">
                <div data-vjs-player>
                    <video id="falcon-video" class="video-js vjs-default-skin" playsinline style="width:100%; min-height:350px; border-radius:12px;"></video>
                </div>
            </div>
            <div id="suggestions-aside" style="flex: 1; min-width:280px; color:white;">
                <h3 style="color:#40E0D0; font-size:14px; margin-bottom:20px;">SUGGESTIONS</h3>
                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                    <p style="font-size:12px; margin:0;">Qualité adaptative activée</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // 3. Initialisation avec le sélecteur de qualité
    setTimeout(() => {
        try {
            const player = videojs('falcon-video', {
                autoplay: true,
                controls: true,
                fluid: true,
                sources: [{ src: url, type: 'application/x-mpegURL' }]
            });

            // Activation du bouton de résolution dès que le lecteur est prêt
            player.ready(function() {
                if (typeof player.hlsQualitySelector === 'function') {
                    player.hlsQualitySelector({
                        displayCurrentQuality: true // Affiche la résolution actuelle (ex: 720p)
                    });
                }
            });

            document.getElementById('close-player').onclick = function() {
                player.dispose();
                overlay.remove();
            };
        } catch (e) { console.error("Erreur résolution :", e); }
    }, 150); // Délai légèrement augmenté pour laisser les scripts de plug-in charger
};
