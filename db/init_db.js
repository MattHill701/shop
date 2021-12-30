// code to build and initialize DB goes here
const { user } = require("pg/lib/defaults");
const {
  createSeller,
  getUserByUsername,
  createProduct,
  client,
  createUser,
  getAllUsers,
  getAllProducts,
  getAllSellers,
  createReceipt,
  createAdmin,
  addProductToSeller,
  addProductToOrder
} = require("./index");

async function dropTables() {
  try {
    console.log("starting to drop tables");
    await client.query(`
    DROP TABLE IF EXISTS admin;
    DROP TABLE IF EXISTS receipts;
    DROP TABLE IF EXISTS sellers;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);

    console.log("finished dropping tables");
  } catch (error) {
    console.log("error building tables");
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Starting to build tables");
    await client.query(`
    CREATE TABLE admin(
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      pin INTEGER NOT NULL
    );
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        cart jsonb,
        currentprice INTEGER
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        seller TEXT NOT NULL,
        price INTEGER,
        category TEXT NOT NULL,
        inventory INTEGER,
        picture TEXT NOT NULL,
        reviews jsonb
      );
      CREATE TABLE sellers(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        description TEXT NOT NULL
      );
      CREATE TABLE receipts(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        items jsonb,
        totalprice INTEGER,
	      date TEXT NOT NULL 
      );
    `);

    // build tables in correct order
    console.log("finished building tables");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Trying to create users...");
    const userOne = await createUser({
      username: "frisk",
      password: "frisk",
      cart: '[{"id": "1", "name": "Nice Cream", "description": "Instead of a joke, the wrapper says something nice.", "seller": "Nice Cream Guy", "price": "1500", "category": "Sweets", "quantity": 1}]',
      currentprice: 1500,
    });
    const userTwo = await createUser({
      username: "papyrus",
      password: "papyrus",
      cart: '[{"id": "1", "name": "Nice Cream", "description": "Instead of a joke, the wrapper says something nice.", "seller": "Nice Cream Guy", "price": "1500", "category": "Sweets", "quantity": 1}]',
      currentprice: 1500,
    });
    const userThree = await createUser({
      username: "sans",
      password: "sans",
      cart: '[{"id": "1", "name": "Nice Cream", "description": "Instead of a joke, the wrapper says something nice.", "seller": "Nice Cream Guy", "price": "1500", "category": "Sweets", "quantity": 1}]',
      currentprice: 1500,
    });
    console.log("Success creating users!");
    return [userOne, userTwo, userThree];
  } catch (error) {
    console.error("Error while creating reports!");
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Trying to create Products...");
    const ProductOne = await createProduct({
      name: "Nice Cream",
      description: "Instead of a joke, the wrapper says something nice.",
      seller: "Nice Cream Guy",
      price: "1500",
      category: "Sweets",
      inventory: "50",
      picture: "https://external-preview.redd.it/QzJCwbxdhjgMfIMTtQPNkdflRgdXlayGoH6zzrM6foY.jpg?auto=webp&s=712b1a3a55a8617dd77331cacd9c11c6c755aadd",
      reviews: '[]',
    });
    const ProductTwo = await createProduct({
      name: "Bisicle",
      description: "It's a two-pronged popsicle, so you can eat it twice.",
      seller: "Snowdin Shopkeeper",
      price: "1500",
      category: "Sweets",
      inventory: "30",
      picture: "https://i.kym-cdn.com/photos/images/newsfeed/001/035/517/78e.jpg",
      reviews: '[]'
    });
    const ProductThree = await createProduct({
      name: "Cinnamon Bunny",
      description: "A Cinnamon roll in a shape of a bunny.",
      seller: "Snowdin Shopkeeper",
      price: "2500",
      category: "Sweets",
      inventory: "30",
      picture: "https://64.media.tumblr.com/ee1f50c4a9cbd9f6a880e7135d93f78e/tumblr_nynqx6xYVX1qh8t5wo1_1280.png",
      reviews: '[]'
    });
    const ProductFour = await createProduct({
      name: "Crab Apple",
      description: "An aquatic fruit that resembles a crustacean.",
      seller: "Gerson",
      price: "2500",
      category: "Fruit",
      inventory: "50",
      picture: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/77d85f1d-d550-434e-973a-2ec5c90d80ab/db377bh-8d97536b-ff30-46a0-986f-d94e8649a07c.jpg/v1/fill/w_1024,h_1435,q_75,strp/crab_apple_by_synerese_db377bh-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQzNSIsInBhdGgiOiJcL2ZcLzc3ZDg1ZjFkLWQ1NTAtNDM0ZS05NzNhLTJlYzVjOTBkODBhYlwvZGIzNzdiaC04ZDk3NTM2Yi1mZjMwLTQ2YTAtOTg2Zi1kOTRlODY0OWEwN2MuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.e8Ib0TBSOmEon5FPGuqxeLWF3reXEi09oov7-0RBFws",
      reviews: '[]'
    });
    const ProductFive = await createProduct({
      name: "Sea Tea",
      description: "Made from glowing marshwater.",
      seller: "Gerson",
      price: "1800",
      category: "Drink",
      inventory: "50",
      picture: "https://i.ytimg.com/vi/rzYXC2rm-98/maxresdefault.jpg",
      reviews: '[]'
    });
    const ProductSix = await createProduct({
      name: "Spider Donut",
      description: "A donut made with Spider Cider in the batter.",
      seller: "Spider Bake Sale", 
      price: "700",
      category: "Sweets",
      inventory: "82",
      picture: "https://64.media.tumblr.com/4d0da42f1d90ee065eb1ad7c20c56817/tumblr_o8muxnFkWr1vxq2wio1_1280.png",
      reviews: "[]"
    });
    const ProductSeven = await createProduct({
      name: "Spider Cider",
      description: "Made with whole spiders, not just the juice.",
      seller: "Spider Bake Sale", 
      price: "1800",
      category: "Sweets",
      inventory: "82",
      picture: "https://timkanebooks.files.wordpress.com/2016/05/swz0sfa.jpg",
      reviews: "[]"
    });
    const ProductEight = await createProduct({
      name: "Temmie Flakes",
      description: "It's just torn up pieces of colored construction paper.",
      seller: "Temmie Shopkeeper",
      price: "300",
      category: "Other",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductNine = await createProduct({
      name: "tem pay 4 colleg",
      description: "COLLEGE tem pursu higher education",
      seller: "Temmie Shopkeeper",
      price: "100000",
      category: "exotic",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductEleven = await createProduct({
      name: "Junk Food",
      description: "Food that was probably once thrown away.",
      seller: "Bratty and Catty",
      price: "2500",
      category: "Other",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductTwelve = await createProduct({
      name: "Mystery Key",
      description: "????? Probably to someone's house LOL.",
      seller: "Bratty and Catty",
      price: "60000",
      category: "Other",
      inventory: "1",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductThirteen = await createProduct({
      name: "Starfait",
      description: "A sweet treat made of sparkling stars.",
      seller: "Burgerpants",
      price: "6000",
      category: "sweets",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductTen = await createProduct({
      name: "Glamburger",
      description: "A hamburger made of edible glitter and sequins.",
      seller: "Burgerpants",
      price: "12000",
      category: "sandwich",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductFourteen = await createProduct({
      name: "Legendary Hero",
      description: "Sandwich shaped like a sword.",
      seller: "Burgerpants",
      price: "30000",
      category: "sandwich",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductFifteen = await createProduct({
      name: "Steak in the Shape of Mettaton's Face",
      description: "Huge steak in the shape of Mettaton's face.",
      seller: "Burgerpants",
      price: "50000",
      category: "Other",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[]'
    });
    const ProductSixteen = await createProduct({
      name: "Hot Dog...?",
      description: "The 'meat' is made of something called a 'water sausage.'",
      seller: "Sans",
      price: "3000",
      category: "sandwich",
      inventory: "50",
      picture: "oof can't find",
      reviews: '[{"user":"sans", "rating":"5", "message":"Pretty Good", "date":"12/19/21"}]'
    });
    console.log("Success creating Product!");
    return [
           ProductOne, ProductTwo, ProductThree, ProductFour,
           ProductFive, ProductSix, ProductSeven, ProductEight, 
           ProductNine, ProductTen, ProductEleven, ProductTwelve,
           ProductThirteen, ProductFourteen, ProductFifteen, ProductSixteen
          ];
  } catch (error) {
    console.error("Error while creating Products!");
    throw error;
  }
}

async function createInitialSellers() {
  try {
    console.log("Trying to create sellers...");
    const userOne = await createSeller({
      username: "Nice Cream Guy",
      password: "Nice Cream Guy",
      description: "Nice Cream Guy",
    });
    const userTwo = await createSeller({
      username: "Snowdin Shopkeeper",
      password: "Snowdin Shopkeeper",
      description: "Snowdin Shopkeeper",
    });
    const userThree = await createSeller({
      username: "Gerson",
      password: "Gerson",
      description: "Gerson",
    });
    const userFour = await createSeller({
      username: "Spider Bake Sale",
      password: "Spider Bake Sale",
      description: "Come eat food made by spiders, for spiders, of spiders!",
    });
    const userFive = await createSeller({
      username: "Temmie Shopkeeper",
      password: "Temmie Shopkeeper",
      description: "hOI! welcom to... da TEM SHOP!!!",
    });
    const userSix = await createSeller({
      username: "Bratty and Catty",
      password: "Bratty and Catty",
      description: "Bratty and Catty",
    });
    const userSeven = await createSeller({
      username: "Burgerpants",
      password: "Burgerpants",
      description: "Burgerpants",
    });
    const userEight = await createSeller({
      username: "Sans",
      password: "Sans",
      description: "Sans",
    });
    console.log("Success creating sellers!");
    return [userOne, userTwo, userThree, userFour, userFive, userSix, userSeven, userEight];
  } catch (error) {
    console.error("Error while creating sellers!");
    throw error;
  }
}

async function createInitialReceipts() {
  try {
    console.log("Trying to create receipts...");
    const orderOne = await createReceipt({
      name: 'frisk',
      items: '[{"id": "1", "name": "Nice Cream", "description": "Instead of a joke, the wrapper says something nice.", "seller": "Nice Cream Guy", "price": "1500", "category": "Sweets", "quantity": 1}]',
      totalprice: 1500,
      date: '12/20/21'
    });
    const orderTwo = await createReceipt({
      name: 'papyrus',
      items: `[{"id": "2", "name": "Bisicle", "description": "It's a two-pronged popsicle, so you can eat it twice.", "seller": "Snowdin Shopkeeper", "price": "3000", "category": "Sweets", "quantity": 2}]`,
      totalprice: 3000,
      date: '12/20/21'
    });
    const orderThree = await createReceipt({
      name: 'sans',
      items: '[{"id": "3", "name": "Cinnamon Bunny", "description": "A Cinnamon roll in a shape of a bunny.", "seller": "Snowdin Shopkeeper", "price": "2500", "category": "Sweets", "quantity": 1}]',
      totalprice: 2500,
      date: '12/20/21'
    });
    console.log("Success creating receipts!");
    return [orderOne, orderTwo, orderThree];
  } catch (error) {
    console.error("Error while creating receipts!");
    throw error;
  }
}


async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await buildTables();
    await createAdmin();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialSellers();
    await createInitialReceipts();
  } catch (error) {
    console.log("error during rebuildDB");
    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
