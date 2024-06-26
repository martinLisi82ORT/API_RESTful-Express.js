# API RESTful

Arquitectura de Cliente/Servidor mediante el protocolo HTTP, desarrollado utilizando NodeJS y Express.js. 
Todos los recursos de la API pueden ser consumidos mediante peticiones HTTP (POST, GET, PUT y DELETE). 
Configurado con MongoDB.

Aplicación web que permite el manejo de Usuarios de un consultorio médico :man_health_worker: :hospital:. La aplicación permite la creación de un Usuario asignándole un rol de "Paciente" o "Profesional", con el envío automático de mail de confirmación mediante _Nodemailer_. El mismo será guardado en dos listas, una de Usuarios y otra de Paciente o Profesionales dependiendo del rol asignado (la app tiene 3 listas en total). Permite el acceso del usuario con mail y contraseña validando dichos datos en la Base de Datos. La misma está configurada con una Base de Datos en MongoDB. Por cuestiones de seguridad de GitHub, no se sube el archivo .env con las credenciales de MongoDB, por lo tanto la aplicación cuenta también con un almacenamiento interno File System y la configuración necesaria para pasar de una memoria File System a una en MongoDB. Para realizar pruebas y test se puede usar perfectamente esta memoria interna. Si se desea conectar a una Base de Datos en MongoDB solo se debe crear un archivo .env y colocar las credenciales necesarias.

**Ejemplo del archivo .env:**
> MODO_PERSISTENCIA = 'MONGODB'  
STRCNX = 'mongodb+srv:// *********** <---- (credenciales)         
BASE = '*******' <---- (nombre de la Base de Datos)


**URL base:** 
`http://localhost:${PORT}/api/clinica`


Mediante distintas peticiones **GET** la aplicación permite, desde el router de pacientes: el listado completo de Pacientes (/), la búsqueda de un paciente por ID (/paciente/:id?), el promedio de edad (/promedioEdad) y la cantidad de pacientes (/cantidadPacientes).

Desde el router de profesionales: el listado completo de profesionales (/), la búsqueda de un profesional por ID (/profesionales/:id?), la especialidad (/especialidad/:id) y la cantidad de profesionales (/cantidadProfesionales). 

Además cada router contiene las peticiones **POST** (agregado), **PUT** (modificación) y **DELETE**.

También cuenta con distintos test de prueba detallados más abajo y la documentación necesaria.

### :page_facing_up: Documentacion:

- [Postman Documentation](https://documenter.getpostman.com/view/32556955/2s9YypFPQC)


---
## TEST de prueba:
**Test Pacientes:**

* Scripts para ejecutar: _npm run test-gen-pac_ 

**Test Profesionales:**

* Scripts para ejecutar: _npm run test-gen-prof_

**Test del Servidor de forma externa con Supertest:** Se debe tener **_levantado_** el servidor (npm start)
* Scripts para ejecutar: _npm run test-manual_

**Test de integracion del Servidor:** Se debe tener **_levantado_** el servidor (npm start)
* Scripts para ejecutar: _npm run test-api-ext_

**Test Servidor como instancia:** Se debe tener **_levantado_** el servidor (npm start)
* Scripts para ejecutar: _npm run test-api-int_

**Test General:** Se debe tener **_levantado_** el servidor (npm start)
* Scripts para ejecutar: ***npm run test***

---
### Herramientas utilizadas:
JavaScript | Express.Js | Node.Js | MongoDB | VSCode 

<div align="center">
  
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />

<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />

<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />

<img src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />

<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" />

</div
  
---

