window.lancerStreaming = function(url) {
    const overlay = document.createElement('div');
    overlay.id = "falcon-overlay";
    overlay.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.98);z-index:10000;display:flex;align-items:center;justify-content:flex-start;padding-left:5cm;box-sizing:border-box;font-family:sans-serif;";
    
    // Données fictives : On définit qui apparaît à quel moment (en secondes)
    const castingData = [
        { start: 0, end: 10, name: "Jean Dujardin", role: "Agent Secret", img: "https://via.placeholder.com" },
        { start: 11, end: 30, name: "Léa Seydoux", role: "Contact", img: "https://via.placeholder.com" }
    ];

    overlay.innerHTML = `
        <div style="width:95%; max-width:1300px; display:flex; align-items:center; gap:40px; position:relative;">
            <button id="close-player" style="position:absolute; top:-60px; right:0; background:#40E0D0; border:none; color:black; padding:8px 20px; cursor:pointer; border-radius:30px; font-weight:bold; z-index:10001;">FERMER ✕</button>
            
            <div style="flex: 3; position:relative;">
                <div data-vjs-player>
                    <video id="falcon-video" class="video-js vjs-default-skin" playsinline style="width:100%; min-height:350px; border-radius:12px;"></video>
                </div>

                <!-- L'INNOVATION : Bulle contextuelle "À l'écran" -->
                <div id="actor-insight" style="position:absolute; bottom:60px; left:20px; display:none; background:rgba(0,0,0,0.8); backdrop-filter:blur(5px); border-left:4px solid #40E0D0; padding:10px; border-radius:8px; color:white; align-items:center; gap:12px; transition:0.5s; z-index:10;">
                    <img id="actor-img" src="" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
                    <div>
                        <div id="actor-name" style="font-size:14px; font-weight:bold;"></div>
                        <div id="actor-role" style="font-size:11px; color:#40E0D0;"></div>
                    </div>
                </div>
            </div>

            <!-- Suggestions à droite -->
            <div id="suggestions-aside" style="flex: 1; min-width:280px; color:white;">
                <h3 style="color:#40E0D0; font-size:14px; margin-bottom:20px;">SUGGESTIONS</h3>
                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
                    <p style="font-size:12px; margin:0;">Contenu lié à la catégorie</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        try {
            const player = videojs('falcon-video', {
                autoplay: true,
                controls: true,
                fluid: true,
                sources: [{ src: url, type: 'application/x-mpegURL' }]
            });

            // LOGIQUE DE DÉTECTION (Innovation)
            player.on('timeupdate', function() {
                const currentTime = player.currentTime();
                const actor = castingData.find(a => currentTime >= a.start && currentTime <= a.end);
                const infoDiv = document.getElementById('actor-insight');

                if (actor) {
                    document.getElementById('actor-name').innerText = actor.name;
                    document.getElementById('actor-role').innerText = actor.role;
                    document.getElementById('actor-img').src = actor.img;
                    infoDiv.style.display = 'flex';
                } else {
                    infoDiv.style.display = 'none';
                }
            });

            document.getElementById('close-player').onclick = function() {
                player.dispose();
                overlay.remove();
            };
        } catch (e) { console.error(e); }
    }, 50);
};
