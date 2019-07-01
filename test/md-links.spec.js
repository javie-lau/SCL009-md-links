import {links} from '../index.js'


describe('mdLinks', () => {

  it('Debería retornar los 3 links que se encuentran en test.md', () => {
    expect(links('test.md')).resolves.toEqual(['https://www.npmjs.com/package/chalk/v/1.0.0', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Set']);;
  });

});
