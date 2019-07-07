const pathNode= require("path");
const fs = require("fs");//exportando fs
const marked= require('marked');//exportando marked que es el que extrae link
const util = require('util');
const fetch= require('node-fetch');
let chalk = require('chalk');

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
    // linkValidate(links)
    // linkStats(links) 
  }
})


})
}

}

   

 
/*aqui sde toma el directorio se recoore y sus elementos se envias a links,(fs) */
  const FileHound = require("filehound");

  function getMdFilehound(path){
    return new Promise((resolve,reject)=>{



    
  const files = FileHound.create()
    .paths(path_to_file)
    .ext('md')
    .find();
  
     
  let arrayFilehound = [];
  files
    .then(res => {
      arrayFilehound = res;
      arrayFilehound.forEach(element => {
        resolve (links(element));
        
        
      });
      
        
      })
      .catch(err=>{
        reject(console.log(err))

      })
    })
  };  
 
   /**valida los link con status de fetch */
  
   function linkValidate(links){
     let status =[];
     let urls =[];
    links.forEach(element => {
    
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
    
      
    })
  }
  /** esta funcion cuenta los link totatel, links unicos y link rotos , itera los href a traves de el parametro links que viene de la const links a través de map() y luego con la propiedad new set  que almacena valores únicos y luego con filter creamos un nuevo array con las condiciones dadas  */

  function linkStats(links) {
       
       if (stats===true){
       let countLink =[];
      
       const LinkIterab = links.map(el=> el.href);
       countLink= LinkIterab.length;
       let linkUnique =[...new Set(LinkIterab)].length;
       console.log (chalk.blue('Cantidad de links',chalk.underline.bold.yellow(countLink),'links únicos',chalk.underline.bold.yellow(linkUnique)));
      }
    }

    function statsValidate (links){
        let linkBroken = links.filter(elem=> elem.status === 0 || elem.status >= 400).length;
        console.log (chalk.blue('links rotos'),chalk.underline.bold.yellow(linkBroken));
        

    }
  
   module.exports = {
     isDirectory,
     links,
     getMdFilehound,
     linkValidate,
     linkStats,
     statsValidate
        
        
     }
     