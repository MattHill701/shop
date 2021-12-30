const { client } = require("./users");

async function createProduct(reportFields) {
  // Get all of the fields from the passed in object
  const { name, description, price, seller, category, inventory, picture, reviews } = reportFields;
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, seller, category, inventory, picture, reviews)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [name, description, price, seller, category, inventory, picture, reviews]
    );
    // return the new product
    console.log(product)
    return product;
  } catch (error) {
    throw error;
  }
}
// used in loop when showing all products. only owner/seller should be able to delete.
async function deleteProduct(productId) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      DELETE FROM products
      WHERE id=$1;
      `,[productId]);
      
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByName(name) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      SELECT * FROM products
      WHERE name=$1;
      `,[name]);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsBySeller(seller) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      SELECT * FROM products
      WHERE seller=$1;
      `,[seller]);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategory(category) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      SELECT * FROM products
      WHERE category=$1;
      `,[category]);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByPriceRange(num1,num2) {
  try {
    const {
      rows: [products],
    } = await client.query(`
      SELECT * FROM products
      WHERE seller BETWEEN $1 AND $2
      `, [num1,num2]);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
    SELECT * FROM products;
    `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(id, name, description, price, category, inventory, picture) {
  try{
    const {rows:[that]} = await client.query(
      `
      UPDATE products
      SET
      name = $1,
      description = $2,
      price = $3,
      category = $4,
      inventory = $5,
      picture = $6
      WHERE id=$7;
      `,[name, description, price, category, inventory, picture, id]
    )
    return that;
  }catch (error){
    throw error;
  }
}

async function updateProductAdmin(id, name, description, price, category, inventory, picture, reviews) {
  try{
    const {rows:[that]} = await client.query(
      `
      UPDATE products
      SET
      name = $1,
      description = $2,
      price = $3,
      category = $4,
      inventory = $5,
      picture = $6
      reviews = $8
      WHERE id=$7;
      `,[name, description, price, category, inventory, picture, id, reviews]
    )
    return that;
  }catch (error){
    throw error;
  }
}

async function addReview(object, productId) {
  try {
    const {
      rows: [product],
    } = await client.query(`
      UPDATE products
      SET reviews = reviews || $1 ::jsonb
      WHERE id=$2;
      `, [object, productId]);
      
    return product;
  } catch (error) {
    throw error;
  }
}

async function addProductToCart(fields, userId) {
  const { price } = fields
  try {
    const {
      rows: [product],
    } = await client.query(`
      UPDATE users
      SET cart = cart || $1 ::jsonb
      currentprice = $3
      WHERE id=$2;
      `, [fields, userId, price]);
      
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProductInCart(quantity, price, productId, userId) {
  try {
    const {
      rows: [product],
    } = await client.query(`
      UPDATE users
      SET cart = cart || $1 ::jsonb
      WHERE id=$2;
      `, [fields, userId]);
      
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductsByName,
  getAllProducts,
  deleteProduct,
  updateProduct,
  updateProductAdmin,
  getProductsByCategory,
  getProductsBySeller,
  getProductsByPriceRange,
  addReview
};
