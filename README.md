# AudioGen

![Visual](./doc/Visual.png)

A basic wave generator and filtering API (with sound !)

# Description

This website, is an interface to a signal processing API.
The API, developped with fastapi, is composed of two routes,

- Get_Wave_With :

needs a json of the form
```json
{
    "amplitudes" : [],
    "shifts" : [],
    "functions" : []
}
```

and return an image of the wave as described by the JSON

- Get_Filter_With :

needs a json of the form
```json
{
    "coefficients" : ["order", "fc/f0", "Q"],
    "gain" : "int"
}
```

and return an image of the filter as described by the JSON

Each time an input is modified, a call to the backend is done in order to update
both the image associated with the modification, and the final result. Response
time can be optimized by putting into server-memory data that has already been
calculated.

# Run

To run the Interface, you must either have a .venv and activate it in the project
folder with ```source .venv/bin/activate``` or have all the dependencies already
installed on your computer.
Either way, those are :
- numpy >= 1.24.4
- scipy >= 1.10.1
- matplotlib >= 3.7.5
- fastAPI >= 0.1.0
- Unittest

To lunch the backend, please use ```fastapi dev src/server/app.py``` in ./src
