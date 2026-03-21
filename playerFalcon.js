window.lancerStreaming = function(url) {
    // 1. Création immédiate de l'interface
    const overlay = document.createElement('div');
    overlay.id = "falcon-overlay";
    // Overlay avec alignement à gauche (5cm) et fond immersif
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 50%, rgba(20,20,20,0.95) 0%, rgba(0,0,0,0.98) 100%);z-index:10000;display:flex;align-items:center;justify-content:flex-start;padding-left:5cm;box-sizing:border-box;font-family:sans-serif;";
    
    overlay.innerHTML = `
        <div style="width:95%; max-width:1300px; display:flex; align-items:center; gap:40px; position:relative;">
            <button id="close-player" style="position:absolute; top:-60px; right:0; background:rgba(64,224,208,0.2); border:1px solid #40E0D0; color:#40E0D0; padding:8px 20px; cursor:pointer; border-radius:30px; font-weight:bold; z-index:10001; transition:0.3s;" onmouseover="this.style.background='#40E0D0';this.style.color='black'">FERMER ✕</button>
            
            <!-- SECTION LECTEUR (Priorité visuelle avec ombre portée) -->
            <div style="flex: 3; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05);">
                <div data-vjs-player>
                    <video id="falcon-video" class="video-js vjs-default-skin" playsinline style="width:100%; min-height:350px;"></video>
                </div>
            </div>

            <!-- SECTION INNOVANTE : Suggestions flottantes (Glassmorphism) -->
            <div id="suggestions-aside" style="flex: 1; display: flex; flex-direction: column; gap:20px; min-width:280px;">
                <h3 style="color:#40E0D0; font-size:14px; letter-spacing:2px; margin:0;">À SUIVRE</h3>
                
                <!-- Carte Suggestion 1 -->
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.1); padding:12px; border-radius:16px; cursor:pointer; transition:0.3s; display:flex; align-items:center; gap:15px;" onmouseover="this.style.transform='translateX(10px)';this.style.background='rgba(255,255,255,0.07)'" onmouseout="this.style.transform='translateX(0)';this.style.background='rgba(255,255,255,0.03)'">
                    <div style="width:70px; height:70px; background:linear-gradient(45deg, #222, #444); border-radius:10px; flex-shrink:0;"></div>
                    <div>
                        <div style="color:white; font-size:13px; font-weight:600; margin-bottom:4px;">Prochain épisode</div>
                        <div style="color:rgba(255,255,255,0.5); font-size:11px;">Saison 2 • Ep. 04</div>
                    </div>
                </div>

                <!-- Badge Social Dynamique -->
                <div style="background:rgba(64,224,208,0.1); border:1px dashed #40E0D0; color:#40E0D0; padding:10px; border-radius:12px; font-size:11px; text-align:center;">
                    ● <b>1,240</b> personnes regardent en ce moment
                </div>

                <!-- Carte Suggestion 2 -->
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.1); padding:12px; border-radius:16px; cursor:pointer; opacity:0.7; transition:0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
                    <div style="color:white; font-size:13px; font-weight:600;">Contenu similaire</div>
                    <div style="color:rgba(255,255,255,0.5); font-size:11px; margin-top:4px;">Basé sur vos préférences</div>
                </div>
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
    }, 50); 
};
