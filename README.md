# Rick and Morty app 👾

## By: Joao Bone 🗿

## HOW TO PASS THE LOGIN 🛑

### 1) Enter credentials

**Email: example@gmail.com**

**Password: 123456**

### 2) Altering the App.jsx file

_**From this**_:

```js
useEffect(() => {
  !access && navigate("/");
  /* 	!access && navigate("/home") */

  if (path !== "/" && path !== "/home" && path !== "about") {
    navigate("/notFound");
  }
}, [access]);
```

_**To this**_:

```js
useEffect(() => {
  /*  !access && navigate("/") */
  !access && navigate("/home");

  if (path !== "/" && path !== "/home" && path !== "about") {
    navigate("/notFound");
  }
}, [access]);
```

---

## CAPTURES OF THE APP 👇

### Login 🚪

![New login](./client/public/new_login.gif)

### Home: Adding cards 🃏

![Home](./client/public/home.gif)

### Responsive Navigation Bar 🚀

![Responsive navbar](./client/public/responsive_navbar.gif)

### Favorites: Filter and Sort 🌟

![Favorites](./client/public/favorites.gif)

### Not found page ❌

![Not found page](./client/public/Not_found.gif)
