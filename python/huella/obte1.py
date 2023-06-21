from pyfingerprint.pyfingerprint import PyFingerprint

# Inicializar el objeto PyFingerprint
f = PyFingerprint('COM4', 57600, 0xFFFFFFFF, 0x00000000)

# Verificar si el lector de huellas dactilares está conectado y listo para usar
if not f.verifyPassword():
    print('No se pudo verificar la contraseña')
    exit(1)

# Imprimir el número total de huellas dactilares almacenadas en el lector
print('Número total de huellas dactilares: {}'.format(f.getTemplateCount()))

# Esperar a que se coloque un dedo en el lector
print('Coloque un dedo en el lector...')
while not f.readImage():
    pass

# Convertir la imagen a un formato compatible con la biblioteca
f.convertImage(0x01)

# Buscar la huella digital en la base de datos del lector
result = f.searchTemplate()

# Si se encontró una huella digital coincidente, imprimir el ID del usuario
if result >= 0:
    print('Huella digital encontrada en la posición #{}'.format(result))
else:
    print('No se encontró una huella digital coincidente')

# Limpiar el lector de huellas dactilares
f.deleteTemplate()
