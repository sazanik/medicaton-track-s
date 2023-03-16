import express, { Express } from 'express';

const app: Express = express();
const port = 3000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

const init = 0;
let index = init;

app.get('/', (req, res) => {
	res.json({ value: index });
});

app.delete('/reset', (req, res) => {
	index = init;
	res.status(204).end();
});

app.put('/set', (req, res) => {
	index = Number(req.query.value);
	res.status(204).end();
});

app.post('/increment', (req, res) => {
	index += 1;
	res.status(204).end();
});

app.post('/decrement', (req, res) => {
	index -= 1;
	res.status(204).end();
});
