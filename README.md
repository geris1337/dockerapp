# Dockerized weather app

This app will fetch temperature data from climacell.co and display temperature.

### Launching the container

Run these commands to launch the app, we assume you already have docker.

Let's clone the repository
```
git clone https://github.com/geris1337/dockerapp.git
cd dockerapp
docker build -t dockerapp .
docker run -it -d -p 8080:3000 dockerapp
```
## Built With

* [Node.js](https://nodejs.org/) - Backend
* [Chart.js](https://www.chartjs.org/) - Frontend
* [Express.js](https://expressjs.com/ - Framework
* [Moment.js](https://momentjs.com/) - For date manipulation
