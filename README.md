# FurnitureBox

## Overview

This project uses the following tools:

  - React
  - JSX
  - React-Static
  - Shopify
  - CSS Modules
  - Stylus
  - Google Material Icons



## Setup

1. Clone Repository
  
2.  Install Dependencies
    
    ```
    $ npm install
    ```

## Update local data

Since building ValueLink is static, dynamic routes such as collections pages need data to base themselves off of at the time of building. Using the command below will update the local copy (located in `client/collections.json`):

```
$ npm run update
```

Data is retrieved from Shopify's SDK.

Note! Don't manually alter `collections.json`, as any update command will overwrite it.


## Create a Static Build

'Build' refers to a static `HTML`/`CSS`/`JS` site.

Outputs the build, to `public/{locale}/`, where locale is one of the loaded localities found in `locales/`.

See Translation section further below for more details on locale.

### Default Build

```
$ npm run build
```

Defaults to english build.

### Build English and Japanese static sites sequentially.

```
$ npm run build:all
```

### Build a Specific locale

Use either:

```
$ npm run build:en
$ npm run build:ja
```

## Run Development Server

Adjusted to effortlessly use c9.io. If running locally, make sure to pass the port number as an env variable to webpack. (See `webpack.config.dev.js: Line 13`)

```
$ npm run start:dev
```

## Translations and Locales

Translations are done via the following process:

Code written uses the `format-message` package to write strings.
Upon any significant change, use the following command to extract any format-message references:

```
$ npm run get-locale-data
```

The above command outputs a locale file to `locales/en.json`.

### To create a translation:

1. Copy `en.json`
2. Rename copied file to target locale, i.e., `de.json`, `ja.json`, `jv.json`.
3. Send copied file to translator. descriptions are provided within the locale file.
4. Recieve translated file, update local copy.
5. You now have your targetted locale.

### Updating a previously translated file

Unfortunately, the translation file is not preserved upon each use of `npm run get-locale-data` (en.json is overwritten each time). If desired, use a diff to target exact changes when updating a locale.


## Steps Towards a Happy Build

1. Follow setup above: Clone Repository, Install dependencies.
2.  Update Locale Data using 
  ```
  $ npm run update
  ```
3.  Either...
  1.  Build site
  
    ```
    $ npm run build
    ```

  2.  Run development server
  
    ```
    $ npm start
    ```