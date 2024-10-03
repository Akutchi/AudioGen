Func_Var = [
    {name: "amplitude", default_value : "1.0"},
    {name: "shift", default_value : "0.0"}
]

Filter_Var = [
    {name: "coefficients", default_value : "0.0"},
    {name: "gain", default_value : "1.0"}
]

function AddChildsNode (Element, Child_List) {

    Child_List.forEach(C => {
        Element.appendChild (C)
        });

    return Element;
}

function AddVariable (type, Text, Default_Value) {

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

    Vars = [img]
    if (type == "Cos" || type == "Sin") {
        Func_Var.forEach (v =>
            {Vars.push (AddVariable (type, v.name, v.default_value))});

    } else {
        Filter_Var.forEach (v =>
            {Vars.push (AddVariable (type, v.name, v.default_value))});
    }

    return AddChildsNode (divFunc, Vars);
}

async function AddDefault (type) {


    json_file = {
        coefficients : [0.0],
        Gain : 1.0
    }
    ROUTER = GET_FILTER_IMAGE

    if (type == "Cos" || type == "Sin") {

        json_file = {
            amplitudes : [1.0],
            shifts     : [0.0],
            functions  : [type]
        }
        ROUTER = GET_WAVE_IMAGE
    }

    Req = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify (json_file)
    }

    const Response = await fetch (ROUTER, Req)
    .then (response => {return response.body.getReader().read()});

    container = document.getElementById (type+"Components");
    newFunc = CreateFunction (type, Response);

    container.insertBefore (newFunc, container.firstChild);

    UpdateResult ();
}