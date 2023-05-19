var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload=require('./multer');
var LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage('./scratch');

/* GET home page. */

router.get('/login',function(req,res){
  res.render('loginflight',{msg:''})
})



router.get('/displaybyid', function(req, res, next) {
 
  pool.query('select F.*,(select S.statename from states S where S.stateid=F.sourcestateid ) as ss,(select S.statename from states S where S.stateid=F.destinationstateid ) as ds, (select C.cityname from city C where C.cityid=F.destinationcityid ) as dc,(select C.cityname from city C where C.cityid=F.sourcecityid ) as sc from flightss F where F.flightid=?',[req.query.flightid],function(error,result){
    if(error){
      console.log(error)
      res.render('displaybyflightid',{data:[]});
    }
    else{
      res.render('displaybyflightid',{data:result[0]});
    }
    
  })
  // res.render("displaybyflightid",{msg: ''})

});



router.get('/displayall', function(req, res, next) {
  var result=JSON.parse(localStorage.getItem('admin'))
if(!result)
res.render('loginflight',{msg:''});
  pool.query('select F.*,(select C.cityname from city C where C.cityid=F.sourcecityid ) as sc, (select C.cityname from city C where C.cityid=F.destinationcityid ) as dc from flightss F',function(error,result){
    if(error){
      res.render('displayall',{data:[]});
    }
    else{
      res.render('displayall',{data:result});
    }

  })

});
router.get('/flightenquiry', function(req, res, next) {
  var result=JSON.parse(localStorage.getItem('admin'))
if(result)
   res.render('flightinterface',{msg:''});
else
  res.render('loginflight',{msg:''})
});

router.get('/fetchallstates',function(req,res){
  pool.query('select * from states',function(error,result){
    if(error){
      res.status(500).json([])
    }
    else{
      res.status(200).json(result)
    }

  })
});


router.get('/fetchallcity',function(req,res){
  pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){
    if(error){
      res.status(500).json([])
    }
    else{
      res.status(200).json(result)
    }

  })
});
router.get('/showpicture',function(req,res){
  res.render('showpicture',{flightid:req.query.flightid,companyname:req.query.companyname,logo:req.query.logo})
});

router.post('/addnewrecord',upload.single('logo'),function(req,res){
  console.log('BODY:',req.body)
  console.log('FILE:',req.file)


  var fclass;
  var fdays;
  if(Array.isArray(req.body.fclass)){
 fclass=req.body.fclass.join("#")}
 else{
  fclass=req.body.fclass;
 }
  if(Array.isArray(req.body.fdays)){
 fdays=req.body.fdays.join("#")}
 else{
  fdays=req.body.fdays;
 }
 pool.query("insert into flightss(flightid,companyname,sourcestateid,sourcecityid,destinationstateid,destinationcityid,status,flightclass,sourcetiming,destinationtiming,days,logo)values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.flightid,req.body.companyname,req.body.sourcestate ,req.body.sourcecity,req.body.desstate,req.body.descity,req.body.status,fclass,req.body.sourcetime,req.body.destime,fdays,req.file.originalname],function(error,result){
 if(error){
  console.log('xxxxxxxxxxxxxx',error)
  res.render('flightinterface',{msg:'Server Error,Record Not Submitted'})
 }
 else{
  res.render('flightinterface',{msg:'Record Submitted Successfully'})

 }
})

})


router.post('/editdeleterecord',function(req,res){
  console.log('BODY:',req.body)
 if(req.body.btn=='Edit'){


  var fclass;
  var fdays;
  if(Array.isArray(req.body.fclass)){
 fclass=req.body.fclass.join("#")}
 else{
  fclass=req.body.fclass;
 }
  if(Array.isArray(req.body.fdays)){
 fdays=req.body.fdays.join("#")}
 else{
  fdays=req.body.fdays;
 }
 pool.query("update flightss set companyname=?,sourcestateid=?,sourcecityid=?,destinationstateid=?,destinationcityid=?,status=?,flightclass=?,sourcetiming=?,destinationtiming=?,days=? where flightid=?",[req.body.companyname,req.body.sourcestate ,req.body.sourcecity,req.body.desstate,req.body.descity,req.body.status,fclass,req.body.sourcetime,req.body.destime,fdays,req.body.flightid],function(error,result){
 if(error){
  console.log('xxxxxxxxxxxxxx',error)
  res.redirect('/flight/displayall')
 }
 else{
  res.redirect('/flight/displayall')
 }
})

 }

 else{
  pool.query("delete from flightss where flightid=?",[req.body.flightid],function(error,result){
    if(error){
     console.log('xxxxxxxxxxxxxx',error)
     res.redirect('/flight/displayall')
    }
    else{
     res.redirect('/flight/displayall')
    }
   })
 }

})


router.post('/editpicture',upload.single('logo'),function(req,res){
pool.query("update flightss set logo=? where flightid=?",[req.file.originalname,req.body.flightid],function(error,result){
  if(error){
    res.redirect('/flight/displayall')
   }
   else{
    res.redirect('/flight/displayall')
   }
})  


})


module.exports = router;
