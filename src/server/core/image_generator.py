import os
import numpy as np
import matplotlib.pyplot as plt

from core.waves import Waves

import maths.constants as M_C

class ImageGenerator:


    def __init__ (self):

        self.__Location = "imgs/wave_img.png"


    def __Generate_Wave_Image (self, wave):

        if os.path.exists(self.__Location):
            os.remove(self.__Location)

        t = np.arange (M_C.PI, M_C.PI + 2.0 * M_C.TWO_PI, 0.01)
        values = [wave.Get_Value (ti) for ti in t]

        ax = plt.gca ()
        ax.set_xticklabels([])
        ax.set_yticklabels([])
        ax.grid (True)

        plt.plot (t, values)
        plt.savefig (self.__Location, bbox_inches='tight')



    def Generate (self, Class_Type):

        if isinstance (Class_Type, Waves):
            self.__Generate_Wave_Image (Class_Type)

