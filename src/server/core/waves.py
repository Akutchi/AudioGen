from typing import List

import numpy as np

import maths.constants as M_C

from .object import Base_Object

class Waves (Base_Object) :

    def __init__ (self, Amplitude : List[float], Shift : List[float],
                  Function : List[str], Period : float) :

        self.__A = Amplitude
        self.__Phi = Shift
        self.__Base_Func = Function
        self.__T = Period


    def Get_Value (self, x : float) -> any:

        epsilon = 1E-3
        Func_Value = 0.0
        cos_i, sin_i, n = 0.0, 0.0, 0.0
        for I in range (0, len (self.__A)):

            Ai = self.__A [I]
            Phi_i = self.__Phi [I]
            f_i = self.__Base_Func [I]
            xi = 0.0

            if f_i == "Cos":
                cos_i += 1
                n = cos_i

            else:
                sin_i += 1
                n = sin_i

            xi = n * x * (M_C.TWO_PI / self.__T)

            Elementary_Val = (np.cos (xi + Phi_i) if f_i == "Cos"
                                                 else np.sin(xi + Phi_i))

            Func_Value += Ai * Elementary_Val

        if abs (Func_Value) < epsilon:
            return 0.00

        return Func_Value


    def Set_Amplitude (self, I : int, Value : float) -> int:

        if I < len(self.__Amplitude):

            self.__Amplitude [I] = Value
            return 1

        return 0

    def Generate_Image (self, visitor):
        visitor.Generate (self)





