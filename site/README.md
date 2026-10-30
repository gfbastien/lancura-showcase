# Site vitrine L'Ancura

Site statique (HTML/CSS/JS, aucune étape de build), indépendant de la webapp.

| Fichier | Rôle |
|---|---|
| `index.html` | Landing page (FR) |
| `en/index.html` | Landing page (EN) — tarifs et mentions légales restent en FR |
| `tarifs.html` | Offres particuliers / professionnels |
| `mentions-legales.html` | Mentions légales + RGPD (champs `[À COMPLÉTER]` en surbrillance) |
| `styles.css`, `main.js` | Styles et interactions partagés |

## Aperçu local

```bash
python3 -m http.server -d site 8000   # puis http://localhost:8000
```

## Déploiement (Cloudflare Pages, gratuit)

1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → `gfbastien/lancura-showcase`.
2. Framework preset : **None** · Build command : *(vide)* · Build output directory : **`site`**.
3. Custom domains → ajouter le domaine (ex. `lancura.fr`) une fois acheté.
4. Optionnel : Web Analytics (sans cookie) dans l'onglet du projet.

## Liste d'attente

1. Créer un formulaire sur tally.so avec les champs `email`, et les champs cachés `plan`, `profil` et `langue`.
2. Coller son lien de partage dans `WAITLIST_URL` en tête de `main.js`.

Chaque bouton envoie le plan cliqué (`data-waitlist="..."`) : on mesure quelle offre attire le plus, avant même d'avoir fixé les prix.
