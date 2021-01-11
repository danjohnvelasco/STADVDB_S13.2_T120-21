$(document).ready(() => {
  console.log("home.js imported")
  // Add click event handler
  $('#select-form-id').change(function() {
    console.log('render form' + $(this).val());
    getForm($(this).val());
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
    var key = $(this).attr("class"); 
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
      console.table(data);
      /*
      data.forEach((item, index) => {
      });*/
    },
    error: () => {
      console.log('error requesting from API...');
    }
  });
}
// Helper functions

function query1_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');
  var formGroup2 = document.createElement('div');
  var formGroup3 = document.createElement('div');
  var genre = document.createElement('input');
  var startYear = document.createElement('input');
  var endYear = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');
  $(formGroup2).attr('class', 'form-group');
  $(formGroup3).attr('class', 'form-group');
  $(genre).attr('type', 'text');
  $(startYear).attr('type', 'text');
  $(endYear).attr('type', 'text');
  $(genre).attr('class', 'genre');
  $(startYear).attr('class', 'startYear');
  $(endYear).attr('class', 'endYear');
  $(genre).attr('placeholder', 'Genre');
  $(startYear).attr('placeholder', 'Start Year');
  $(endYear).attr('placeholder', 'Max Year');


  // appending
  $(formGroup1).append(genre);
  $(formGroup2).append(startYear);
  $(formGroup3).append(endYear);

  $('#form-div').append(formGroup1);
  $('#form-div').append(formGroup2);
  $('#form-div').append(formGroup3);
}

function query2_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');
  var formGroup2 = document.createElement('div');
  var formGroup3 = document.createElement('div');
  var formGroup4 = document.createElement('div');
  var country = document.createElement('input');
  var language = document.createElement('input');
  var startYear = document.createElement('input');
  var endYear = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');
  $(formGroup2).attr('class', 'form-group');
  $(formGroup3).attr('class', 'form-group');
  $(formGroup4).attr('class', 'form-group');

  $(country).attr('type', 'text');
  $(language).attr('type', 'text');
  $(startYear).attr('type', 'text');
  $(endYear).attr('type', 'text');

  $(country).attr('class', 'country');
  $(language).attr('class', 'language');
  $(startYear).attr('class', 'startYear');
  $(endYear).attr('class', 'endYear');

  $(country).attr('placeholder', 'Country');
  $(language).attr('placeholder', 'Language');
  $(startYear).attr('placeholder', 'Start Year');
  $(endYear).attr('placeholder', 'Max Year');


  // appending
  $(formGroup1).append(country);
  $(formGroup2).append(language);
  $(formGroup3).append(startYear);
  $(formGroup4).append(endYear);

  $('#form-div').append(formGroup1);
  $('#form-div').append(formGroup2);
  $('#form-div').append(formGroup3);
  $('#form-div').append(formGroup4);
}

function query3_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');
  var n_leadingroles = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');

  $(n_leadingroles).attr('type', 'text');

  $(n_leadingroles).attr('class', 'n_leadingroles');

  $(n_leadingroles).attr('placeholder', 'Number of leading roles');

  // appending
  $(formGroup1).append(n_leadingroles);

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
  $(min_avg_vote).attr('placeholder', 'Min. Avg Vote');
  $(max_avg_vote).attr('placeholder', 'Max. Avg Vote');

  // appending
  $(formGroup1).append(year);
  $(formGroup2).append(min_avg_vote);
  $(formGroup3).append(max_avg_vote);

  $('#form-div').append(formGroup1);
  $('#form-div').append(formGroup2);
  $('#form-div').append(formGroup3);
}

function query5_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');
  var formGroup2 = document.createElement('div');
  var formGroup3 = document.createElement('div');
  var formGroup4 = document.createElement('div');
  var country = document.createElement('input');
  var genre = document.createElement('input');
  var startYear = document.createElement('input');
  var endYear = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');
  $(formGroup2).attr('class', 'form-group');
  $(formGroup3).attr('class', 'form-group');
  $(formGroup4).attr('class', 'form-group');

  $(country).attr('type', 'text');
  $(genre).attr('type', 'text');
  $(startYear).attr('type', 'text');
  $(endYear).attr('type', 'text');

  $(country).attr('class', 'country');
  $(genre).attr('class', 'genre');
  $(startYear).attr('class', 'startYear');
  $(endYear).attr('class', 'endYear');

  $(country).attr('placeholder', 'Country');
  $(genre).attr('placeholder', 'Genre');
  $(startYear).attr('placeholder', 'Start Year');
  $(endYear).attr('placeholder', 'Max Year');


  // appending
  $(formGroup1).append(genre);
  $(formGroup2).append(country);
  $(formGroup3).append(startYear);
  $(formGroup4).append(endYear);

  $('#form-div').append(formGroup1);
  $('#form-div').append(formGroup2);
  $('#form-div').append(formGroup3);
  $('#form-div').append(formGroup4);
}

function query6_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');

  var country = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');
  
  $(country).attr('type', 'text');

  $(country).attr('class', 'country');

  $(country).attr('placeholder', 'Country');

  // appending
  $(formGroup1).append(country);

  $('#form-div').append(formGroup1);
}

function query7_form() {
  // DOM Creation
  var formGroup1 = document.createElement('div');
  var formGroup2 = document.createElement('div');
  var formGroup3 = document.createElement('div');
  var formGroup4 = document.createElement('div');
  var formGroup5 = document.createElement('div');

  var minAge = document.createElement('input');
  var maxAge = document.createElement('input');
  var country = document.createElement('input');
  var minRating = document.createElement('input');
  var maxRating = document.createElement('input');

  // adding attributes
  $(formGroup1).attr('class', 'form-group');
  $(formGroup2).attr('class', 'form-group');
  $(formGroup3).attr('class', 'form-group');
  $(formGroup4).attr('class', 'form-group');
  $(formGroup5).attr('class', 'form-group');

  $(minAge).attr('type', 'text');
  $(maxAge).attr('type', 'text');
  $(country).attr('type', 'text');
  $(minRating).attr('type', 'text');
  $(maxRating).attr('type', 'text');
  
  $(minAge).attr('class', 'minAge');
  $(maxAge).attr('class', 'maxAge');
  $(country).attr('class', 'country');
  $(minRating).attr('class', 'minRating');
  $(maxRating).attr('class', 'maxRating');

  $(minAge).attr('placeholder', 'Min. Age');
  $(maxAge).attr('placeholder', 'Max. Age');
  $(country).attr('placeholder', 'Country');
  $(minRating).attr('placeholder', 'Min. Rating');
  $(maxRating).attr('placeholder', 'Max. Rating');

  // appending
  $(formGroup1).append(country);
  $(formGroup2).append(minAge);
  $(formGroup3).append(maxAge);
  $(formGroup4).append(minRating);
  $(formGroup5).append(maxRating);

  $('#form-div').append(formGroup1);
  $('#form-div').append(formGroup2);
  $('#form-div').append(formGroup3);
  $('#form-div').append(formGroup4);
  $('#form-div').append(formGroup5);
}