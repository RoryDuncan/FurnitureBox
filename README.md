# Value Link

## Overview

This project uses the following:

  - React
  - JSX
  - React-Static
  - Firebase
  - CSS Modules
  - Stylus
  - Google Material Icons



## Setup

1. Clone Repository
  
2.  Install Dependencies
    
    ```
    $ npm install
    ```

## Create Static Build
  
```
$ npm run build
```

## Run Development Server

```
$ npm run start:dev
```

## Update Data from DB

Since building ValueLink is static, dynamic routes such as collections and such need data to base themselves off of. Using the command below will update the local copy (located in `client/collections.json`):

```
$ npm run update
```

Note! Don't manually alter `collections.json` unless you know what you're doing!


