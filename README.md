# Messaging App - Architecture and Microservices Training

### Project Overview

The goal is to develop a messaging application to explore and deepen knowledge in service-oriented architecture,
asynchronous communication, and modern backend and DevOps practices. This project uses microservices to create a modular
and scalable application where each service operates independently and communicates via gRPC and RabbitMQ.
Infrastructure management is handled with Kubernetes for container orchestration and Terraform for cloud infrastructure
provisioning and management.

### Main Features

* User Authentication: Basic login and authentication service for users.
* Messaging Service: A microservice dedicated to sending, receiving, and storing messages.
* Notification Service: Manages notifications for received messages and user activity.
* API Gateway: A single entry point for all client requests, redirecting them to the correct microservice.
* gRPC Communication: Inter-service communication for faster and more efficient interactions.
* RabbitMQ for Messaging: Event-driven architecture using RabbitMQ as a message broker to handle asynchronous tasks.
* Infrastructure Management: Use of Kubernetes for container orchestration and Terraform for infrastructure
  provisioning.

### Technical Stack

| Tool           | Usage                                                 |
|----------------|-------------------------------------------------------|
| **Node.js**    | Backend server for each microservice                  |
| **Express**    | Framework to build REST APIs                          |
| **gRPC**       | Communication between services                        |
| **RabbitMQ**   | Message broker for asynchronous tasks                 |
| **Docker**     | Containerization of services                          |
| **Kubernetes** | Container orchestration for deployment and management |
| **Terraform**  | Cloud infrastructure provisioning                     |
| **PostgreSQL** | Database for user data                                |

