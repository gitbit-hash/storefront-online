# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products Endpoints
| HTTP verb     | Route                                    | Action                           | Requires authentication |
| ------------- | -------------                            | -------------                    | ----------------------  |
| GET           | /api/products                            |   Get all products               | No                      |
| GET           | /api/products/show/:product_id           |   Get product by id              | No                      |
| GET           | /api/products//category/:categoryName    |   Get product Category           | No                      |
| GET           | /api/dashboard/top_five_products         |   Get top 5 most popular products| No                      |
| POST          | /api/products/create                     |   Create new product             | Yes                     |

#### Users
| HTTP verb     | Route                                    | Action                           | Requires authentication |
| ------------- | -------------                            | -------------                    | ----------------------  |
| GET           | /api/users                               |   Get all users                  | yes                     |
| GET           | api/users/show/:username                 |   Get user by username           | yes                     |
| POST          | /api/users/create                        |   Create new user                | No                      |
| POST          | /api/users/authenticate                  |   Authenticate user              | No                      |

#### Orders
| HTTP verb     | Route                                    | Action                                 | Requires authentication |
| ------------- | -------------                            | -------------                          | ----------------------  |
| POST          | /api/orders/                             | Create new order                       | yes                     |
| GET           | /api/orders/order_id                     | Get user's order by id                 | yes                     |
| GET           | /api/orders/                             | Get all user's order                   | yes                     |
| GET           | /api/orders/active                       | Get user's current order(active)       | yes                     |
| PUT           | /api/orders/update                       | Update user's active order to complete | yes                     |
| GET           | /api/orders/complete                     | Get user's completed orders            | yes                     |
| POST          | /api/orders/:order_id/products           | Add a product to active order          | yes                     |

## Data Shapes
#### Product Table
| Column        | Type                 | 
| ------------- | -------------        | 
| id            | SERIAL PRIMARY KEY   |   
| name          | VARCHAR(64)          |   
| price         | INTEGER              |   
| category      | VARCHAR(64)          |   

#### User Table
| Column        | Type                 | 
| ------------- | -------------        | 
| id            | SERIAL PRIMARY KEY   |   
| first_name    | VARCHAR(100)         |   
| last_name     | VARCHAR(100)         |   
| username      | VARCHAR(100)         |   
| password      | VARCHAR              |   

#### Orders Table
| Column        | Type                 | 
| ------------- | -------------        | 
| id            | SERIAL PRIMARY KEY   |   
| status        | VARCHAR(8)           |   
| user_id       | bigint               |

#### Order Product Table
| Column        | Type                 | 
| ------------- | -------------        | 
| id            | SERIAL PRIMARY KEY   |   
| quantity      | integer              |   
| order_id      | bigint               |
| product_id    | bigint               |
