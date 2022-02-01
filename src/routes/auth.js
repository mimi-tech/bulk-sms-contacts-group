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



module.exports = routes; 
