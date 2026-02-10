import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion, getRoutesBySeason } from '../models/model.js';

export default async (req, res) => {
    // console.log("Query Parameters:", req.query);
    const { region, season } = req.query;
    const regions = await getListOfRegions();
    let routes;
    
    if (region && season) {
        routes = await getRoutesByRegion(region);
        routes = routes.filter(route => route.bestSeason.toLowerCase() === season.toLowerCase());
    } else if (region) {
        routes = await getRoutesByRegion(region);
    } else if (season) {
        routes = await getRoutesBySeason(season);
    } else {
        routes = await getAllRoutes();
    }

    const seasons = await getListOfSeasons();

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};