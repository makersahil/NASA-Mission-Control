const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}


function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required data!",
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid Launch Date",
        })
    }

    addNewLaunch(launch);
    return res.status(200).json(launch);
}

function httpAbortLaunch(req, res) {
    const id = Number(req.params.id);
    
    if(!existsLaunchWithId(id)) {
        return res.status(404).json({
            error: "Launch not found!",
        });
    }

    const aborted = abortLaunchById(id);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};