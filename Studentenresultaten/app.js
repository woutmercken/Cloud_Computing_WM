const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

hbs.registerHelper('isGreaterThan9', function (value) {
    return value > 9;
  });

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const firstRouter = require('./routes/first');
app.use('/first', firstRouter);

const secondRouter = require('./routes/second')
app.use('/second', secondRouter);

const thirdRouter = require('./routes/third')
app.use('/third', thirdRouter);

const errorRouter = require('./routes/error')
app.use('*', errorRouter);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
