import { getRouteById, getSchedulesByRoute, getCompleteRouteDetails } from '../models/model.js';
import { monthNumberToAbbreviation } from '../includes/helpers.js';

export default async (req, res) => {
    const { routeId } = req.params;

    // TODO: getCompleteRouteDetails instead
    const completeDetails = await getCompleteRouteDetails(routeId);
    completeDetails.operatingMonths = completeDetails.operatingMonths.map(m => monthNumberToAbbreviation(m));

    res.render('routes/details', { 
        title: 'Route Details',
        details: completeDetails
    });
};