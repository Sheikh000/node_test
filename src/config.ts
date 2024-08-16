/**Config.ts */
interface ConfigType {
	server: {
		port: number | string;
	};
}

const Config: ConfigType = {
	server: {
		port: process.env.PORT || 3000,
	},
};
export default Config;
