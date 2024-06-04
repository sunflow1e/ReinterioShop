import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import client from './auth/db-connection.js'
import routerUser from './auth/routes/user-router.js'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()) //req.body

app.use('/user-auth', routerUser)

//MATERIAL

app.post('/material', (req, res) => {
  const { name } = req.body

  client
    .query('INSERT INTO materials (material_name) values ($1)', [name])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/material', (req, res) => {
  client
    .query('SELECT * FROM materials')
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/material/:id', (req, res) => {
  const { id } = req.params

  client
    .query('SELECT * FROM materials WHERE material_id = $1', [id])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.put('/material/:id', (req, res) => {
  const { name } = req.body
  const { id } = req.params

  client
    .query('UPDATE materials SET material_name = $1 WHERE material_id = $2', [
      name,
      id,
    ])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.delete('/material/:id', (req, res) => {
  const { id } = req.params

  client
    .query('DELETE FROM materials WHERE material_id = $1', [id])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

//CATEGORIES

app.post('/category', (req, res) => {
  const { name } = req.body
  const { image } = req.body

  client
    .query(
      'INSERT INTO categories (category_name, category_image) values ($1, $2)',
      [name, image]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/category', (req, res) => {
  client
    .query('SELECT * FROM categories WHERE category_id != 0')
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/category/:id', (req, res) => {
  const { id } = req.params

  client
    .query('SELECT * FROM categories WHERE category_id = $1', [id])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.put('/category/:id', (req, res) => {
  const { name } = req.body
  const { id } = req.params

  client
    .query('UPDATE categories SET category_name = $1 WHERE category_id = $2', [
      name,
      id,
    ])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.delete('/category/:id', (req, res) => {
  const { id } = req.params

  client
    .query('DELETE FROM categories WHERE category_id = $1', [id])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

//USER

// app.post("/user", (req, res) => {
//   const { name } = req.body;
//   const { surname } = req.body;
//   const { patronymic } = req.body;
//   const { password } = req.body;
//   const { email } = req.body;
//   const { address } = req.body;
//   const { role } = req.body;

//   client.query("INSERT INTO Users (user_name, user_surname, user_patronymic, user_password, user_email, user_address, user_role) values ($1, $2, $3, $4, $5, $6, $7)", [name, surname, patronymic, password, email, address, role])
//     .then((result) => {
//       res.status(200).send(result.rows);
//     }).catch((err) => {
//       console.error(err)
//       res.status(500).send()
//     });
// });

app.get('/user', (req, res) => {
  client
    .query('SELECT * FROM users')
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/user/:id', (req, res) => {
  const { id } = req.headers

  client
    .query('SELECT * FROM users WHERE user_id = $1', [Number.parseInt(id)])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.put('/user/updateprofile/:id', (req, res) => {
  const { name } = req.body
  const { surname } = req.body
  const { patronymic } = req.body
  const { email } = req.body
  const { phone } = req.body
  const { id } = req.params

  client
    .query(
      'UPDATE users SET user_name = $1, user_surname = $2, user_patronymic = $3, user_email = $4, user_phone = $5 WHERE user_id = $6',
      [name, surname, patronymic, email, phone, Number.parseInt(id)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.put('/user/updateaddress/:id', (req, res) => {
  const { address } = req.body
  const { id } = req.params

  client
    .query('UPDATE users SET user_address = $1 WHERE user_id = $2', [
      address,
      Number.parseInt(id),
    ])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.put('/user/updatephone/:id', (req, res) => {
  const { phone } = req.body
  const { id } = req.params

  client
    .query('UPDATE users SET user_phone = $1 WHERE user_id = $2', [
      phone,
      Number.parseInt(id),
    ])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.put('/user/updatepassword/:id', (req, res) => {
  const { password } = req.body
  const { id } = req.params

  client
    .query('UPDATE users SET user_password = $1 WHERE user_id = $2', [
      password,
      Number.parseInt(id),
    ])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

// // // // // // // // // // // // // // // // // // // // // // // // // //

//    P R O D U C T S   // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.get('/product/cards/:subcategoriesQueryString', (req, res) => {

  const { subcategoriesQueryString } = req.params
  //const subcategoriesQueryString = `AND subcategory_name = 'Зеркала'`

  client
    .query(
    `SELECT
    false as product_addedtocart,  
    false as product_addedtofavourite, 
    image_path, product_details.productd_id, color_name, color_hex, product_name, product_article, product_price,
    product_disc_price, product_discount, productd_dailyoffer, category_name, subcategory_name, productd_onstock,
    style_id, style_name 
   
    FROM subcategories, categories, images, products
    INNER JOIN product_details ON productd_product = product_id 
    INNER JOIN colors ON productd_color = color_id
    INNER JOIN styles ON style_id = product_id  
  
    WHERE subcategory_id = product_subcategory 
    AND subcategory_category = category_id 
    AND productd_image = image_id 
    AND productd_onstock > 1 `
    + subcategoriesQueryString +
    ` ORDER BY product_article`
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})


app.get('/product/cards/', (req, res) => {

  client
    .query(
    `SELECT
    false as product_addedtocart,  
    false as product_addedtofavourite, 
    image_path, product_details.productd_id, color_name, color_hex, product_name, product_article, product_price,
    product_disc_price, product_discount, productd_dailyoffer, category_name, subcategory_name, productd_onstock,
    style_id, style_name 
   
    FROM subcategories, categories, images, products
    INNER JOIN product_details ON productd_product = product_id 
    INNER JOIN colors ON productd_color = color_id
    INNER JOIN styles ON style_id = product_id  
  
    WHERE subcategory_id = product_subcategory 
    AND subcategory_category = category_id 
    AND productd_image = image_id 
    AND productd_onstock > 1 
    ORDER BY product_article`
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/product/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT
  false as product_addedtocart,  
  false as product_addedtofavourite, 
  image_path, products.product_id, product_details.productd_id, product_name, product_article, product_price,
  product_disc_price, product_discount, productd_onstock, product_length, product_width, product_height, product_weight, shape_name, color_name, color_hex
   
  FROM images, products
  INNER JOIN product_details ON productd_product = product_id 
  INNER JOIN colors ON productd_color = color_id
  INNER JOIN shapes ON product_shape = shape_id

  WHERE productd_image = image_id AND productd_id = $1`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/pp/materials/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      "SELECT product_id, string_agg(material_name, ', ') AS product_materials FROM product_details INNER JOIN products ON productd_product = product_id INNER JOIN product_materials ON prodmaterial_prod_id = product_id INNER JOIN materials ON material_id = prodmaterial_material_id WHERE productd_id = $1 GROUP BY product_id",
      [Number.parseInt(id)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/pp/styles/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      "SELECT product_id, string_agg(style_name, ', ') AS product_styles FROM product_details INNER JOIN products ON productd_product = product_id INNER JOIN product_styles ON prodstyle_prod_id = product_id INNER JOIN styles ON style_id = prodstyle_style_id WHERE productd_id = $1 GROUP BY product_id",
      [Number.parseInt(id)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/product/images/:id', (req, res) => {
  //   I M A G E S
  const { id } = req.params

  client
    .query(`SELECT * FROM Images WHERE product_id = $1`, [Number.parseInt(id)])

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/pp/files/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      'SELECT file_name, file_path, file_id FROM files, products INNER JOIN product_details ON productd_product = product_id WHERE productd_id = $1 AND file_product = product_id GROUP BY file_id',
      [Number.parseInt(id)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/colors', (req, res) => {
  //   C O L O R S

  client
    .query(
      `SELECT false as color_ischecked, color_name, color_hex, color_id, product_id, productd_id  
  FROM products 
  INNER JOIN product_details ON productd_product = product_id 
  INNER JOIN colors ON productd_color = color_id`
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/colors/all', (req, res) => {
  //   C O L O R S

  client
    .query(
      `SELECT false as color_ischecked, color_name, color_hex, color_id FROM Colors WHERE color_id != 0 ORDER BY color_id`
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})



// // // // // // // // // // // // // // // // // // // // // // // // // //

//   F A V O U R I T E  // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.get('/product/favourite/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT DISTINCT 
  true as product_addedtofavourite, 
  image_path, product_details.productd_id, color_name, color_hex, product_name, product_article, product_price, 
  product_disc_price, product_discount, productd_dailyoffer, category_name, subcategory_name, productd_onstock 
  
  FROM subcategories, categories, images, products 
  INNER JOIN product_details ON productd_product = product_id 
  INNER JOIN colors ON productd_color = color_id
  INNER JOIN favourite ON favourite_product = productd_id  
  
  WHERE subcategory_id = product_subcategory 
  AND subcategory_category = category_id 
  AND productd_image = image_id 
  AND productd_onstock > 1 
  AND productd_id = favourite_product 
  AND favourite_user = $1`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/product/favourite/:product/:user', (req, res) => {
  const { product } = req.params
  const { user } = req.params

  client
    .query(
      `SELECT * FROM favourite WHERE favourite_product = $1 AND favourite_user = $2`,
      [Number.parseInt(product), Number.parseInt(user)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.post('/favourite', (req, res) => {
  const { product } = req.body
  const { user } = req.body

  client
    .query(
      'INSERT INTO favourite (favourite_product, favourite_user) values ($1, $2)',
      [Number.parseInt(product), Number.parseInt(user)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.delete('/favourite', (req, res) => {
  const { product } = req.body
  const { user } = req.body

  client
    .query(
      'DELETE FROM favourite WHERE favourite_product = $1 AND favourite_user = $2',
      [Number.parseInt(product), Number.parseInt(user)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

// // // // // // // // // // // // // // // // // // // // // // // // // //

//       C A R T        // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.get('/product/cart/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT DISTINCT 
  false as product_addedtofavourite, true as product_isselected,
  cart_count, image_path, product_details.productd_id, color_name, color_hex, product_name, product_article, product_price, 
  product_disc_price, product_discount, productd_dailyoffer, category_name, subcategory_name, productd_onstock, product_length, product_width, product_height, product_weight
  
  FROM subcategories, categories, images, products 
  INNER JOIN product_details ON productd_product = product_id 
  INNER JOIN colors ON productd_color = color_id
  INNER JOIN cart ON cart_product = productd_id  
  
  WHERE subcategory_id = product_subcategory 
  AND subcategory_category = category_id 
  AND productd_image = image_id 
  AND productd_onstock > 1 
  AND productd_id = cart_product 
  AND cart_user = $1`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/product/cart/:product/:user', (req, res) => {
  const { product } = req.params
  const { user } = req.params

  client
    .query(`SELECT * FROM cart WHERE cart_product = $1 AND cart_user = $2`, [
      Number.parseInt(product),
      Number.parseInt(user),
    ])

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.put('/cart/count', (req, res) => {
  const { product } = req.body
  const { count } = req.body
  const { user } = req.body

  client
    .query(
      'UPDATE cart SET cart_count = $2 WHERE cart_product = $1 AND cart_user = $3',
      [Number.parseInt(product), Number.parseInt(count), Number.parseInt(user)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.post('/cart', (req, res) => {
  const { product } = req.body
  const { user } = req.body
  const { count } = req.body

  client
    .query(
      'INSERT INTO cart (cart_product, cart_user, cart_count) values ($1, $2, $3)',
      [Number.parseInt(product), Number.parseInt(user), Number.parseInt(count)]
    )
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.delete('/cart', (req, res) => {
  const { product } = req.body
  const { user } = req.body

  client
    .query('DELETE FROM cart WHERE cart_product = $1 AND cart_user = $2', [
      Number.parseInt(product),
      Number.parseInt(user),
    ])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})



// // // // // // // // // // // // // // // // // // // // // // // // // //

//   O R D E R I N G    // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //


app.get('/order/delivery', (req, res) => {

  client
    .query(`SELECT * FROM delivery`)

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/order/delivery/:id', (req, res) => {
  const { id } = req.params

  client
    .query(`SELECT * FROM delivery WHERE delivery_id = $1`, [
      Number.parseInt(id),
    ])

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.post('/order', (req, res) => {
  const { userid } = req.body
  const { date } = req.body
  const { delivdate } = req.body
  const { price } = req.body
  const { deliid } = req.body
  const { address } = req.body
  const { deliprice } = req.body

  client
    .query('INSERT INTO orders (order_user, order_date, order_delivery_date, order_price, order_status, order_delivery, order_address, order_delivery_price) values ($1, $2, $3, $4, $5, $6, $7, $8)',
      [Number.parseInt(userid), date, delivdate, Number.parseInt(price), 0, Number.parseInt(deliid), address, Number.parseInt(deliprice)])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.post('/order/details', (req, res) => {
  const { product } = req.body
  const { count } = req.body
  const { price } = req.body

  client
    .query('INSERT INTO order_products (orderprod_order, orderprod_product, orderprod_count, orderprod_price) values ((SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1), $1, $2, $3)',
      [Number.parseInt(product), Number.parseInt(count), Number.parseInt(price)])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})


// // // // // // // // // // // // // // // // // // // // // // // // // //

//     O R D E R Ы      // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.get('/orders/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT order_id, order_user, order_price, order_delivery_date,
      order_delivery_price, delivery_name, status_name
    FROM
      orders
    JOIN status ON status_id = order_status
    JOIN delivery ON delivery_id = order_delivery
    
    WHERE order_user = $1`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})


app.get('/order/info/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT order_id, order_user, order_price, order_delivery_date,
      order_delivery_price, delivery_name, status_name
    FROM
      orders
    JOIN status ON status_id = order_status
    JOIN delivery ON delivery_id = order_delivery
    
    WHERE order_id = (SELECT order_id FROM orders WHERE order_user = $1 ORDER BY order_id  DESC LIMIT 1)`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/order/all/info/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT order_id, order_user, order_price, order_delivery_date,
      order_delivery_price, delivery_name, status_name, order_address
    FROM
      orders
    JOIN status ON status_id = order_status
    JOIN delivery ON delivery_id = order_delivery
    
    WHERE order_user = $1`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})



app.get('/order/products/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT

      image_path, product_details.productd_id, color_name, product_name, product_article, orderprod_price, orderprod_count,
      product_length, product_width, product_height, product_weight, orderprod_order
        
      FROM images, products 
      INNER JOIN product_details ON productd_product = product_id 
      INNER JOIN colors ON productd_color = color_id
      INNER JOIN order_products ON orderprod_product = productd_id  
      WHERE
        productd_image = image_id 
      AND productd_id = orderprod_product 
      AND orderprod_order = (SELECT order_id FROM orders WHERE order_user = $1 ORDER BY order_id  DESC LIMIT 1)
      
      ORDER BY orderprod_order`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/order/all/products/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT
      orderprod_count as cart_count, true as product_isselected,
      image_path, product_details.productd_id, color_name, product_name, product_article, orderprod_price, orderprod_count,
      product_length, product_width, product_height, product_weight, orderprod_order, productd_onstock, product_price, product_disc_price, product_discount
        
      FROM images, products 
      INNER JOIN product_details ON productd_product = product_id 
      INNER JOIN colors ON productd_color = color_id
      INNER JOIN order_products ON orderprod_product = productd_id  
      WHERE
      productd_image = image_id 
      AND productd_id = orderprod_product 
      AND orderprod_order = $1
      
      ORDER BY orderprod_order`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

// // // // // // // // // // // // // // // // // // // // // // // // // //

//     R A T I N G      // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.post('/rating/add', (req, res) => {
  const { userid } = req.body
  const { productid } = req.body

  const { rating } = req.body
  const { text } = req.body
  const { image1 } = req.body
  const { image2 } = req.body
  const { image3 } = req.body
  const { image4 } = req.body
  const { image5 } = req.body
  const { date } = req.body

  client
    .query(`INSERT INTO reviews 
    (review_user, review_product, review_rating, review_text, review_image1, review_image2, 
    review_image3, review_image4, review_image5, review_date)

    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10

    WHERE NOT EXISTS (
      SELECT * FROM reviews WHERE review_user = $1 AND review_product = $2
    )`,
      [Number.parseInt(userid), Number.parseInt(productid), Number.parseInt(rating), text, image1, image2, image3, image4, image5, date])
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/review/noreview/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT
      image_path, product_details.productd_id, color_name, product_name, product_article,
      product_length, product_width, product_height, product_weight, productd_onstock, product_price, product_disc_price, product_discount
        
      FROM images, products 
      INNER JOIN product_details ON productd_product = product_id 
      INNER JOIN colors ON productd_color = color_id
      INNER JOIN reviews ON review_product = productd_id  
      WHERE
      productd_image = image_id 
      AND productd_id = review_product 
      AND review_user = $1
      AND review_rating = 0
      
      ORDER BY review_id`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/review/all/:id', (req, res) => {
  const { id } = req.params

  client
    .query(
      `SELECT
      image_path, product_details.productd_id, color_name, product_name, product_article,
      product_length, product_width, product_height, product_weight, productd_onstock, product_price, product_disc_price, product_discount,
      review_rating, review_text
        
      FROM images, products 
      INNER JOIN product_details ON productd_product = product_id 
      INNER JOIN colors ON productd_color = color_id
      INNER JOIN reviews ON review_product = productd_id  
      WHERE
      productd_image = image_id 
      AND productd_id = review_product 
      AND review_user = $1
      
      ORDER BY review_id`,
      [Number.parseInt(id)]
    )

    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

// // // // // // // // // // // // // // // // // // // // // // // // // //

//     F I L T E R      // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.get('/style', (req, res) => {
  client
    .query('SELECT false as style_ischecked, style_id, style_name FROM styles WHERE style_id != 0')
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})

app.get('/subcategory', (req, res) => {
  client
    .query('SELECT false as subcategory_ischecked, subcategory_category, subcategory_id, subcategory_name FROM subcategories WHERE subcategory_id != 0')
    .then(result => {
      res.status(200).send(result.rows)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send()
    })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
