<<<<<<< HEAD
/* ////////////////////////////////   custom script /////////////////////////////////////////// */


// write your script from here
=======

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


moment.locale("en-GB");

var $range = $("#range_16");
var start = moment("2016-10-02 08:00", "YYYY-MM-DD HH:mm");
var end = moment("2016-10-02 20:00", "YYYY-MM-DD HH:mm");

$range.ionRangeSlider({
    type: "double",
    grid: true,
    min: start.format("x"),
    max: end.format("x"),
    step: 1800000,                // 30 minutes in ms
    prettify: function (num) {
        return moment(num, 'x').format("h:mm A");
    }
});
>>>>>>> ccced4c67767670a09b781fd31583538bb32c4f2
