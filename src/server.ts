import app from './app';
import config from './common/config';

const PORT = config.PORT || 4000;

app.listen(4000, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
