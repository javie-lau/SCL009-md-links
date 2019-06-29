const fs = require("fs");//exportando fs

const readAFiles = (path,type) =>{//llamamos la variable que contiene la ruta
    return new Promise ((resolve, reject)=>{
      fs.readFile(path,"utf-8", (err,data) =>{
        if(err){
          reject(err);
        }else{
          resolve(data)
        }
        // err? reject (err) : resolve(content) otra forma de escribir lo de arriba
      })

    })
}

readAFiles("README.md", "utf-8")
.then(res =>{
    console.log("tu archivo dice", res);
})
.catch(err =>{
    console.log(err);
})


// // funcion que lee archivo y extrae los links
const links = (path) =>{
  if(pathNode.extname(path) != ".md"){
     console.log("Es archivo pero no .md")  
  }else{
  return new Promise((resolve,reject)=>{
      
       fs.readFile(path,"utf-8", (err,data) =>{
            if(err){ 
                 reject(err); 
            }else{
                 let links =[];   
                 const renderer = new marked.Renderer();
                 renderer.link = function(href, title, text){
                      links.push({
                           href:href,
                           text:text,
                           file:path
                      }) 
                 }
                 marked(data, {renderer:renderer});
               

                 resolve(links);        
                 
                 
                 
            }
       })
  
      
  })
}
       
}

const links = (path) =>{//llamamos la variable que contiene la ruta
  if(path.extname(path) != ".md"){//El método path.extname () devuelve la extensión de una ruta de archivo. entonces si es distinto a md tira error
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

function linkStats(links) {
  if(stats===true){
 var countLink= links.length;
 console.log('Existen',countLink, 'link en tu .md');
 let countValidate = 0;
 links.forEach(el=>{
   fetch(el.href)
   .then(res=>{
    //  console.log(res);
     countValidate = countValidate + 1;
    // console.log('El total de link validados es',countValidate);
   })
   .catch(error => {
    console.log('aqui el  error',error);
    //let countErr = err.length;
    //console.log(countErr);
   });
 })
 console.log("aqui va countvalidate",countValidate);
  }



}
