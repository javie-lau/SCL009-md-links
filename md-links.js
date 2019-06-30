

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
                 
                       links(path)
                        .then(res=>{
                           resolve(linkValidate(res)||linkStats(res));
  
                        })
                        .catch(err=>{
                          reject(err);
                        })
                       
                   })
  
              
             
   })
  }
  mdLinks(path_to_file);
  