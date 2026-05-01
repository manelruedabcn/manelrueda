// ============================================
// SCRIPT PARA GUARDAR SUSCRIPTORES EN GOOGLE SHEETS
// Despliega esto como Web App en Google Apps Script
// ============================================

function doPost(e) {
  try {
    // Abrir la hoja de cálculo por ID
    var sheet = SpreadsheetApp.openById('TU_SHEET_ID_AQUI').getActiveSheet();
    
    // Parsear los datos del formulario
    var email = e.parameter.email;
    var timestamp = new Date();
    var fuente = e.parameter.fuente || 'landing IKIGAIER';
    
    // Validar que el email no esté vacío
    if (!email || email.trim() === '') {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: 'Email vacío' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Verificar si el email ya existe (evitar duplicados)
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === email) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, message: 'Ya estás suscrito/a' }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Añadir la nueva fila
    sheet.appendRow([email, timestamp.toISOString(), fuente]);
    
    // Responder éxito
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: '¡Gracias por suscribirte!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Error: ' + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// INSTRUCCIONES DE CONFIGURACIÓN
// ============================================
/*
1. Ve a https://sheets.google.com y crea una hoja nueva llamada "Suscriptores IKIGAIER"
2. En la primera fila (A1, B1, C1) escribe: Email | Fecha | Fuente
3. Ve a https://script.google.com y crea un nuevo proyecto
4. Pega este código completo
5. Sustituye 'TU_SHEET_ID_AQUI' por el ID de tu hoja de cálculo
   (el ID está en la URL: https://docs.google.com/spreadsheets/d/XXXXX/edit → XXXXX es el ID)
6. Haz clic en "Implementar" → "Nueva implementación" → "Web App"
7. Configura:
   - Ejecutar como: Yo
   - Quién tiene acceso: Cualquiera (Anyone)
8. Copia la URL del Web App que te da (termina en /exec)
9. Pega esa URL en el action del formulario de la landing
*/