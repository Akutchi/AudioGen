from typing import List

import numpy as np

class Filters:

    def __init__(self, Coefficients : List [float], Gain : float):
        self.__C = Coefficients
        self.__K = Gain

    def Get_Value (self, f : float):

        denominator = 0.0
        for I in range (0, len(self.__C)):

            ci = self.__C [I]
            denominator += ci * pow (f, I)

        if denominator == 0.0:
            denominator = 1.0

        return self.__K / denominator

    def Generate_Image (self, visitor):
        visitor.Generate (self)