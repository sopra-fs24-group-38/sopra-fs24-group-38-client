# Group 38 - Nobody's Perfect

A fun and engaging web application in which you can creatively fool your friends and have a good time. Each round, the game presents an unknown, difficult, technical or “slang” word. Each player then types in a wrong, but possible explanation for this word. Then, the game shows all the players’ wrong and one correct explanation and lets the players vote for what they think is correct. Successfully tricking others into choosing your wrong explanation earns you points.

## Main Components

These are the main files necessary to get a good grasp of the application:

1. [LobbyWaiting](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/pages/LobbyWaiting.jsx) is the main hub for player management.
2. [Game](https://github.com/sopra-fs24-group-38/sopra-fs24-group-38-client/tree/main/src/components/pages/Game.jsx) holds the full logic for the game cycle.

## Getting started

The game can be played here: http://sopra-fs24-group-38-client.oa.r.appspot.com/

Since this app relies on our OpenAI API commands this is not locally playable without setting something similar up yourself (or having access to our API token).

### Technologies used

* [React](https://react.dev/) - JS library
* [react-use-websocket](https://www.npmjs.com/package/react-use-websocket) - for websockets

The application has been CSS adjusted for Google Chrome (but also works fine for other browsers). We do expect a browser version that is compliant with the CSS Baseline 2023.
Also please note that this was developed as a desktop-first application. We did pay attention to the mobile appearance but it was not the major focus.

## Illustrations

The login page is self-explanatory, choose a username and get started.

![login]()


## Roadmap

This is how we envisioned to extend this application:
* Extend on the user side by introducing a profile page and a chatroom to improve the community feeling between players and giving them a possibility to exchange PINs easily
* Letting the users choose their own avatar from our pool
* Adding even more game modes

## Authors

For the FrontEnd part:
* **Cédric Styner** - *Main contributor* - [glt-cs](https://github.com/glt-cs)
* **Markus Senn** - *Main contributor* - [iKusii](https://github.com/iKusii)
* **Samuel Frank** - *QA and main connection for backend coordination*

* **Stefan Schuler** - *Responsible TA* - []()
* **Roy Rutishauser** - *template provider* - [royru](https://github.com/royru)
* **Luis Torrejón** - *template provider* - [luis-tm](https://github.com/luis-tm)
* **Marco Leder** - *template provider* - []()

Continuous team work and BackEnd authors:
* **Harris Alem** - *Main contributor* - [so-ri](https://github.com/so-ri)
* **Elia Aeberhard** - *Main contributor* - [Elyisha](https://github.com/Elyisha)
* **Samuel Frank** - *Main contributor* - [samuelfrnk](https://github.com/samuelfrnk)

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE.md) file for details.

## Acknowledgments

* Thanks to all the people that helped, on- and offline
* No bots were harmed in the making of this game (some attempts were made)
