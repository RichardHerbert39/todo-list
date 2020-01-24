# CRFS Todo Manager

This is a small ReactJS application that allows the user to manage a todo list.

The package is built using the following technologies:

- [Yarn](https://yarnpkg.com/)
- [Create React App](https://create-react-app.dev/)
- [React](https://reactjs.org/)
- [RxJs](https://rxjs-dev.firebaseapp.com/)
- [CSS modules](https://github.com/css-modules/css-modules)


## Starting development

``` bash
git clone https://github.com/CRFS/todo.git
cd todo
yarn install
yarn start
```

Your browser should open and show the app running at `http://localhost:3000/`. The page will auto-reload as you make changes.


## The task

The `TodoList` component, and `TodoList.module.css` stylesheet, are both currently empty. The aim is to implement a todo list manager that mimics the appearance and behavior shown in the following demo site:

https://crfs.github.io/todo/

The `api.ts` file contains a mock set of API calls using RxJS `Observable`s. Use these to implement the functionality required.


## Things we're looking for

- The solution should be implemented using only the `TodoList` and `TodoList.module.css` files.
- No additional 3rd party packages should be used.
- No additional persistent storage (e.g. cookies, `localStorage`, `sessionStorage`) should be used.
- The `api.getTodoList()` endpoint should polled at a 5 second interval for new data.


## Hints

- Remember to clean up any subscribed `Observable`s on component unmount.
- The mocked `api.ts` remembers state using `localStorage`, so your todo list should persist between browser reloads.


**Good luck! :)**
