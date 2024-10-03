function GetFunctionJsonFromEvent (grand_parent, childs) {

    return {
            amplitudes : [childs.item (1).childNodes.item (1).value],
            functions  : [grand_parent.parentElement.id.slice (0, 3)],
            shifts     : [childs.item (2).childNodes .item (1).value]
    };
}

function GetFilterJsonFromEvent (childs) {

    return {
            coefficients : childs.item (1).childNodes.item (1).value.split (" "),
            gain     : childs.item (2).childNodes .item (1).value
    };
}

function GetFunctionsFromList (Input_List) {

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

function GetFiltersFromList (Input_List) {

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