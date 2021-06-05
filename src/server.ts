import app from './app';
import config from './common/config';

const PORT = config.PORT || 4000;

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
