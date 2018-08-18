// write your script from here
// $("#range_16").ionRangeSlider({
//     grid: true,
//     type: 'double',
//     min: 18,
//     max: 70,
//     from: 30,
//     prefix: "Age ",
//     max_postfix: "+"
// });


sliderModify("Push", "11:00", "16:00", "2018-08-18", "#range_16");
sliderStatic("Push", "11:00", "16:00", "2018-08-18", "#range_17");


function sliderModify(empId, timeIn, timeOut, shiftDate, elementId) {
    moment.locale("en-GB");

    var $range = $(elementId);
    var start = moment(`${shiftDate} 08:00`, "YYYY-MM-DD HH:mm");
    var end = moment(`${shiftDate} 22:00`, "YYYY-MM-DD HH:mm");
    let startFrom = moment(`${shiftDate} ${timeIn}`, "YYYY-MM-DD HH:mm");
    let startTo = moment(`${shiftDate} ${timeOut}`, "YYYY-MM-DD HH:mm");


    $range.ionRangeSlider({
        type: "double",
        grid: true,
        min: start.format("x"),
        max: end.format("x"),
        from: startFrom.format("x"),
        to: startTo.format("x"),
        step: 1800000, // 30 minutes in ms
        prettify: function (num) {
            return moment(num, 'x').format("h:mm A");
        }
    });
};

function sliderStatic(empId, timeIn, timeOut, shiftDate, elementId) {
    moment.locale("en-GB");

    var $range = $(elementId);
    var start = moment(`${shiftDate} 08:00`, "YYYY-MM-DD HH:mm");
    var end = moment(`${shiftDate} 22:00`, "YYYY-MM-DD HH:mm");
    let startFrom = moment(`${shiftDate} ${timeIn}`, "YYYY-MM-DD HH:mm");
    let startTo = moment(`${shiftDate} ${timeOut}`, "YYYY-MM-DD HH:mm");


    $range.ionRangeSlider({
        type: "double",
        grid: true,
        min: start.format("x"),
        max: end.format("x"),
        from: startFrom.format("x"),
        to: startTo.format("x"),
        from_fixed: true,
        to_fixed: true,
        step: 1800000, // 30 minutes in ms
        prettify: function (num) {
            return moment(num, 'x').format("h:mm A");
        }
    });
};