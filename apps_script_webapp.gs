function doPost(e) {
  try {
    var action = e.parameter.action || '';
    if (action === 'saveProduct') {
      var sheetId = e.parameter.sheetId;
      var folderId = e.parameter.folderId;
      var productJson = e.parameter.product;
      var product = JSON.parse(productJson);

      var ss = SpreadsheetApp.openById(sheetId);
      var sheet = ss.getActiveSheet();

      var lastRow = sheet.getLastRow();
      if (lastRow === 0) {
        sheet.appendRow([
          'id', 'nombre', 'categoria', 'descripcion',
          'imagenes_json', 'etiquetas_json',
          'precio', 'stock', 'sku',
          'unidad', 'presentacion', 'destacado',
          'creado', 'timestamp'
        ]);
        lastRow = 1;
      }

      var dataRange = sheet.getRange(2, 1, Math.max(lastRow - 1, 0), 1).getValues();
      var rowIndex = -1;
      for (var i = 0; i < dataRange.length; i++) {
        if (String(dataRange[i][0]) === String(product.id)) {
          rowIndex = i + 2;
          break;
        }
      }

      var fileKeys = Object.keys(e.files || {}).sort();
      var uploadedUrls = [];
      if (fileKeys.length > 0 && folderId) {
        var folder = DriveApp.getFolderById(folderId);
        for (var k = 0; k < fileKeys.length; k++) {
          var blob = e.files[fileKeys[k]];
          var file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          var fileId = file.getId();
          var publicUrl = 'https://drive.google.com/uc?export=view&id=' + fileId;
          uploadedUrls.push(publicUrl);
        }
      }

      var imagesJson = JSON.stringify(product.imagenes || []);
      var tagsJson = JSON.stringify(product.etiquetas || []);
      var rowValues = [
        product.id,
        product.nombre,
        product.categoria,
        product.descripcion,
        imagesJson,
        tagsJson,
        product.precio,
        product.stock,
        product.sku,
        product.unidad,
        product.presentacion,
        product.destacado ? true : false,
        product.creado,
        new Date()
      ];

      if (rowIndex === -1) {
        rowIndex = lastRow + 1;
        sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
      } else {
        sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
      }

      var result = {
        imageUrls: uploadedUrls,
        rowIndex: rowIndex
      };

      var out = ContentService.createTextOutput(JSON.stringify(result));
      out.setMimeType(ContentService.MimeType.JSON);
      return out;
    } else {
      var out2 = ContentService.createTextOutput(JSON.stringify({ error: 'Unknown action' }));
      out2.setMimeType(ContentService.MimeType.JSON);
      return out2;
    }
  } catch (err) {
    var outErr = ContentService.createTextOutput(JSON.stringify({ error: err.message || String(err) }));
    outErr.setMimeType(ContentService.MimeType.JSON);
    return outErr;
  }
}
