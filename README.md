# Package Updater

## Installation

Go to the project directory and run:

``` bash
npm install
```

## Setting up

1. Create app password for your bitbucket account. Add some name for your password and add Repositories and Pull Requests permissions.
2. Fill `config.js` file with data:
   1. username - your username
   2. password - generated password
   3. workspace - workspace of your project
   4. repo_slug - name of repository

## Usage
```
node ./index.js -n <nameOfPackage>@<packageVersion>
```