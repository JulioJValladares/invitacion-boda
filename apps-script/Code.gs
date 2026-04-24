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
  CUPOS_CONFIRMADOS: 8
};

var ESTADO_PENDIENTE = "PENDIENTE";
var ESTADO_CONFIRMADO = "CONFIRMADO";
var ESTADO_NO_ASISTE = "NO_ASISTE";

function doGet(e) {
  try {
    var action = getParam_(e, "action");
    if (action && action !== "lookup") {
      return jsonResponse_({
        ok: false,
        code: "INVALID_ACTION",
        message: "Accion no valida."
      });
    }

    var id = normalizeId_(getParam_(e, "id"));
    if (!id) {
      return jsonResponse_({
        ok: true,
        exists: false
      });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var invitadosSheet = ss.getSheetByName(SHEET_INVITADOS);
    if (!invitadosSheet) {
      return jsonResponse_({
        ok: false,
        code: "INVITADOS_SHEET_NOT_FOUND",
        message: "No existe la hoja INVITADOS."
      });
    }

    var found = findInvitadoById_(invitadosSheet, id);
    if (!found) {
      return jsonResponse_({
        ok: true,
        exists: false
      });
    }

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
      message: "Error interno en lookup.",
      detail: String(err)
    });
  }
}

function doPost(e) {
  try {
    var action = getParam_(e, "action");
    if (action && action !== "submit") {
      return jsonResponse_({
        ok: false,
        code: "INVALID_ACTION",
        message: "Accion no valida."
      });
    }

    var payload = parsePayload_(e);
    var id = normalizeId_(payload.id);
    var respuesta = normalizeRespuesta_(payload.respuesta);
    var telefono = String(payload.telefono || "").trim();
    var mensaje = String(payload.mensaje || "").trim();
    var cuposConfirmados = parseCuposConfirmados_(payload.cuposConfirmados);
    var userAgent = String(payload.userAgent || "").trim();

    if (!id || !respuesta || !telefono) {
      return jsonResponse_({
        ok: false,
        code: "MISSING_FIELDS",
        message: "Faltan campos requeridos: id, respuesta, telefono."
      });
    }

    if (!isValidPhone_(telefono)) {
      return jsonResponse_({
        ok: false,
        code: "INVALID_PHONE",
        message: "Telefono invalido."
      });
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

    var found = findInvitadoById_(invitadosSheet, id);
    if (!found) {
      return jsonResponse_({
        ok: false,
        code: "INVALID_ID",
        message: "ID no encontrado."
      });
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
    var cuposAsignados = parseCuposAsignados_(found.cupos);
    var cuposParaGuardar = "";

    if (respuesta === "CONFIRMA") {
      if (cuposConfirmados === null) {
        return jsonResponse_({
          ok: false,
          code: "INVALID_CUPOS_CONFIRMADOS",
          message: "Debes indicar cuantos cupos confirmas."
        });
      }

      if (cuposConfirmados < 1) {
        return jsonResponse_({
          ok: false,
          code: "INVALID_CUPOS_CONFIRMADOS",
          message: "Debes confirmar al menos 1 cupo."
        });
      }

      if (cuposConfirmados > cuposAsignados) {
        return jsonResponse_({
          ok: false,
          code: "CUPOS_EXCEEDED",
          message: "La cantidad confirmada no puede superar los cupos asignados."
        });
      }

      cuposParaGuardar = cuposConfirmados;
    } else if (respuesta === "NO_ASISTE") {
      if (cuposConfirmados !== null && cuposConfirmados > cuposAsignados) {
        return jsonResponse_({
          ok: false,
          code: "CUPOS_EXCEEDED",
          message: "La cantidad confirmada no puede superar los cupos asignados."
        });
      }
      cuposParaGuardar = (cuposConfirmados === null) ? 0 : cuposConfirmados;
    }

    var timestamp = new Date();

    invitadosSheet.getRange(found.row, COL.ESTADO).setValue(estadoFinal);
    invitadosSheet.getRange(found.row, COL.TIMESTAMP_CONFIRMACION).setValue(timestamp);
    invitadosSheet.getRange(found.row, COL.TELEFONO_CONFIRMADO).setValue(telefono);
    invitadosSheet.getRange(found.row, COL.MENSAJE_CONFIRMADO).setValue(mensaje);
    invitadosSheet.getRange(found.row, COL.CUPOS_CONFIRMADOS).setValue(cuposParaGuardar);

    logSheet.appendRow([
      timestamp,
      found.id,
      found.nombre,
      found.cupos,
      respuesta,
      cuposParaGuardar,
      telefono,
      mensaje,
      userAgent
    ]);

    return jsonResponse_({
      ok: true,
      id: String(found.id),
      nombre: String(found.nombre || ""),
      cupos: Number(found.cupos || 0),
      cuposConfirmados: cuposParaGuardar,
      estadoFinal: estadoFinal
    });
  } catch (err) {
    return jsonResponse_({
      ok: false,
      code: "SERVER_ERROR",
      message: "Error interno en submit.",
      detail: String(err)
    });
  }
}

function findInvitadoById_(sheet, id) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  var values = sheet.getRange(2, 1, lastRow - 1, COL.CUPOS_CONFIRMADOS).getValues();
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
        estado: String(row[COL.ESTADO - 1] || ESTADO_PENDIENTE).toUpperCase()
      };
    }
  }
  return null;
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

function parseCuposAsignados_(value) {
  var cupos = Number(value);
  if (!isFinite(cupos) || cupos < 0) return 0;
  return Math.floor(cupos);
}

function parseCuposConfirmados_(value) {
  var raw = String(value || "").trim();
  if (!raw) return null;
  var parsed = Number(raw);
  if (!isFinite(parsed)) return null;
  if (Math.floor(parsed) !== parsed) return null;
  return parsed;
}

function isValidPhone_(phone) {
  return /^\+?[0-9()\-\s]{7,20}$/.test(String(phone || "").trim());
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
