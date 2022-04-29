#!/bin/env node

const fs = require('fs')
const https = require('https');

const download = url => {
  const filename = url.substring(url.lastIndexOf('/')+1)
  let dest = '../static/assets/' + filename
  let file = fs.createWriteStream(dest);
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => file.close())
  }).on('error', err => {
    fs.unlink(dest);
    console.log(err.toString());
  });
};

// filesystem
/*
let products = JSON.parse(fs.readFileSync('../data/products.json'));
// let products = JSON.parse(fs.readFileSync('../data/remotes.json'));
products.forEach(product => {
  // download(product.thumbnail)
  // console.log(product.thumbnail)
  // download(product.thumbnail2)
  // console.log(product.thumbnail2)
  // console.log(`${product['id_imweb']}        ${product['id']}`)
})
*/
