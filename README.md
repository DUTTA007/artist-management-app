This repo is created to develop Web appliation of Team 5 - Musicians management Application - ArtistsBuzz. Software Architecture Development (Jan- Feb, 2022), SRH Hochschule, Heidelberg.

##Standards

Naming a feature branch -> Initials_Featurename_Featurenumber (TD_Button_1)
Commit message -> Using Semantic commits:
feat: add hat wobble | | | +-> Summary in present tense. +-------> Type: chore, docs, feat, fix, refactor, style, or test.

##Instructions to run the code

###To run backed:

cd backend npm run start

###To run frontend:

cd frontend npm run start

###To run S3 service

cd s3-upload-service npm run start

###Containerize and run the application

docker compose up -d

####Note: .env files are required to run this application. You can find the files here : https://srhk-my.sharepoint.com/:f:/g/personal/11026697_stud_hochschule-heidelberg_de/Euyq0vrKR2ZCs8OI4OZumckBeoGAFX1n8S-UdlbrfvL9nA?e=KONC7O

Docker file - https://hub.docker.com/repository/docker/9988774/sad_2023_team_5/general
