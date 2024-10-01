const GET_WAVE_IMAGE  ="http://127.0.0.1:8000/Get_Wave_With";

function Add (Element, Child_List) {

    Child_List.forEach(C => {
        Element.appendChild (C)
        });

    return Element;
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
}