const categories = require('../data/categories');
const products = require('../data/products.json');

module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
            categories
        })
    },
    store : (req,res) => {
        const {name,price,category} = req.body;

        return res.send('guardando....')
    },
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
    },
    search : (req,res) => {
        
        const {keyword} = req.query;
        const result = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));

        let namesCategories = categories.map(category => {
            return {
                id : category.id,
                name : category.name
            }
        });

        return res.render('result',{
            products : result,
            keyword,
            namesCategories
        })
    }
}