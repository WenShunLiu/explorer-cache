const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const routers = require('./routers');

const app = new Koa();
const router = new Router();

app.use(bodyParser())
const BASE_URL = '/ecache/api';
router.use(BASE_URL, routers.routes());
app.use(router.routes());

app.listen(8899);