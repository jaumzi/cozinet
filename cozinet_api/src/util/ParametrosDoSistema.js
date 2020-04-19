
const fs = require('fs');

class Parametros {
  constructor() {
    this.params = undefined;
  }
  load() {
    const result = JSON.parse(fs.readFileSync(__dirname +'/Constants.json'));
    this.params = result;
  }
}

// singleton evitar problemas com performance ;)
let instancia = undefined;
const ParametrosDoSistema = () => {
  if(!instancia){
    instancia = new Parametros();
    instancia.load();
  }
  return instancia;
}

module.exports = ParametrosDoSistema;