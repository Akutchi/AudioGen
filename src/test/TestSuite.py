import unittest

from .WaveTesting import Test_Wave

def Prepare_Tests ():

    Test_List = [
        Test_Wave ("Test_Null_Amplitude"),
        Test_Wave ("Test_Simple_Cos"),
        Test_Wave ("Test_Simple_Sin"),
        Test_Wave ("Test_Set_Amplitude"),
        Test_Wave ("Test_Set_Amplitude_Beyond_Length"),
    ]

    return unittest.TestSuite (tests=Test_List)

def Run ():

    Tests = Prepare_Tests ()
    Runner = unittest.TextTestRunner ()
    Runner.run (Tests)