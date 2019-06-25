const path = require("path");
let path_to_file = process.argv[2];//ruta, process.argv llama lo que escribe el usuario en consola
path_to_file = path.resolve(path_to_file);// la vuelve absoluta
console.log(path_to_file);


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
      console.log(links)
  })
//console.log(links('./readme.md'));
}

//links(path_to_file);

const FileHound = require("filehound");

function getMdFilehound(path_to_file){
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
      console.log(links);
      
    });
    return arrayFilehound;
      
    });
};   
const array= getMdFilehound(path_to_file);
console.log(array);
//files.forEach(element => {
//  console.log(element);
  
//});