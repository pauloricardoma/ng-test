import app from './server';

const port = 4000;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
