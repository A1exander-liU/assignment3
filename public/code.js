received_data = [];
function process_response(data) {
    // won't work, check network
    // never defined a POST request
    // the local host is highlighted in red
    // click on it
    // check the payload: there is the key value we are requesting in here
    console.log(data)
    received_data = data
    // now add code to display the seleted unicorn
    $('#result').html(JSON.stringify(data)) // won't work because it accepts a string bu we have a JSON object
    // what to do? JSON.stringify()!
    // then you will get the unicorn to display
}

function get_unicorn_by_name() {
    unicorn_name = $('#unicornName').val()
    console.log(unicorn_name)
    // what next?
    // make ajax request to our server
    $.ajax(
        {
            url: "https://salty-plains-73206.herokuapp.com/findUnicornByName",
            // url: "http://localhost:5000/findUnicornByName",
            type: "POST", // why post? need to display the unicorn in the HTML file
            // need data field if making a POST request
            data: {
                "unicornName": unicorn_name
            },
            success: process_response 
        }
    )
}

function get_unicorn_by_food() {
    carrotIsChecked = "unchecked"
    appleIsChecked =  "unchecked"
    // how to check if they are checked?
    if($("#carrot").is(":checked")) { // code to determine if a checkbox is checked use 'is()' and a selector ':checked'
        carrotIsChecked = "checked"
    }
    if($("#apple").is(":checked")) {
        appleIsChecked = "checked"
    }
    $.ajax(
        {
            url: "https://salty-plains-73206.herokuapp.com/findUnicornByFood",
            // url: "http://localhost:5000/findUnicornByFood",
            type: "POST", // why post? need to display the unicorn in the HTML file
            // need data field if making a POST request
            // need to add 2 key value, one for if apple is checked the other for if carrot is checked
            data: {
                // now put those variables here as values
                "appleIsChecked": appleIsChecked,
                "carrotIsChecked": carrotIsChecked
            },
            success: process_response 
        }
    )
}

function get_unicorn_by_weight() {
    lower_limit = $('#lowerWeight').val()
    upper_limit = $('#higherWeight').val()
    console.log('lowest', lower_limit, "highest", upper_limit)
    $.ajax(
        {
            url: "https://salty-plains-73206.herokuapp.com/findUnicornByWeight", 
            // url: "http://localhost:5000/findUnicornByWeight",
            type: "POST",
            data: {
                "LowerLimit": lower_limit,
                "UpperLimit": upper_limit
            },
            success: process_response
        }
    )
}

function filter() {
    name_projection = "unchecked"
    weight_projection = "unchecked"
    if ($('#unicornNameFilter').is(':checked')) {
        name_projection = "checked"
    }
    if ($('#unicornWeightFilter').is(':checked')) {
        weight_projection = "checked"
    }
    projected = received_data.map(
        (ob) => {
            projections = []
            if (name_projection == "checked")
                projections.push(ob["name"])

            if (weight_projection == "checked")
                projections.push(ob["weight"])

            return projections
        }
    )
    $("#result").html(projected);
}

function setup() {
    $('#findUnicornByName').click(get_unicorn_by_name)
    $('#findUnicornByFood').click(get_unicorn_by_food) // for checkbox
    $('#findUnicornByWeight').click(get_unicorn_by_weight)
    $('#filter').click(filter)
}

$(document).ready(setup)