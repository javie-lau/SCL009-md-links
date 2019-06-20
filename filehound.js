const FileHound = require("filehound");


const files = FileHound.create()
  .paths('/Users/PANGUI/OneDrive/Escritorio')
  .paths('/Users/PANGUI/OneDrive/Escritorio/SCL009-md-links')
  .ext('md')
  .find();

files.then(console.log);