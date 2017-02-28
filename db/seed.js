'use strict'; // eslint-disable-line semi

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstName: 'so', lastName: 'many', email: 'god@example.com', password: '1234'},
  {firstName: 'Barack', lastName: 'Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedOrders = () => db.Promise.map([
  {status: 'Created', isActive: true, items: [1, 3, 4], user_id: 1},
  {status: 'Processing', isActive: true, items: [1, 2], user_id: 2},
], order => db.model('orders').create(order))

const seedReviews = () => db.Promise.map([
  {rating: 3, title: 'Good but not really', body: 'This product is top notch! BUY IT NOW', user_id: 1, product_id: 1},
  {rating: '5', title: 'DOPE SHIRT', body: 'sick brah', user_id: 2, product_id: 2},
], review => db.model('reviews').create(review))

const seedProducts = () => db.Promise.map([
  {title: 'Some album', description: 'great album, you should buy it!', imageURL: 'www.google.com', price: 19.99, quantity: 5, product_type: 'album', tags: []},
  {title: 'Awesome T-Shirt', description: 't-shirt description here', imageURL: 'www.google.com', price: 9.95, quantity: 10, product_type: 'clothing', tags: ['trending now']},
], product => db.model('products').create(product))

const seedAlbums = () => db.Promise.map([
  {name: 'Zenith', genre: 'instrumental', year: 1995, artist_id: 1},
  {name: 'Ghosts I-IV', genre: 'ambient', year: 2010, artist_id: 2},
], album => db.model('albums').create(album))

const seedArtists = () => db.Promise.map([
  {name: 'Dexter Britain', imageURL: 'www.something.com'},
  {name: 'Nine Inch Nails', imageURL: 'www.anotherone.com'},
], artist => db.model('artists').create(artist))

const seedClothing = () => db.Promise.map([
  {type: 'tshirt', size: 'S', artist_id: 1},
  {type: 'hat', size: 'one-size', artist_id: 2},
], clothing => db.model('clothing').create(clothing))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(seedOrders)
  .then(seedProducts)
  .then(seedReviews)
  .then(seedArtists)
  .then(seedAlbums)
  .then(seedClothing)
  .then(() => console.log(`Seeded OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
