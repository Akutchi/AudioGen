const GET_WAVE_IMAGE  ="http://127.0.0.1:8000/Get_Wave_With";

function Add (Element, Child_List) {

    Child_List.forEach(C => {
        Element.appendChild (C)
        });

    return Element;
}

async function UpdateResult () {

    json_file = {
        amplitudes : [],
        functions : []
    }

    Input_List = document.querySelectorAll ("input");
    //Input_List = Object.values(Input_List).filter ((i => {i.parentElement.parentElement.id != "Filters"}));

    Input_List.forEach(input => {

        (json_file.amplitudes).push (input.value);
        (json_file.functions).push (input.parentElement.parentElement.id.slice (0, 3));
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

function CreateFunction (type, img_data) {

    div = document.createElement ("div");
    div.setAttribute ("class", "SimpleFunc")

    img = document.createElement ("img");
    img.setAttribute ("src", URL.createObjectURL (new File ([img_data.value],
                                                            "wave.png")));
    img.setAttribute ("class", "Wave_Img");

    p = document.createElement ("p");
    p.innerHTML = "Amplitude : ";

    input = document.createElement ("input");
    input.setAttribute ("value", "1.0");
    input.onchange = UpdateResult;

    return Add (div, [img, p, input]);
}

async function AddDefault (type) {

    json_file = {
        amplitudes : [1.0],
        functions : [type]
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