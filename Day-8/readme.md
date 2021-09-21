# MiddleWare

Middleware is a software that enables one or more type of communication or connectivity between two or more application components in a distributed network.

We can use app.use() to apply middleware to all routes but it should be before declaring the route or it won't work.

Paths are relative on express.use so the use of path.join is used to get path.join to get absolute path.

Multiple ways to make queries like in json , form data ,graphql, binary mostly json and form data are use

We can use body_parser to parse req.body which is also a middleware

Body parser constructor is depreceated use express.urlencoded or express.json in express 4.16^