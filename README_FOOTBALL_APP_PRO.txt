FOOTBALL APP - Firebase separado

Versão limpa para publicar em projeto Firebase próprio.

Arquivos principais:
- index.html: landing page simples
- app.html: aplicativo
- script.js: lógica do Football App
- firebase-config.js: cole aqui o SDK Config do Firebase
- firebase.json: Hosting, Functions e Firestore
- firestore.rules: regras do banco
- functions/: backend Firebase Functions

Antes de publicar:
1) Abra firebase-config.js
2) Cole o SDK Config do projeto Firebase correto
3) Confirme que o PowerShell está dentro desta pasta
4) Rode firebase use e confira se está no projeto Football App

Publicação completa:
firebase deploy --only hosting,functions,firestore:rules

Se só quiser corrigir a página:
firebase deploy --only hosting

Links esperados:
/      = landing
/app   = aplicativo
