/**
 * Controller for User.
 * Author: Babatope Olajide.
 * Version: 1.0.0
 * Release Date: 08-April-2020
 * Last Updated: 09-April-2020
 */

/**
 * Module dependencies.
 */
const { Lead } = require('../../models');
const{ 
    errorRes, errorLog, successResWithData
} = require('../../utils/apiResponse');
const lead = require('../../models/lead');

// Handle User create on POST.
exports.createLead = async(req, res) => {
    
    const { 
        firstName, lastName, email, username, password, address, city, country,
        leadCurrency, leadLanguage, leadStatus, companyName, companyEmail, companyWebsite,
        companyAddress, companyCity, companyCountry, createdBy, modifiedBy
    } = req.body;

    //check for empty fields
    if( 
        !firstName || !lastName || !email || !username || !password || !address ||
        !city || !country || !leadCurrency || !leadLanguage || !leadStatus || 
        !companyName || !companyEmail || !companyWebsite || !companyAddress ||
        !companyCity || !companyCountry || !createdBy || !modifiedBy ||
        firstName == '' || lastName == '' || email == '' || username == '' || 
        password == '' || address == '' || city == '' || country == '' ||
        leadCurrency == '' || leadLanguage == '' || leadStatus == '' || 
        companyName == '' || companyEmail == '' || companyWebsite == '' ||
        companyAddress == '' || companyCity == '' || companyCountry == '' ||
        createdBy == '' || modifiedBy == ''
    ) errorRes( res, 'Fill all Fields' );
    
    //validate the password
    if( password.length < 8 ) 
        return errorRes( res, 'Password should not be less than 8 characters.' )

    //validate leadCurrency 
    if( !leadCurrency.match(/^[A-Za-z]+$/) || leadCurrency.trim().length != 3 )
        return errorRes( res, 'Currency should have three alphabets only.' )

    //validate companyWebsite
    const regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
    if( !companyWebsite.match(regex) ) return errorRes( res, 'Wrong company URL...')
            
    try {
        //check for duplicate in the database
        const checkLead = await Lead.findOne({ where: { email }  });
        if(checkLead) {
            errorRes( res, 'This Email has been used...')
        }else{
            leadCurrency = leadCurrency.toUpperCase();
            const createdLead = await Lead.create({
                firstName, lastName, email, username, password, address, city, country,
                leadCurrency, leadLanguage, leadStatus, companyName, companyEmail, companyWebsite,
                companyAddress, companyCity, companyCountry, createdBy, modifiedBy                
            })

            //Success Response
            const data = await createdLead;
            successResWithData( res, 'Lead created Successfully', data )
        }     
   
    } catch (error) {
        console.log(error);
        errorLog( res, 'Lead creation was Unsuccessful.')
    }
    
};
 
exports.updateLead = async(req, res) => {
    
    const { 
        firstName, lastName, email, username, password, address, city, country,
        leadCurrency, leadLanguage, leadStatus, companyName, companyEmail, companyWebsite,
        companyAddress, companyCity, companyCountry, createdBy, modifiedBy
    } = req.body;

    //check for empty fields
    if( 
        !firstName || !lastName || !email || !username || !password || !address ||
        !city || !country || !leadCurrency || !leadLanguage || !leadStatus || 
        !companyName || !companyEmail || !companyWebsite || !companyAddress ||
        !companyCity || !companyCountry || !createdBy || !modifiedBy ||
        firstName == '' || lastName == '' || email == '' || username == '' || 
        password == '' || address == '' || city == '' || country == '' ||
        leadCurrency == '' || leadLanguage == '' || leadStatus == '' || 
        companyName == '' || companyEmail == '' || companyWebsite == '' ||
        companyAddress == '' || companyCity == '' || companyCountry == '' ||
        createdBy == '' || modifiedBy == ''
    ) errorRes( res, 'Fill all Fields' );
    
    //validate the password
    if( password.length < 8 ) 
        return errorRes( res, 'Password should not be less than 8 characters.' )

    //validate leadCurrency 
    if( !leadCurrency.match(/^[A-Za-z]+$/) || leadCurrency.trim().length != 3 )
        return errorRes( res, 'Currency should have three alphabets only.' )

    //validate companyWebsite
    const regex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi)
    if( !companyWebsite.match(regex) ) return errorRes( res, 'Wrong company URL format...')
            
    try {
        //check for duplicate in the database
        const checkLead = await Lead.findOne({ where: { email }  });
        if( checkLead || checkLead.id != req.params.leadId ) {
            errorRes( res, 'This Email has been used...')
        }else{
            leadCurrency = leadCurrency.toUpperCase();
            const updatedLead = await Lead.update(
                {
                    firstName, lastName, email, username, password, address, city, country,
                    leadCurrency, leadLanguage, leadStatus, companyName, companyEmail, companyWebsite,
                    companyAddress, companyCity, companyCountry, createdBy, modifiedBy                
                }, { 
                    where: { id: req.params.leadId }  
                }
            )

            //Success Response
            const data = await Lead.findByPk( req.params.leadId );
            successResWithData( res, 'Lead updated Successfully', data )
        }     
   
    } catch (error) {
        console.log(error);
        errorLog( res, 'Lead update was Unsuccessful.')
    }
    
};

exports.getLead = async (req, res, next) =>{
    try {
        const lead = await Lead.findByPk( req.params.leadId )
        if(!lead) return errorRes( res, 'Invalid Lead Id')

        //Success Response
        const data = await lead
        successResWithData( res, 'Lead Account Details', data );
               
    } catch (error) {
        errorLog( res, 'Something went wrong' );
    }
    
};

exports.deleteLead = async (req, res, next) =>{
    try {
        await Lead.destroy( { where: { id: req.params.leadId }  } )
        
        //Success Response
        successRes( res, 'Lead Account deleted successfully.' );
               
    } catch (error) {
        errorLog( res, 'Something went wrong' );
    }
    
};

exports.getAllLeads = async (req, res, next) => {
    try {
        const leads = await Lead.findAll();
        
        //Success Response
        const data = await leads
        successResWithData( res, 'Lead List', data ) 

    } catch (error) {
        error_res( res, error );
    }
    
};