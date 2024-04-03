const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

const overview = fs.readFileSync('./templates/overview.html', 'utf-8');
const productTemp = fs.readFileSync('./templates/product.html', 'utf-8');
const card = fs.readFileSync('./templates/card.html', 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);
//*********** 3rd party module*********** */
const slug = dataObject.map((el) => slugify(el.productName, { lower: true }));
//console.log(slug);
//********************************************
const server = http.createServer((req, res) => {
  //console.log(req.url);
  //console.log(url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);

  // %OVER_VIEW%
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const over = dataObject.map((el) => replaceTemplate(card, el)).join('');
    const output = overview.replace(/%PRODUCT%/g, over);
    res.end(output);

    // %PRODUCT%
  } else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const prod = dataObject[query.id];
    const output = replaceTemplate(productTemp, prod);
    res.end(output);

    // %API%
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(data);
    // %NOT_FOUND%
  } else {
    res.writeHead(404, {
      'content-type': 'text/html',
      'my-head': 'Hello client',
    });
    res.end('<h1 style=color:red >There is something error.....</h1>');
  }
});
server.listen(8000, '127.0.0.1', () => {
  console.log('Server is listening for port 8000..........');
});
