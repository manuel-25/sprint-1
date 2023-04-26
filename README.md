# Sprint-2 Desafío Entregable Product Manager

Este es un proyecto que permite gestionar productos dentro de un array y guardarlos en un archivo `data.json`. Cada producto contiene los siguientes campos: `title`, `description`, `price`, `thumbnail`, `code` y `stock`.

## Funcionalidades

El proyecto incluye las siguientes funcionalidades:

- `addProduct(data)`: Agrega un producto al array y lo guarda dentro de `data.json`.
- `getProducts()`: Muestra los productos.
- `getProductById(id)`: Devuelve el producto con el id que se ingresa.
- `updateProduct(id, data)`: Actualiza la información del producto con el id que se ingresa y lo guarda en `data.json`.
- `deleteProduct(id)`: Elimina el producto del archivo `data.json`.

## Cómo utilizar el proyecto

1. Clona el proyecto a tu computadora con el siguiente comando: `git clone https://github.com/manuel-25/sprint-1.git`
2. Abre una terminal y dirígete a la carpeta del repositorio: `cd sprint-01`
3. Ejecuta el comando `node .\script.js` para iniciar la aplicación.
