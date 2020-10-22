# Photrashion [InstaClone]

## Description
An instagram clone made using Laravel + React that enables users to follow one another, like posts and comment on other users posts. It tries to mimic basic functionalities of Instagram and at the moment, messages,notifications and delete posts have not yet been implemented. 
### Author
[Lennox Omondi](https://linkedin.com/in/lenomosh)
## Technologies used
- MDBootstrap
- Ant Design
- React Router Dom
- Read Redux
- Redux Persist
- Axios
- ...see `package.json` for more

## User Stories
As a user of the application I should be able to:

- Sign in to the application to start using.
- Upload my pictures to the application.
- See my profile with all my pictures.
- Follow other users and see their pictures on my timeline.
- Like a picture and leave a comment on it.

## Server Requirements
    PHP >= 7.3
    BCMath PHP Extension
    Ctype PHP Extension
    Fileinfo PHP Extension
    JSON PHP Extension
    Mbstring PHP Extension
    OpenSSL PHP Extension
    PDO PHP Extension
    Tokenizer PHP Extension
    XML PHP Extension

## Setup Instructions
- `git init` and run `git remote add origin git@github.com:lenomosh/insagram.git` if you are using SSH or `https://github.com/lenomosh/instagram.git`
-  From the project directory run `composer install && yarn`
- Configure the `.env` file and change the following 
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1 #
DB_PORT=3306
DB_DATABASE=<your database name>
DB_USERNAME=><database username>
DB_PASSWORD=<database password>
```
- run `php artisan key:generate` and `php artisan migrate`
- You should be able to start your app by running `php artisan serve`


## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

This is an open-source project that is licenced under the [MIT license](https://opensource.org/licenses/MIT).
