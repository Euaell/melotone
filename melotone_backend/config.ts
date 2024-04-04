import { config } from 'dotenv';

type EnvironmentType = 'testing' | 'development' | 'production';

config();

class Config {
    private static instance: Config;
    
    private constructor(env: string) {
        // Initialize your properties here
        this.apiKey = process.env.API_KEY || '';
        

        if (env === 'development') {
            // Set properties for development
            this.apiKey = process.env.DEV_API_KEY || '';
            this.postgresql_user = process.env.DEV_POSTGRESQL_USER || '';
            this.postgresql_password = process.env.DEV_POSTGRESQL_PASSWORD || '';
            this.postgresql_host = process.env.DEV_POSTGRESQL_HOST || '';
            this.postgresql_port = parseInt(process.env.DEV_POSTGRESQL_PORT || '5432');
            this.postgresql_database = process.env.DEV_POSTGRESQL_DB || '';
            
        } else if (env === 'production') {
            // Set properties for production
            this.apiKey = process.env.PROD_API_KEY || '';
            this.postgresql_user = process.env.PROD_POSTGRESQL_USER || '';
            this.postgresql_password = process.env.PROD_POSTGRESQL_PASSWORD || '';
            this.postgresql_host = process.env.PROD_POSTGRESQL_HOST || '';
            this.postgresql_port = parseInt(process.env.PROD_POSTGRESQL_PORT || '5432');
            this.postgresql_database = process.env.PROD_POSTGRESQL_DB || '';
            
        } else if (env === 'testing') {
            // Set properties for testing
            this.apiKey = process.env.TEST_API_KEY || '';
            this.postgresql_user = process.env.TEST_POSTGRESQL_USER || '';
            this.postgresql_password = process.env.TEST_POSTGRESQL_PASSWORD || '';
            this.postgresql_host = process.env.TEST_POSTGRESQL_HOST || '';
            this.postgresql_port = parseInt(process.env.TEST_POSTGRESQL_PORT || '5432');
            this.postgresql_database = process.env.TEST_POSTGRESQL_DB || '';
            
        }
    }
    
    public static getInstance(): Config {
        if (!Config.instance) {
            const env: EnvironmentType = process.env.ENV as EnvironmentType || 'development';
            console.log(`Environment: ${env}`);
            Config.instance = new Config(env);
        }
        return Config.instance;
    }
    
    public apiKey: string;

    // postgresql properties
    public readonly postgresql_user: string;
    public readonly postgresql_password: string;
    public readonly postgresql_host: string;
    public readonly postgresql_port: number;
    public readonly postgresql_database: string;
    
    // Add more properties as needed
}

const configInstance = Config.getInstance();

export { EnvironmentType, configInstance };

export default Config;
