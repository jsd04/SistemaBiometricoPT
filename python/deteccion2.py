# ********* Deteccion por Haar-cascade con opencv ******
# by link: https://omes-va.com/deteccion-de-rostros-con-haar-cascades-python-opencv/

import cv2 # Importamos OpenCV.

faceClassif = cv2.CascadeClassifier('C:/Users/yobis/Desktop/Proyectos/pt/python/haarcascades/haarcascade_frontalface_default.xml') 
if faceClassif.empty(): raise Exception("¿Está seguro que es la ruta correcta?") # añadido por mi
# Line 6 Cargamos el clasificador con extensión xml con ayuda de cv2.CascadeClassifier, dentro entre comillas especificamos el nombre y extensión del archivo. 
image = cv2.imread('oficina.png')
imageAux = image.copy()# para poder hacer el recorte # para redimensionarla image = cv2.resize(image, (720,480))
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#Línea 9 y 11: Leemos la imagen en donde se van a detectar los rostros y luego la transformamos a escala de grises.
faces = faceClassif.detectMultiScale(gray,
  scaleFactor=1.3,
  minNeighbors=5,
  minSize=(30,30),
  maxSize=(200,200))
count = 0#para recorte # Línea 13: Una vez que se ha cargado el clasificador en la línea 3 es necesario aplicarlo en la imagen, para ello utilizaremos detectMultiScale que debe estar seguido de la variable con la cual se asignó la carga del clasificador y es aquí en donde tenemos que tener en cuenta los argumentos que vimos recientemente: image, scaleFactor, minNeighbors, minSize y maxSize.
for (x,y,w,h) in faces:
  cv2.rectangle(image,(x,y),(x+w,y+h),(128,0,255),2)#(0,255,0),2)
#Línea 19: Cuando se aplica este detector sobre una imagen, en caso de que sea detectado algún rostro, se almacenarán los puntos x, y, ancho y alto del rostro que ha sido detectado (esto lo obtendremos de la variable ‘face’ que aquí se ha utilizado), es por ello que se utiliza un for para poder desempaquetar toda la información de los rostros obtenidos y posteriormente dibujar un rectángulo que los contenga. 
  rostro = imageAux[y:y+h,x:x+w]
  rostro = cv2.resize(rostro,(150,150), interpolation=cv2.INTER_CUBIC)
  cv2.imwrite('rostro_{}.jpg'.format(count),rostro)
  count = count + 1

  cv2.imshow('rostro',rostro)
  cv2.imshow('image',image)
  cv2.waitKey(0)

cv2.imshow('image',image)
cv2.waitKey(0)
cv2.destroyAllWindows()
#para hacer el recorte de rostro se agregan las siguientes lineas en la linea 22 a la 29 y en la linea 10 se hace copia de la imagen original
# y se agrega un count en la 18


#Para detectar pero en video
"""
cap = cv2.VideoCapture(0)
faceClassif = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
while True:
  ret,frame = cap.read()
  gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
  faces = faceClassif.detectMultiScale(gray, 1.3, 5) # parámetros usados son solo: image, scaleFactor y minNeighbors. 
  for (x,y,w,h) in faces:
    cv2.rectangle(frame, (x,y),(x+w,y+h),(0,255,0),2)
  cv2.imshow('frame',frame)
  
  if cv2.waitKey(1) & 0xFF == ord('q'):
    break
cap.release()
cv2.destroyAllWindows()
"""

#  Parametros

#ScaleFactor: Este parámetro especifica que tanto va a ser reducida la imagen. 
"""         Por ejemplo si se ingresa 1.1, quiere decir que se va a ir reduciendo la imagen en 10%, con 1.3 se reducirá 30%, 
            creando de esta manera una pirámide de imágenes. Hay algo que debemos tener en cuenta y es que si damos un número muy alto,
            se pierden algunas detecciones. Mientras que para valores muy pequeños como por ejemplo 1,01 (es decir reducir en un 1% la imagen),
            llevará mayor tiempo de procesamiento, ya que se tendrán más imágenes a analizar, además de que pueden incrementar los falsos 
            positivos (que son detecciones presentadas como objetos u rostros, pero que en realidad no lo son). """

#MinNeighbors: Este parámetro especifica cuántos vecinos debe tener cada rectángulo candidato para retenerlo. 
"""         Tenemos una pequeña ventana que va a ir pasando por una imagen buscando rostros, entonces puede que te encuentres que al final de 
            todo el proceso ha identificado varios rostros (figura 4), pero puede que muchos de ellos correspondan a la misma persona. 
            Entonces este parámetro, hace relación a todos esos rectángulos delimitadores de un mismo rostro. Por lo cual minNeighbors especifica
            el número mínimo de cuadros delimitadores o vecinos, que debe tener un rostro para que detectado como tal.  """

#MinSize: Este parámetro indica el tamaño mínimo posible del objeto. Objetos más pequeños son ignorados.  

#MaxSize: Este parámetro indica el tamaño máximo posible del objeto. Objetos más grandes son ignorados.