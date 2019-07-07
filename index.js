#!/usr/bin/env node

const pathNode= require("path");
const mdLink = require('./md-links')

process.argv.forEach((option, index) => {//vemos posiciones de lo que escribe el ususrio
 
});


let path_to_file = process.argv[2];//ruta, process.argv llama lo que escribe el usuario en consola
path_to_file = pathNode.resolve(path_to_file);// la vuelve absoluta

let stats = false;
let validate = false;
/** creamos las variables con valor false y ponemos los parametros para que se vuelvan true a través de las option del usuario */

if(process.argv[3]=== '--validate'||process.argv[4]=== '--validate'){
  validate= true;
}

if(process.argv[3]=== '--stats'||process.argv[4]=== '--stats'){
  stats=true;
}
 

/**objeto con las options que llamamos luego en mdLink */
const options = {
  validate:validate,
  stats:stats
};
  
    /** aqui llamo a la funcion general md-link, convierto en promesas el resto me queda la duda
   *  con option ya que nose donde se usa, me falta hacer los export y los test.
   * 
   */
        
  const mdLinks = (path, options) => {
    console.log(options);
    return new Promise((resolve, reject)=>{
        mdLink.isDirectory(path)
              .then(res=>{
                   let isDir = res;
                   if(isDir){
                        console.log("directorio")
                     mdLink.getMdFilehound(path)
                        .then(res =>{
                         
                             if(options.stats===true && options.validate===true){
                            resolve(mdLink.statsValidate(res))

                             }
                             if(options.stats===true){
                               resolve(mdLink.linkStats(res))
                             }
                             else if(options.validate===true){
                               resolve(mdLink.linkValidate(res))
                             } else {
                              console.log(res)
                             }
                            })
                          }
                          
                   if(isDir===false){
                         console.log("archivo");
                        mdLink.links(path)
                         .then(res=>{
                           console.log(res);
                          if(options.stats===true && options.validate===true){
                            resolve(mdLink.statsValidate(res))

                             }
                             if(options.stats===true){
                               resolve(mdLink.linkStats(res))
                             }
                             else if(options.validate===true){
                               resolve(mdLink.linkValidate(res))
                             } else {
                              console.log(res)
                             }

                         })
  
                       }
                      })
                   
                       .catch(err=>{
                         reject(err);
  
                      })
                 
      
   

   
                    
})
  }
  mdLinks(path_to_file,options);
      
     
  
  