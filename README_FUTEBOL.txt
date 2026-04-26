# Football App Pro — versão futebol

Este pacote substitui a versão "Manchette Futebol" e prepara o app para publicação separada do vôlei.

Arquivos principais:
- index.html: landing page comercial
- app.html: app principal do Football App
- firebase-config.js: configurar com os dados do novo projeto Firebase
- script.js: lógica do app
- manifest.json e sw.js: PWA
- firebase.json, firestore.rules e functions/: Firebase Hosting, Firestore e Cloud Functions

Configuração do futebol:
- 12 jogadores por time
- sem posição Coringa
- posições: Goleiro, Zagueiro, Lateral, Volante, Meia e Atacante

Publicação:
firebase deploy --only hosting,functions,firestore:rules

Após publicar:
- Landing: /
- App: /app
- Sala: /app?sala=CODIGO
