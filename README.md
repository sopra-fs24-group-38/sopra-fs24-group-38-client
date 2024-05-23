# Group 38 - Nobody's Perfect

## Introduction 

This is a fun and engaging web application in which you can creatively fool your
friends and have a good time. In combination with competitive aspects we want to solve the
problem of finding a cool game to play with your friends. Thus we want to create a multiplayer
game derived from the concept of the board game “Nobody’s Perfect”. Each round, the game
presents an unknown, difficult word related to Dutch, Programming, Foods or Bizarre. Each player then types in a wrong, but
possible explanation for this word. Then, the game shows all the player’s wrong and one correct
explanation and lets the players vote for what they think is correct. Successfully tricking others
into choosing your wrong explanation earns you points. There is also the possibility to further customize the gaming experience 
using (a combination) of game modes and adding AI players to have an engaging experience with fewer friends available. 

### Technologies used

* [React](https://react.dev/) - JS library
* [react-use-websocket](https://www.npmjs.com/package/react-use-websocket) - for websockets
* [Tailwind CSS](https://tailwindcss.com/) - for styling
* [react-toastify](https://fkhadra.github.io/react-toastify/introduction) - for neat feedback toasts

The application has been CSS adjusted for Google Chrome (but also works fine for other browsers). We do expect a browser version that is compliant with the CSS Baseline 2023.
Also please note that this was developed as a desktop-first application. We did pay attention to the mobile appearance but it was not the major focus.


## High-level components

These are the main files necessary to get a good grasp of the application:

1. [LobbyWaiting](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/pages/LobbyWaiting.jsx) is the main hub for player management.
2. [Game](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/pages/Game.jsx) holds the full logic for the game cycle.
3. [AppRouter](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/router/AppRouter.jsx) displays the layout of the application.

## Launch & Deployment:

The game can be played here: http://sopra-fs24-group-38-client.oa.r.appspot.com/

Since this app relies on our OpenAI API commands this is not locally playable without setting something similar up yourself (or having access to our API token).

For development copy this and the server side repo (https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-server) to your machine.

Then set it all up with the respective set-up instructions.

### Prerequisites

Be sure to have the following programs installed:

[Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - for package management, all other dependencies will get installed with it

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

### External Dependencies 
No further external dependencies needed as node takes care.
### Releases 
For further releases we refer to [this tutorial](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)


## Illustrations

The login page is self-explanatory, choose a username and join the party.

![login](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/assets/74095071/1dabfe56-5102-42b3-85cc-8c23f80c2768)

In the top left corner there is always a rules button explaining the in-and-outs of the application. In the top right there is a logout button, which is only visible here in the Lobby component. You can either check out the leaderboard, create a new lobby or join an existing one.

![lobby](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/assets/74095071/9488d3bc-1177-4c87-8d92-0538a6f428b1)

Change settings, see other players joining/leaving or add up to 2 AI players to fill spots.

![lobbywaiting](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/assets/74095071/0daf082d-0175-4b7e-88c9-a78625a85275)

The main game loop consists of a definition presentation, voting screen, outcome and interim scoreboard.

![round](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/assets/74095071/f6ee4a13-8c42-4df4-81a2-4343e3ac57bd)

Revel in your glorious victory.

![endscreen](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/assets/74095071/abcf435a-8d39-4d5c-baa2-49edacb5c88d)

Leaderboard with placement, all-time score and total fooled players.

![leaderboard](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/assets/74095071/36086574-9121-439a-a8a2-f809ec217642)


## Roadmap

This is how we envisioned to extend this application:
* Extend on the user side by introducing a profile page and a chatroom to improve the community feeling between players and giving them a possibility to exchange PINs easily
* Letting the users choose their own avatar from our pool, being able to play with more than 5 players
* Adding even more game modes


## Releases 
For further releases we refer to [this tutorial](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

## Authors

For the FrontEnd part:
* **Cédric Styner** - *Main contributor* - [glt-cs](https://github.com/glt-cs)
* **Markus Senn** - *Main contributor* - [iKusii](https://github.com/iKusii)

* **Stefan Schuler** - *Responsible TA* - [Steesch](https://github.com/Steesch)
* **Roy Rutishauser** - *template provider* - [royru](https://github.com/royru)
* **Luis Torrejón** - *template provider* - [luis-tm](https://github.com/luis-tm)
* **Marco Leder** - *template provider* - [marcoleder](https://github.com/marcoleder)

Continuous teamwork and BackEnd authors:
* **Harris A** - *Main contributor* - [so-ri](https://github.com/so-ri)
* **Elia Aeberhard** - *Main contributor* - [Elyisha](https://github.com/Elyisha)
* **Samuel Frank** - *Main contributor* - [samuelfrnk](https://github.com/samuelfrnk)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE.md) file for details.

## Acknowledgments

* Thanks to all the people that helped, on- and offline
* No bots were harmed in the making of this game (some attempts were made)
