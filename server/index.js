import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
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

app.delete('/product/material/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			'DELETE FROM product_materials WHERE prodmaterial_material_id = $1',
			[id]
		)
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
		.query('SELECT * FROM categories ORDER BY category_id')
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

// UPLOAD IMAGE CATEGORY

app.put('/category/img/:id', (req, res) => {
	const { img } = req.body
	const { id } = req.params

	client
		.query('UPDATE categories SET category_image = $1 WHERE category_id = $2', [
			img,
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

app.put('/product/subcategory', (req, res) => {
	const { subcategorybefore } = req.body
	const { subcategory } = req.body

	client
		.query(
			'UPDATE products SET product_subcategory = $1 WHERE product_subcategory = $2',
			[subcategory, subcategorybefore]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/subcategory/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM subcategories WHERE subcategory_id = $1', [id])
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

app.delete('/subcategory/category/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM subcategories WHERE subcategory_category = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/subcategory', (req, res) => {
	const { name } = req.body
	const { category } = req.body

	client
		.query(
			'INSERT INTO subcategories (subcategory_name, subcategory_category) values ($1, $2)',
			[name, category]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/subcategory/:id', (req, res) => {
	const { name } = req.body
	const { id } = req.params

	client
		.query(
			'UPDATE subcategories SET subcategory_name = $1 WHERE subcategory_id = $2',
			[name, id]
		)
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

app.get('/user/orders', (req, res) => {
	client
		.query('SELECT DISTINCT order_user FROM orders')
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

app.post('/user', (req, res) => {
	const { email } = req.body
	const { password } = req.body
	const { name } = req.body
	const { surname } = req.body
	const { patronymic } = req.body
	const { role } = req.body

	client
		.query(
			'INSERT INTO users (user_email, user_password, user_name, user_surname, user_patronymic, user_role, isactivated) values ($1, $2, $3, $4, $5, $6, $7)',
			[email, password, name, surname, patronymic, Number.parseInt(role), true]
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
   
    FROM subcategories, categories, images, styles, products
    INNER JOIN product_details ON productd_product = product_id
    INNER JOIN product_styles ON productd_product = prodstyle_prod_id
    INNER JOIN colors ON productd_color = color_id
  
    WHERE subcategory_id = product_subcategory 
    AND subcategory_category = category_id
    AND style_id = prodstyle_style_id 
    AND productd_image = image_id 
    AND productd_onstock > 0 ` +
				subcategoriesQueryString +
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

app.get('/admin/product/cards/', (req, res) => {
	client
		.query(
			`SELECT
  false as product_addedtocart,
  false as product_addedtofavourite,
  image_path, product_details.productd_id, color_name, color_hex, product_name, product_article, product_price,
  product_disc_price, product_discount, productd_dailyoffer, category_name, subcategory_name, productd_onstock,
  style_id, style_name, products.product_id
  
  FROM subcategories, categories, images, products
  INNER JOIN product_details ON productd_product = product_id
  INNER JOIN colors ON productd_color = color_id
  INNER JOIN styles ON style_id = product_id
  
  WHERE subcategory_id = product_subcategory
  AND subcategory_category = category_id
  AND productd_image = image_id
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
app.get('/product/cards/', (req, res) => {
	client
		.query(
			`SELECT
  false as product_addedtocart,
  false as product_addedtofavourite,
  image_path, product_details.productd_id, color_name, color_hex, product_name, product_article, product_price,
  product_disc_price, product_discount, productd_dailyoffer, category_name, subcategory_name, productd_onstock,
  style_id, style_name, products.product_id
  
  FROM subcategories, categories, images, products
  INNER JOIN product_details ON productd_product = products.product_id
  INNER JOIN colors ON productd_color = color_id
  INNER JOIN styles ON style_id = products.product_id
  
  WHERE subcategory_id = product_subcategory
  AND subcategory_category = category_id
  AND productd_image = image_id
  AND productd_onstock > 0
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

app.get('/pp/reviews/:id', (req, res) => {
	//   R E V I E W S
	const { id } = req.params

	client
		.query(
			`SELECT review_id, review_text, review_product, review_user, review_image1, review_image2, review_image3, review_image4, review_image5, review_date, user_name, user_surname, review_rating FROM reviews INNER JOIN users ON review_user = user_id WHERE review_product = $1 AND review_rating > 0 ORDER BY review_id DESC`,
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

app.get('/pp/rating/:id', (req, res) => {
	//   R E V I E W S
	const { id } = req.params

	client
		.query(
			`SELECT AVG(review_rating) AS rating FROM reviews WHERE review_product = $1 AND review_rating > 0`,
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
  AND productd_onstock > 0 
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
  AND productd_onstock > 0 
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
		.query(
			'INSERT INTO orders (order_user, order_date, order_delivery_date, order_price, order_status, order_delivery, order_address, order_delivery_price) values ($1, $2, $3, $4, $5, $6, $7, $8)',
			[
				Number.parseInt(userid),
				date,
				delivdate,
				Number.parseInt(price),
				0,
				Number.parseInt(deliid),
				address,
				Number.parseInt(deliprice),
			]
		)
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
		.query(
			'INSERT INTO order_products (orderprod_order, orderprod_product, orderprod_count, orderprod_price) values ((SELECT order_id FROM orders ORDER BY order_id DESC LIMIT 1), $1, $2, $3)',
			[Number.parseInt(product), Number.parseInt(count), Number.parseInt(price)]
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

//     O R D E R Ы      // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.get('/orders/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			`SELECT order_id, order_user, order_price, order_delivery_date,
      order_delivery_price, delivery_name, status_name, order_status, order_delivery
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

app.get('/orders', (req, res) => {
	client
		.query(
			`SELECT order_id, order_user, order_price, order_delivery_date, order_date,
      order_delivery_price, delivery_name, status_name, order_address, order_status, order_delivery, user_name, user_surname, user_patronymic, user_phone
    FROM
      orders
    JOIN status ON status_id = order_status
    JOIN delivery ON delivery_id = order_delivery
    JOIN users ON user_id = order_user
    ORDER BY order_id`
		)

		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/order/status', (req, res) => {
	const { status } = req.body
	const { order } = req.body

	client
		.query('UPDATE orders SET order_status = $1 WHERE order_id = $2', [
			status,
			order,
		])
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
      order_delivery_price, delivery_name, status_name, order_status, order_delivery
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
      order_delivery_price, delivery_name, status_name, order_address, order_status, order_delivery
    FROM
      orders
    JOIN status ON status_id = order_status
    JOIN delivery ON delivery_id = order_delivery
    
    WHERE order_user = $1
    ORDER BY order_id`,
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

app.put('/order/productcount', (req, res) => {
	const { product } = req.body
	const { count } = req.body

	client
		.query(
			'UPDATE product_details SET productd_onstock = $2 WHERE productd_id = $1',
			[Number.parseInt(product), Number.parseInt(count)]
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
		.query(
			`INSERT INTO reviews 
    (review_user, review_product, review_rating, review_text, review_image1, review_image2, 
    review_image3, review_image4, review_image5, review_date)

    SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10`,
			[
				Number.parseInt(userid),
				Number.parseInt(productid),
				Number.parseInt(rating),
				text,
				image1,
				image2,
				image3,
				image4,
				image5,
				date,
			]
		)
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
      review_rating, review_text, review_image1, review_image2, review_image3, review_image4, review_image5, review_id
        
      FROM images, products 
      INNER JOIN product_details ON productd_product = product_id 
      INNER JOIN colors ON productd_color = color_id
      INNER JOIN reviews ON review_product = productd_id  
      WHERE
      productd_image = image_id 
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
		.query(
			'SELECT false as style_ischecked, style_id, style_name FROM styles WHERE style_id != 0 ORDER BY style_name'
		)
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
		.query(
			'SELECT false as subcategory_ischecked, subcategory_category, subcategory_id, subcategory_name FROM subcategories'
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.get('/subcategory/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			`SELECT subcategory_category, subcategory_id, subcategory_name 
      FROM subcategories WHERE subcategory_category = $1
      ORDER BY subcategory_id`,
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

//      A D M I N       // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // // // // // // // // //

app.get('/status', (req, res) => {
	client
		.query(`SELECT * FROM status ORDER BY status_id`)

		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/status/:id', (req, res) => {
	const { name } = req.body
	const { finish } = req.body
	const { id } = req.params

	client
		.query(
			'UPDATE status SET status_name = $1, status_finish = $2 WHERE status_id = $3',
			[name, finish, Number.parseInt(id)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/status', (req, res) => {
	const { name } = req.body
	const { finish } = req.body

	client
		.query('INSERT INTO status (status_name, status_finish) values ($1, $2)', [
			name,
			finish,
		])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/status/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM status WHERE status_id = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/delivery/:id', (req, res) => {
	const { name } = req.body
	const { minprice } = req.body
	const { weightprice } = req.body
	const { days } = req.body
	const { id } = req.params

	client
		.query(
			'UPDATE delivery SET delivery_name = $1, delivery_minprice = $2, delivery_weightprice = $3, delivery_days = $4 WHERE delivery_id = $5',
			[
				name,
				Number.parseFloat(minprice),
				Number.parseFloat(weightprice),
				Number.parseInt(days),
				Number.parseInt(id),
			]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/delivery', (req, res) => {
	const { name } = req.body
	const { minprice } = req.body
	const { weightprice } = req.body
	const { days } = req.body

	client
		.query(
			'INSERT INTO delivery (delivery_name, delivery_minprice, delivery_weightprice, delivery_days) values ($1, $2, $3, $4)',
			[
				name,
				Number.parseFloat(minprice),
				Number.parseFloat(weightprice),
				Number.parseInt(days),
			]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/delivery/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM delivery WHERE delivery_id = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/order/delivery', (req, res) => {
	const { delivery } = req.body
	const { order } = req.body

	client
		.query('UPDATE orders SET order_delivery = $1 WHERE order_id = $2', [
			delivery,
			order,
		])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/style/:id', (req, res) => {
	const { name } = req.body
	const { id } = req.params

	client
		.query('UPDATE styles SET style_name = $1 WHERE style_id = $2', [
			name,
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

app.post('/style', (req, res) => {
	const { name } = req.body

	client
		.query('INSERT INTO styles (style_name) values ($1)', [name])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/style/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM styles WHERE style_id = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/product/styles/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM product_styles WHERE prodstyle_style_id = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.get('/products/shape', (req, res) => {
	client
		.query(`SELECT * FROM products`)

		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/updateprod/shape/:id', (req, res) => {
	const { shape } = req.body
	const { id } = req.params

	client
		.query('UPDATE products SET product_shape = $1 WHERE product_id = $2', [
			Number.parseInt(shape),
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

app.get('/shape', (req, res) => {
	client
		.query(`SELECT * FROM shapes WHERE shape_id != 0 ORDER BY shape_id`)

		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/shape/:id', (req, res) => {
	const { name } = req.body
	const { id } = req.params

	client
		.query('UPDATE shapes SET shape_name = $1 WHERE shape_id = $2', [
			name,
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

app.post('/shape', (req, res) => {
	const { name } = req.body

	client
		.query('INSERT INTO shapes (shape_name) values ($1)', [name])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/shape/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM shapes WHERE shape_id = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/product/shape', (req, res) => {
	const { shapebefore } = req.body
	const { shape } = req.body

	client
		.query('UPDATE products SET product_shape = $1 WHERE product_shape = $2', [
			shapebefore,
			shape,
		])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/review', (req, res) => {
	const { review } = req.body
	const { user } = req.body
	const { product } = req.body

	const { rating } = req.body
	const { text } = req.body

	const { image1 } = req.body
	const { image2 } = req.body
	const { image3 } = req.body
	const { image4 } = req.body
	const { image5 } = req.body

	const { date } = req.body

	client
		.query(
			`UPDATE reviews SET review_user = $1, review_product = $2, review_rating = $3, review_text = $4, review_image1 = $5,
      review_image2 = $6, review_image3 = $7, review_image4 = $8, review_image5 = $9, review_date = $10 WHERE review_id = $11`,
			[
				Number.parseInt(user),
				Number.parseInt(product),
				Number.parseInt(rating),
				text,
				image1,
				image2,
				image3,
				image4,
				image5,
				date,
				review,
			]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

// ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️

// ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️

// ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️

app.get('/admin/product/:id', (req, res) => {
	//ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПРОДУКТЕ
	const { id } = req.params

	client
		.query(
			`SELECT
  products.product_id, product_name, product_article, product_price,
  product_disc_price, product_discount, product_length, product_width, product_height, product_weight,
  shape_name, category_name, category_id, subcategory_name, shape_id, subcategory_id
   
  FROM products
  INNER JOIN shapes ON product_shape = shape_id
  INNER JOIN subcategories ON subcategory_id = product_subcategory
  INNER JOIN categories ON subcategory_category = category_id

  WHERE products.product_id = $1`,
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

app.get('/admin/material/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			'SELECT EXISTS(SELECT 1 FROM product_materials WHERE prodmaterial_prod_id = $1 AND prodmaterial_material_id = material_id ) as material_ischecked, material_id, material_name FROM materials WHERE material_id != 0 ORDER BY material_name',
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

app.get('/admin/material', (req, res) => {
	client
		.query(
			'SELECT false as material_ischecked, material_id, material_name FROM materials WHERE material_id != 0 ORDER BY material_name'
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.get('/admin/style/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			'SELECT EXISTS(SELECT 1 FROM product_styles WHERE prodstyle_prod_id = $1 AND prodstyle_style_id = style_id ) as style_ischecked, style_id, style_name FROM styles WHERE style_id != 0 ORDER BY style_name',
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

app.get('/admin/style', (req, res) => {
	client
		.query(
			'SELECT false as style_ischecked, style_id, style_name FROM styles WHERE style_id != 0 ORDER BY style_name'
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.get('/admin/color/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			'SELECT (SELECT productd_id FROM product_details WHERE productd_product = $1 AND productd_color = color_id ) as productd_id, EXISTS(SELECT 1 FROM product_details WHERE productd_product = $1 AND productd_color = color_id ) as color_ischecked, EXISTS(SELECT 1 FROM product_details WHERE productd_product = $1 AND productd_color = color_id ) as color_readonly, (SELECT productd_onstock FROM product_details WHERE productd_product = $1 AND productd_color = color_id) AS product_onstock, color_id, color_name, color_hex FROM colors WHERE color_id != 0 ORDER BY color_id',
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

app.get('/admin/color', (req, res) => {
	client
		.query(
			'SELECT null as productd_id, false as color_ischecked, false as color_readonly, 0 AS product_onstock, color_id, color_name, color_hex FROM colors WHERE color_id != 0 ORDER BY color_id'
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.get('/admin/allimages/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			'SELECT image_path, productd_id, image_id FROM images INNER JOIN product_details ON productd_id = images.product_id INNER JOIN products ON products.product_id = productd_product WHERE products.product_id = $1',
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

app.get('/admin/file/:id', (req, res) => {
	const { id } = req.params

	client
		.query(
			'SELECT file_path, file_name, file_product, file_id FROM files WHERE file_product = $1',
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

app.put('/admin/product', (req, res) => {
	const { name } = req.body
	const { price } = req.body
	const { discprice } = req.body
	const { discount } = req.body

	const { length } = req.body
	const { width } = req.body
	const { height } = req.body
	const { weight } = req.body

	const { shape } = req.body
	const { subcategory } = req.body

	const { id } = req.body

	client
		.query(
			`UPDATE products SET product_name = $1, product_price = $2, product_disc_price = $3, product_discount = $4,
      product_length = $5, product_width = $6, product_height = $7, product_weight = $8,
      product_shape = $9, product_subcategory = $10 WHERE product_id = $11`,
			[
				name,
				Number.parseFloat(price),
				Number.parseFloat(discprice),
				Number.parseFloat(discount),
				Number.parseFloat(length),
				Number.parseFloat(width),
				Number.parseFloat(height),
				Number.parseFloat(weight),
				Number.parseInt(shape),
				Number.parseInt(subcategory),
				Number.parseInt(id),
			]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/admin/styles/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM product_styles WHERE prodstyle_prod_id = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/styles', (req, res) => {
	const { prod } = req.body
	const { style } = req.body

	client
		.query(
			'INSERT INTO product_styles (prodstyle_prod_id, prodstyle_style_id) values ($1, $2)',
			[Number.parseInt(prod), Number.parseInt(style)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/styles/addnew', (req, res) => {
	const { style } = req.body

	client
		.query(
			'INSERT INTO product_styles (prodstyle_style_id, prodstyle_prod_id) values ($1, (SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1))',
			[Number.parseInt(style)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/admin/materials/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM product_materials WHERE prodmaterial_prod_id = $1', [
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

app.post('/admin/materials', (req, res) => {
	const { prod } = req.body
	const { material } = req.body

	client
		.query(
			'INSERT INTO product_materials (prodmaterial_prod_id, prodmaterial_material_id) values ($1, $2)',
			[Number.parseInt(prod), Number.parseInt(material)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/materials/addnew', (req, res) => {
	const { material } = req.body

	client
		.query(
			'INSERT INTO product_materials (prodmaterial_material_id, prodmaterial_prod_id) values ($1, (SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1))',
			[Number.parseInt(material)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/admin/files/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM files WHERE file_product = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/files', (req, res) => {
	const { prod } = req.body
	const { name } = req.body
	const { path } = req.body

	client
		.query(
			'INSERT INTO files (file_product, file_name, file_path) values ($1, $2, $3)',
			[Number.parseInt(prod), name, path]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/files/addnew', (req, res) => {
	const { name } = req.body
	const { path } = req.body

	client
		.query(
			'INSERT INTO files (file_name, file_path, file_product) values ($1, $2, (SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1))',
			[name, path]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/productdetails', (req, res) => {
	const { prod } = req.body
	const { color } = req.body
	const { onstock } = req.body

	client
		.query(
			'INSERT INTO product_details (productd_product, productd_color, productd_onstock, productd_dailyoffer) values ($1, $2, $3, false)',
			[Number.parseInt(prod), Number.parseInt(color), Number.parseInt(onstock)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/productdetails/addnew', (req, res) => {
	const { color } = req.body
	const { onstock } = req.body

	client
		.query(
			'INSERT INTO product_details (productd_color, productd_onstock, productd_dailyoffer, productd_product) values ($1, $2, false, (SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1))',
			[Number.parseInt(color), Number.parseInt(onstock)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.put('/admin/productdetails', (req, res) => {
	const { id } = req.body
	const { onstock } = req.body

	client
		.query(
			'UPDATE product_details SET productd_onstock = $1 WHERE productd_id = $2',
			[Number.parseInt(onstock), Number.parseInt(id)]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/product', (req, res) => {
	const { article } = req.body
	const { name } = req.body
	const { price } = req.body
	const { discprice } = req.body
	const { discount } = req.body
	const { length } = req.body
	const { width } = req.body
	const { height } = req.body
	const { weight } = req.body
	const { shape } = req.body
	const { subcategory } = req.body

	client
		.query(
			`INSERT INTO products 
      (product_article, product_name, product_price, product_disc_price, product_discount, product_length, product_width, product_height, product_weight, product_shape, product_subcategory) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
			[
				article,
				name,
				Number.parseFloat(price),
				Number.parseFloat(discprice),
				Number.parseFloat(discount),
				Number.parseFloat(length),
				Number.parseFloat(width),
				Number.parseFloat(height),
				Number.parseFloat(weight),
				Number.parseInt(shape),
				Number.parseInt(subcategory),
			]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.delete('/admin/images/:id', (req, res) => {
	const { id } = req.params

	client
		.query('DELETE FROM images WHERE product_id = $1', [id])
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/images', (req, res) => {
	const { path } = req.body

	client
		.query(
			'INSERT INTO images (image_path, product_id) values ($1, (SELECT productd_id FROM product_details ORDER BY product_details DESC LIMIT 1))',
			[path]
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

app.post('/admin/updateimages', (req, res) => {
	const { path } = req.body
	const { id } = req.body

	client
		.query('INSERT INTO images (image_path, product_id) values ($1, $2)', [
			path,
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

app.get('/admin/covers/:id', (req, res) => {
	const { id } = req.params

	client
		.query('SELECT * FROM product_details WHERE productd_product = $1', [
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

app.put('/admin/covers', (req, res) => {
	const { id } = req.body

	client
		.query(
			'UPDATE product_details SET productd_image = (SELECT image_id FROM images WHERE product_id = $1 LIMIT 1) WHERE productd_id = $1',
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

app.put('/admin/covers/addnew', (req, res) => {
	client
		.query(
			'UPDATE product_details SET productd_image = (SELECT image_id FROM images WHERE product_id = (SELECT productd_id FROM product_details ORDER BY product_details DESC LIMIT 1) LIMIT 1) WHERE productd_id = (SELECT productd_id FROM product_details ORDER BY product_details DESC LIMIT 1)'
		)
		.then(result => {
			res.status(200).send(result.rows)
		})
		.catch(err => {
			console.error(err)
			res.status(500).send()
		})
})

// ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️

// ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️

// ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️ ❇️

app.use(
	fileUpload({
		createParentPath: true,
	})
)

app.post('/upload', (req, res) => {
	if (!req.files) {
		return res.status(400).json({ msg: 'No files' })
	}

	const file = req.files.file

	if (!file) return res.json({ error: 'Некорректное имя' })

	const newFileName = encodeURI(
		Date.now() + '-upload.' + file.name.match(/\.([^.]+)$|$/)[1]
	)

	file.mv(`D:/reinterioshop/client/public/img/${newFileName}`, err => {
		if (err) {
			console.error(err)
			return res.status(500).send(err)
		}

		console.log('Файл загружен')

		res.json({
			fileName: file.name,
			filePath: `${newFileName}`,
		})
	})
})

app.post('/uploadfile', (req, res) => {
	if (!req.files) {
		return res.status(400).json({ msg: 'No files' })
	}

	const file = req.files.file

	if (!file) return res.json({ error: 'Некорректное имя' })

	const newFileName = encodeURI(
		Date.now() + '-reinterio-product-file.' + file.name.match(/\.([^.]+)$|$/)[1]
	)

	file.mv(`D:/reinterioshop/client/public/files/${newFileName}`, err => {
		if (err) {
			console.error(err)
			return res.status(500).send(err)
		}

		res.json({
			fileName: file.name,
			filePath: `${newFileName}`,
		})
	})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
