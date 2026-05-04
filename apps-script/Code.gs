var SHEET_INVITADOS = "INVITADOS";
var SHEET_LOG = "RSVP_LOG";

var COL = {
  ID: 1,
  NOMBRE: 2,
  CUPOS: 3,
  ESTADO: 4,
  TIMESTAMP_CONFIRMACION: 5,
  TELEFONO_CONFIRMADO: 6,
  MENSAJE_CONFIRMADO: 7,
  CORREO_CONFIRMADO: 8
};

var ESTADO_PENDIENTE = "PENDIENTE";
var ESTADO_CONFIRMADO = "CONFIRMADO";
var ESTADO_NO_ASISTE = "NO_ASISTE";
var RSVP_CLOSE_DATE = new Date(2026, 5, 12, 0, 0, 0);

function doGet(e) {
  try {
    var action = getParam_(e, "action") || "lookup";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var invitadosSheet = ss.getSheetByName(SHEET_INVITADOS);

    if (!invitadosSheet) {
      return jsonResponse_({
        ok: false,
        code: "INVITADOS_SHEET_NOT_FOUND",
        message: "No existe la hoja INVITADOS."
      });
    }

    if (action === "searchByName") {
      var nombre = getParam_(e, "nombre");
      if (!nombre) return jsonResponse_({ ok: true, results: [] });
      return jsonResponse_({
        ok: true,
        results: findInvitadosByNombre_(invitadosSheet, nombre)
      });
    }

    if (action !== "lookup") {
      return jsonResponse_({
        ok: false,
        code: "INVALID_ACTION",
        message: "Accion no valida."
      });
    }

    var id = normalizeId_(getParam_(e, "id"));
    if (!id) return jsonResponse_({ ok: true, exists: false });

    var found = findInvitadoById_(invitadosSheet, id);
    if (!found) return jsonResponse_({ ok: true, exists: false });

    return jsonResponse_({
      ok: true,
      exists: true,
      id: String(found.id),
      nombre: String(found.nombre || ""),
      cupos: Number(found.cupos || 0),
      estado: String(found.estado || ESTADO_PENDIENTE)
    });
  } catch (err) {
    return jsonResponse_({
      ok: false,
      code: "SERVER_ERROR",
      message: "Error interno en doGet."
    });
  }
}

