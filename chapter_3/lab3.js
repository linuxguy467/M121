db.air_routes.aggregate([
    {
        $match: {
            $or: [{ airplane: /380/ }, { airplane: /747/ }]
        }
    },
    {
        $group: {
            _id: '$airline.name',
            routes: { $sum: 1 }
        }
    },
    {
        $sort: {
            routes: -1
        }
    },
    { $limit: 1 },
	{
		"$lookup": {
			"from": "air_airlines",
			"localField": "airlines",
			"foreignField": "name",
			"as": "airlines"
		}
    }
]).pretty()