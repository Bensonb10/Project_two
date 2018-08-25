let shiftsArr = [];
let availArr = [];
let unixArr = [];


function modifyAccordion(date) {
	//take the date value from the date picker and turn it into a moment object
	let weekDay = moment(date);

	unixArr = [];

	//loop through each accordion header 
	$('.sched-ul li.day-header').each(function(){
		let wdReadable = weekDay.format('dddd: MMM Do');
		let unixDay = weekDay.format('X');


		unixArr.push(unixDay);

		//change the header text to the formatted date
		$(this).find('.header-text').text(wdReadable);
		//add a unique data-attribute using the unix formatted date
		$(this).attr('data-id', unixDay);
		$(this).find('.add-btn').attr('data-id', unixDay);
		$(this).find('.collapsible-body').attr('data-id', 'cb-' + unixDay);

		$(this).find('.collapsible-body').html('');

		// console.log(wdReadable);
		//add 1 day to the date before moving on to the next element
		weekDay.add(1,'d');
	});

	//This code adds the neccessary classes to open the first accordion element
	$('.sched-ul li.day-header').first().addClass('active');
	$('.sched-ul li.day-header.active .collapsible-header').addClass('active');
	$('.sched-ul li.day-header.active .collapsible-body').attr('style','display: block;');
}

$('.datepicker').datepicker({
	onClose: function () {
		
		let date = $('.datepicker').val();
		modifyAccordion(date);

		$.ajax({
			method: 'GET',
			url: '/api/getAll'
		}).then((result) => {
			shiftsArr = [];
			updateShifts = [];
			availArr = [];
			appendShifts(unixArr, result);
			availArr.push(result);
		});
	}
});

