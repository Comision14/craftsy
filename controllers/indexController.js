const products = require('../data/products');

module.exports = {
    index: (req, res) => {

        const celulares = products.filter(product => product.category === 1);
        const tablets = products.filter(product => product.category === 2);
        const computadoras = products.filter(product => product.category === 3);

        return res.render('index', {
            celulares,
            tablets,
            computadoras
        })
    }
}