const express = require('express');
const router = express.Router();

const { 
    createCampaign, updateCampaign, deleteCampaign, getCampaign, getAllCampaign 
} = require('../controllers/apiControllers/campaign');
const { 
    createPreference, updatePreference, deletePreference, 
    getPreference, getAllPreference 
} = require('../controllers/apiControllers/preference');
const { 
    createCampaignData, updateCampaignData, deleteCampaignData, 
    getCampaignData, getAllCampaignData 
} = require('../controllers/apiControllers/campaignData');
const { 
    createLeadCampaign, updateLeadCampaign, deleteLeadCampaign, 
    getLeadCampaign, getAllLeadCampaign 
} = require('../controllers/apiControllers/leadCampaign');
const { 
    createLeadCampaignData, updateLeadCampaignData, 
    deleteLeadCampaignData, getLeadCampaignData, 
    getAllLeadCampaignData 
} = require('../controllers/apiControllers/leadCampaignData');



console.log('Api_leadCampaign routes')
//Campaign Routes
router.post('/users/:userId/campaigns/create', createCampaign);

router.post('/users/:userId/campaigns/:campaignId/update', updateCampaign);

router.get('/campaigns/:campaignId/delete', deleteCampaign);

router.get('/campaigns/:campaignId', getCampaign);

router.get('/campaigns', getAllCampaign);


//Preference Routes
router.post('/preferences/create', createPreference);

router.post('/preferences/:preferenceId/update', updatePreference);

router.get('/preferences/:preferenceId/delete', deletePreference);

router.get('/preferences/:preferenceId', getPreference);

router.get('/preferences', getAllPreference);

//Campaign Data Routes
router.post('/users/:userId/campaignData/create', createCampaignData);

router.post('/users/:userId/campaignData/:campaignDataId/update', updateCampaignData);

router.get('/campaignData/:campaignDataId/delete', deleteCampaignData);

router.get('/campaignData/:campaignDataId', getCampaignData);

router.get('/campaignData', getAllCampaignData);

//Lead Campaign Routes
router.post('/leadCampaign/create', createLeadCampaign);

router.post('/leadCampaign/:leadCampaignId/update', updateLeadCampaign);

router.get('/leadCampaign/:leadCampaignId/delete', deleteLeadCampaign);

router.get('/leadCampaign/:leadCampaignId', getLeadCampaign);

router.get('/leadCampaign', getAllLeadCampaign);

//Lead Campaign Data Routes
router.post('/leadCampaignData/create', createLeadCampaignData);

router.post('/leadCampaignData/:leadCampaignDataId/update', updateLeadCampaignData);

router.get('/leadCampaignData/:leadCampaignDataId/delete', deleteLeadCampaignData);

router.get('/leadCampaignData/:leadCampaignDataId', getLeadCampaignData);

router.get('/leadCampaignData', getAllLeadCampaignData);


module.exports = router;