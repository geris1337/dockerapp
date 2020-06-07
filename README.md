# Dockerized weather app

This app will fetch temperature data from climacell.co and display a graph.

## Launching the container

Run these commands to start the container, we assume you already have docker installed.

```
git clone https://github.com/geris1337/dockerapp.git
cd dockerapp
docker build -t dockerapp .
docker run -it -d -p 8080:3000 dockerapp
```
The app should be available via URL on port 8080

```
http://localhost:8080
```
## Built with

* [Node.js](https://nodejs.org/) - Backend
* [Chart.js](https://www.chartjs.org/) - Frontend
* [Express.js](https://expressjs.com/) - Framework
* [NeDB](https://github.com/louischatriot/nedb) - Database
* [Moment.js](https://momentjs.com/) - Date manipulation
