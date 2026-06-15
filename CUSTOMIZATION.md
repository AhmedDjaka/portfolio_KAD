# 🎨 GUIDE DE PERSONNALISATION

Ce guide vous aide à personnaliser votre portfolio selon vos préférences et besoins.

## 📝 Édition du Contenu

### Informations Personnelles
Dans `index.html`, trouvez et modifiez:

```html
<!-- Ligne ~60 -->
<p>+225 07 883 869 67</p>  <!-- Votre téléphone -->
<span>ahmedkone.djaka@gmail.com</span>  <!-- Votre email -->
<span>Cocody, Riviera-2</span>  <!-- Votre lieu -->

<!-- Pied de page -->
<a href="tel:+22507883869467">+225 07 883 869 67</a>
<a href="mailto:ahmedkone.djaka@gmail.com">ahmedkone.djaka@gmail.com</a>
```

### À Propos
```html
<!-- Ligne ~145 -->
<p>Je suis <strong>KONE Ahmed Djakaridja</strong>, ...</p>
<!-- Modifiez votre description -->
```

### Projets
```html
<!-- Ligne ~370 -->
<h3>Babibazaar - Plateforme E-Commerce</h3>
<p>Plateforme e-commerce complète...</p>
<a href="https://babibazaar.com" target="_blank">
    Voir le projet
</a>
```

### Expérience
```html
<!-- Ligne ~630 -->
<div class="timeline-date">Août 2025 - Aujourd'hui</div>
<h3>Consultant Informatique</h3>
<p class="company">SETELCI - Angré Nouveau CHU, Abidjan</p>
```

### Réseaux Sociaux
```html
<!-- Ligne ~740 -->
<div class="social-links">
    <a href="https://linkedin.com/in/votreusername" title="LinkedIn">
        <i class="fab fa-linkedin"></i>
    </a>
    <a href="https://github.com/votreusername" title="GitHub">
        <i class="fab fa-github"></i>
    </a>
</div>
```

---

## 🎨 Personnalisation des Couleurs

### Variables CSS Principales
Dans `styles.css`, modifiez `:root`:

```css
:root {
    --primary: #00d4ff;        /* Cyan - couleur principale */
    --primary-dark: #0099cc;   /* Cyan foncé */
    --secondary: #ff006e;      /* Rose */
    --accent: #8338ec;         /* Violet */
    --dark: #0a0e27;           /* Fond foncé */
    --darker: #050810;         /* Fond très foncé */
    --light: #f0f3f8;          /* Texte clair */
    --gray: #6c757d;           /* Gris */
}
```

### Exemples de Palettes Alternatives

**Palette Bleu (Professionnel):**
```css
--primary: #0066cc;
--secondary: #00ccff;
--accent: #6600ff;
```

**Palette Orange/Amber (Chaud):**
```css
--primary: #ff9500;
--secondary: #ff6b35;
--accent: #f7931e;
```

**Palette Verde (Nature):**
```css
--primary: #00d95f;
--secondary: #00a854;
--accent: #52c41a;
```

**Palette Rose/Magenta (Moderne):**
```css
--primary: #ff1493;
--secondary: #ff69b4;
--accent: #c71585;
```

---

## 🖼️ Ajout d'Images

### Images de Projet
1. Créez un dossier `assets/images/`
2. Ajoutez vos images (PNG, JPG, WebP)
3. Remplacez le contenu de `.image-placeholder`:

```html
<!-- Avant -->
<div class="image-placeholder">
    <i class="fas fa-shopping-cart"></i>
</div>

<!-- Après -->
<img src="assets/images/babibazaar.jpg" alt="Babibazaar">
```

### Photo de Profil
Ajoutez une photo dans la section "À Propos":

```html
<div class="about-text">
    <img src="assets/images/profile.jpg" alt="Photo de profil" 
         style="width: 200px; height: 200px; border-radius: 50%; 
                 margin-bottom: 2rem; border: 3px solid var(--primary);">
</div>
```

---

## 🔤 Typographie

### Police Personnalisée
Modifiez dans `styles.css`:

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Changez par: */
    font-family: 'Poppins', 'Roboto', sans-serif;
}
```

### Ajout de Google Fonts
Dans `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

