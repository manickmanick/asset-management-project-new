const employee = require("./Employee")
module.exports = {


    getAllEmployee : function(req,res){

        employee.findAll({
            // attributes: ["id", "title", "technologies", "budget", "description", "contact_email"]
        })
        .then(function(result){
            // console.log(gigs);
            // res.render('index', { gigs }); 
                res.status(200).send(result)
        })
        .catch(function(err){
            console.log(err);
            res.status(400).send("Error while fetching data",err)
        })
    }
}


