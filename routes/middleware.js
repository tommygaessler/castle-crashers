var Castle = require('../models/castle');

function validate (req, res, next) {
  if (req.body.password === '[YOUR SECRET PASSWORD]') {
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  };
}

// function for searching for the castle
function findOne (req, res, next) {
  var castle = Castle.findOne(req.params.id);
  if (!castle) { res.status(404).send({ message: 'Castle not found!'}); }
  // if castle is not found send error
  else {
    req.body.castle = castle;
    next();
  }
}

// checks if kingdom is destroyed
function kingdomIsDestroyed (req, res, next) {
  if (Castle.isDestroyed()) {
    res.status(500).send('All the castles are destroyed!');
  } else {
    next();
  }
}

module.exports = {
  validate: validate,
  findOne: findOne,
  kingdomIsDestroyed: kingdomIsDestroyed
}
