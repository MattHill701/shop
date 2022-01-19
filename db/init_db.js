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
      category: "Sweets",
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
      category: "Drink",
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
      picture: "https://i.pinimg.com/originals/46/7e/db/467edbc240fc9cf23838ad72d65ada8f.jpg",
      reviews: '[]'
    });
    const ProductNine = await createProduct({
      name: "tem pay 4 colleg",
      description: "COLLEGE tem pursu higher education",
      seller: "Temmie Shopkeeper",
      price: "100000",
      category: "Other",
      inventory: "50",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBAlCpak3y3dFsjOysViPt9XqSVIxQr4DqMQ&usqp=CAU",
      reviews: '[]'
    });
    const ProductEleven = await createProduct({
      name: "Junk Food",
      description: "Food that was probably once thrown away.",
      seller: "Bratty and Catty",
      price: "2500",
      category: "Other",
      inventory: "50",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHiVwGr2SgpP0oOlDl_rawB5nwBJnNRlP0-A&usqp=CAU",
      reviews: '[]'
    });
    const ProductTwelve = await createProduct({
      name: "Mystery Key",
      description: "????? Probably to someone's house LOL.",
      seller: "Bratty and Catty",
      price: "60000",
      category: "Other",
      inventory: "1",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgRwkyN3SErL1W5s3QfqjxY-gHzGBYgHRcw&usqp=CAU",
      reviews: '[]'
    });
    const ProductThirteen = await createProduct({
      name: "Starfait",
      description: "A sweet treat made of sparkling stars.",
      seller: "Burgerpants",
      price: "6000",
      category:`Sweets`,
      inventory: "50",
      picture: `data:image/jpeg;base64,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`,
      reviews: '[]'
    });
    const ProductTen = await createProduct({
      name: "Glamburger",
      description: "A hamburger made of edible glitter and sequins.",
      seller: "Burgerpants",
      price: "12000",
      category: "Sandwich",
      inventory: "50",
      picture: "data:image/jpeg;base64,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",
      reviews: '[]'
    });
    const ProductFourteen = await createProduct({
      name: "Legendary Hero",
      description: "Sandwich shaped like a sword.",
      seller: "Burgerpants",
      price: "30000",
      category: "Sandwich",
      inventory: "50",
      picture: "data:image/jpeg;base64,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",
      reviews: '[]'
    });
    const ProductFifteen = await createProduct({
      name: "Steak in the Shape of Mettaton's Face",
      description: "Huge steak in the shape of Mettaton's face.",
      seller: "Burgerpants",
      price: "50000",
      category: "Other",
      inventory: "50",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjUT2pLmRW1UEvovB2miZrzo9JSz5v5nc0EQ&usqp=CAU",
      reviews: '[]'
    });
    const ProductSixteen = await createProduct({
      name: "Hot Dog...?",
      description: "The 'meat' is made of something called a 'water sausage.'",
      seller: "Sans",
      price: "3000",
      category: "Sandwich",
      inventory: "50",
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqR5dxgk2Sa31_HnXd8kRADeOZRad2yaQrRw&usqp=CAU",
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
      description: "It's the frozen treat that warms your heart!",
    });
    const userTwo = await createSeller({
      username: "Snowdin Shopkeeper",
      password: "Snowdin Shopkeeper",
      description: "Hello, traveller. How can I help you?",
    });
    const userThree = await createSeller({
      username: "Gerson",
      password: "Gerson",
      description: "Woah there! I've got some neat junk for sale.",
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
      description: "You should buy ALL our stuff!",
    });
    const userSeven = await createSeller({
      username: "Burgerpants",
      password: "Burgerpants",
      description: "Welcome to MTT-Brand Burger Emporium, home of the Glamburger.",
    });
    const userEight = await createSeller({
      username: "Sans",
      password: "Sans",
      description: "i'm sans. sans the skeleton.",
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
