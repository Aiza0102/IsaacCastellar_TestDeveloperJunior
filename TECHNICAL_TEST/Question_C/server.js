/** 
1.Descargar el Código
    • Descarga el archivo server.js que proporcioné anteriormente y guárdalo en una carpeta en tu máquina.
2. Instalar Dependencias
    • Abre una Terminal: Abre una terminal en la ubicación donde guardaste server.js.
    • Ejecuta el siguiente comando para instalar las dependencias necesarias (Express y Redis):
    |npm install express redis|
3. Inicia el Servidor:
    • Una vez que las dependencias se hayan instalado, ejecuta el siguiente comando para iniciar el servidor:
    |node server.js|
    RESPUESTA ESPERADA: 'Server listening on port 3000'
4. Usa Postman:
    • Abre Postman: Crea una nueva solicitud GET con la URL http://localhost:3000/get/miClave.
    Haz clic en "Send" para realizar la solicitud y deberías ver la respuesta.
 **/

/** 
1. Caché Redis:
    Se utiliza el módulo 'redis' para crear una conexión a la base de datos Redis, que actúa como una caché de clave-valor.
2. Ruta GET:
    Se define una ruta '/get/miClave' para manejar las solicitudes GET. Esta ruta siempre usará la clave 'miClave' en este ejemplo.
3. Consulta de la Caché:
    Se utiliza 'cache.get' para consultar si la clave está presente en la caché.
4.Cache Hit:
    Si la clave está presente en la caché, se devuelve el valor asociado a esa clave.
5. Cache Miss:
    Si la clave no está en la caché (cache miss), se simula obtener datos de otra fuente (por ejemplo, una base de datos) y se almacena en la caché con un tiempo de vida (TTL) de 60 segundos.
**/

const express = require('express');
const redis = require('redis');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que el servidor escuchará las solicitudes
const port = 3000;

// Crear una conexión a la base de datos Redis (caché)
const cache = redis.createClient();

// Configurar una ruta para manejar las solicitudes GET a la URL '/get/miClave'
app.get('/get/miClave', (req, res) => {
    // Obtener la clave del parámetro en la URL (en este caso, siempre será 'miClave')
    const key = req.params.key;

    // Consultar la caché para ver si la clave ya está almacenada
    cache.get(key, (err, result) => {
        if (err) {
            // Si hay un error al consultar la caché, devolver un error de servidor interno
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if (result) {
            // Si la clave está en la caché, devolver el valor almacenado
            res.send(`Value for key ${key}: ${result}`);
        } else {
            // Si la clave no está en la caché (cache miss), obtener datos de otra fuente (en este caso, simulado)
            const value = `Some data for ${key}`;
            
            // Almacenar el valor en la caché con un tiempo de vida (TTL) de 60 segundos
            cache.setex(key, 60, value);
            
            // Devolver el valor obtenido o almacenado
            res.send(`Value for key ${key}: ${value}`);
        }
    });
});

// Iniciar el servidor y hacer que escuche en el puerto especificado
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});