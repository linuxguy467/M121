var pipeline = [
    {
        $match: {
            'imdb.rating': { $gte: 1 },
            'released': { $gte: ISODate("1990-01-01") },
            languages: 'English'
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            normalized_rating: {
                $avg: [
                    {
                        $add: [
                            1,
                            {
                                $multiply: [
                                    9,
                                    {
                                        $divide: [
                                            { $subtract: ['$imdb.votes', x_min] },
                                            { $subtract: [x_max, x_min] }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    '$imdb.rating'
                ]
            }
        }
    },
    {
        $sort: { 'normalized_rating': 1 }
    }
];
db.movies.aggregate(pipeline).pretty();