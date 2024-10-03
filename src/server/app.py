from fastapi import FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List, Union

import core.waves as C_W
import core.image_generator as C_IG
import maths.constants as M_C

class FunctionJSON (BaseModel):

    amplitudes  : Union [List[float], None] = []
    shifts      : Union [List[float], None] = []
    functions   : Union [List[str], None] = []
    T           : float = M_C.TWO_PI


visitor = C_IG.ImageGenerator ()

app = FastAPI ()
app.add_middleware (CORSMiddleware, allow_origins='*', allow_methods=["POST"])

@app.post ("/Get_Wave_With")
def Generate_Wave_Image (item : FunctionJSON):

    wave = C_W.Waves (item.amplitudes, item.shifts, item.functions, item.T)
    wave.Generate_Image (visitor)

    return responses.FileResponse ("imgs/wave_img.png")