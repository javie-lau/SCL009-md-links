#!/usr/bin/env node

const pathNode= require("path");
const fs = require("fs");//exportando fs
const marked= require('marked');//exportando marked que es el que extrae link
const util = require('util');
const fetch= require('node-fetch');
let chalk = require('chalk');
//const mdLink = require('./md-links')
//console.log(mdLink);
//node ./aprendiendo.js ./README.md
process.argv.forEach((option, index) => {//vemos posiciones de lo que escribe el ususrio
 // console.log("index:", index, "valor:", option);
});

let path_to_file = process.argv[2];//ruta, process.argv llama lo que escribe el usuario en consola
path_to_file = pathNode.resolve(path_to_file);// la vuelve absoluta


let stats = false;
let validate = false;

if(process.argv[3]=== '--validate'||process.argv[4]=== '--validate'){
  validate= true;
}

if(process.argv[3]=== '--stats'||process.argv[4]=== '--stats'){
  stats=true;
}
 const options = {
   validate:validate,
   stats:stats
 };





  