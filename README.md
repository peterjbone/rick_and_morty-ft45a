# Rick and Morty app 👾

## By: Joao Bone 🗿

## HOW TO PASS THE LOGIN

### 1) Enter credentials

**Email: example@gmail.com**

**Password: 123456**

### 2) Altering the App.jsx file

_**From this**_:

```js
useEffect(() => {
	!access && navigate("/")
	/* 	!access && navigate("/home") */

	if (path !== "/" && path !== "/home" && path !== "about") {
		navigate("/notFound")
	}
}, [access])
```

_**To this**_:

```js
useEffect(() => {
	/*  !access && navigate("/") */
	!access && navigate("/home")

	if (path !== "/" && path !== "/home" && path !== "about") {
		navigate("/notFound")
	}
}, [access])
```

---

## CAPTURES OF THE APP 👇

### Login 🚪

![Login](./public/login.gif)

### Home: adding cards by ID and Ramdonly 🃏

![Home](./public/home.gif)

### Favorites: Filter and Sort filter 🌟

![Favorites](./public/favorites.gif)

### Not found page ❌

![Not found page](./public/Not_found.gif)
