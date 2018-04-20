const express = require('express');
const hbs = require('hbs');
const $ = require('jquery');
const bodyParser = require('body-parser');
var pg = require('pg');
var conString = "postgres://postgres:databaseproject@localhost:5432/hospmangsys";
var app = express();

//database connected

hbs.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 == v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});


// var client = new pg.Client(conString);
/*
client.connect(err => {
    if (err) throw err;
    else { queryDatabase();
     }
});
*/
var data=[];

// client.connect(err => {
//     if (err) throw err;
//     else {
//          queryDatabase();
//         }
//
// });

/*
client.end((err) => {
  console.log('client has disconnected')
  if (err) {
    console.log('error during disconnection', err.stack)
  }
})
*/
// function queryDatabase() {
//
//   //  console.log(`Running query to PostgreSQL server:`);
//
//     const query = 'SELECT * FROM patient,employee where patient.eid=employee.eid;';
//
//     client.query(query)
//         .then(res => {
//             const rows = res.rows;
//             rows.map(row => {
//                 //console.log(`Read: ${JSON.stringify(row)}`);
//                 data.push(row);
//                 //console.log(data);
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
//
// }




hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.get('/',(request,response)=>{
  // response.send('<h1>hello</h1>');
  response.render('login.hbs',{
    welcomeMessage: 'Welcome to my Webiste',
    pageTitle : 'Home Page',
  });
});

app.get('/staff',(req,res)=>{
  res.render('staff.hbs');
});


app.get('/patientdata', function(req, res, next) {
  var temp;

  setTimeout(function () {
 //console.log(data);
 res.json(JSON.stringify(data));
}, 1000);

});


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/new_patient',urlencodedParser,function(req,res){
  console.log(req.body);
  //   var query = "";
  // console.log(query);
  //   client.query(query)
  //       .then(res => {
  //           const rows = res.rows;
  //           rows.map(row => {
  //               //console.log(`Read: ${JSON.stringify(row)}`);
  //               search_patientdata.push(row);
  //
  //           });
  //       })
  //       .catch(err => {
  //           console.log(err);
  //       });
  res.status(200).send('Patient Added');
});

app.get('/add_patient',urlencodedParser,function(req,res){
  res.render('add_patient.hbs');
});

app.get('/patientsearch', urlencodedParser,function(req,res){
  res.render('patient_search.hbs');
});

app.get('/doctorsearch', urlencodedParser,function(req,res){
  res.render('doctor_search.hbs');
});

app.get('/nursesearch', urlencodedParser,function(req,res){
  res.render('nurse_search.hbs');
});

app.get('/doctor', urlencodedParser,function(req,res){
  res.render('doctor_tab.hbs');
});

app.get('/nurse', urlencodedParser,function(req,res){
  res.render('nurse_tab.hbs');
});

app.get('/patient', urlencodedParser,function(req,res){
  res.render('patient_tab.hbs');
});

app.post('/staffpage', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  //res.send('welcome, ' + req.body.username);
    var name=req.body.data;
    var pass=req.body.password;
    //console.log(temp);
    if(name==='Staff'&&pass==="123456")
     {
      res.redirect('/staff');
     }
     else {
        if(name==='Admin'&&pass==="987654")
         {

         }
         else {
            res.redirect('/');
         }
     }

});



app.post('/search_patient', urlencodedParser, function (req, res) {
var search_patientdata=[];
  if (!req.body) return res.sendStatus(400);
  //res.send('welcome, ' + req.body.username);
    var temp1=req.body.data;

    temp1=temp1+"%";
    if(temp1=="%")
     {
        return res.render('patient_search',{result:search_patientdata});
     }

    console.log(temp1);

    console.log(`Running query to PostgreSQL server search_patient:`);



//     var query = "SELECT * FROM patient,employee where patient.eid=employee.eid AND patient.pname like "+"'"+temp1+"'"+";";
// console.log(query);
//     client.query(query)
//         .then(res => {
//             const rows = res.rows;
//             rows.map(row => {
//                 //console.log(`Read: ${JSON.stringify(row)}`);
//                 search_patientdata.push(row);
//
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });


       // res.redirect('/patientsearch');
       console.log(search_patientdata);
      res.render('patient_search',{result:search_patientdata});
});

app.post('/search_doctor', urlencodedParser, function (req, res) {
var search_doctordata=[];
  if (!req.body) return res.sendStatus(400);
  //res.send('welcome, ' + req.body.username);
//     var temp1=req.body.data;
//
//     temp1=temp1+"%";
//     if(temp1=="%")
//      {
//         return res.render('doctor_search',{result:search_doctordata});
//      }
//
//     console.log(temp1);
//
//     console.log(`Running query to PostgreSQL server search_doctordata:`);
//
//
//
// //     var query = "SELECT * FROM patient,employee where patient.eid=employee.eid AND patient.pname like "+"'"+temp1+"'"+";";
// // console.log(query);
// //     client.query(query)
// //         .then(res => {
// //             const rows = res.rows;
// //             rows.map(row => {
// //                 //console.log(`Read: ${JSON.stringify(row)}`);
// //                 search_doctordata.push(row);
// //
// //             });
// //         })
// //         .catch(err => {
// //             console.log(err);
// //         });
//
//
//        // res.redirect('/patientsearch');
  search_doctordata.push({
    id:101,
    name:'Deepanshu',
    qualification:'B.Tech',
    salary:10000,
    experience:5,
    contact:'999999999',
    type:'permanent'
  });//sample data
   res.render('doctor_search',{result:search_doctordata});
});

app.post('/search_nurse', urlencodedParser, function (req, res) {
var search_nursedata=[];
  if (!req.body) return res.sendStatus(400);
  //res.send('welcome, ' + req.body.username);
//     var temp1=req.body.data;
//
//     temp1=temp1+"%";
//     if(temp1=="%")
//      {
//         return res.render('nurse_search',{result:search_nursedata});
//      }
//
//     console.log(temp1);
//
//     console.log(`Running query to PostgreSQL server search_nursedata:`);
//
//
//
// //     var query = "SELECT * FROM patient,employee where patient.eid=employee.eid AND patient.pname like "+"'"+temp1+"'"+";";
// // console.log(query);
// //     client.query(query)
// //         .then(res => {
// //             const rows = res.rows;
// //             rows.map(row => {
// //                 //console.log(`Read: ${JSON.stringify(row)}`);
// //                 search_nursedata.push(row);
// //
// //             });
// //         })
// //         .catch(err => {
// //             console.log(err);
// //         });
//
//
//        // res.redirect('/patientsearch');
  search_nursedata.push({
    id:101,
    name:'Deepanshu',
    qualification:'B.Tech',
    salary:10000,
    experience:5,
    contact:'999999999',
    type:'permanent',
    roomid:'1234'
  });//sample data
   res.render('nurse_search',{result:search_nursedata});
});

setTimeout(function () {
app.get('/search_patientdata', function(req, res, next) {

 console.log(search_patientdata);
 res.json(JSON.stringify(search_patientdata));

});
}, 1000);
/*
var con = mysql.createConnection({
  host: "localhost",
  user: USER,
  password: PASSWORD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

app.listen(3000,()=>{
  console.log('Server is up');
});
