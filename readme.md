Dans cet api de gestion d'utilisateur vous pouvez excécuter des opération CRUD (Donc update, read, delete, et create).
Afin que le projet fonctionne correctement vous devez : installer mongo db, obtenir le string de connexion et rendez-vous au fichier
.env, toute première ligne et collerez vôtre lien de connexion à la base. 


Cette Api prend également en charge la pagination, la recherche, la rate limiting, la validation des données , les tests unitaires sont compris dans cette api.

Recherche, pagination, rate limiting , Opérations CRUD se trouvent ici : controllers/userController.js

la connexion à la base de données : .env

Afin de lancer l'api vous devez entrer la commande suivante : node app.js

