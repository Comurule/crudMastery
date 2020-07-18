const { Preference } = require('../../models');
const { 
    errorRes, errorLog, successResWithData, successRes 
} = require('../../utils/apiResponse1');

exports.createPreference = async (req, res) => {
    const { preferenceCenter } = req.body;
    
    //To check against empty fields
    if(!preferenceCenter || preferenceCenter == '') 
        errorRes( res, 'Ensure all fields are filled' )
    try {
        //check if there is a duplicate in the database
        const checkPreference = await Preference.findOne({ 
            where: { preference: preferenceCenter } 
        });

        if( checkPreference ) {
            errorRes( res, 'This Preference already exists in the database.' );
        } else {
        
            const preference = await Preference.create({ preference:preferenceCenter });

            const data = await preference;

            //Success response
            successResWithData( res, 'Preference created successfully.', data );
        }
    } catch (error) {
        console.log(error);
        errorLog( res, 'Error: Preference creation is Unsuccessful.')
    }
};

exports.updatePreference = async (req, res) => {
    const { preferenceCenter } = req.body;

    //To check against empty fields
    if(!preferenceCenter || preferenceCenter == '') errorRes(
        res,
        'Ensure all fields are filled'
    );
    try {
        //check if there is a duplicate in the database
        const checkPreference = await Preference.findOne({ 
            where: { preference:preferenceCenter } 
        });

        if(checkPreference && checkPreference.id != req.params.preferenceId) {
            errorRes( 
                res, 
                'This Preference already exists in the database.' 
            );
        } else {
    
            await Preference.update({ 
                preference: preferenceCenter 
            },{
                where: { id: req.params.preferenceId }
            });

            const preference = await Preference.findByPk( req.params.preferenceId )

            const data = await preference;

            //Success response
            successResWithData( 
                res, 
                'Preference updated successfully.', 
                data 
            );
        }

    } catch (error) {
        console.log(error);
        errorLog( res, 'Error: Preference updare is Unsuccessful.')
    }
};

exports.deletePreference = async (req, res) => {
    try {
        //check if the id is valif
        const check = await Preference.findByPk( req.params.preferenceId )
        if(!check) errorRes(
            res, 'Invalid Entry Details'
        )

        await Preference.destroy({ where: { id: req.params.preferenceId } })

        //Success Response
        successRes( res, 'Deletion Successful.' )

    } catch (error) {
        console.log(error);
        errorLog(
            res, 
            'Error: Something went wrong.'
        )
    }
};

exports.getPreference = async (req, res) => {
    try {
        const preference = await Preference.findByPk( req.params.preferenceId )
        if(!preference) errorRes( res, 'Invalid Entry DEtails' )

        //Success Response
        const data = await preference
        successResWithData( 
            res,
            'Preference Settings Details',
            data
        )

    } catch (error) {
        console.log(error);
        errorLog(
            res, 
            'Error: Something went wrong.'
        )
    }
};

exports.getAllPreference = async (req, res) => {
    try {
        const list = await Preference.findAll()

        const data = await list
        successResWithData(
            res, 
            'Preference Settings List',
            data
        )
    } catch (error) {
        console.log(error);
        errorLog(
            res, 
            'Error: Something went wrong.'
        )
    }
};

exports.addPreference = async (req, res) => {

}; //This is a User controller, to enable a user add alot of preference settingsS

exports.removePreference = async (req, res) => {

};