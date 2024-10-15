from fastapi import FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List, Union

import core.waves as C_W
import core.filters as C_F

import core.image_generator as C_IG
import maths.constants as M_C

class FunctionJSON (BaseModel):

    amplitudes  : Union [List[float], None] = []
    shifts      : Union [List[float], None] = []
    functions   : Union [List[str], None] = []
    T           : float = M_C.TWO_PI

class FilterJSON (BaseModel):

    coefficients  : Union [List[float], None] = []
    gain          : Union [float, None] = 1.0



visitor = C_IG.ImageGenerator ()

app = FastAPI ()
app.add_middleware (CORSMiddleware, allow_origins='*', allow_methods=["POST"])

@app.post ("/Get_Wave_With")
def Generate_Wave_Image (item : FunctionJSON):

    wave = C_W.Waves (item.amplitudes, item.shifts, item.functions, item.T)
    wave.Generate_Image (visitor)

    return responses.FileResponse ("imgs/wave_img.png")

@app.post ("/Get_Wave_Sound")
def Generate_Wave_Sound (item : FunctionJSON):

    wave = C_W.Waves (item.amplitudes, item.shifts, item.functions, item.T)
    wave.Generate_Sound ()

    return responses.FileResponse ("sound/sound.wav", media_type="audio/wav")

@app.post ("/Get_Filter_With")
def Generate_Filter_Image (item : FilterJSON):

    filter = C_F.Filters (item.coefficients, item.gain)
    filter.Generate_Image (visitor)

    return responses.FileResponse ("imgs/filter_img.png")