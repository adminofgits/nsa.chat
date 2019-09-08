from mappings import Injector  


def webcam(p):
    i = Injector(p)
    i.start_injection()
    i.send_left()
    i.send_right()
    i.send_left()
    i.send_right()
    i.stop_injection()

def screenshot(p):
    i = Injector(p)
    i.start_injection()
    i.send_left()
    i.send_left()
    i.send_right()
    i.send_right()
    i.stop_injection()

def windowslock(p):
    i = Injector(p)
    i.start_injection()
    i.send_winplusl()
    i.stop_injection()
