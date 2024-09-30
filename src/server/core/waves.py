from typing import List

import numpy as np

from .object import Base_Object

class Waves (Base_Object) :

    def __init__ (self, Amplitude : List[float], Function : List[str]) :
        self.__Amplitude = Amplitude
        self.__Base_Func = Function


    def Get_Value (self, t : float) -> any:

        epsilon = 1E-3
        Func_Value = 0.0
        for I in range (0, len (self.__Amplitude)):

            Elementary_Val = (np.cos (t) if self.__Base_Func [I] == "cos"
                                         else np.sin(t))

            Func_Value += self.__Amplitude [I] * Elementary_Val

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





