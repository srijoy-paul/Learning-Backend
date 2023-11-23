//create an express app
const express = require("express");
const app = express();
//created an express app
const routes = require("./Routes/AppRoutes")
const cors = require("cors");

app.use(cors());
//accept the json
app.use(express.json());
//

//accept the body
app.use(express.urlencoded({ extended: true }));
// this will accept the body

//use the html
app.use(express.static("public"));
// this will make url for the html files, by using their path names in the public directory, the html file having name index in the specified(public) directory will be mapped to the base URL.

app.use("/api/v1", routes)

//create a port and listen on that port number
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running at port number = ${PORT}`);
})
//created a port and listening on that port number