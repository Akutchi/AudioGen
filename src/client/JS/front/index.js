function AddVariable (type, Text, Default_Value) {

    divVar = document.createElement ("div");
    divVar.setAttribute ("class", "variable_set");

    p = document.createElement ("p");
    p.innerHTML = Text + " :";

    input = document.createElement ("input");
    input.setAttribute ("value", Default_Value);
    input.setAttribute ("class", Text);

    input.onchange = async function(event) {

        Json = await type == "Filter" ?
        ChangeImageOnInputChange (event, GET_FILTER_IMAGE) :
        ChangeImageOnInputChange (event, GET_WAVE_IMAGE);

        UpdateResult;
    };

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
        coefficients : [1.0, 0.1],
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

    Image_Object = await GetImageFromServer (json_file, ROUTER);

    container = document.getElementById (type+"Components");
    newFunc = CreateFunction (type, Image_Object);

    container.insertBefore (newFunc, container.firstChild);

    UpdateResult ();
}