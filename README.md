## E-Commerce Catalogue And Orders

### Overview

This project demonstrates the creation of API endpoints for various routes to place orders and view catalog for users. It also uses JWT based authentication along with Role Based Access Control (RBAC) to restrict privilleges between USER and ADMIN.

### Access Controls

#### USERS

- Can register themselves
- Can Login using email and Password
- Can view products
- Can place orders

#### ADMIN

- Can register themselves
- Can Login using email and Password
- Can view products
- Can place orders
- Add Category
- Add Products, price and stock

### Steps To Install

#### Step-1:

`npm install`

#### Step-2:

Add .env file in root

`PORT = PORT_NUMBER`
<br/>
`JWT_SECRET = YOUR_SECRET_PHRASE`
<br/>
`REFRESH_SECRET = YOUR_REFRESH_SECRET_PHRASE`
<br/>
`JWT_EXPIRES_IN = JWT_EXPIRY_TIME`
<br/>
`REFRESH_TOKEN_EXPIRES_IN= REFRESH_TOKEN_EXPIRY_TIME`
