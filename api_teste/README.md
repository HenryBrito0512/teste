# API Teste

Backend em Node.js + Express para consultar e gerenciar os dados de `data.json`.

## Como rodar

```bash
npm install
npm run dev
```

Servidor padrao: `http://localhost:3000`

## Rotas

- `GET /` - resumo da API
- `GET /health` - status do servidor
- `GET /api/testes` - lista todos os registros
- `GET /api/testes?categoria=Tipos de testes` - filtra por categoria
- `GET /api/testes?q=usabilidade` - busca textual
- `GET /api/testes/:id` - busca por id
- `POST /api/testes` - cria registro
- `PUT /api/testes/:id` - atualiza registro
- `DELETE /api/testes/:id` - remove registro

## Objeto para POST

```json
{
	"codigo": 3.1,
	"titulo": "teste de contrato",
	"categoria": "Tipos de testes",
	"subCategoria": "api",
	"descricao": "Valida compatibilidade entre produtor e consumidor.",
	"descricaoCurta": "Garante integridade de contrato.",
	"palavrasChave": ["contract", "api"],
	"exemplos": ["Pact", "schema validation"],
	"relacionados": ["2.1", "2.2"]
}
```