
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

function sliderTool(empId, timeIn, timeOut, shiftDate) {
    moment.locale("en-GB");
    var startTime = timeIn;
    var endTime = timeOut;

    var $range = $("#range_16");
    var start = moment("2016-10-02 08:00", "YYYY-MM-DD HH:mm");
    var end = moment("2016-10-02 20:00", "YYYY-MM-DD HH:mm");
    var startFrom = moment("2016-10-02 " + startTime, "YYYY-MM-DD HH:mm");
    var endFrom = moment("2016-10-02 " + endTime, "YYYY-MM-DD HH:mm");

    $range.ionRangeSlider({
        type: "double",
        grid: true,
        min: start.format("x"),
        max: end.format("x"),
        from: startFrom.format("x"),
        to: endFrom.format("x"),
        step: 1800000,                // 30 minutes in ms
        prettify: function (num) {
            return moment(num, 'x').format("h:mm A");
        }
    });
}