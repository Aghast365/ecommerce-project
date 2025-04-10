# Ecommerce-Project

This app was created using `npx create-react-app`, which installs the following packages by default:

 - react
 - react-dom
 - react-router-dom
 - react-scripts
 - web-vitals

in addition, the following packages were installed and are required for the site to run

 - bootstrap
 - react-bootstrap
 - react-icons
 - styled-components
 - motion
 
these components were used to style components throughout the site. In particular, react-bootstrap was used for most popups/dropdown menus.

## Setup

with nodejs installed,

 1. clone the github repository at https://github.com/Aghast365/ecommerce-project
 2. run `npm install` to install the dependencies
 3. run `npm start` to start the dev server

## Features

 - component-based design using react-router-dom
 - functional at any screen size (desktop, tablet, mobile)
 - mock database of product information for 21 products
 - mock database of user information which allows account creation, login, password changes, and account deletion
 - central tracking of search history, product filters, and cart information with useContext -- all information saved to user information database

### Navigation Bar
 - Displays site logo
 - Links to main pages (Home, Products, About, Cart, and Profile)
 - Buttons to log in/sign up or view profile/log out, which change based on user state
 - Badge showing cart item count
 - Interactive search bar, with search history and search suggestions
 
### Product Cards
 - Displays product name, image, description, and price
 - Button to open product page

### Product Page
 - Displays more detailed product information
 - shows bulk pricing options
 - quantity selector
 - scrolling on quantity selector quickly changes number of items for convenience

### Product Grid
 - Displays a responsive grid of product cards
 - improves performance by showing limited products per page
 - displays search bar, filters, and total number of results
 - sidebar with various filters based on product details
 
### Cart
 - Lists items added and quantities
 - allows quantity adjustments and item removal
 - displays subtotal, taxes, and total
 - proceed to checkout button, which is disabled when cart is empty
 - cart items saved to user account

### Search Bar
 - text input for product search
 - responds to enter key or clicked button
 - provides search suggestions when typing, which when clicked open the relevant product page
 - provides search history which can be viewed, deleted, or clicked to perform the search again
 - search history saved to user account
 
### Filters
 - can filter by category, price range, size, and material
 - can apply multiple filters at once
 - filters maintaned across page navigation
 - filters saved to user account
 
### User Authentication
 - login form with email, password, and forgot password link
 - registration form with form validation
 - error states handled
 - password reset functionality
 - user account and authentication stored, each account has separate site data

### Checkout Form
 - multi-step process
 - shipping information, payment details, order summary, and order confirmation
 - form validation