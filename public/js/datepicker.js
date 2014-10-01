var permission;
// take permission right from server
if (userG === 'gk' || userG === 'root') {
  permission = true;
} else {
  permission = false;
}

$(document).ready(function () {
  $('#datepicker').datepicker({
    inline: true,
    onSelect: function (dateText, inst) {
      var d = new Date(dateText);
      $('#calendar').fullCalendar('gotoDate', d);
      $('td.fc-day').ready(function () {
        $.get(url, function (data) {

          console.log('data:');
          console.log(data);
          var storageOfDate = [];
          var appNameObj = {};
          var calendarId = {};

          // var test = {};
          //Push data in array
          for (var i = 0; i < data.length; i++) {
            calendarId[data[i]._id] = data[i].appId._id;
            appNameObj[data[i].appId._id] = data[i].appId.appName;
            // storageOfDate.push(data[i].storage);
            var innerStorage = data[i].storage;

            for (j = 0; j < innerStorage.length; j++) {

              if (!data_manual[innerStorage[j].fullDate]) {
                data_manual[innerStorage[j].fullDate] = {};
              }

              data_manual[innerStorage[j].fullDate][data[i].appId._id] = innerStorage[j].value;
            }
          }

          console.log('\n\ndata_manual:');
          console.log(data_manual);

          console.log('appNameObj:');
          console.log(appNameObj);
          console.log('calendarId'); //calendarId
          console.log(calendarId); //calendarId
          // console.log('storageOfDate:');
          // console.log(storageOfDate);

          $('.appNameRow').each(function () {
            $(this).remove();
          });

          //create tr for each elem in data array
          $.each(appNameObj, function (i, appName) {
            var tr = $('<tr>').addClass('appNameRow');
            $('<td>').html(appName).appendTo(tr).css({
              'height': '21px'
            });
            $('.inner-table-appName tbody').append(tr);
          });

          var count = 0;
          $('td.fc-day').each(function (i, elem) {
            var thisCol = $(this),
              table = $('<table>'),
              dd = thisCol.data('date'),

              thisColTable = table.addClass('column-table').attr('id', 'dataTableColumn' + (++count)).appendTo(thisCol);



            $.each(data_manual, function (date, valueArr) {

              $.each(appNameObj, function (appId, appName) {
                if (date == dd) {
                  if (valueArr[appId]) {
                    // console.log(date + ' ' + appName + " = " + valueArr[appId]);
                    var tr = $('<tr>').css({
                      'height': '21px ',
                      'text-align': 'center'
                    });
                    var td = $('<td>');
                    $.each(calendarId, function (calId, appId11) {
                      if (appId === appId11)
                        td.html(valueArr[appId]).addClass(date).addClass(calId).appendTo(tr);
                    });
                    thisColTable.append(tr);
                    if (td.html() == 'L') {
                      td.css({
                        "background-color": "orange",
                        "color": "black"
                      });
                    } else if (td.html() == 'H') {
                      td.css({
                        "background-color": "#B19CD9",
                        "color": "black"
                      });
                    } else if (td.html() == 'D') {
                      td.css({
                        "background-color": "green",
                        "color": "black"
                      });
                    } else if (td.html() == 'LL') {
                      td.css({
                        "background-color": "orange",
                        "color": "orange"
                      });
                    }
                    td.on('change', function (evt, newValue) {

                      var thisElem = $(this);
                      console.log('thisElem');
                      console.log(thisElem);
                      console.log('evt');
                      console.log(evt);
                      console.log('newValue');
                      console.log(newValue);
                      var classArr = thisElem.attr('class').split(' ');
                      console.log(classArr);

                      if (newValue == 'L') {
                        thisElem.css({
                          "background-color": "orange",
                          "color": "black"
                        });
                      } else if (newValue == 'H') {
                        thisElem.css({
                          "background-color": "#B19CD9",
                          "color": "black"
                        });
                      } else if (newValue == 'D') {
                        thisElem.css({
                          "background-color": "green",
                          "color": "black"
                        });
                      } else if (newValue == 'LL') {
                        thisElem.css({
                          "background-color": "orange",
                          "color": "orange"
                        });
                      }

                      $.ajax({
                        type: 'PUT',
                        url: url + classArr[1],
                        data: {
                          value: newValue,
                          fullDate: classArr[0],
                        }
                      });
                    });
                  } else {
                    var empty = $('<tr>').css({
                      'height': '21px ',
                      'text-align': 'center'
                    });
                    var td1 = $('<td>');
                    $.each(calendarId, function (calId, appId11) {
                      if (appId === appId11)
                        td1.html('').addClass(date).addClass(calId).appendTo(empty);
                    });
                    thisColTable.append(empty);
                    td1.on('change', function (evt, newValue) {
                      var thisElem = $(this);
                      console.log('thisElem');
                      console.log(thisElem);
                      console.log('evt');
                      console.log(evt);
                      console.log('newValue');
                      console.log(newValue);
                      var classArr = thisElem.attr('class').split(' ');
                      console.log(classArr);
                      if (newValue == 'L') {
                        thisElem.css({
                          "background-color": "orange",
                          "color": "black"
                        });
                      } else if (newValue == 'H') {
                        thisElem.css({
                          "background-color": "#B19CD9",
                          "color": "black"
                        });
                      } else if (newValue == 'D') {
                        thisElem.css({
                          "background-color": "green",
                          "color": "black"
                        });
                      } else if (newValue == 'LL') {
                        thisElem.css({
                          "background-color": "orange",
                          "color": "orange"
                        });
                      }
                      $.ajax({
                        type: 'PUT',
                        url: url + classArr[1],
                        data: {
                          value: newValue,
                          fullDate: classArr[0],
                        }
                      });
                    });
                  }
                }
              });

            });
            if (thisColTable[0].childNodes[0] === undefined) {
              $.each(appNameObj, function (appId, appName) {
                var empty = $('<tr>').css({
                  'height': '21px ',
                  'text-align': 'center'
                });
                var td = $('<td>');
                $.each(calendarId, function (calId, appId11) {
                  if (appId === appId11)
                    td.html('').addClass(dd).addClass(calId).appendTo(empty);
                });
                thisColTable.append(empty);
                td.on('change', function (evt, newValue) {
                  var thisElem = $(this);
                  console.log('thisElem');
                  console.log(thisElem);
                  console.log('evt');
                  console.log(evt);
                  console.log('newValue');
                  console.log(newValue);
                  var classArr = thisElem.attr('class').split(' ');
                  console.log(classArr);
                  if (newValue == 'L') {
                    thisElem.css({
                      "background-color": "orange",
                      "color": "black"
                    });
                  } else if (newValue == 'H') {
                    thisElem.css({
                      "background-color": "#B19CD9",
                      "color": "black"
                    });
                  } else if (newValue == 'D') {
                    thisElem.css({
                      "background-color": "green",
                      "color": "black"
                    });
                  } else if (newValue == 'LL') {
                    thisElem.css({
                      "background-color": "orange",
                      "color": "orange"
                    });
                  }
                  $.ajax({
                    type: 'PUT',
                    url: url + classArr[1],
                    data: {
                      value: newValue,
                      fullDate: classArr[0],
                    }
                  });
                });
              });
            }
            $('.fc-day-grid').off();
            if (permission) {
              table.editableTableWidget({
                editor: $('<select><option value=\'H\' style="background-color:#B19CD9">H</option><option value=\'D\' style="background-color:green">D</option><option value=\'L\' style="background-color:orange">L</option><option value=\'LL\' style="background-color:orange"></option></select>')
              });
            }
          });
          $('.fc-content-skeleton').remove();
        });
      });
    }
  });
});