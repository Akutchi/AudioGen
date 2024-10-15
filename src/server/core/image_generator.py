import numpy as np
import matplotlib.pyplot as plt

from core import waves, filters

import maths.constants as M_C

class ImageGenerator:


    def __init__ (self):

        self.__Wave_Location = "imgs/wave_img.png"
        self.__Filter_Location = "imgs/filter_img.png"


    def __Generate_Wave_Image (self, wave):

        t = np.arange (M_C.PI, M_C.PI + 2.0 * M_C.TWO_PI, 0.01)
        values = [wave.Get_Value (ti) for ti in t]

        plt.clf()

        plt.axhline (y=0.0, color="black", linestyle="dotted")
        plt.plot (t, values)
        plt.savefig (self.__Wave_Location, bbox_inches='tight')

    def __Generate_Filter_Image (self, filter):

        t = np.arange (0, 1E3, 0.01)
        Module, Phase = [], []
        for ti in t:

            H = filter.Get_Value (ti)
            Module.append (H [0])
            Phase.append (H [1])

        plt.clf()
        ax = plt.gca ()
        ax.set_xscale('log')

        plt.subplot (2, 1, 1)
        plt.plot (t, Module)

        plt.subplot (2, 1, 2)
        plt.plot (t, Phase)

        plt.savefig (self.__Filter_Location, bbox_inches='tight')


    def Generate (self, Class_Type):

        if isinstance (Class_Type, waves.Waves):
            self.__Generate_Wave_Image (Class_Type)

        elif isinstance (Class_Type, filters.Filters):
            self.__Generate_Filter_Image (Class_Type)

