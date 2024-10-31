# Messaging App - Architecture and Microservices Training

### Vue d'ensemble du projet

L'objectif est de développer une application de messagerie pour explorer et approfondir les connaissances en architecture orientée services, en communication asynchrone, et en pratiques modernes de backend et de DevOps. Ce projet utilise des microservices pour créer une application modulaire et scalable où chaque service fonctionne de manière indépendante et communique via gRPC et RabbitMQ. La gestion de l'infrastructure est assurée avec Kubernetes pour l'orchestration des conteneurs et Terraform pour le provisioning et la gestion de l'infrastructure cloud.

### Fonctionnalités principales

* Authentification d'utilisateurs : Service de connexion et d'authentification de base pour les utilisateurs.
* Service de messagerie : Un microservice dédié à l'envoi, la réception, et le stockage des messages.
* Service de notifications : Gère les notifications pour les messages reçus et l'activité des utilisateurs.
* API Gateway : Un point d'entrée unique pour toutes les requêtes clients, les redirigeant vers le bon microservice.
* Communication gRPC : Communication inter-service pour des interactions plus rapides et plus efficaces.
* RabbitMQ pour la messagerie : Architecture orientée événements utilisant RabbitMQ comme message broker pour gérer les tâches asynchrones.
* Gestion d'infrastructure : Utilisation de Kubernetes pour l'orchestration de conteneurs et de Terraform pour le provisioning de l'infrastructure.

### Stack technique

| Outil          | Utilisation                                   |
|----------------|----------------------------------------------|
| **Node.js**    | Serveur backend pour chaque microservice     |
| **Express**    | Framework pour construire des API REST       |
| **gRPC**       | Communication entre services                 |
| **RabbitMQ**   | Message broker pour les tâches asynchrones   |
| **Docker**     | Conteneurisation des services                |
| **Kubernetes** | Orchestration des conteneurs pour le déploiement et la gestion  |
| **Terraform**  | Provisioning de l'infrastructure cloud  |
| **PostgreSQL** | Base de données pour les données utilisateur |


L'application suit une architecture de microservices. Chaque microservice a un rôle distinct et peut être développé, déployé, et mis à l'échelle de manière indépendante. Cette architecture aide également à gérer des tâches complexes, comme la messagerie en temps réel, en répartissant la charge sur plusieurs services.
Démarrage
Prérequis

* Docker et Docker Compose
* Node.js et npm
* Librairies gRPC pour Node.js
* Serveur RabbitMQ (ou RabbitMQ dockerisé)

### Installation

Clonez le dépôt.
```
git clone https://github.com/Quentin-Piot/messaging-microservices-grpc-ddd
cd messaging-microservices-grpc-ddd
```

Lancez les services avec Docker Compose.

```
docker-compose up
```

Configurez les fichiers .env dans chaque répertoire de microservice avec les variables d'environnement correspondantes.

Lancez chaque microservice :

```
npm install
npm start
```

