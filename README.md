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

### Login success & Login denied (NEW LOGIN) ✅

![New login](./public/new_login.gif)

### Home: adding cards by ID and Ramdonly 🃏

![Home](./public/home.gif)

### Responsive Navigation Bar 🚀

![Responsive navbar](./public/responsive_navbar.gif)

### Favorites: Filter and Sort filter 🌟

![Favorites](./public/favorites.gif)

### Not found page ❌

![Not found page](./public/Not_found.gif)
