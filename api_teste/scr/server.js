const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.resolve(__dirname, "../../data.json");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

async function readData() {
	const raw = await fs.readFile(DATA_FILE, "utf-8");
	return JSON.parse(raw);
}

async function writeData(data) {
	await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

function normalizeText(value) {
	return String(value || "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

function validatePayload(payload, isPartial = false) {
	const requiredFields = ["codigo", "titulo", "categoria", "descricao"];

	if (!isPartial) {
		const missing = requiredFields.filter((field) => payload[field] === undefined);
		if (missing.length > 0) {
			return `Campos obrigatorios ausentes: ${missing.join(", ")}`;
		}
	}

	if (payload.codigo !== undefined && typeof payload.codigo !== "number") {
		return "O campo 'codigo' deve ser numerico.";
	}

	const textFields = ["titulo", "categoria", "descricao", "descricaoCurta"];
	for (const field of textFields) {
		if (payload[field] !== undefined && typeof payload[field] !== "string") {
			return `O campo '${field}' deve ser texto.`;
		}
	}

	if (payload.palavrasChave !== undefined && !Array.isArray(payload.palavrasChave)) {
		return "O campo 'palavrasChave' deve ser um array.";
	}

	if (payload.exemplos !== undefined && !Array.isArray(payload.exemplos)) {
		return "O campo 'exemplos' deve ser um array.";
	}

	if (payload.relacionados !== undefined && !Array.isArray(payload.relacionados)) {
		return "O campo 'relacionados' deve ser um array.";
	}

	return null;
}

app.get("/", (req, res) => {
	res.json({
		ok: true,
		message: "API de testes no ar.",
		endpoints: [
			"GET /health",
			"GET /api/testes",
			"GET /api/testes/:id",
			"POST /api/testes",
			"PUT /api/testes/:id",
			"DELETE /api/testes/:id",
		],
	});
});

app.get("/health", (req, res) => {
	res.json({
		status: "up",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

app.get("/api/testes", async (req, res, next) => {
	try {
		const { categoria, q } = req.query;
		const data = await readData();

		let filtered = [...data];

		if (categoria) {
			const categoryNeedle = normalizeText(categoria);
			filtered = filtered.filter((item) => normalizeText(item.categoria) === categoryNeedle);
		}

		if (q) {
			const term = normalizeText(q);
			filtered = filtered.filter((item) => {
				const bucket = [
					item.titulo,
					item.categoria,
					item.subCategoria,
					item["sub-categoria"],
					item.descricao,
					item.descricaoCurta,
					...(item.palavrasChave || []),
					...(item.exemplos || []),
					...(item.relacionados || []),
				]
					.filter(Boolean)
					.join(" ");

				return normalizeText(bucket).includes(term);
			});
		}

		res.json({
			total: filtered.length,
			items: filtered,
		});
	} catch (error) {
		next(error);
	}
});

app.get("/api/testes/:id", async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const data = await readData();
		const found = data.find((item) => item.id === id);

		if (!found) {
			return res.status(404).json({ message: "Registro nao encontrado." });
		}

		return res.json(found);
	} catch (error) {
		return next(error);
	}
});

app.post("/api/testes", async (req, res, next) => {
	try {
		const payload = req.body;
		const validationError = validatePayload(payload);

		if (validationError) {
			return res.status(400).json({ message: validationError });
		}

		const data = await readData();
		const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;

		const created = {
			id: newId,
			codigo: payload.codigo,
			titulo: payload.titulo,
			categoria: payload.categoria,
			subCategoria: payload.subCategoria ?? payload["sub-categoria"] ?? null,
			descricao: payload.descricao,
			descricaoCurta: payload.descricaoCurta ?? "",
			palavrasChave: payload.palavrasChave ?? [],
			exemplos: payload.exemplos ?? [],
			relacionados: payload.relacionados ?? [],
		};

		data.push(created);
		await writeData(data);

		return res.status(201).json(created);
	} catch (error) {
		return next(error);
	}
});

app.put("/api/testes/:id", async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const payload = req.body;
		const validationError = validatePayload(payload, true);

		if (validationError) {
			return res.status(400).json({ message: validationError });
		}

		const data = await readData();
		const index = data.findIndex((item) => item.id === id);

		if (index === -1) {
			return res.status(404).json({ message: "Registro nao encontrado." });
		}

		const current = data[index];
		const updated = {
			...current,
			...payload,
			subCategoria:
				payload.subCategoria !== undefined
					? payload.subCategoria
					: payload["sub-categoria"] !== undefined
						? payload["sub-categoria"]
						: current.subCategoria ?? current["sub-categoria"] ?? null,
		};

		data[index] = updated;
		await writeData(data);

		return res.json(updated);
	} catch (error) {
		return next(error);
	}
});

app.delete("/api/testes/:id", async (req, res, next) => {
	try {
		const id = Number(req.params.id);
		const data = await readData();
		const index = data.findIndex((item) => item.id === id);

		if (index === -1) {
			return res.status(404).json({ message: "Registro nao encontrado." });
		}

		const [removed] = data.splice(index, 1);
		await writeData(data);

		return res.json({ message: "Registro removido com sucesso.", removed });
	} catch (error) {
		return next(error);
	}
});

app.use((req, res) => {
	res.status(404).json({ message: "Rota nao encontrada." });
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).json({
		message: "Erro interno do servidor.",
	});
});

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});
