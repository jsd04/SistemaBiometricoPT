# ********* ALMACENANDO ROSTROS python y opencv ******
# by link: http://omes-va.com/almacenando-rostros-usando-imagenes-y-video-python-opencv/

import cv2 # Importamos OpenCV.

faceClassif = cv2.CascadeClassifier('C:/Users/yobis/Desktop/Proyectos/pt/python/haarcascades/haarcascade_frontalface_default.xml') 
if faceClassif.empty(): raise Exception("¿Está seguro que es la ruta correcta?") # añadido por mi
# Line 6 Cargamos el clasificador con extensión xml con ayuda de cv2.CascadeClassifier, dentro entre comillas especificamos el nombre y extensión del archivo. 
image = cv2.imread('oficina.png') #Línea 9: Leemos la imagen de entrada.
imageAux = image.copy() #Línea 10: Creamos una copia de la imagen de entrada, esta se mantendrá intacta, por lo que nos servirá para rectorar los rostros encontrados.
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) #Línea 11: Transformación de imagen a escala de grises.
faces = faceClassif.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5 ) # gray, 1.1, 5)
#Línea 12: Con esta línea se realiza la detección de rostros presentes en la imagen, 
#según los parámetros de entrada de la función detectMultiScale : image, scaleFactor, minNeighbors
count = 0 
#Línea 15: Vamos a iniciar un contador count = 0, que nos ayudará al conteo de cada uno de los rostros detectados.
for (x,y,w,h) in faces:
# Línea 17: Extraemos las coordenadas, ancho(x) y alto(y) de cada una de las caras detectadas (esto lo obtendremos de la variable ‘face’ que aquí se ha utilizado), 
# es por ello que se utiliza un for para poder desempaquetar toda la información de los rostros obtenidos y posteriormente dibujar un rectángulo que los contenga..
  cv2.rectangle(image,(x,y),(x+w,y+h),(124, 252, 0),2) # color en rgb (124,252,0)
  #Línea 20: Vamos a visualizar los rostros detectados en un rectángulo.
  rostro = imageAux[y:y+h,x:x+w]
  rostro = cv2.resize(rostro,(150,150), interpolation=cv2.INTER_CUBIC)
  #Línea 22 : Recortamos los rostros de la imagen imageAux con ayuda de las coordenadas x, y ancho y alto que obtuvimos de la línea 17. 
  #Línea 23: vamos a redimensionar los rostros a 150 pixeles de ancho y alto (esta línea puede ser omitida o el ancho y alto podrían cambiar de acuerdo a tus requerimientos).
  cv2.imwrite('rostro_{}.jpg'.format(count),rostro)
  #Línea 26:  Almacenamos los rostros. Cada una de las imágenes tendrá un número diferente gracias al contador count.
  count = count + 1

  cv2.imshow('rostro',rostro)
  cv2.imshow('image',image)
  cv2.waitKey(0)

cv2.destroyAllWindows()  
#Línea 30 a 34: Estas líneas son para la visualización del rostro y de las detecciones.



