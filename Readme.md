# Stream
![Stream](https://github.com/Ren0503/stream-js-music/blob/master/client/src/assets/header.png)
- **server** This package container API for Stream, build with Nodejs, Express and Spotify API
- **client** Is a frontend for Magnifier, build with React, Context API and Axios.

## Features

1. Login/Signup
2. Listen Music
3. Genres 
4. Create Playlist
5. Likes Favorite
6. Search album, artist

### Server

| Plugin | README |
| ------ | ------ |
| axios | [plugins/bcryptjs/README.md](https://github.com/axios/axios/blob/master/README.md) |
| cookie-parser | [plugins/cookie-parser/README.md](https://github.com/expressjs/cookie-parser/blob/master/README.md) |
| cors | [plugins/cors/README.md](https://github.com/expressjs/cors/blob/master/README.md)|
| express | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md) |
| request | [plugins/request/README.md](https://github.com/request/request/blob/master/README.md) |
| morgan | [plugins/morgan/README.md](https://github.com/expressjs/morgan/blob/master/README.md) |
| nodemon | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md) |

### Client

| Plugin | README |
| ------ | ------ |
| axios | [plugins/axios/README.md](https://github.com/axios/axios/blob/master/README.md) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-heartbeat | [plugins/react-heartbeat/README.md](https://www.npmjs.com/package/react-heartbeat) |
| react-router-dom | [plugins/react-router-dom/README.md](https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/README.md) |
| react-tooltip | [plugins/react-tooltip/README.md](https://github.com/wwayne/react-tooltip/blob/master/README.md) |

## Core Structure
    code
      ├── package.json
      │
      ├── client
      │   ├── public
      │   ├── src
      │   │   ├── assets
      │   │   ├── components
      │   │   ├── context
      │   │   ├── hooks
      │   │   ├── screens
      │   │   ├── services
      │   │   ├── utils
      │   │   ├── App.js
      │   │   ├── index.css
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── server 
      │   ├── utils
      │   └── server.js
      ├── .gitignore
      └── README.md


### Screenshots


|                                        Home                                        |                                        Search                                        |                                        Genre                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/stream-js-music/blob/master/client/src/assets/screenshots/home.png) | ![](https://github.com/Ren0503/stream-js-music/blob/master/client/src/assets/screenshots/search.png) | ![](https://github.com/Ren0503/stream-js-music/blob/master/client/src/assets/screenshots/genre.png) |

|                                        Artist                                        |                                        Album                                        |                                        Playlist                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/stream-js-music/blob/master/client/src/assets/screenshots/artist.png) | ![](https://github.com/Ren0503/stream-js-music/blob/master/client/src/assets/screenshots/album.png) | ![](https://github.com/Ren0503/stream-js-music/blob/master/client/src/assets/screenshots/playlist.png) |