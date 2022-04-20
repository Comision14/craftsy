module.exports = {
    detail : (req,res) => {
        const {id} = req.params;

        res.render('productDetail',{
            numberImage : id
        })
    },
    cart : (req,res) => res.render('productCart')
}