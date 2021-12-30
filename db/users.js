const { Client } = require("pg");
const DB_NAME = "shop";
const DB_URL =
  process.env.DATABASE_URL || `postgres://postgres@localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
// database methods

async function updateCart(cart, id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users 
      SET cart=$2 
      WHERE id=$1 
    `,
      [id, cart]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(reportFields) {
  // Get all of the fields from the passed in object
  const { username, password, cart, currentprice } = reportFields;
  try {
    // insert the correct fields into the reports table
    // remember to return the new row from the query
    const {
      rows: [users],
    } = await client.query(
      `
    INSERT INTO users(username, password, cart, currentprice)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [username, password, cart, currentprice]
    );
    // return the new report
    console.log(users)
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users 
      WHERE username=$1
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM users 
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE id=$1
    `,
      [userId]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createUser,
  getUserByUsername,
  getAllUsers,
  getUserById,
  updateCart
};
