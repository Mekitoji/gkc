var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var dataStorage = new Schema({
  fullDate: {
    type: String
  },
  value: {
    type: String
  }
});

var Calendar = new Schema({
  appId: {
    type: Schema.ObjectId,
    ref: 'Apps'
  },
  storage: [dataStorage]
});

module.Calendar = mongoose.model('Calendar', Calendar);
module.CalendarEU = mongoose.model('CalendarEU', Calendar);