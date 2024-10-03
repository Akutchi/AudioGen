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

function getAncestor (element, level) {

    if (level == 1) {
        return element.parentElement;
    }

    return getAncestor (element.parentElement, level-1);
}

