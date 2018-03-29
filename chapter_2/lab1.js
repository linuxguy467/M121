var favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"
];

db.movies.aggregate([{
	"$match":{
		"countries": "USA",
		"tomatoes.viewer.rating": {"$gte": 3},
		"cast": { "$in": favorites}
	}
},{
	"$project":{
		"_id": 0,
		"num_favs": { "$size": { "$ifNull": [{ "$filter": { input: "$cast", as: "cast", cond: {"$in": ["$$cast", favorites]}}}, []]}},
		"title": 1,
		"rating": "$tomatoes.viewer.rating"
	}
},
{"$sort": {"num_favs": -1, "rating": -1}},
{"$limit": 25}
]).pretty()