function doPost(e) {
  var lock = null;
  var lockAcquired = false;

  try {
    var action = getParam_(e, "action") || "submit";
    if (action !== "submit") {
      return jsonResponse_({
        ok: false,
        code: "INVALID_ACTION",
        message: "Accion no valida."
      });
    }

    if (isRsvpClosed_()) {
      return jsonResponse_({
        ok: false,
        code: "RSVP_CLOSED",
        message: "El periodo de confirmación de asistencia ha finalizado."
      });
    }

    var payload = parsePayload_(e);
    var id = normalizeId_(payload.id);
    var respuesta = normalizeRespuesta_(payload.respuesta);
    var telefono = String(payload.telefono || "").trim();
    var correo = String(payload.correo || "").trim();
    var mensaje = String(payload.mensaje || "").trim();
    var userAgent = String(payload.userAgent || "").trim();

    if (!id || !respuesta || !telefono) {
      return jsonResponse_({
        ok: false,
        code: "MISSING_FIELDS",
        message: "Faltan campos requeridos: id, respuesta, telefono."
      });
    }

    if (!isValidPhone_(telefono)) {
      return jsonResponse_({ ok: false, code: "INVALID_PHONE", message: "Telefono invalido." });
    }

    if (respuesta === "CONFIRMA" && !correo) {
      return jsonResponse_({
        ok: false,
        code: "MISSING_EMAIL",
        message: "El correo es obligatorio para confirmar asistencia."
      });
    }

    if (correo && !isValidEmail_(correo)) {
      return jsonResponse_({ ok: false, code: "INVALID_EMAIL", message: "Correo invalido." });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var invitadosSheet = ss.getSheetByName(SHEET_INVITADOS);
    var logSheet = ss.getSheetByName(SHEET_LOG);
    if (!invitadosSheet || !logSheet) {
      return jsonResponse_({
        ok: false,
        code: "SHEET_NOT_FOUND",
        message: "No existen las hojas requeridas INVITADOS o RSVP_LOG."
      });
    }

    lock = LockService.getScriptLock();
    try {
      lock.waitLock(10000);
      lockAcquired = true;
    } catch (_lockErr) {
      return jsonResponse_({
        ok: false,
        code: "LOCK_TIMEOUT",
        message: "No fue posible registrar en este momento. Intenta nuevamente."
      });
    }

    var found = findInvitadoById_(invitadosSheet, id);
    if (!found) {
      return jsonResponse_({ ok: false, code: "INVALID_ID", message: "ID no encontrado." });
    }

    var estadoActual = String(found.estado || ESTADO_PENDIENTE).toUpperCase();
    if (estadoActual === ESTADO_CONFIRMADO || estadoActual === ESTADO_NO_ASISTE) {
      return jsonResponse_({
        ok: false,
        code: "ALREADY_SUBMITTED",
        message: "Este invitado ya respondio.",
        estado: estadoActual
      });
    }

    if (estadoActual !== ESTADO_PENDIENTE) {
      return jsonResponse_({
        ok: false,
        code: "INVALID_STATUS",
        message: "Estado no permitido para registrar RSVP."
      });
    }

    var estadoFinal = (respuesta === "CONFIRMA") ? ESTADO_CONFIRMADO : ESTADO_NO_ASISTE;
    var timestamp = new Date();

    invitadosSheet.getRange(found.row, COL.ESTADO).setValue(estadoFinal);
    invitadosSheet.getRange(found.row, COL.TIMESTAMP_CONFIRMACION).setValue(timestamp);
    invitadosSheet.getRange(found.row, COL.TELEFONO_CONFIRMADO).setValue(telefono);
    invitadosSheet.getRange(found.row, COL.MENSAJE_CONFIRMADO).setValue(mensaje);
    invitadosSheet.getRange(found.row, COL.CORREO_CONFIRMADO).setValue(correo);

    ensureLogHeaders_(logSheet);
    logSheet.appendRow([
      timestamp,
      found.id,
      found.nombre,
      found.cupos,
      respuesta,
      telefono,
      correo,
      mensaje,
      userAgent
    ]);

    if (respuesta === "CONFIRMA" && correo) {
      sendConfirmationEmail_(String(found.nombre || ""), correo);
    }

    return jsonResponse_({
      ok: true,
      id: String(found.id),
      nombre: String(found.nombre || ""),
      cupos: Number(found.cupos || 0),
      estadoFinal: estadoFinal
    });
  } catch (err) {
    return jsonResponse_({
      ok: false,
      code: "SERVER_ERROR",
      message: "Error interno en submit."
    });
  } finally {
    if (lockAcquired && lock) {
      try {
        lock.releaseLock();
      } catch (_ignored) {}
    }
  }
}

function findInvitadoById_(sheet, id) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  var values = sheet.getRange(2, 1, lastRow - 1, COL.CORREO_CONFIRMADO).getValues();
  var target = normalizeId_(id);

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var currentId = normalizeId_(row[COL.ID - 1]);
    if (currentId === target) {
      return {
        row: i + 2,
        id: row[COL.ID - 1],
        nombre: row[COL.NOMBRE - 1],
        cupos: row[COL.CUPOS - 1],
        estado: String(row[COL.ESTADO - 1] || ESTADO_PENDIENTE).toUpperCase(),
        correo: String(row[COL.CORREO_CONFIRMADO - 1] || "")
      };
    }
  }
  return null;
}

function findInvitadosByNombre_(sheet, nombre) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];

  var terms = getSearchTerms_(nombre);
  if (!terms.length) return [];

  var values = sheet.getRange(2, 1, lastRow - 1, COL.CORREO_CONFIRMADO).getValues();
  var results = [];

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var currentNombre = String(row[COL.NOMBRE - 1] || "");
    if (!nombreMatchesSearch_(currentNombre, terms)) continue;

    results.push({
      id: String(row[COL.ID - 1] || ""),
      nombre: currentNombre,
      cupos: Number(row[COL.CUPOS - 1] || 0),
      estado: String(row[COL.ESTADO - 1] || ESTADO_PENDIENTE).toUpperCase()
    });

    if (results.length >= 10) break;
  }

  return results;
}

