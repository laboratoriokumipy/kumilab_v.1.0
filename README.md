# Catálogo Laboratorios Kumi

Este paquete contiene:

- `index.html`: aplicación de catálogo (página única) lista para subir a GitHub Pages.
- `apps_script_webapp.gs`: código de Google Apps Script para registrar productos en Google Sheets y guardar imágenes en Google Drive.

## Pasos de uso

1. Publique `index.html` en GitHub Pages u otro hosting estático.
2. Cree un proyecto en Google Apps Script, pegue el contenido de `apps_script_webapp.gs` y despliegue como Web App con acceso "Cualquiera con el enlace".
3. Copie la URL del Web App y colóquela en la constante `SHEET_WEBAPP_URL` dentro de `index.html`.
4. Verifique que `SHEET_ID` y `DRIVE_FOLDER_ID` coincidan con su hoja de cálculo y carpeta de Drive.
5. Ingrese como admin con usuario `dbaza` y contraseña `1234` para agregar/editar productos y cargar fotos.
