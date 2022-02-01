const jwt = require("jsonwebtoken");
const { response, request } = require("../helpers");
const { auth } = require("../services");


//creates a list of non restricted endpoints
const nonRestrictedEndPoints = [
"/", 


];

//creates list of authorized endpoints
const restrictedEndPoints = [
  "/add-group-contact",
  "/delete-group-contact",
  "/get-group-contact-by-authId",
  "/delete-a-contact-by-authId",
]




module.exports = async (req, res, next) => {

  //forwards request without validation if is not restricted
  if (nonRestrictedEndPoints.includes(req.path)) {


    next();
  } else if (restrictedEndPoints.includes(req.path)) {

    
   //validates request if is restricted
   const token = req.headers.authorization;

   const body = { token: token }

   const { status: tokenStatus, message: tokenMessage, data: userData } = await request(
     `${process.env.BULK_SMS_AUTHENTICATION_MS_BASE_URL}/validate-user-token`,
     "post",
     body
   );

   if (!userData) {
     console.log(userData);
     return response(res, { status: false, message: "Unauthorized Access-gate-way" }, 401);
   }

   if (tokenStatus === false) {
     return response(res, { status: false, message: tokenMessage }, 401);
   }




   req.authData = userData
    next();
  } else {
   jwt.sign({}, process.env.SECRET)
    try {
      jwt.verify(req.headers["x-access-token"], process.env.SECRET);
    } catch (error) {
      return response(res, { status: false, message: "Unauthorized Access!  " }, 401);
    }

    next();
  }







};
