db.movies.aggregate([{
	"$project":{ _id: 0, movie_title: { "$size": {"$split": ["$title", " "]}}}
},{
	"$match": {"movie_title": { "$eq": 1}}
}]).itcount()