function parsePayload_(e) {
  var data = {};
  var postBody = (e && e.postData && e.postData.contents) ? e.postData.contents : "";

  if (postBody) {
    try {
      data = JSON.parse(postBody);
    } catch (_ignored) {
      data = {};
    }
  }

  if (e && e.parameter) {
    for (var key in e.parameter) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = e.parameter[key];
      }
    }
  }

  return data;
}

function getParam_(e, key) {
  if (!e || !e.parameter) return "";
  return String(e.parameter[key] || "").trim();
}

function normalizeId_(value) {
  return String(value || "").trim().toUpperCase();
}

function normalizeRespuesta_(value) {
  var v = String(value || "").trim().toUpperCase();
  if (v === "CONFIRMA" || v === "NO_ASISTE") return v;
  return "";
}

function isRsvpClosed_() {
  return new Date() >= RSVP_CLOSE_DATE;
}

function normalizeName_(value) {
  var input = String(value || "").trim().toUpperCase();
  return input
    .replace(/Ñ/g, "__ENIE__")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/__ENIE__/g, "Ñ")
    .replace(/\s+/g, " ");
}

function getSearchTerms_(value) {
  var normalized = normalizeName_(value);
  if (!normalized) return [];
  return normalized.split(" ").filter(function(term) {
    return Boolean(term);
  });
}

function nombreMatchesSearch_(nombreCompleto, terms) {
  var normalizedNombre = normalizeName_(nombreCompleto);
  if (!normalizedNombre || !terms.length) return false;

  return terms.every(function(term) {
    return normalizedNombre.indexOf(term) !== -1;
  });
}

function isValidPhone_(phone) {
  return /^\+?[0-9()\-\s]{7,20}$/.test(String(phone || "").trim());
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
}

function buildGoogleCalendarLink_() {
  var baseUrl = "https://calendar.google.com/calendar/render";
  var params = [
    "action=TEMPLATE",
    "text=" + encodeURIComponent("Boda Julio & Susan"),
    "dates=20260627T163000/20260627T220000",
    "location=" + encodeURIComponent("Jardin el cerro"),
    "details=" + encodeURIComponent("Te esperamos para celebrar nuestra boda"),
    "ctz=" + encodeURIComponent("America/Guatemala")
  ];
  return baseUrl + "?" + params.join("&");
}

function buildIcsFile_() {
  var ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Boda Julio y Susan//RSVP//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:" + new Date().getTime() + "@boda-julio-susan",
    "DTSTAMP:20260424T000000Z",
    "DTSTART;TZID=America/Guatemala:20260627T163000",
    "DTEND;TZID=America/Guatemala:20260627T220000",
    "SUMMARY:Boda Julio & Susan",
    "LOCATION:Jardin el cerro",
    "DESCRIPTION:Te esperamos para celebrar nuestra boda",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  return Utilities.newBlob(ics, "text/calendar", "boda-julio-susan.ics");
}

function sendConfirmationEmail_(nombre, correo) {
  var googleCalendarLink = buildGoogleCalendarLink_();
  var safeName = String(nombre || "invitado").trim() || "invitado";
  var body = [
    "Hola " + safeName + ",",
    "",
    "Tu asistencia ha sido confirmada para nuestra boda.",
    "",
    "Evento: Boda Julio & Susan",
    "Fecha: 27 de junio de 2026",
    "Hora: 4:30 PM a 10:00 PM",
    "Lugar: Jardin el cerro",
    "",
    "Gracias por confirmar tu asistencia. Será muy especial compartir este día contigo.",
    "",
    "Agregar a Google Calendar:",
    googleCalendarLink
  ].join("\n");

  MailApp.sendEmail({
    to: correo,
    subject: "Confirmacion de asistencia - Boda Julio & Susan",
    body: body,
    attachments: [buildIcsFile_()]
  });
}

function ensureLogHeaders_(sheet) {
  if (sheet.getLastRow() > 0) {
    var header = sheet.getRange(1, 1, 1, 9).getValues()[0];
    if (String(header[6] || "").toUpperCase() === "CORREO_CONFIRMADO") return;
  }

  sheet.getRange(1, 1, 1, 9).setValues([[
    "TIMESTAMP",
    "ID",
    "NOMBRE",
    "CUPOS",
    "RESPUESTA",
    "TELEFONO_CONFIRMADO",
    "CORREO_CONFIRMADO",
    "MENSAJE_CONFIRMADO",
    "USER_AGENT"
  ]]);
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
