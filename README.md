# Group 38 - Nobody's Perfect

A fun and engaging web application in which you can creatively fool your friends and have a good time. Each round, the game presents an unknown, difficult, technical or “slang” word. Each player then types in a wrong, but possible explanation for this word. Then, the game shows all the players’ wrong and one correct explanation and lets the players vote for what they think is correct. Successfully tricking others into choosing your wrong explanation earns you points.

## Main Components

These are the main files necessary to get a good grasp of the application:

1. [LobbyWaiting](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/pages/LobbyWaiting.jsx) is the main hub for player management.
2. [Game](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/pages/Game.jsx) holds the full logic for the game cycle.
3. [AppRouter](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/router/AppRouter.jsx) displays the layout of the application.

## Getting started

The game can be played here: http://sopra-fs24-group-38-client.oa.r.appspot.com/

Since this app relies on our OpenAI API commands this is not locally playable without setting something similar up yourself (or having access to our API token).

For development copy this and the server side repo (https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-server) to your machine.

Then set it all up with the respective set-up instructions.

### Prerequisites

Be sure to have the following programs installed:

[Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - for package management, all other dependencies will get installed with it

### Technologies used

* [React](https://react.dev/) - JS library
* [react-use-websocket](https://www.npmjs.com/package/react-use-websocket) - for websockets
* [Tailwind CSS](https://tailwindcss.com/) - for styling
* [react-toastify](https://fkhadra.github.io/react-toastify/introduction) - for neat feedback toasts

The application has been CSS adjusted for Google Chrome (but also works fine for other browsers). We do expect a browser version that is compliant with the CSS Baseline 2023.
Also please note that this was developed as a desktop-first application. We did pay attention to the mobile appearance but it was not the major focus.

### Set-up

Run the following line of code in the project root directory

```
npm install
```

Start a dev environment with

```
npm start
```

You can now see the application at http://localhost:3000 in your browser of choice.

Be sure to have the server side running as well! Otherwise you won't be able to get very far.
Check this at http://localhost:8080, we have a Swagger page for ease of access and readability.

## Illustrations

The login page is self-explanatory, choose a username and join the party.

![login](https://private-user-images.githubusercontent.com/74095071/332582073-1dabfe56-5102-42b3-85cc-8c23f80c2768.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTYzMjcyMzUsIm5iZiI6MTcxNjMyNjkzNSwicGF0aCI6Ii83NDA5NTA3MS8zMzI1ODIwNzMtMWRhYmZlNTYtNTEwMi00MmIzLTg1Y2MtOGMyM2Y4MGMyNzY4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTIxVDIxMjg1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTcxMTA1N2FlNmYxMzc1YmI2ZWE3NDAxNGZjNjMzNTM3NDBhYjI3MDA4MWJhYWE2NGQ4ZDdmMjI2YWE4MTdhMTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Z4iECUt559evOg17MlEmNlzouW5kF6hZJpXsUsPf-wQ)

In the top left corner there is always a rules button explaining the in-and-outs of the application. In the top right there is a logout button, which is only visible here in the Lobby component. You can either check out the leaderboard, create a new lobby or join an existing one.

![lobby](https://private-user-images.githubusercontent.com/74095071/332582432-9488d3bc-1177-4c87-8d92-0538a6f428b1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTYzMjcyMzUsIm5iZiI6MTcxNjMyNjkzNSwicGF0aCI6Ii83NDA5NTA3MS8zMzI1ODI0MzItOTQ4OGQzYmMtMTE3Ny00Yzg3LThkOTItMDUzOGE2ZjQyOGIxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTIxVDIxMjg1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTcwZjZiMWVkODQwYTliNmE1NTg3NzI1OTkzNGI5MjY0YmVmNzFkMDM2NWI1NWVkOTQwYTg0MWNhOTY2ODcwNDkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.IvP0QWhfyfR1kmg0c6fW_FZ-ccUrdf6HDxvyPuDmeTM)

Change settings, see other players joining/leaving or add up to 2 AI players to fill spots.

![lobbywaiting](https://private-user-images.githubusercontent.com/74095071/332583952-0daf082d-0175-4b7e-88c9-a78625a85275.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTYzMjcyMzUsIm5iZiI6MTcxNjMyNjkzNSwicGF0aCI6Ii83NDA5NTA3MS8zMzI1ODM5NTItMGRhZjA4MmQtMDE3NS00YjdlLTg4YzktYTc4NjI1YTg1Mjc1LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTIxVDIxMjg1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTVmNzNmZjBkYWI4Mzk1NTBjZGQwNWE2NTRmYmEzZTBmNzNiNjY5YzYwYWFlNjc0ODU5YTE1ZDdkZDI2N2VjMmQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.6gYWnWHTCLpB1xr0VSv4r4wxw-sGeCT0pajEY6Cv2GY)

The main game loop consists of a definition presentation, voting screen, outcome and interim scoreboard.
(use compound image with all 4 views)

![round](https://private-user-images.githubusercontent.com/74095071/332585887-f6ee4a13-8c42-4df4-81a2-4343e3ac57bd.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTYzMjcyMzUsIm5iZiI6MTcxNjMyNjkzNSwicGF0aCI6Ii83NDA5NTA3MS8zMzI1ODU4ODctZjZlZTRhMTMtOGM0Mi00ZGY0LTgxYTItNDM0M2UzYWM1N2JkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTIxVDIxMjg1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTM2NzdkM2ZmZTFjNzQ3OTU1MTM2MzZiOTE2MGFjZThiMzFhYzY5NGM4M2I0NzE3YjhiZTQ1ZTZkYzFhYjMwMWUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.MqvlnCxgrA928JXN4HGywWkNTvd6u9a5sIp_tQaZL0A)

Revel in your glorious victory.

![endscreen](https://private-user-images.githubusercontent.com/74095071/332586671-abcf435a-8d39-4d5c-baa2-49edacb5c88d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTYzMjcyMzUsIm5iZiI6MTcxNjMyNjkzNSwicGF0aCI6Ii83NDA5NTA3MS8zMzI1ODY2NzEtYWJjZjQzNWEtOGQzOS00ZDVjLWJhYTItNDllZGFjYjVjODhkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTIxVDIxMjg1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUyOGNiMDdlY2E3ZWFlZjA3NGU1Yzk2OTVmZmVhNzBmNDBkOWU1ZGI0MjI5Y2U4MmM3MTMzODVhMDE3ZGY3NzcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Gxu_r1aCUxNDKmfjEM78SWMpIG9c6KkHkci4L8dHBHY)

Simple board with placement, all-time score and total fooled players.

![leaderboard](https://private-user-images.githubusercontent.com/74095071/332586758-36086574-9121-439a-a8a2-f809ec217642.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTYzMjcyMzUsIm5iZiI6MTcxNjMyNjkzNSwicGF0aCI6Ii83NDA5NTA3MS8zMzI1ODY3NTgtMzYwODY1NzQtOTEyMS00MzlhLWE4YTItZjgwOWVjMjE3NjQyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MjElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTIxVDIxMjg1NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWEyZWQ3OTUyMDZiMzQ2OTExMTRkZmI1YThjMDczNzhmMzdlYTk5MjI1OTdhN2VlMDdkZTIzOGJhMjY0NjVhZjQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.Rl4FduZ8ZQLmD1RbfRwhNbPc_-6qkQTVeL_VuK6nHEw)


## Roadmap

This is how we envisioned to extend this application:
* Extend on the user side by introducing a profile page and a chatroom to improve the community feeling between players and giving them a possibility to exchange PINs easily
* Letting the users choose their own avatar from our pool, being able to play with more than 5 players
* Adding even more game modes

## Authors

For the FrontEnd part:
* **Cédric Styner** - *Main contributor* - [glt-cs](https://github.com/glt-cs)
* **Markus Senn** - *Main contributor* - [iKusii](https://github.com/iKusii)

* **Stefan Schuler** - *Responsible TA* - [Steesch](https://github.com/Steesch)
* **Roy Rutishauser** - *template provider* - [royru](https://github.com/royru)
* **Luis Torrejón** - *template provider* - [luis-tm](https://github.com/luis-tm)
* **Marco Leder** - *template provider* - [marcoleder](https://github.com/marcoleder)

Continuous teamwork and BackEnd authors:
* **Harris Alem** - *Main contributor* - [so-ri](https://github.com/so-ri)
* **Elia Aeberhard** - *Main contributor* - [Elyisha](https://github.com/Elyisha)
* **Samuel Frank** - *Main contributor* - [samuelfrnk](https://github.com/samuelfrnk)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE.md) file for details.

## Acknowledgments

* Thanks to all the people that helped, on- and offline
* No bots were harmed in the making of this game (some attempts were made)
