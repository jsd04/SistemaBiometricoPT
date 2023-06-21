# ********* ALMACENANDO ROSTROS python y opencv parte 2 ******
# by link: http://omes-va.com/almacenando-rostros-usando-imagenes-y-video-python-opencv/

import cv2
import os
#Línea 4 y 5: Importamos OpenCV y os, este último nos ayudará a crear directorios, listarlos entre otros.

if not os.path.exists('Rostros encontrados'):
    print('Carpeta creada: Rostros encontrados')
    os.makedirs('Rostros encontrados')
#Línea 8 a 10: Verificamos si existe algún directorio llamado ‘Rostros encontrados’, si no es así lo creamos.

faceClassif = cv2.CascadeClassifier('C:/Users/yobis/Desktop/Proyectos/pt/python/haarcascades/haarcascade_frontalface_default.xml') 
if faceClassif.empty(): raise Exception("¿Está seguro que es la ruta correcta?")
#Línea 13 cargamos el clasificador de rostros, 

count = 0
#Línea 17 inicializamos el contador count que nos ayudará con los nombres para cada rostro.

image = cv2.imread('oficina.png') #Línea 20: Vamos a leer la imagen con cv2.imread.
imageAux = image.copy()#Línea 21: creamos una imagen auxiliar copia de la imagen de entrada
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)#Línea 22: transformamos la imagen de entrada en escala de grises
    
faces = faceClassif.detectMultiScale(gray, 1.1, 5)

for (x,y,w,h) in faces:
    cv2.rectangle(image, (x,y),(x+w,y+h),(128,0,255),2)
    cv2.rectangle(image,(10,5),(450,25),(255,255,255),-1)
    cv2.putText(image,'Presione s, para alamacenar los rostros encontrados',(10,20), 2, 0.5,(128,0,255),1,cv2.LINE_AA)
    cv2.imshow('image',image)
    #Línea 24 a 30: Este procedimiento es detectar los rostros, dibujamos un rectángulo que rodee las caras y además pondremos
    #  el mensaje: Presione s, para almacenar los rostros encontrados.
    k = cv2.waitKey(0)
    if  k == ord('s'):
        #Línea 33 y 34: Ahora vamos a asignar la tecla ‘s’ para que se guarden los rostros detectados en el nuevo directorio.
        for (x,y,w,h) in faces:
            rostro = imageAux[y:y+h,x:x+w]
            rostro = cv2.resize(rostro,(150,150), interpolation=cv2.INTER_CUBIC)
            cv2.imwrite('Rostros encontrados/rostro_{}.jpg'.format(count),rostro)
            count = count +1
            #Línea 36 a 40: Similar al apartado anterior, con ayuda de las coordenadas x e y, ancho y alto de los rostros 
            # detectados recortamos y guardamos los rostros en la carpeta que habíamos creado en un principio. 
            # Recuerda que en la línea 42 estamos redimensionando los rostros, pueedes omitir o modificar esta línea.
            # Si deseas puedes descomentar las líneas 31 y 32 para que visualices cada rostro. Finalmente sumamos 1 a la variable count.
    elif k == 27:
        break

cv2.destroyAllWindows()
#Línea 45 a 48: Cuando presionemos ‘Esc’, el ciclo se va a romper y se cerrarán las ventanas de visualización.


