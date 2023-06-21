import hashlib
from pyfingerprint.pyfingerprint import PyFingerprint

# Crea una instancia del objeto de huella digital
f = PyFingerprint('COM4', 57600, 0xFFFFFFFF, 0x00000000)

# Verifica si el sensor de huellas digitales está listo
if not f.verifyPassword():
    raise ValueError('La contraseña del sensor de huellas digitales es incorrecta')
# Captura una huella digital
print('Coloca el dedo en el sensor...')
while not f.readImage():
    pass

# Convierte la huella digital en una cadena de texto
f.convertImage(0x01)
hash = hashlib.sha256(f.downloadCharacteristics(0x01)).hexdigest()
print('La huella digital ha sido capturada y convertida exitosamente')
# Verifica la huella digital
stored_hash = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

if hash == stored_hash:
    print('La huella digital coincide')
else:
    print('La huella digital no coincide')
