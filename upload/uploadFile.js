/**
 * LOGIQUE D'UPLOAD DIRECT (Frontend -> S3)
 * Ce code s'arrête une fois que le fichier est stocké sur AWS.
 */
async function UploadFile(file) {
    // URL de ton API Gateway qui génère la signature
    const API_ENDPOINT = "https://f8jstiv8yl.execute-api.us-east-1.amazonaws.com";

    try {
        // //---------------------------------------------------------
        // // ÉTAPE 1 : RÉCUPÉRATION DE L'AUTORISATION (TICKET S3)
        // // On demande au backend une URL signée pour ce fichier précis.
        // //---------------------------------------------------------
        const authResponse = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type
            })
        });

        if (!authResponse.ok) throw new Error("Accès refusé par l'API.");
        
        // On extrait l'URL magique générée par AWS
        const { uploadUrl } = await authResponse.json();
        


        // //---------------------------------------------------------
        // // ÉTAPE 2 : PRÉPARATION DU TRANSFERT BINAIRE
        // // On utilise XMLHttpRequest pour gérer le flux de données.
        // //---------------------------------------------------------
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        
        // Le header doit être identique à la signature pour des raisons de sécurité
        xhr.setRequestHeader('Content-Type', file.type);


        // //---------------------------------------------------------
        // // ÉTAPE 3 : GESTION DE L'INTERFACE (PROGRESSION)
        // // On met à jour la barre de progression pendant l'envoi.
        // //---------------------------------------------------------
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                
                // Mise à jour visuelle (si l'ID existe dans ton HTML)
                const bar = document.getElementById('progressBar');
                if (bar) bar.style.width = percent + '%';
                
                console.log(`Envoi en cours : ${percent}%`);
            }
        };


        // //---------------------------------------------------------
        // // ÉTAPE 4 : CONFIRMATION DE RÉCEPTION
        // // Le moment où S3 confirme que le fichier est bien arrivé.
        // //---------------------------------------------------------
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log("Fichier stocké avec succès sur S3.");
                alert("L'upload est terminé !");
            } else {
                console.error("Échec du stockage sur S3 :", xhr.statusText);
            }
        };


        // //---------------------------------------------------------
        // // ÉTAPE 5 : LANCEMENT DU TRANSFERT
        // // On pousse réellement les octets vers le Cloud.
        // //---------------------------------------------------------
        xhr.send(file);

    } catch (error) {
        console.error("Erreur lors de l'upload :", error.message);
    }
}

