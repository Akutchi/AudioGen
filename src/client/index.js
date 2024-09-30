function CreateFunction (type, img_data) {

    console.log (img_data);

    div = document.createElement ("div");

    img = document.createElement ("img");
    img.setAttribute ("src", URL.createObjectURL (new File ([img_data.value], "wave.png")));

    div.appendChild (img);

    return div;
}

async function AddDefaultCos () {

    json_file = {
        amplitudes : [1.0],
        functions : ["cos"]
    }

    Req = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify (json_file)
    }

    const UrlResponse = await fetch ("http://127.0.0.1:8000/Get_Wave_With", Req)
    .then (response => {return response.body.getReader().read()});

    divCos = document.getElementById ("CosComponents");
    AddCos = divCos.firstChild;
    newCos = CreateFunction ("cos", UrlResponse);

    divCos.insertBefore (newCos, AddCos);
}