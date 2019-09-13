from mappings import Injector  

class Commands(Enum):
  webcam = 'webcam'
  screenshot = 'screenshot'
  windowslock = 'windowslock'
  chat = 'chat'

  def __str__(self):
    return self.value

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

def chat(p, message):
    i = Injector(p)
    i.start_injection()
    i.send_admin_sequence()
    i.inject_string(message)
    i.send_enter()
    i.stop_injection()
