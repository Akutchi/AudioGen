from abc import ABC, abstractmethod

class Base_Object (ABC):

    def __init__ (self):
        pass

    @abstractmethod
    def Generate_Image (self):
        pass