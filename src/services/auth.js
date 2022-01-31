/* eslint-disable no-unreachable */
const { v4: uuid } = require("uuid");

const {
    Op: { and },

} = require("sequelize");

const { constants } = require("../configs");
const { ContactGroup } = require("../models")




  
/**
 * Display welcome text
 * @param {Object} params  no params.
 * @returns {Promise<Object>} Contains status, and returns message 
 */
const welcomeText = async () => {
    try {
        return {
            status: true,
            message: "welcome to contact service",
        };

    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: constants.SERVER_ERROR("WELCOME TEXT"),
        };
    }
}





/**
 * for creating group contact
 * @param {Object} params email, password, username, profileImageUrl.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const addGroupContact = async (params) => {
    try {

        const { 
             authId,
             contact,
             contactName
            } = params;

        
        //check if  contact is already registered
        const ussrAccount = await ContactGroup.findOne({
            where: {
                [and]: [
                {authId:authId},
                {contactName:contactName},
                ] 
            },
        });

        if (ussrAccount) {

            const storedContact = ussrAccount.dataValues.contacts
            
            var newArray = storedContact.concat(contact);
           let uniqueChars = [...new Set(newArray)];


          await ContactGroup.update({
                 contacts: uniqueChars
               },{
                where: {
                    [and]: [
                    {authId:authId},
                    {contactName:contactName},
                    ] 
                },
               })
               return {
                   status: true,
                   message: "contact updated successfully",
                   data:uniqueChars
               };
            
           

        }

    
          
         //add the contact
         const newContact = await ContactGroup.create({
            id: uuid(),
            authId: authId,
            contacts: contact,
            contactName:contactName
              })

              return {
                status: false,
                message: "contact added successfully",
                data:newContact
            };
        


    } catch (error) {
        console.error(error)
        return {
            status: false,
            message: constants.SERVER_ERROR("adding contact"),
        };
    }
}




/**
 * for deleting group
 * @param {Object} params  user id {authId} params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */

 const deleteGroupContact = async (params) => {
    try {
        const { authId, id } = params

        //check if the user is already existing
        const user = await ContactGroup.findOne({
            where: {
                [and]: [
                {authId:authId},
                {id:id},
                ] 
            },
        })

        if (!user) {
            return {
                status: false,
                message: "contact does not exist"
            };
        }



        //go ahead and delete the account
        await ContactGroup.destroy({
            where: {
                [and]: [
                {authId:authId},
                {id:id},
                ] 
            },
        })

        return {
            status: true,
            message: "contact group deleted successfully"
        };
    } catch (e) {
        console.log(e);
        return {
            status: false,
            message: constants.SERVER_ERROR("DELETING contact group"),
        };
    }
}


/**
 * for fetching all contact for a user
 * @param {Object} params  No params needed.
 * @returns {Promise<Object>} Contains status, and returns data and message 
 */
 const getGroupContactByAuthId = async (params) => {
    try {

        const {  authId } = params;

       

        const allMessages = await ContactGroup.findAll({


            attributes: {
                exclude: [
                    "createdAt",
                    
                    
                ],
            },
            
            where: {
                authId: authId
            }
        });


        return {
            status: true,
            data: allMessages
        };
    } catch (e) {
        return {
            status: false,
            message: constants.SERVER_ERROR("ALL CONTACT"),
        };
    }
}





module.exports = {
    welcomeText,
    addGroupContact,
    deleteGroupContact,
    getGroupContactByAuthId
   
}