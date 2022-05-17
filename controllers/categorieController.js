const categories_db = require('../data/categories.json');
const fs = require('fs');
const path = require('path');

module.exports = {
    add : (req,res) => {
        return res.render('categoryAdd')
    },
    store : (req,res) => {
        let lastID = categories_db[categories_db.length - 1].id;
        let newCategory =  {
            id: +lastID + 1,
            name : req.body.name.trim(),
        }

        categories_db.push(newCategory);

        fs.writeFileSync(path.resolve(__dirname,'..','data','categories.json'),JSON.stringify(categories_db,null,3),'utf-8')

        return res.redirect('/admin')
    },
    edit : (req,res) => {
        const {id} = req.params;
        const category = categories_db.find(category => category.id === +id);
        return res.render('categoryEdit',{
            category
        })

    },
    update : (req,res) => {
        const {id} = req.params;
        const {name} = req.body;

        const categoriesModify = categories_db.map(category => {
            if(category.id === +id){
                let categoryModify = {
                    ...category,
                    name,
                }
            
                return categoryModify
            }
            return category
        });

        fs.writeFileSync(path.resolve(__dirname,'..','data','categories.json'),JSON.stringify(categoriesModify,null,3),'utf-8')

        return res.redirect('/categories/list')
    },
    remove : (req,res) => {
        const {id} = req.params;

        const categoriesFilter = categories_db.filter(category => category.id !== +id);

        fs.writeFileSync(path.resolve(__dirname,'..','data','categories.json'),JSON.stringify(categoriesFilter,null,3),'utf-8')

        return res.redirect('/categories/list')
    },
    list : (req,res) => {
        const categories = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/categories.json'),'utf-8'))
    
        return res.render('./admin/adminCategories',{
            categories
        })
    }
}