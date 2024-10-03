from typing import List

import numpy as np

import maths.constants as M_C

class Filters:

    def __init__(self, Coefficients : List [float], Gain : float):
        self.__C = Coefficients
        self.__K = Gain

    def __Order_1 (self, f :float):

        type = self.__C [0]
        W_Wc = f / self.__C [1]

        denominator = np.sqrt (1.0 + np.power (W_Wc, 2))
        High_Band_Module = 1.0 if type == 1.0 else W_Wc
        High_Band_Phase = 0.0 if type == 1.0 else M_C.PI_2

        Module = (abs (self.__K) * High_Band_Module) / denominator
        Phase = High_Band_Phase - np.arctan (W_Wc)

        return (Module, Phase)

    def __Order_2 (self, f :float): #TODO passe-bande to implement

        type = self.__C [0]
        W_Wo =  f /  self.__C [1]
        W_Wo2 = np.power (W_Wo, 2)
        Q = self.__C [2]

        denominator = np.sqrt (1.0 - np.power (W_Wo2, 2) + np.power (W_Wo/Q, 2))
        High_Band_Module = 1.0 if type == 1 else W_Wo2
        High_Band_Phase = 0.0 if type == 1 else M_C.PI_2

        Module = (abs (self.__K) * High_Band_Module) / denominator
        Phase = High_Band_Phase - np.arctan ((W_Wo / Q) / (1.0 - W_Wo2))

        return (Module, Phase)


    def Get_Value (self, f : float):

        if len(self.__C) == 2:
            return self.__Order_1 (f)

        elif len(self.__C) == 3:
            return self.__Order_2 (f)

        else:
            return (0.0, 0.0) #TODO higher order to implement


    def Generate_Image (self, visitor):
        visitor.Generate (self)