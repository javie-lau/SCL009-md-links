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