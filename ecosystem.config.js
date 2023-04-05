module.exports = {
	apps: [
		{
			name: 'app',
			script: 'ts-node',
			args: './src/app.ts',
			watch: true,
			ignore_watch: ['./node_modules', './src/db.json', './.idea'],
		},
	],
};
