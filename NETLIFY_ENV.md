Guide de configuration des variables d'environnement pour Netlify (Production)

But
- Permettre à la fonction serverless `netlify/functions/sendEmail.js` d'envoyer les e-mails via SMTP.

Variables d'environnement nécessaires
- `SMTP_USER` : adresse e-mail utilisée comme compte d'envoi (ex: ahmedkone.djaka@gmail.com)
- `SMTP_PASS` : mot de passe d'application (Gmail) ou mot de passe SMTP
- `RECIPIENT_EMAIL` : adresse qui recevra les messages (par défaut égale à `SMTP_USER`)
- `SMTP_HOST` (optionnel) : hôte SMTP (par défaut `smtp.gmail.com`)
- `SMTP_PORT` (optionnel) : port SMTP (par défaut `465`)

Remarques importantes pour Gmail
1. Activez la verification en deux étapes pour votre compte Google.
2. Créez un mot de passe d'application (Catégorie: Mail) et utilisez-le comme `SMTP_PASS`.
3. N'utilisez pas votre mot de passe principal Google.

Configurer les variables dans l'interface Netlify (Production)
1. Ouvrez votre site sur Netlify et allez dans "Site settings" → "Build & deploy" → "Environment" → "Environment variables".
2. Ajoutez une ligne pour chaque variable (Key / Value) :
   - Key: `SMTP_USER`  Value: `ahmedkone.djaka@gmail.com`
   - Key: `SMTP_PASS`  Value: `<mot_de_passe_d_application>`
   - Key: `RECIPIENT_EMAIL` Value: `ahmedkone.djaka@gmail.com`
   - (optionnel) Key: `SMTP_HOST` Value: `smtp.gmail.com`
   - (optionnel) Key: `SMTP_PORT` Value: `465`
3. Sauvegardez. Netlify redéploiera votre site automatiquement lors du prochain push.

Tester localement (Netlify Dev)
- Créez un fichier `.env` à la racine (ne pas committer) contenant :

```powershell
SMTP_USER=ahmedkone.djaka@gmail.com
SMTP_PASS=VOTRE_MOT_DE_PASSE_D_APPLICATION
RECIPIENT_EMAIL=ahmedkone.djaka@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
```

- Installer les dépendances :

```bash
npm install
```

- Démarrer Netlify Dev :

```bash
npx netlify-cli dev
```

- Netlify Dev va exposer vos fonctions sur `/.netlify/functions/<nom>` et votre site localement. Ouvrez le site local puis testez le formulaire de contact.

Dépannage
- Erreur SMTP : vérifiez `SMTP_USER`/`SMTP_PASS`, activez le mot de passe d'application.
- `netlify.toml` : assurez-vous que le fichier est valide TOML (pas de clés dupliquées)
- Logs Netlify Dev : consultez la sortie terminal pour voir les erreurs des fonctions.

Sécurité
- Ne commitez jamais `SMTP_PASS` ni `.env`. Utilisez les variables de Netlify en production.
- Restreignez l'accès au compte email et surveillez l'activité.

Support
- Si vous voulez, je peux :
  - relancer `npx netlify-cli dev` et vérifier que tout fonctionne localement (j'attends confirmation pour exécuter),
  - ou préparer un script de test pour envoyer un message fictif via la fonction.
