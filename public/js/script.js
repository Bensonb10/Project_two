
function sliderModify(timeIn, timeOut, shiftDate, elementId) {
	moment.locale('en-GB');

	var $range = $(elementId);
	var start = moment(`${shiftDate} 08:00`, 'YYYY-MM-DD HH:mm');
	var end = moment(`${shiftDate} 22:00`, 'YYYY-MM-DD HH:mm');
	let startFrom = moment(`${shiftDate} ${timeIn}`, 'YYYY-MM-DD HH:mm');
	let startTo = moment(`${shiftDate} ${timeOut}`, 'YYYY-MM-DD HH:mm');


	$range.ionRangeSlider({
		type: 'double',
		grid: true,
		min: start.format('x'),
		max: end.format('x'),
		from: startFrom.format('x'),
		to: startTo.format('x'),
		step: 1800000, // 30 minutes in ms
		prettify: function (num) {
			return moment(num, 'x').format('h:mm A');
		}
	});
}

function sliderStatic(timeIn, timeOut, shiftDate, elementId) {
	moment.locale('en-GB');

	var input = `#range_${elementId}`;
	var $range = $(input);
	var start = moment(`${shiftDate} 08:00`, 'YYYY-MM-DD HH:mm');
	var end = moment(`${shiftDate} 22:00`, 'YYYY-MM-DD HH:mm');
	let startFrom = moment(`${shiftDate} ${timeIn}`, 'YYYY-MM-DD HH:mm');
	let startTo = moment(`${shiftDate} ${timeOut}`, 'YYYY-MM-DD HH:mm');


	$range.ionRangeSlider({
		type: 'double',
		grid: true,
		min: start.format('x'),
		max: end.format('x'),
		from: startFrom.format('x'),
		to: startTo.format('x'),
		from_fixed: true,
		to_fixed: true,
		hide_min_max: true,
		hide_from_to: true,
		step: 1800000, // 30 minutes in ms
		prettify: function (num) {
			return moment(num, 'x').format('h:mm A');
		}
	});
}

function modifyAccordion(date) {
	//take the date value from the date picker and turn it into a moment object
	let weekDay = moment(date);

	//loop through each accordion header 
	$('.sched-ul li.day-header').each(function(){
		let wdReadable = weekDay.format('dddd: MMM Do');
		let unixDay = weekDay.format('X');

		//change the header text to the formatted date
		$(this).find('.header-text').text(wdReadable);
		//add a unique data-attribute using the unix formatted date
		$(this).attr('data-id', unixDay);
		$(this).find('.add-btn').attr('data-id', unixDay);
		$(this).find('.collapsible-body').attr('data-id', 'cb-' + unixDay);

		console.log(wdReadable);
		//add 1 day to the date before moving on to the next element
		weekDay.add(1,'d');
	});

	//This code adds the neccessary classes to open the first accordion element
	$('.sched-ul li.day-header').first().addClass('active');
	$('.sched-ul li.day-header.active .collapsible-header').addClass('active');
	$('.sched-ul li.day-header.active .collapsible-body').attr('style','display: block;');
}

$(‘.datepicker’).datepicker({
    onClose: function () {
        let date = $(‘.datepicker’).val();
        let dbDateStart = moment(date).format(‘YYYY-MM-DD’);
        let dbDateEnd = moment(dbDateStart).add(6, ‘d’).format(‘YYYY-MM-DD’);
		console.log(`SELECT * FROM AvailTables WHERE date BETWEEN ${dbDateStart} AND ${dbDateEnd}`);
		
        modifyAccordion(date);
    }});

function addModSlider(date, elementId) {
	console.log('Called a new addModSlider');
	moment.locale('en-GB');

	var $range = $('#range_'+elementId);
	var start = moment(`${date} 08:00`, 'YYYY-MM-DD HH:mm');
	var end = moment(`${date} 22:00`, 'YYYY-MM-DD HH:mm');
	let startFrom = moment(`${date} 12:00`, 'YYYY-MM-DD HH:mm');
	let startTo = moment(`${date} 16:00`, 'YYYY-MM-DD HH:mm');


	
	$range.ionRangeSlider({
		type: 'double',
		grid: true,
		min: start.format('x'),
		max: end.format('x'),
		from: startFrom.format('x'),
		to: startTo.format('x'),
		step: 1800000, // 30 minutes in ms
		prettify: function (num) {
			return moment(num, 'x').format('h:mm A');
		},
		onFinish: function (data) {
			console.log(`Shift id: ${elementId} - ${moment(elementId, 'X').format('dddd: MMM Do')}, from ${data.from_pretty} - ${data.to_pretty}`);
		},
	});

}

//add button genertates and inserts the slider/employee block
$('.collapsible-header .add-btn').on('click', function(event){
	console.log('We fired this event.');
	event.stopPropagation();
	let uniqueId = moment().format('x');
	let scheduleDate = $(this).data('id');
	let ionDate = moment(scheduleDate, 'X').format('YYYY-MM-DD');
	let elementId = scheduleDate + '-' + uniqueId;

	console.log(ionDate);

	console.log(`${scheduleDate} - ${elementId}`);

	

	$(`[data-id=cb-${scheduleDate}`).append(`
	<div class="row shift-item-row">
        <div class="col s12">
            <ul id="create-page-schedule" class="collection sched-creation-collection" style="overflow: visible">
                <li class="collection-item" data-id="1">
                    <div class="row valign-wrapper">
                        <div class="col s3">
                            <!-- Dropdown button -->
                            <a class="dropdown-button waves-effect waves-light btn blue" href="#" data-activates="dropdown-block">Select Employee<i class="material-icons white-text right">arrow_drop_down</i></a><ul id="dropdown-block" class="dropdown-content" style="width: 170.672px; position: absolute; top: 741.812px; left: 45px; display: none; opacity: 1;">
                                <li>
                                    <div class="row valign-wrapper">
                                        <div class="col s4">
                                            <i class="material-icons medium">face</i>
                                        </div>
                                        <div class="col s5">
                                            Ben B.
                                        </div>
                                        <div class="col s3">
                                            [4hrs]
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <!-- Dropdown button structure -->
                        </div>
                        <div class="col s9">
                            <input id="range_${elementId}" />
                        </div>
                    </div>
                </li>
                
            </ul>
        </div>
    </div>
	`);

	

	addModSlider(ionDate,elementId);
});
