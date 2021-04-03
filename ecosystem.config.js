require("dotenv").config();

module.exports = {
	apps: [
		{
			name: "hanseo-bot",
			script: "yarn",
			args: ["prod"],

			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],

	deploy: {
		production: {
			user: process.env.PM2_DEPLOY_USER,
			host: process.env.PM2_DEPLOY_HOST,
			key: process.env.PM2_DEPLOY_KEY_PATH,
			ref: process.env.PM2_DEPLOY_REF,
			repo: process.env.PM2_DEPLOY_REPO,
			ssh_options: "StrictHostKeyChecking=no",
			path: process.env.PM2_DEPLOY_PATH,
			"post-deploy": "yarn && pm2 reload ecosystem.config.js",
		},
	},
};
