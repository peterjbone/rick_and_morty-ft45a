const app = require("../src/app.js")
const session = require("supertest")
const agent = session(app)

describe("Test de RUTAS", () => {
	describe("GET /rickandmorty/character/:id", () => {
		it("Responde con status: 200", async () => {
			await agent.get("/rickandmorty/character/1").expect(200)
		})
		it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
			const response = await agent.get("/rickandmorty/character/1")
			/* console.log(response.status)
			console.log(response.body)
			console.log(response.type)
			console.log(response.charset) */
			expect(response.body).toHaveProperty("id")
			expect(response.body).toHaveProperty("name")
			expect(response.body).toHaveProperty("species")
			expect(response.body).toHaveProperty("gender")
			expect(response.body).toHaveProperty("status")
			expect(response.body).toHaveProperty("origin")
			expect(response.body).toHaveProperty("image")
		})
		it("Si hay un error responde con status: 500", async () => {
			await agent.get("/rickandmorty/character/900").expect(500)
		})
	})

	describe("GET /rickandmorty/login", () => {
		it("Retorna objeto {access:true} con las credenciales correctas", async () => {
			const response = await agent
				.get("/rickandmorty/login?email=example@gmail.com&password=123456")
				.expect(200)
			/* console.log(response.status)
			console.log(response.body) */
			expect(response.body).toEqual({ access: true })
		})
		it("Retorna objeto {access:false} con las credenciales incorrectas", async () => {
			const response = await agent
				.get("/rickandmorty/login?email=example@gmail.com&password=12345678")
				.expect(401)
			expect(response.body).toEqual({ access: false })
		})
	})

	describe("POST /rickandmorty/fav", () => {
		const character1 = { id: 1, name: "Rick" }
		const character2 = { id: 2, name: "Morty" }
		it("Devuelve array con personaje enviado por body", async () => {
			const response = await agent.post("/rickandmorty/fav").send(character1)
			expect(response.body).toEqual([character1])
		})
		it("Devuelve array con personaje actual y el anterior enviado por body", async () => {
			const response = await agent.post("/rickandmorty/fav").send(character2)
			expect(response.body).toContainEqual(character1)
			expect(response.body).toContainEqual(character2)
		})
	})

	describe("DELETE /rickandmorty/fav/:id", () => {
		const character1 = { id: 1, name: "Rick" }
		const character2 = { id: 2, name: "Morty" }
		it("Devuelve los elementos agregados previamente sin modificar, si no hay personajes con el ID que se envía", async () => {
			const response = await agent.delete("/rickandmorty/fav/3").expect(200)
			expect(response.body).toContainEqual(character1)
			expect(response.body).toContainEqual(character2)
		})
		it("Elimina el personaje si le paso el ID correcto", async () => {
			const response = await agent.delete("/rickandmorty/fav/2").expect(200)
			expect(response.body).toContainEqual(character1)
			expect(response.body).not.toContainEqual(character2)
		})
	})
})
