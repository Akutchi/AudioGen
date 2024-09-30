import unittest

import core.waves as C_W
import maths.constants as M_C

class Test_Wave (unittest.TestCase):

    def Test_Null_Amplitude (self):
        Null_Func = C_W.Waves ([], ["cos"])

        self.assertEqual (Null_Func.Get_Value (0.0), 0.0)
        self.assertEqual (Null_Func.Get_Value (2.6845), 0.0)

    def Test_Simple_Cos (self):
        s_cos = C_W.Waves ([1.0], ["cos"])

        self.assertEqual (s_cos.Get_Value (0.0), 1.0)
        self.assertEqual (s_cos.Get_Value (M_C.PI_2), 0.0)

    def Test_Simple_Sin (self):
        s_cos = C_W.Waves ([1.0], ["sin"])

        self.assertEqual (s_cos.Get_Value (0.0), 0.0)
        self.assertEqual (s_cos.Get_Value (M_C.PI_2), 1.0)

    def Test_Set_Amplitude (self):
        s_cos = C_W.Waves ([1.0], ["cos"])
        s_cos.Set_Amplitude (0, 2.0)

        self.assertEqual (s_cos.Get_Value (0.0), 2.0)

    def Test_Set_Amplitude_Beyond_Length (self):
        s_cos = C_W.Waves ([1.0], ["cos"])
        s_cos.Set_Amplitude (1, 2.0)

        self.assertEqual (s_cos.Get_Value (0.0), 1.0)



