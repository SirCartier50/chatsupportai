# Next.js and Django Web App

## Frontend (Next.js)
 
### Tools
I used **material-ui** and **canvasjs** to provide UI and the charts for the dashboard

Dependencies I installed using npm:
```bash
@canvasjs/react-charts
canvasjs
@mui/material
@emotion/react
@emotion/styled
@mui/x-charts
```

### Setup
To setup the frontend server first need to have **node.js** installed to provide the javascript runtime environment. 

First run:
```bash
npx create-next-app@latest
```

To create the next.js app and use the default options when asked. The frontend files are in a zip I provided called **front.zip**. It contains the src code in the app folder which you grab and replace the app folder generated from creating the next app.

For the dependencies just run a package manager like **npm** and install all the dependencies above.

To start the server run:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Make sure that both frontend and backend server's are live or this won't work properly**

### Summary
When making this I wanted first ensure that the api handler worked so I first setup a button component from MUI that ran a function which did a fetch call to the api handler using a GET method. It expected a promise and prepared the incoming json response of chart data to be console logged to see if it worked. In the api handler, I made a GET route that fetches the Django server for the chart data and but it all in a json response. I then started designing the UI of the dasboard and I wanted to go for a big grey box that had word Dashboard above it and display the charts on the grey box. I started with using some components from the MUI framework and had a couple of issues. At first I wanted to do SSG but found out that my app wouldn't support it so instead I went with a button that when clicked displayed the charts on the box. Another issue I had was that the states that held the chart data would appear as undefined which caused issues with the server at start so I added some constraints to solve this. MUI only provided components for the bar, line, and pie charts so I had to use canvasjs to get the candlestick chart by making a custom component and importing it into the main js file. I then add the information from the states into the components to display it properly on the charts. They all have cool interactive functions, for example, the pie charts can zoom in a bit to a portion when hovering.

## Backend (Django)

### Tools
I used **Django cors** since the server wouldn't allow a connection from my frontend. I also used **Django rest framework** to provide smooth api routing.

Dependencies I installed using pip:
```bash
django-cors-headers
django 
djangorestframework markdown django-filter
```

### Setup
Luckly I compressed the whole server into a zip file called **back.zip** so just extract the files, but first make sure **python** and **pip** is installed. Then install **virtualenv** and run:
```bash
virtualenv "name of env"
```

Then run:
```bash
"windows"
"name of env"\Scripts\activate

"mac"
source ./"name of virtualenv"/bin/activate 
```
Install all the dependencies listed above.

Create a new Django server by running:
```bash
django-admin startproject "server name" .
```

run this to check if the server is live:
```bash
"windows"
python manage.py runserver

"mac"
python"2 or 3" manage.py runserver
```

Once the project's folder is created replace it's urls.py and settings.py with the ones I provided in the root level of the zip.

Next move the api folder from the zip folder into the same directory as your project, which holds the api routes to the server's data on the charts.

**Make sure that both frontend and backend server's are live or this won't work properly**

### Summary
When designing the endpoints I wanted to ensure that when running a fetch in the frontend would be redirected to a specific GET route based on what data was requested so I first redirected the request from the urls.py in the project folder to the correct urls.py from the api folders of each chart. Then in those urls.py, they run a GET function from a views.py file in the same directory that contains the function definitions. In those functions, it has the json data of the charts. Instead of making unit tests, I used Postman to run requests to the server, due to it's flexibility, and received positive results. I also mentioned that I had an issue that need cors headers because the server wouldn't let the frontend connect to it, so I installed it and added the neccessary variables and middleware into the settings.py.
