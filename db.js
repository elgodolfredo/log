const { PromisedDatabase } = require("promised-sqlite3"); 
const db = new PromisedDatabase();

const initialize = async () => {
  await db.open("./internos.sqlite");
  await db.run("CREATE TABLE IF NOT EXISTS internos (interno INTEGER, descrip TEXT)");
};

const getInternos = () => {
  return db.all("SELECT * FROM internos");
}

const getInterno = (numInterno) => {
  return db.get('SELECT * FROM internos WHERE interno = ?', numInterno);
}


const insertInterno = async (numInterno, values) => {
  await db.run("INSERT INTO internos VALUES(?, ?)", [numInterno, values.descrip]);
  return getInterno(numInterno);
}

const updateInterno = async (numInterno, values) => {
  await db.run("UPDATE internos SET descrip = ? WHERE interno = ?", [values.descrip, numInterno]);
  return getInterno(numInterno);
}

module.exports = {
  initialize, getInternos, getInterno, insertInterno, updateInterno
};
