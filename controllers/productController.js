const categories = require('../data/categories');
const products = require('../data/products')

module.exports = {
    detail : (req,res) => {

        const {idProduct} = req.params;
        const product = products.find(product => product.id === +idProduct);
        
        return res.render('productDetail',{
            product
        })
    },
    cart : (req,res) => res.render('productCart'),
    getByCategory : (req,res) => {

        const {idCategory} = req.params;

        const {name, products} = categories.find(category => category.id === +idCategory);

        return res.render('categories',{
            name,
            products
        })
    }
}