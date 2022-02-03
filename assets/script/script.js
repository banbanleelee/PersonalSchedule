//set up the current time and put in an setInterval function to change based on time
var datetime;
var date;

var updateTime = function () {
    date = moment(new Date());
    $('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
};
//when the document is ready, present the current time and use the time interval to present changes in every second
$(document).ready(function(){
    datetime = $('#current-time');
    updateTime();
    setInterval(updateTime, 1000);
});

//save the object of rows for each row of schedule
var rows = [
    {btnId: 'btn0', key: 'input0', label: '9am', time: 9},
    {btnId: 'btn1', key: 'input1', label: '10am', time: 10},
    {btnId: 'btn2', key: 'input2', label: '11am', time: 11},
    {btnId: 'btn3', key: 'input3', label: '12pm', time: 12},
    {btnId: 'btn4', key: 'input4', label: '1pm', time: 13},
    {btnId: 'btn5', key: 'input5', label: '2pm', time: 14},
    {btnId: 'btn6', key: 'input6', label: '3pm', time: 15},
    {btnId: 'btn7', key: 'input7', label: '4pm', time: 16},
    {btnId: 'btn8', key: 'input8', label: '5pm', time: 17},
];

//create all the rows by repeating for each element in the object created above
function createAllRows() {
    rows.forEach((row)=>{
        var rowContainer = $("<div></div>").addClass("container time-row");
        var time = $('<p></p>').addClass("side").text(row.label);
        var input = $('<textarea></textarea>').addClass("middle").css("background-color", getColor(row.time)).attr("id",`${row.key}`);
        var button = $('<button>Save</button>').addClass("side").attr("id", row.btnId);
        rowContainer.append(time, input, button);
        $('.parent-container').append(rowContainer);
    })
}

//determine the color of the text input field based on the comparsion of current time and the time at each row
function getColor(hour) {
    if (hour<moment().hour()) {
        return "grey";
    }   else if (hour===moment().hour()) {
        return "red";
    }   else {
        return "green";
    }
}

// get the data stored in the local storage and display on corresponding rows
function loadData() {
    rows.forEach((row)=>{     
        $(`#${row.btnId}`).on("click", function (event) {
            event.preventDefault();
            localStorage.setItem(row.key, $(`#${row.key}:input`).val());
        });
        $(`#${row.key}`).text(localStorage.getItem(row.key));
    })    
}

//call the functions to present on the screen
createAllRows();
loadData();
