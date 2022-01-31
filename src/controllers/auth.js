const { auth } = require("../services");
const { response } = require("../helpers");



const welcomeText = async (req, res) => {
    const data = await auth.welcomeText(req.form);
    return response(res, data);
  };



  const addGroupContact = async (req, res) => {
    const data = await auth.addGroupContact(req.form);
    return response(res, data);
  };

  const deleteGroupContact = async (req, res) => {
    const data = await auth.deleteGroupContact(req.form);
    return response(res, data);
  };

  const getGroupContactByAuthId = async (req, res) => {
    const data = await auth.getGroupContactByAuthId(req.form);
    return response(res, data);
  };


 
  module.exports = {
    welcomeText,
  
    addGroupContact,
    deleteGroupContact,
    getGroupContactByAuthId
    
}