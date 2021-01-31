$(document).ready(() => {
  console.log("home.js imported")
  // Add click event handler
  $('#select-form-id').change(function() {
    getForm($(this).val()); // empty form div
    $('#table-div').empty(); // empty table div
  });

  $('#query-btn').click(function(event) {
    event.preventDefault(); // prevent refresh
    var data = getFormInput();
    queryHandler(data);
  });

  
});

function getFormInput() {
  var obj = {};
  $("form#form-div :input").each(function(){
    var key = $(this).attr("id"); 
    var val = $(this).val(); 
    obj[key] = val
  });

  return obj
}

function getForm(formID) {
  // EMPTY DIV
  $('#form-div').empty();

  // which form
  switch(formID) {
    case "query1":
      query1_form();
      break;
    case "query2":
      query2_form();
      break;
    case "query3":
      query3_form();
      break;
    case "query4":
      query4_form();
      break;
    case "query5":
      query5_form();
      break;
    case "query6":
      query6_form();
      break;
    case "query7":
      query7_form();
      break;
    default:
      console.log("no form to render");
  }

}

function queryHandler(data_obj) {
  var queryURL = $('#select-form-id').val();
  $.ajax({
    url: '/api/' + queryURL,
    method: 'GET',
    data: {data: data_obj},
    success: (data, status) => {
      var table = new Tabulator("#table-div", {
          data:data, //assign data to table
          autoColumns:true, //create columns from data field names
          pagination:"local", //enable local pagination.
          paginationSize:50, // this option can take any positive integer value
      });
    },
    error: () => {
      console.log('error requesting from API...');
    }
  });
}

// Helper functions
function query3_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');
  var quarter = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');

  $(quarter).attr('type', 'text');

  $(quarter).attr('id', 'quarter');
  $(quarter).attr('class', 'form-control');

  $(quarter).attr('placeholder', 'Quarter (choose a value from 1-4)');

  // appending
  $(formGroup1).append(quarter);

  $('#form-div').append(formGroup1);
}

function query4_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');
  var formGroup2 = document.createElement('div');
  var formGroup3 = document.createElement('div');
  var year = document.createElement('input');
  var min_avg_vote = document.createElement('input');
  var max_avg_vote = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');
  $(formGroup2).attr('class', 'form-group');
  $(formGroup3).attr('class', 'form-group');
  $(year).attr('type', 'text');
  $(min_avg_vote).attr('type', 'text');
  $(max_avg_vote).attr('type', 'text');

  $(year).attr('class', 'year');
  $(min_avg_vote).attr('class', 'min_avg_vote');
  $(max_avg_vote).attr('class', 'max_avg_vote');

  $(year).attr('placeholder', 'Year');
  $(min_avg_vote).attr('placeholder', 'Min. Avg Vote (min 0)');
  $(max_avg_vote).attr('placeholder', 'Max. Avg Vote (max 10)');

  // appending
  $(formGroup1).append(year);
  $(formGroup2).append(min_avg_vote);
  $(formGroup3).append(max_avg_vote);

  $('#form-div').append(formGroup1);
  $('#form-div').append(formGroup2);
  $('#form-div').append(formGroup3);

  // Adding LIMIT form input
  var formGroupLimit = document.createElement('div');
  $(formGroupLimit).attr('class', 'form-group');
  var limit = document.createElement('input');
  $(limit).attr('type', 'number');
  $(limit).attr('class', 'limit');
  $(limit).attr('placeholder', 'Limit (optional)');
  $(formGroupLimit).append(limit);
  $('#form-div').append(formGroupLimit);
}
