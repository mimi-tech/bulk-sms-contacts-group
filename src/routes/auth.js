const { Router } = require("express");
const { auth } = require("../controllers");
const { validate } = require("../middlewares");
const { auth: validator } = require("../validator");

const routes = Router();

routes.get("/", auth.welcomeText);


routes.post("/add-group-contact",validate(validator.addGroupContact), auth.addGroupContact);

routes.delete("/delete-group-contact",validate(validator.deleteGroupContact), auth.deleteGroupContact);

routes.get("/get-group-contact-by-authId",validate(validator.getGroupContactByAuthId), auth.getGroupContactByAuthId);

routes.put("/delete-a-contact-by-authId",validate(validator.removeAContactFromGroup), auth.removeAContactFromGroup);


routes.post("/add-products",validate(validator.addProducts), auth.addProducts);

routes.get("/view-all-products",validate(validator.viewAllProducts), auth.viewAllProducts);

routes.get("/view-products-by-type",validate(validator.viewProductsByType), auth.viewProductsByType);

routes.put("/like-products",validate(validator.likeProducts), auth.likeProducts);

routes.put("/rate-products",validate(validator.rateProducts), auth.rateProducts);

routes.put("/delete-products",validate(validator.deleteProducts), auth.deleteProducts);



module.exports = routes; 
