var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
mongoose.connect('mongodb+srv://capsuletest:azerty@cluster0-iutb9.mongodb.net/tripApp?retryWrites=true&w=majority', 
  options,     
  function(err) {
   console.log(err);
  }
);

var travelSchema = mongoose.Schema({
  tripName: String,
  description: String,
  image: String,
});

var TripModel = mongoose.model('trips', travelSchema);


//Route par défaut.
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/trips', function(req, res, next) {

  TripModel.find( function (err, trips) {

    res.render('trips', { title: 'Trips',trips });

  });
});

router.get('/card', function(req, res, next) {

  TripModel.findOne( {_id:req.query.id} ,function (err, trips) {

    res.render('card', { title: 'Card',trips });

  });

});

var deletedTrip = [];

router.post('/delete-post', function(req, res, next) {

  // console.log(deletedTrip);
  // console.log(req.body);
  var positionItem = req.body.position;
  // console.log(req.body.position);
  // console.log(positionItem);
  deletedTrip.push(travel[positionItem]);
  travel.splice(req.body.position,1);
  //console.log(deletedTrip);

  res.render('trips', {travel});
});

router.post('/new-trip', function(req, res, next) {
  

  var newTrip = new TripModel ({
    tripName: req.body.name,
    description: req.body.description,
    image: req.body.image,
  });

  newTrip.save(
    function (error, trips) {

      //CityModel.find( function (err, cities) {
    
        res.render('index', { title: 'Trips',trips });
    
      //});
    }
  );
});



/*router.post('/delete-post', function(req, res, next) {

  console.log(deletedTrip);
  console.log(req.body);
  deletedTrip.push(travel.req.body.position);
  travel.splice(req.body.position,1);
  console.log(deletedTrip);

  res.render('trips', {travel});
});*/

router.get('/new', function(req, res, next) {

  //console.log(deletedTrip);
  res.render('new', {deletedTrip});
});



module.exports = router;
