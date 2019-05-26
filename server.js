import debug from 'debug';
import app from './app';

const port = process.env.PORT || 3000;
const logger = debug('log');

app.listen(port, () => {
  logger(`Listening on port ${port}`);
});
