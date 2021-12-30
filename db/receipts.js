const { client } = require("./users");

async function createReceipt(reportFields) {
    // Get all of the fields from the passed in object
    const { name, items, totalprice, date } = reportFields;
    try {
      // insert the correct fields into the reports table
      // remember to return the new row from the query
      const {
        rows: [ receipt ],
      } = await client.query(`
      INSERT INTO receipts(name, items, totalprice, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [ name, items, totalprice, date ]
      );
      console.log(receipt)
      return receipt;
    } catch (error) {
      throw error;
    }
  }

  async function getAllReceipts() {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM receipts
      `
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async function getReceiptsByName(name) {
    try {
      const { rows } = await client.query(
        `
        SELECT * FROM receipts 
        WHERE name=$1 
      `,[name]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
      createReceipt,
      getAllReceipts,
      getReceiptsByName,
  }