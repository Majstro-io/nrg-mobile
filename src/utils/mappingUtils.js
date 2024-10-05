const mapFavouritesWithActivities = (activities, favourites) => {
    return favourites.map(fav => {
        const activity = activities.find(act => act.id === fav.activityId);
        return {
            ...fav,
            activityName: activity ? activity.name : "-"
        };
    });
};

const mappingUtils = {
    mapFavouritesWithActivities
}

export default mappingUtils;
