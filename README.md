# Tree-Hub
This is a basic ecommerce nursery management backend project created with Node.js, Express.js, MongoDB, and Mongoose.


## Running command

To run project locally, run the following command

```bash
  npm run dev
```

To build project locally, run the following command

```bash
  npm run build
```

To build build version, run the following command

```bash
  npm run start
```


![Image description](/https://picsum.photos/800/600)


## Features

- user can CRUD with products.
- user creat order.

## Live link: 
https://sports-facility-booking-platform-server.onrender.com/

## ERD:
![Image description](https://i.ibb.co/tMhJ30n/Nursery-Website-drawio.png)

## Requirement analysis

### Major features:
- Product management.
- Add to cart based on stock.
- Image upload.
- Purchase product.
- Create order.

### Minor features:
- Find products by searching, filtering, and sorting.
- Pagination implementation.
- Decrease the product quantity upon purchase.





## API
- /api/v1/products (creat-product) (POST)
  - Data:
   ```
  {
    "title": "Sample Product",
    "description": "This is a sample product description.",
    "imgUrl": "https://example.com/image.jpg",
    "imgList": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
    ],
    "quantity": 10,
    "price": 29.99,
    "category": "Electronics",
    "rating": 4.5
  }
  ```
- /api/v1/products?search=search-string&filter=category&sort=+feild (get-products) (GET)
   ```
  {
    "title": "Sample Product",
    "description": "This is a sample product description.",
    "imgUrl": "https://example.com/image.jpg",
    "imgList": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
    ],
    "quantity": 10,
    "price": 29.99,
    "category": "Electronics",
    "rating": 4.5
  }
  ```

- /api/v1/products/products-by-ids (get-products-by-ids) (POST)
  - Data
  ```
  [poduct's-id]
  ```

- /api/v1/:id (get-single-product-by-id) (GET)
- /api/v1/products/:id (update-product-by-id) (PACTH)
  - Data
    ```
       {
        "title": "Sample Product",
        "description": "This is a sample productdescription.",
        "imgUrl": "https://example.com/image.jpg",
        "imgList": [
           "https://example.com/image1.jpg",
           "https://example.com/image2.jpg"
        ],
        "quantity": 10,
        "price": 29.99,
        "category": "Electronics",
        "rating": 4.5
        }
    ```
- /api/v1/:id (delete-product-by-id) (DELETE)

- /api/v1/order (create-order) (POST)
  - Data
  ```
    {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+8801712345678",
    "address": "123 Main Street, Dhaka, Bangladesh",
    "cart": [
        {
            "_id": "60d0fe4f5311236168a109ca",
            "quantity": 2
        },
        {
            "_id": "60d0fe4f5311236168a109cb",
            "quantity": 1
        }
    ],
    "totalPrice": 59.98
    }

  ```
    
