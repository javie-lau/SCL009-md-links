#!/usr/bin/env node

const pathNode= require("path");
const fs = require("fs");//exportando fs
const marked= require('marked');//exportando marked que es el que extrae link
const util = require('util');
const fetch= require('node-fetch');
let chalk = require('chalk');
//node ./aprendiendo.js ./README.md
process.argv.forEach((option, index) => {//vemos posiciones de lo que escribe el ususrio
 // console.log("index:", index, "valor:", option);
});

let path_to_file = process.argv[2];//ruta, process.argv llama lo que escribe el usuario en consola
path_to_file = pathNode.resolve(path_to_file);// la vuelve absoluta
let option_1 = process.argv[3];//deberi ser validate
let option_2 = process.argv[4];//deberia ser stats
let stats = false;
let validate = false;

if(option_1=== '--validate'){
  validate= true;
}
if(option_1==='--stats'){
  stats=true;
}
if(option_2=== '--validate'){
  validate= true;
}
if(option_2==='--stats'){
  stats=true;
}




/* me dice si la ruta es un directorio y isDirectory se tiene que convertir a asincrona a través de async*/ 
const isDirectory = async path_to_file=>{ //async convierte inmediatamente en una promesa y await hace creer que esat haciendo un funcionamiento sincrono 
  try {
    return(await util.promisify(fs.lstat)(path_to_file)).isDirectory()
  }
  catch(e){
   // console.log(e);
    return false
  }

  }
/*aqui le preguntamos si es directorio o archivo y si es directorio aplicamos funcion de filehound y si no funcion de fs */
  //  function pathUser (path){
  //    isDirectory(path)
  //     .then(res => {
  //       console.log(res);
  //       isdir = res;
  //       if(isdir){
  //         getMdFilehound(path)
  //       } else {
  //         links(path)
  //       // console.log("ES FALSE");
  //       }
  //     })
  // }

  // pathUser(path_to_file);

//funcion f.s para leer archivo.md

const links = (path) =>{   //llamamos la variable que contiene la ruta
  if(pathNode.extname(path) != ".md"){//El método path.extname () devuelve la extensión de una ruta de archivo. entonces si es distinto a md tira error
    console.log("Es archivo pero no .md")  
 }else{
 return new Promise((resolve,reject)=>{// convertimos en promesa
  fs.readFile(path,"utf8", (err,data) =>{
    if(err){ 
      reject(err); 
 }else{
     console.log("Ruta o archivo md", path);
   
       let links =[];

         const renderer = new marked.Renderer();//renderer es un metodo de marked

            renderer.link = function(href, title, text){//link tb es metodo de marked

             links.push({//ponemos dentro de la const links los elementos que necesitamos
        
             href:href,
             text:text,
             file:path_to_file
      
             })

            }
    marked(data, {renderer:renderer})
    resolve(links)
    linkValidate(links)
    linkStats(links) 
  }
})


})
}

}

   

 
/*aqui sde toma el directorio se recoore y sus elementos se envias a links,(fs) */
  const FileHound = require("filehound");

  function getMdFilehound(path){

  const files = FileHound.create()
    .paths(path_to_file)
    .ext('md')
    .find();
  
     
  let arrayFilehound = [];
  files
    .then(res => {
      arrayFilehound = res;
      arrayFilehound.forEach(element => {
        links(element);
        
        
      });
      
        
      })
      .catch(err=>{
        console.log(err)

      })
  };   
   getMdFilehound();
  
   function linkValidate(links){
     let status =[];
     let urls =[];
    links.forEach(element => {
     if(validate === false && stats === false){
      console.log('Elementos de tu .md', element.file, element.href, element.text);
      }
        if(validate=== true){
         fetch(element.href)
        .then (res =>{

            
            //console.log(res.url, res.status, res.statusText);
            status= res.status;
            urls = res.url;
            console.log(chalk.green('Estos links están validados correctamente'),chalk.blue.bold( urls, status));
            
        })
        
        .catch(err=>{
          console.log(chalk.green('links con errores'),chalk.red.bold(err.message, err.code));

        })
    
      }
    })
  }
  /** esta funcion cuenta los link totatel, links unicos y link rotos , itera los href a traves de el parametro links que viene de la const links a través de map() y luego con la propiedad new set  que almacena valores únicos y luego con filter creamos un nuevo array con las condiciones dadas  */

  function linkStats(links) {
    let countLink =[];
       if(stats===true){
       const LinkIterab = links.map(el=> el.href);
       countLink= LinkIterab.length;
       let linkUnique =[...new Set(LinkIterab)].length;
       let linkBroken = links.filter(elem=> elem.status === 0 || elem.status >= 400).length;
       console.log (chalk.blue('Cantidad de links',chalk.underline.bold.yellow(countLink),'links únicos',chalk.underline.bold.yellow(linkUnique),'links rotos',chalk.underline.bold.yellow(linkBroken)));
       }
      }
       
  
  
  /** aqui llamo a la funcion general md-link, convierto en promesas el resto me queda la duda
   *  con option ya que nose donde se usa, me falta hacer los export y los test.
   * 
   */
         
const mdLinks = (path, options) => {
  return new Promise((resolve, reject)=>{
       isDirectory(path)
            .then(res=>{
                 let isDir = res;
                 if(isDir){
                      console.log("directorio")
                     resolve(getMdFilehound(path)); 
                 }if(isDir===false){
                       console.log("archivo");
                       resolve(links(path))

                     }
                    })
                     .catch(err=>{
                       reject(err);

                    })
               
                     
                

            
           
 })
}
mdLinks(path_to_file);
