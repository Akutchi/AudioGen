import core.waves as C_W
import core.image_generator as C_IG

wave = C_W.Waves ([1.0], ["cos"])
visitor = C_IG.ImageGenerator ()
wave.Generate_Image (visitor)