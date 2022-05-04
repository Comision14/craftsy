const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');

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

        let lastID = products[products.length - 1].id;

        let newProduct =  {
            id: +lastID + 1,
            name,
            price: +price,
            category: +category,
            img: "noimage.jpeg"
        }

        products.push(newProduct);

        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8')

        return res.redirect('/')
    },
    edit : (req,res) => {

        const {id} = req.params;
        const product = products.find(product => product.id === +id);

        return res.render('productEdit',{
            categories,
            product
        })
    },
    update : (req,res) => {

        const {id} = req.params;
        const {name, price, category} = req.body;

        const productsModify = products.map(product => {
            if(product.id === +id){
                let productModify = {
                    ...product,
                    name,
                    price : +price,
                    category : +category
                }
                return productModify
            }
            return product
        })

        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(productsModify,null,3),'utf-8')

        return res.redirect('/')
    },
    detail : (req,res) => {

        const {id} = req.params;
        const product = products.find(product => product.id === +id);
        
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
        const products = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));

        let namesCategories = categories.map(category => {
            return {
                id : category.id,
                name : category.name
            }
        });

        return res.render('result',{
            products,
            keyword,
            namesCategories
        })
    }
}