const path = require("path");
const fs = require("fs");//exportando fs
const marked= require('marked');//exportando marked que es el que extrae link
const util = require('util');
const fetch= require('node-fetch');
//node ./aprendiendo.js ./README.md
process.argv.forEach((option, index) => {//vemos posiciones de lo que escribe el ususrio
  console.log("index:", index, "valor:", option);
});

let path_to_file = process.argv[2];//ruta, process.argv llama lo que escribe el usuario en consola
path_to_file = path.resolve(path_to_file);// la vuelve absoluta
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
const isDirectory = async path_to_file=>{
  try {
    return(await util.promisify(fs.lstat)(path_to_file)).isDirectory()
  }
  catch(e){
    console.log(e);
    return false
  }
  }
/*aqui le preguntamos si es directorio o archivo y si es directorio aplicamos funcion de filehound y si no funcion de fs */
   function pathUser (path){
     isDirectory(path)
      .then(res => {
        console.log(res);
        isdir = res;
        if(isdir){
          getMdFilehound(path)
        } else {
          links(path)
         console.log("ES FALSE");
        }
      })
  }

  pathUser(path_to_file);

//funcion f.s para leer archivo.md
 const links = (path) =>{//llamamos la variable que contiene la ruta
    fs.readFile(path,"utf8", (err,data) =>{
      console.log("Ruta o archivo md", path);
      if(err){
        throw err;
      }
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
      linkValidate(links)
      linkStats(links) 
    })
  //console.log(links('./readme.md'));
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
      
        
      });
  };   
   getMdFilehound();
  
   function linkValidate(links){
     let ok =[];
    links.forEach(element => {
     if(validate === false && stats === false){
      console.log('false', element.file, element.href, element.text);
      }
        if(validate=== true){
         fetch(element.href)
        .then (res =>{
            
            console.log(res.url, res.status, res.statusText);
            ok= res.status;
            console.log('este es ok', ok);
            
        })
        
        .catch(err=>{
          console.log(err.message, err.code);

        })
    
      }
    })
  }

  function linkStats(links) {
       if(stats===true){
      let countLink= links.length;
      console.log('Existen',countLink, 'link en tu .md');
      links.forEach(el=>{
        fetch(el.href)
        .then(res=>{
          let rest = res.status;
          let countValidate = rest.length;
          console.log('El total de link validados es',countValidate);
        })
        .catch(err=>{
          let countErr = err.length;
          console.log(countErr);
        })
      })
       }
    

    
  }
  
    