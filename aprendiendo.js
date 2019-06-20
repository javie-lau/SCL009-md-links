
process.argv.forEach((option, index) => {//vemos posiciones de lo que escribe el ususrio
  console.log("index:", index, "valor:", option);
});

let path_to_file = process.argv[2];//ruta
let option_1 = process.argv[3];//deberi ser validate
let option_2 = process.argv[4];//deberia ser stats

// console.log("path:", path_to_file);
// console.log("option 1:", option_1);
// console.log("option 2:", option_2);

const fs = require("fs");//exportando fs
const marked= require('marked');//exportando marked que es el que extrae link


const links = (path_to_file) =>{//llamamos la variable que contiene la ruta
    fs.readFile(path_to_file,"utf8", (err,data) =>{
      console.log("Ruta o archivo md", path_to_file);
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

  links(path_to_file);



/* array1.forEach (function(element){
  console.log(element)
}) */
// console.log(process.argv);
// process.argv.forEach((val,index)=> {
//   console.log(`${index}: ${val}`);
// })


  

/*let readme = fs.readFileSync('README.md','utf-8');
console.log(readme);
const path = require("path");
links.forEach(function (element) {
    fetch(element)
  .then((res) => {
      console.log(res.url + "-" + res.status + "==>" + res.statusText);
  }
}

let markdownLinkExtractor = require('markdown-link-extractor');*/
