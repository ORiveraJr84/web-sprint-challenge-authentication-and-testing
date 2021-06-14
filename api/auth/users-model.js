const db = require("../../data/dbConfig.js");

function get() {
  return db("users").select("id", "username", "password");
}

function getById(id) {
  return db("users").select("id", "username", "password").where({ id }).first();
}

function getUserBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

async function register(user) {
  const [id] = await db("users").insert(user);
  return getById(id);
}

module.exports = {
  get,
  getById,
  getUserBy,
  register,
};