Puis dans `styles.css`:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

---

## 📊 Modification des Statistiques

Dans la section "À Propos", mettez à jour:

```html
<div class="stat-card">
    <div class="stat-number">5+</div>  <!-- Changez le nombre -->
    <p>Ans d'Expérience</p>
</div>
```

---

## 🎯 Ajout de Nouvelles Sections

### Exemple: Section Blog
```html
<!-- Ajoutez avant le contact -->
<section id="blog" class="blog">
    <div class="container">
        <h2 class="section-title">Derniers Articles</h2>
        <div class="blog-grid">
            <article class="blog-card">
                <h3>Titre de l'article</h3>
                <p class="blog-date">14 Juin 2025</p>
                <p>Résumé de l'article...</p>
                <a href="#" class="btn btn-secondary">Lire plus</a>
            </article>
        </div>
    </div>
</section>
```

Ajoutez le CSS:
```css
.blog {
    padding: 6rem 0;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.blog-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 2rem;
    transition: var(--transition);
}

.blog-card:hover {
    transform: translateY(-10px);
}

.blog-date {
    color: var(--primary);
    font-size: 0.9rem;
    margin: 1rem 0;
}
```

---

## ⚙️ Configuration Avancée

### Désactiver/Activer Animations
Dans `styles.css`, utilisez:
```css
/* Pour désactiver les animations */
* {
    animation: none !important;
    transition: none !important;
}

/* Pour ralentir les animations */
:root {
    --transition: all 0.6s ease-out;
}
```

### Mode Clair
Modifiez les variables CSS:
```css
:root {
    --dark: #f5f5f5;
    --darker: #ffffff;
    --gray: #333333;
    --light: #0a0e27;
    --white: #000000;
}
```

### Effet Sombre/Clair Toggle
```javascript
// Dans script.js
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', 
        document.body.classList.contains('dark-mode'));
};

// Au chargement
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
```

---

## 📱 Test Responsive

### DevTools Chrome:
1. Appuyez sur `F12`
2. Cliquez sur l'icône "Mobile" (Ctrl+Shift+M)
3. Testez à différentes tailles

### Dimensions à Tester:
- **Mobile**: 375px, 425px, 768px
- **Tablette**: 768px, 1024px
- **Desktop**: 1200px, 1920px

---

## 🔍 Optimisations SEO

### Meta Tags
Dans `index.html` `<head>`:

```html
<meta name="description" content="Portfolio de KONE Ahmed Djakaridja - Développeur Full-Stack">
<meta name="keywords" content="développeur, full-stack, portfolio, web">
<meta name="author" content="KONE Ahmed Djakaridja">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph -->
<meta property="og:title" content="Portfolio - KONE Ahmed Djakaridja">
<meta property="og:description" content="Développeur Full-Stack...">
<meta property="og:image" content="assets/images/og-image.jpg">
<meta property="og:url" content="https://votre-domaine.com">
```

---

## 🔐 Sécurité

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'">
```

### Protéger l'Email
```html
<!-- Au lieu de: ahmedkone@gmail.com -->
<!-- Utilisez: -->
<a href="javascript:void(0)" 
   onclick="this.href='mailto:' + ['ahmed','@','gmail','.com'].join('')">
   Contactez-moi
</a>
```

---

## 📚 Ressources Utiles

### Outils:
- **Couleurs**: https://coolors.co
- **Fonts**: https://fonts.google.com
- **Icons**: https://fontawesome.com
- **Animations**: https://animate.style
- **Images**: https://unsplash.com

### Tutoriels:
- CSS Grid: https://css-tricks.com/snippets/css/complete-guide-grid/
- Flexbox: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Animation: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations

---

## 🚀 Prochaines Étapes

1. ✅ Modifiez le contenu
2. ✅ Personnalisez les couleurs
3. ✅ Ajoutez vos images
4. ✅ Testez responsive
5. ✅ Déployez en ligne
6. ✅ Partagez votre portfolio!

---

**Amusez-vous à personnaliser votre portfolio! 🎨**
