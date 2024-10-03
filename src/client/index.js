const GET_WAVE_IMAGE  ="http://127.0.0.1:8000/Get_Wave_With";

function AddChildsNode (Element, Child_List) {

    Child_List.forEach(C => {
        Element.appendChild (C)
        });

    return Element;
}

function getAncestor (element, level) {

    if (level == 1) {
        return element.parentElement;
    }

    return getAncestor (element.parentElement, level-1);
}

async function UpdateResult () {

    json_file = {
        amplitudes : [],
        shifts : [],
        functions : []
    }

    Input_List = document.querySelectorAll ("input");

    Input_List.forEach(input => {

        let class_name = input.className;
        let variable_value = input.value;

        if (class_name == "amplitude") {
            (json_file.amplitudes).push (variable_value);
            (json_file.functions).push (getAncestor(input, 3).id.slice (0, 3));

        } else if (class_name = "shift") {
            (json_file.shifts).push (variable_value);
        }

    });

    Req = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify (json_file)
    }

    const Response = await fetch (GET_WAVE_IMAGE, Req)
    .then (response => {return response.body.getReader().read()});

    img = document.getElementById ("Res_Img");
    img.setAttribute ("src", URL.createObjectURL (new File ([Response.value],
                                                            "result.png")));
}

function AddVariable (Text, Default_Value) {

    divVar = document.createElement ("div");
    divVar.setAttribute ("class", "variable_set");

    p = document.createElement ("p");
    p.innerHTML = Text + " :";

    input = document.createElement ("input");
    input.setAttribute ("value", Default_Value);
    input.setAttribute ("class", Text);
    input.onchange = UpdateResult;

    return AddChildsNode (divVar, [p, input]);

}

function CreateFunction (type, img_data) {

    divFunc = document.createElement ("div");
    divFunc.setAttribute ("class", "SimpleFunc")

    img = document.createElement ("img");
    img.setAttribute ("src", URL.createObjectURL (new File ([img_data.value],
                                                            "wave.png")));
    img.setAttribute ("class", "Wave_Img");

    amp = AddVariable ("amplitude", "1.0");
    phi = AddVariable ("shift", "0.0");

    return AddChildsNode (divFunc, [img, amp, phi]);
}

async function AddDefault (type) {

    json_file = {
        amplitudes : [1.0],
        shifts     : [0.0],
        functions  : [type]
    }

    Req = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify (json_file)
    }

    const Response = await fetch (GET_WAVE_IMAGE, Req)
    .then (response => {return response.body.getReader().read()});

    container = document.getElementById (type+"Components");
    newFunc = CreateFunction (type, Response);

    container.insertBefore (newFunc, container.firstChild);

    UpdateResult ();
}