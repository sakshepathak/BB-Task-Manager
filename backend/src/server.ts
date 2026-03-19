import app from './app';
import { config } from './config';

const startServer = () => {
  try {
    app.listen(config.PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${config.PORT}`);
      console.log(`🌍 Environment: ${config.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
