# Biblioteca Virtual

## Tecnologías utilizadas

### Backend
* Node.js
* Express.js
* PostgreSQL
* Nodemailer (para la recuperación de contraseña)
* Bcrypt (para la encriptación de la contraseña)

### Frontend
* React
* Axios
* Tailwind CSS
* React-toastify

### Auntenticación
* JWT


## Intalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

**Clonar el repositorio:**
git clone https://github.com/tu-usuario/biblioteca-virtual.git
   
cd biblioteca-virtual

npm run build

npm run start

y listo.


**Variables de Entorno .env**

Asegúrate de tener configurado tu archivo .env en la raíz del proyecto con las siguientes variables de entorno.

DB_HOST=host_database
DB_USER=user_database
DB_PASSWORD=password_database
DB_DATABASE=name_database
PORT=8080
JWT_SECRET=token_secret
RESET_TOKEN_SECRET=token_secret_reset_paswword
EMAIL_USER=user_email
EMAIL_PASS=password_email