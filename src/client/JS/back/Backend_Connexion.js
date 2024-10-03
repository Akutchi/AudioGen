async function UpdateResult () {

    Input_List = document.querySelectorAll ("input");

    Functions = GetFunctionsFromList (Input_List);
    Filtered_Functions = Functions;

    Filters = GetFiltersFromList (Input_List);
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

async function GetImageFromServer (json_file, router) {

    Req = {
        method : "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify (json_file)
    }

    const Response = await fetch (router, Req)
    .then (response => {return response.body.getReader().read()});

    return Response;

}

async function ChangeImageOnInputChange (event, router) {

    const grand_parent = event.target.parentElement.parentElement;
    const childs = grand_parent.childNodes;

    Json = router == GET_FILTER_IMAGE ?
    GetFilterJsonFromEvent (childs) :
    GetFunctionJsonFromEvent (grand_parent, childs);

    console.log (Json);

    Image_Object = await GetImageFromServer (Json, router);

    childs.item (0).setAttribute ("src", URL.createObjectURL (new File ([Image_Object.value], "img.png")));
}