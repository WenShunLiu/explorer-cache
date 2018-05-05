const Router = require('koa-router');
// const html = require('../assets/index.html');

const router = new Router();
// ETag 列表
const LIST = ['JKSDJK', 'jdaksdjka', 'jkJkkjjk', 'lkJggMh'];

let list_flag = 0;

// 模拟接口改变，改变ETag
let flag = 4;

// 假装是随机生成的ETag
let ETag = changeEtag();

router.get('/etag', async ctx => {

  // 获取req header中的If-None-Match
  const curEtag = ctx.get('If-None-Match');


  // 如果flag为4的倍数，模拟文件被修改，修改ETag
  if (flag%4 === 0) {
    ETag = changeEtag();
  }

  // 必须每次返回ETag，浏览器不会保存以前的头部信息
  ctx.set('ETag', ETag);

  console.log('curEtag: ', curEtag);
  console.log('ETag: ', ETag);
  console.log('---------------------------')


  ctx.set('X-true-flag', flag);
  // 如果ETag一致，则使用缓存
  if (curEtag === ETag) {
    flag ++;
    ctx.status = 304;
    return;
  }
  

  ctx.status = 200;
  ctx.body = `flag: ${flag ++}`
})

module.exports = router;


function changeEtag() {
  const ETag = LIST[flag%4 + list_flag];
  list_flag ++;
  return ETag;
}