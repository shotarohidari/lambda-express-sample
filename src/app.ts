import express, { Request, Response } from 'express';
import { getCurrentInvoke } from '@vendia/serverless-express';

const app = express();
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const currentInvoke = getCurrentInvoke();
  // ここでlambdaのeventオブジェクトが取れる。
  const { event = {} } = currentInvoke;
  res.status(200);
  return res.json({ message: 'success' });
});
router.get('/hello', (req: Request, res: Response) => {
  const currentInvoke = getCurrentInvoke();
  const { event = {} } = currentInvoke;
  res.status(200);
  return res.json({ message: 'hello' });
});

router.get('/otukare/:name', (req: Request, res: Response) => {
  const currentInvoke = getCurrentInvoke();
  const { event = {} } = currentInvoke;
  const name = req.params.name;
  res.status(200);
  return res.json({ message: `otukaresama ${name}!` });
});

app.use('/', router);

export { app };
