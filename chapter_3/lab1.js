var pipeline = [
    {
        $match: {
            'awards': /Won.\d*.[oO]scars?/
        }
    },
    {
        $group: {
            _id: null,
            highest_rating: { $max: '$imdb.rating' },
            lowest_rating: { $min: '$imdb.rating' },
            average_rating: { $avg: '$imdb.rating' },
            deviation: { $stdDevSamp: '$imdb.rating' }
        }
    }
]

db.movies.aggregate(pipeline).pretty();