function appendedSlider(ishiftId, date, elementId, iemployeeTableId, iEmpFirstName, iEmpLastName, ishiftStart, ishiftEnd){
	moment.locale('en-GB');

	var input = `#range_${elementId}`;

	var $range = $(input);
	var start = moment(`${date} 08:00`, 'YYYY-MM-DD HH:mm');
	var end = moment(`${date} 22:00`, 'YYYY-MM-DD HH:mm');
	let startFrom = moment(`${date} ${ishiftStart}`, 'YYYY-MM-DD HH:mm');
	let startTo = moment(`${date} ${ishiftEnd}`, 'YYYY-MM-DD HH:mm');

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
		onStart: function(data){
			console.log(`Shift id: ${elementId} - ${moment(elementId, 'X').format('dddd: MMM Do')}, from ${data.from_pretty} - ${data.to_pretty}`);
			let availEmp = [];

			let existCheck = shiftsArr.findIndex(obj => obj.elemId == elementId);
			console.log(existCheck);
			let dayOfWeek = moment(elementId, 'X').format('dddd');
			let date = moment(elementId, 'X').format('YYYY-MM-DD');
			console.log('check date' + moment(data.from_pretty, 'hh:mm A').format('HH:mm'));
			if (existCheck === -1) {
				shiftsArr.push({
					shiftId: ishiftId,
					date: date,
					dayOfWeek: dayOfWeek,
					start: ishiftStart,
					end: ishiftEnd,
					employeeTableId: iemployeeTableId,
					elemId: elementId
				});
			} else {
				shiftsArr[existCheck].start = moment(data.from_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].end = moment(data.to_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].employeeTableId = 1;
			}

			console.log(shiftsArr);
			console.log(availArr);

			console.log(dayOfWeek);

			if ($(`[data-id="${elementId}"] [data-date="${date}"]`).length !== 0) {
				$(`[data-id="${elementId}"] [data-date="${date}"]`).empty();
				$(`[data-id="${elementId}"] [data-date="${date}"]`).append(`<option value="${iemployeeTableId}" disabled selected>${iEmpFirstName} ${iEmpLastName}</option>`);

			}

			$.each(availArr[0], function (i, val) {
				let dayArr = [];
				
				$.each(this.AvailTables, function (index, value) {
					dayArr.push(this.dayOfWeek);
				});

				if (dayArr.includes(dayOfWeek)) {
					console.log(this);

					let thisStart;
					let thisEnd;

					$.each(this.AvailTables, function (index, value) {
						if (this.dayOfWeek == dayOfWeek) {
							thisStart = this.startTime;
							thisEnd = this.endTime;
						}
					});

					// console.log('do math')
					let shiftStart = moment(data.from, 'x').format('HHmm');
					let shiftEnd = moment(data.to, 'x').format('HHmm');
					let euStart = moment(thisStart, 'HH:mm').format('HHmm');
					let euEnd = moment(thisEnd, 'HH:mm').format('HHmm');

					console.log(`shiftStart: ${shiftStart}`);
					console.log(`shiftEnd: ${shiftEnd}`);
					console.log(`euStart: ${euStart}`);
					console.log(`euEnd: ${euEnd}`);
					// console.log(moment(`'${euStart}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`));
					// console.log(moment(shiftStart))
					// console.log(moment(euStart))
					if (moment(`'${euStart}'`).isBetween(`'${shiftStart}'`, `'${shiftEnd}'`) === true || moment(`'${shiftStart}'`).isBetween(`'${euStart}'`, `'${euEnd}'`) === true) {
						console.log('This employee is unavailable at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isSame(`'${shiftEnd}'`) === true) {
						console.log('Employee is exactly unavail at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isBetween(`'${shiftStart}'`, `'${shiftEnd}'`) === true) {
						console.log('Emp is unavail equal to beginning of shift to before shift ends');
					}
					else {
						console.log(`ID of employee able to work: ${this.EmployeeTableId}`);
						let employee = availArr[0].filter((x) => x.id === this.EmployeeTableId);
						availEmp.push(this);
					}
				} else {
					availEmp.push(this);
				}
			});
			console.log(availEmp);
			// let optionValue = 1;
			availEmp.forEach(function (element) {

				$(`[data-id="${elementId}"] [data-date="${date}"]`).append(`
					<option value="${element.id}"> ${element.firstName} ${element.lastName} </option>	
				`);
				$('select').formSelect();
				// optionValue++;
			});

		},
		onFinish: function (data) {
			console.log(`Shift id: ${elementId} - ${moment(elementId, 'X').format('dddd: MMM Do')}, from ${data.from_pretty} - ${data.to_pretty}`);
			let availEmp = [];

			let existCheck = shiftsArr.findIndex(obj => obj.elemId == elementId);
			console.log(existCheck);
			let dayOfWeek = moment(elementId, 'X').format('dddd');
			let date = moment(elementId, 'X').format('YYYY-MM-DD');
			if (existCheck === -1) {
				shiftsArr.push({
					shiftId: ishiftId,
					date: date,
					dayOfWeek: dayOfWeek,
					start: moment(data.from_pretty, 'hh:mm A').format('HH:mm'),
					end: moment(data.to_pretty, 'hh:mm A').format('HH:mm'),
					employeeTableId: 1,
					elemId: elementId
				});
			} else {
				shiftsArr[existCheck].start = moment(data.from_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].end = moment(data.to_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].employeeTableId = 1;
			}

			console.log(shiftsArr);
			console.log(availArr);

			console.log(dayOfWeek);

			if($(`[data-id="${elementId}"] [data-date="${date}"]`).length !== 0) {
				$(`[data-id="${elementId}"] [data-date="${date}"]`).empty();
				$(`[data-id="${elementId}"] [data-date="${date}"]`).append(`<option value="${iemployeeTableId}" disabled selected>${iEmpFirstName} ${iEmpLastName}</option>`);

			}

			$.each(availArr[0], function(i, val){
				let dayArr = [];

				$.each(this.AvailTables, function(index,value){
					dayArr.push(this.dayOfWeek);
				});

				if (dayArr.includes(dayOfWeek)) {
					console.log(this);

					let thisStart;
					let thisEnd;

					$.each(this.AvailTables, function(index,value){
						if (this.dayOfWeek == dayOfWeek) {
							thisStart = this.startTime;
							thisEnd = this.endTime;
						}
					});

					// console.log('do math')
					let shiftStart = moment(data.from, 'x').format('HHmm');
					let shiftEnd = moment(data.to, 'x').format('HHmm');
					let euStart = moment(thisStart, 'HH:mm').format('HHmm');
					let euEnd = moment(thisEnd, 'HH:mm').format('HHmm');
						
					console.log(`shiftStart: ${shiftStart}`);
					console.log(`shiftEnd: ${shiftEnd}`);
					console.log(`euStart: ${euStart}`);
					console.log(`euEnd: ${euEnd}`);
					// console.log(moment(`'${euStart}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`));
					// console.log(moment(shiftStart))
					// console.log(moment(euStart))
					if (moment(`'${euStart}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`) === true || moment(`'${shiftStart}'`).isBetween(`'${euStart}'`,`'${euEnd}'`) === true) {
						console.log('This employee is unavailable at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isSame(`'${shiftEnd}'`) === true) {
						console.log('Employee is exactly unavail at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`) === true) {
						console.log('Emp is unavail equal to beginning of shift to before shift ends');
					}
					else {
						console.log(`ID of employee able to work: ${this.EmployeeTableId}`);
						let employee = availArr[0].filter((x) => x.id === this.EmployeeTableId);
						availEmp.push(this);
					}
				} else {
					availEmp.push(this);
				}
			});
			console.log(availEmp);
			let optionValue = 1;
			availEmp.forEach(function(element){

				$(`[data-id="${elementId}"] [data-date="${date}"]`).append(`
					<option value="${element.id}"> ${element.firstName} ${element.lastName} </option>	
				`);
				$('select').formSelect();
				optionValue++;
			});
		},
	});

}

function appendShifts(unixArr, data) {
	for(var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].ScheduleTables.length; j++) {
			var shiftData = data[i].ScheduleTables[j];
			var scheduleDate = parseInt(moment(shiftData.date).format('X'));
			for(var val in unixArr){
				if(scheduleDate == unixArr[val]){

					let uniqueId = moment().format('x');
					let ionDate = shiftData.date;
					let elementId = scheduleDate + '-' + uniqueId;

					$(`[data-id=cb-${scheduleDate}]`).prepend(`
	<div class="row shift-item-row">
        <div class="col s12">
            <ul id="create-page-schedule" class="collection sched-creation-collection" style="overflow: visible">
                <li class="collection-item" data-id="${elementId}">
                    <div class="row valign-wrapper">
						<div class="col s3 input-field">
							<select id="${elementId}" data-dropdown="${uniqueId}" data-date="${ionDate}">
                                <option value="${data[i].id}" disabled selected>${data[i].firstName} ${data[i].lastName}</option>
                            </select>
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
					$('select').formSelect();



					appendedSlider(shiftData.id, ionDate, elementId, shiftData.EmployeeTableId, data[i].firstName, data[i].lastName, shiftData.start, shiftData.end);
				}
			}
		}
	}
}

// $('.material-icons').on('click', function (event) {
// 	if ($('[data-id=1535346000]').length == 0){
// 		console.log("I figured it out")
// 	}
// })

$('.schedule-submit').on('click', function(event){
	
	function deleteUpdate(data) {
		console.log(data.shiftId);
		$.ajax({
			method: 'DELETE',
			url: `/api/schedule/${data.shiftId}`,
			data: data
		}).then(function(){
			window.location.href = '/create';
		});
	}

	function shiftUpdate(data) {
		console.log(data)
		$.ajax({
			method: 'PUT',
			url: '/api/schedule/' + data.shiftId,
			data: data
		}).then(function(){
			window.location.href = '/create';
		})
	}

	function createUpdate(data) {
		console.log(data.employeeTableId);
		// console.log(data.employeeTableId);
		$.ajax({
			method: 'POST',
			url: '/api/schedule',
			data: data
		}).then(function(){
			window.location.href = '/create';
		});
	}

	for(var i = 0; i<shiftsArr.length; i++){
		if(shiftsArr[i].shiftId){
			shiftUpdate(shiftsArr[i]);
			// deleteUpdate(shiftsArr[i]);
			// createUpdate(shiftsArr[i]);
		} else {
			createUpdate(shiftsArr[i]);
		}
	}
});


// updateShifts("monkey");

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
		onStart: function(data){

			console.log(`Shift id: ${elementId} - ${moment(elementId, 'X').format('dddd: MMM Do')}, from ${data.from_pretty} - ${data.to_pretty}`);
			let availEmp = [];

			let existCheck = shiftsArr.findIndex(obj => obj.elemId == elementId);
			console.log(existCheck);
			let dayOfWeek = moment(elementId, 'X').format('dddd');
			let date = moment(elementId, 'X').format('YYYY-MM-DD');
			if (existCheck === -1) {
				shiftsArr.push({
					date: date,
					dayOfWeek: dayOfWeek,
					start: moment(data.from_pretty, 'hh:mm A').format('HH:mm'),
					end: moment(data.to_pretty, 'hh:mm A').format('HH:mm'),
					employeeTableId: 1,
					elemId: elementId
				});
			} else {
				shiftsArr[existCheck].start = moment(data.from_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].end = moment(data.to_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].employeeTableId = 1;
			}

			console.log(shiftsArr);
			console.log(availArr);

			console.log(dayOfWeek);

			if ($(`[data-id="${elementId}"] [data-date="${date}"]`).length !== 0) {
				$(`[data-id="${elementId}"] [data-date="${date}"]`).empty();
				$(`[data-id="${elementId}"] [data-date="${date}"]`).append('<option value="" disabled selected>Select Employee</option>');

			}

			$.each(availArr[0], function (i, val) {
				let dayArr = [];

				$.each(this.AvailTables, function (index, value) {
					dayArr.push(this.dayOfWeek);
				});

				if (dayArr.includes(dayOfWeek)) {
					console.log(this);

					let thisStart;
					let thisEnd;

					$.each(this.AvailTables, function (index, value) {
						if (this.dayOfWeek == dayOfWeek) {
							thisStart = this.startTime;
							thisEnd = this.endTime;
						}
					});

					// console.log('do math')
					let shiftStart = moment(data.from, 'x').format('HHmm');
					let shiftEnd = moment(data.to, 'x').format('HHmm');
					let euStart = moment(thisStart, 'HH:mm').format('HHmm');
					let euEnd = moment(thisEnd, 'HH:mm').format('HHmm');

					console.log(`shiftStart: ${shiftStart}`);
					console.log(`shiftEnd: ${shiftEnd}`);
					console.log(`euStart: ${euStart}`);
					console.log(`euEnd: ${euEnd}`);
					// console.log(moment(`'${euStart}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`));
					// console.log(moment(shiftStart))
					// console.log(moment(euStart))
					if (moment(`'${euStart}'`).isBetween(`'${shiftStart}'`, `'${shiftEnd}'`) === true || moment(`'${shiftStart}'`).isBetween(`'${euStart}'`, `'${euEnd}'`) === true) {
						console.log('This employee is unavailable at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isSame(`'${shiftEnd}'`) === true) {
						console.log('Employee is exactly unavail at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isBetween(`'${shiftStart}'`, `'${shiftEnd}'`) === true) {
						console.log('Emp is unavail equal to beginning of shift to before shift ends');
					}
					else {
						console.log(`ID of employee able to work: ${this.EmployeeTableId}`);
						let employee = availArr[0].filter((x) => x.id === this.EmployeeTableId);
						availEmp.push(this);
					}
				} else {
					availEmp.push(this);
				}
			});
			console.log(availEmp);
			// let optionValue = 1;
			availEmp.forEach(function (element) {

				$(`[data-id="${elementId}"] [data-date="${date}"]`).append(`
					<option value="${element.id}"> ${element.firstName} ${element.lastName} </option>	
				`);
				$('select').formSelect();
				// optionValue++;
			});

		},
		onFinish: function (data) {
			console.log(`Shift id: ${elementId} - ${moment(elementId, 'X').format('dddd: MMM Do')}, from ${data.from_pretty} - ${data.to_pretty}`);
			let availEmp = [];

			let existCheck = shiftsArr.findIndex(obj => obj.elemId == elementId);
			console.log(existCheck);
			let dayOfWeek = moment(elementId, 'X').format('dddd');
			let date = moment(elementId, 'X').format('YYYY-MM-DD');
			if (existCheck === -1) {
				shiftsArr.push({
					date: date,
					dayOfWeek: dayOfWeek,
					start: moment(data.from_pretty, 'hh:mm A').format('HH:mm'),
					end: moment(data.to_pretty, 'hh:mm A').format('HH:mm'),
					employeeTableId: 1,
					elemId: elementId
				});
			} else {
				shiftsArr[existCheck].start = moment(data.from_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].end = moment(data.to_pretty, 'hh:mm A').format('HH:mm');
				shiftsArr[existCheck].employeeTableId = 1;
			}

			console.log(shiftsArr);
			console.log(availArr);

			console.log(dayOfWeek);

			if($(`[data-id="${elementId}"] [data-date="${date}"]`).length !== 0) {
				$(`[data-id="${elementId}"] [data-date="${date}"]`).empty();
				$(`[data-id="${elementId}"] [data-date="${date}"]`).append('<option value="" disabled selected>Select Employee</option>');

			}

			$.each(availArr[0], function(i, val){
				let dayArr = [];

				$.each(this.AvailTables, function(index,value){
					dayArr.push(this.dayOfWeek);
				});

				if (dayArr.includes(dayOfWeek)) {
					console.log(this);

					let thisStart;
					let thisEnd;

					$.each(this.AvailTables, function(index,value){
						if (this.dayOfWeek == dayOfWeek) {
							thisStart = this.startTime;
							thisEnd = this.endTime;
						}
					});

					// console.log('do math')
					let shiftStart = moment(data.from, 'x').format('HHmm');
					let shiftEnd = moment(data.to, 'x').format('HHmm');
					let euStart = moment(thisStart, 'HH:mm').format('HHmm');
					let euEnd = moment(thisEnd, 'HH:mm').format('HHmm');
						
					console.log(`shiftStart: ${shiftStart}`);
					console.log(`shiftEnd: ${shiftEnd}`);
					console.log(`euStart: ${euStart}`);
					console.log(`euEnd: ${euEnd}`);
					// console.log(moment(`'${euStart}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`));
					// console.log(moment(shiftStart))
					// console.log(moment(euStart))
					if (moment(`'${euStart}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`) === true || moment(`'${shiftStart}'`).isBetween(`'${euStart}'`,`'${euEnd}'`) === true) {
						console.log('This employee is unavailable at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isSame(`'${shiftEnd}'`) === true) {
						console.log('Employee is exactly unavail at this time frame');
					} else if (moment(`'${euStart}'`).isSame(`'${shiftStart}'`) === true && moment(`'${euEnd}'`).isBetween(`'${shiftStart}'`,`'${shiftEnd}'`) === true) {
						console.log('Emp is unavail equal to beginning of shift to before shift ends');
					}
					else {
						console.log(`ID of employee able to work: ${this.EmployeeTableId}`);
						let employee = availArr[0].filter((x) => x.id === this.EmployeeTableId);
						availEmp.push(this);
					}
				} else {
					availEmp.push(this);
				}
			});
			console.log(availEmp);
			
			availEmp.forEach(function(element){

				$(`[data-id="${elementId}"] [data-date="${date}"]`).append(`
					<option value="${element.id}"> ${element.firstName} ${element.lastName} </option>	
				`);
				$('select').formSelect();
				
			});
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

	console.log('ionDate ========= '+ionDate);

	console.log(`${scheduleDate} - ${elementId}`);

	$(`[data-id=cb-${scheduleDate}]`).prepend(`
	<div class="row shift-item-row">
        <div class="col s12">
            <ul id="create-page-schedule" class="collection sched-creation-collection" style="overflow: visible">
                <li class="collection-item" data-id="${elementId}">
                    <div class="row valign-wrapper">
						<div class="col s3 input-field">
							<select id="${elementId}" data-dropdown="${uniqueId}" data-date="${ionDate}">
                                <option value="" disabled selected>Select Employee</option>
                            </select>
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
	$('select').formSelect();
	

	addModSlider(ionDate,elementId);
});

$(document).on('change', 'select', function () {
	console.log($(this).val());
	console.log('monkey' + $(this).attr('id'));
	let locateIndex = shiftsArr.findIndex(obj => obj.elemId == $(this).attr('id'));
	console.log('shift found at index: ' + locateIndex);

	($(this).val() === '' || $(this).val() === null || $(this).val() === undefined) ? thisVal = 1 : thisVal = $(this).val();

	shiftsArr[locateIndex].employeeTableId = parseInt(thisVal);
});