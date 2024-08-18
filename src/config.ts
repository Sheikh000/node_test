/**Config.ts */
interface ConfigType {
	server: {
		port: number | string;
	};
	mongodb: {
		url: string;
	};
}

const Config: ConfigType = {
	server: {
		port: process.env.PORT || 3000,
	},
	mongodb: {
		url:
			process.env.MONGODB_URL ||
			'mongodb://localhost:27017/FinalNodeTest',
	},
};
export default Config;
