function getAncestor (element, level) {

    if (level == 1) {
        return element.parentElement;
    }

    return getAncestor (element.parentElement, level-1);
}

function GetFunctions (Input_List) {

    json_file = {
        amplitudes : [],
        shifts : [],
        functions : []
    }

    Input_List.forEach(input => {

        let ancestor_id = getAncestor (input, 3).id.slice (0, 3);

        if (ancestor_id == "Cos" || ancestor_id == "Sin") {

            let class_name = input.className;
            let variable_value = input.value;

            if (class_name == "amplitude") {
                (json_file.amplitudes).push (variable_value);
                (json_file.functions).push (ancestor_id);

            } else if (class_name == "shift") {
                (json_file.shifts).push (variable_value);
            }
        }
    });

    return json_file;
}

function GetFilters (Input_List) {

    json_file = {
        coefficients : [],
        gain : []
    }

    Input_List.forEach (input => {

        let ancestor_id = getAncestor (input, 3).id.slice (0, 6);

        if (ancestor_id == "Filter") {

            let class_name = input.className;
            let variable_value = input.value;

            if (class_name == "coefficients") {
                (json_file.coefficients).push (variable_value.split (" "));

            } else if (class_name == "gain") {
                (json_file.gain).push (variable_value);
            }
        }
    });

   return json_file;
}

function Filter (Functions, Filters) {

    return Functions;
}

async function UpdateResult () {

    Input_List = document.querySelectorAll ("input");

    Functions = GetFunctions (Input_List);
    Filtered_Functions = Functions;

    Filters = GetFilters (Input_List);
    Filtered_Functions = Filter (Functions, Filters);

    Req = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify (Filtered_Functions)
    }

    const Response = await fetch (GET_WAVE_IMAGE, Req)
    .then (response => {return response.body.getReader().read()});

    img = document.getElementById ("Res_Img");
    img.setAttribute ("src", URL.createObjectURL (new File ([Response.value],
                                                            "result.png")));
}