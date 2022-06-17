import conf from '../config/index.js';
import { createApp } from './app.js';

const app = createApp(conf);
app.listen({ port: 3005 });
