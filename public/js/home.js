// Global variables filled by ajax calls on document.ready
var states = [];
var cities = [];
var products = [];

$(document).ready(() => {
  $("#msg-querying").hide();
  $("#msg-success").hide();
  // Get states
  $.ajax({
    url: "/api/getUniqueStates",
    method: "GET",
    success: (data, status) => {
      console.log(data);
      states = data.results;
    }
  })

  // Get cities
  $.ajax({
    url: "/api/getUniqueCities",
    method: "GET",
    success: (data, status) => {
      console.log(data);
      cities = data.results;
    }
  })

  // Get products
  $.ajax({
    url: "/api/getUniqueProdCats",
    method: "GET",
    success: (data, status) => {
      console.log(data);
      products = data.results;
    }
  })
  

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
    console.log(val);
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
  $("#msg-querying").show();
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
      $("#msg-querying").hide();
      $("#msg-success").show();
      setTimeout(() => {  $("#msg-success").hide(); }, 3000);
    },
    error: () => {
      console.log('error requesting from API...');
    }
  });
}



// Helper functions
function query1_form() {
  $('#form-div').append('<select id="year" class="custom-select custom-select-lg mb-3"> <option selected>Select year</option> <option value="2016">2016</option> <option value="2017"> 2017 </option> <option value="2018"> 2018 </option> </select>');
}

// Helper functions
function query2_form() {
  $('#form-div').append('<label>Select a state:</label> <select id="state" class="js-data-example-ajax" style="width: 200px;"></select> <br>');
  
  $('.js-data-example-ajax').select2({
        data: states
  });

  $('#form-div').append('<label>Select a year:</label> <select id="year"> <option selected>year</option> <option value="2016">2016</option> <option value="2017"> 2017 </option> <option value="2018"> 2018 </option> </select>');
}

function query3_form() {
  $('#form-div').append('<label>Select a city:</label> <select id="city" class="select2-cities" style="width: 200px;"></select> <br>');
  
  $('.select2-cities').select2({
        data: cities
  });

  $('#form-div').append('<label>Select a year:</label> <select id="year"> <option selected>year</option> <option value="2016">2016</option> <option value="2017"> 2017 </option> <option value="2018"> 2018 </option> </select>');
}

function query4_form() {
  // year
  $('#form-div').append('<label>Select a year:</label> <select id="year"> <option selected>year</option> <option value="2016">2016</option> <option value="2017"> 2017 </option> <option value="2018"> 2018 </option> </select> <br>');

  // city A
  $('#form-div').append('<label>Select city A:</label> <select id="cityA" class="select2-cities-A" style="width: 200px;"></select> <br>');
  $('.select2-cities-A').select2({
        data: cities
  });

  // city B
  $('#form-div').append('<label>Select city B:</label> <select id="cityB" class="select2-cities-B" style="width: 200px;"></select> <br>');
  $('.select2-cities-B').select2({
        data: cities
  });
  
  // product category A
  $('#form-div').append('<label>Select product category A:</label> <select id="productA" class="select2-product-A" style="width: 200px"></select> <br>');
  $('.select2-product-A').select2({
       data: products
  });

  // product category B
  $('#form-div').append('<label>Select product category B:</label> <select id="productB" class="select2-product-B" style="width: 200px;"></select> <br>');
  $('.select2-product-B').select2({
       data: products
  });

  // quarter A
  $('#form-div').append('<label>Select quarter A:</label> <select id="quarterA"> <option selected>quarter A</option> <option value="1">1</option> <option value="2"> 2 </option> <option value="3"> 3 </option> <option value="4"> 4 </option> </select> <br>');

  // quarter B
  $('#form-div').append('<label>Select quarter B:</label> <select id="quarterB"> <option selected>quarter B</option> <option value="1">1</option> <option value="2"> 2 </option> <option value="3"> 3 </option> <option value="4"> 4 </option> </select> <br>');
  


}
