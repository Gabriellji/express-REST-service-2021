import app from './app';
const PORT = process.env['PORT'];

app.listen(4000, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
