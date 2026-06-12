const envelope = document.getElementById("envelope");
const envelopeWrap = document.getElementById("envelopeWrap");
const envelopeSeal = document.getElementById("envelopeSealText");
const invitation = document.getElementById("invitationContent");
const bgMusic = document.getElementById("bgMusic");
const musicWidget = document.getElementById("musicWidget");
const musicToggle = document.getElementById("musicToggle");
const musicNoteIcon = document.querySelector(".music-note-icon");
const musicPanel = document.getElementById("musicPanel");
const playPauseToggle = document.getElementById("playPauseToggle");
const muteToggle = document.getElementById("muteToggle");
const volumeSlider = document.getElementById("volumeSlider");
const musicNotesLayer = document.getElementById("musicNotesLayer");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpGreeting = document.getElementById("rsvpGreeting");
const rsvpCupos = document.getElementById("rsvpCupos");
const rsvpStatus = document.getElementById("rsvpStatus");
const rsvpSubmit = document.getElementById("rsvpSubmit");
const rsvpFormContainer = document.getElementById("rsvpFormContainer");
const rsvpGuestSearch = document.querySelector(".rsvp-guest-search");
const rsvpClosedMessage = document.getElementById("rsvpClosedMessage");
const guestSearchInput = document.getElementById("guestSearchInput");
const guestSearchResults = document.getElementById("guestSearchResults");
const respuestaField = document.getElementById("respuesta");
const telefonoField = document.getElementById("telefono");
const correoField = document.getElementById("correo");
const mensajeField = document.getElementById("mensaje");
const rsvpThankYou = document.getElementById("rsvpThankYou");
const rsvpPostIcon = document.getElementById("rsvpPostIcon");
const rsvpPostTitle = document.getElementById("rsvpPostTitle");
const rsvpPostMessage = document.getElementById("rsvpPostMessage");
const rsvpPostClosing = document.getElementById("rsvpPostClosing");
const rsvpPostUnderline = document.getElementById("rsvpPostUnderline");
const rsvpPostParticles = document.getElementById("rsvpPostParticles");
const momentsTitleEl = document.getElementById("momentsTitle");
const momentsSubtitleEl = document.getElementById("momentsSubtitle");
const momentsCarouselEl = document.getElementById("momentsCarousel");
const momentsTrackEl = document.getElementById("momentsTrack");
const momentsDotsEl = document.getElementById("momentsDots");
const momentsPrevBtn = document.getElementById("momentsPrev");
const momentsNextBtn = document.getElementById("momentsNext");
const momentsLightboxEl = document.getElementById("momentsLightbox");
const momentsLightboxImageEl = document.getElementById("momentsLightboxImage");
const momentsLightboxCaptionEl = document.getElementById("momentsLightboxCaption");
const momentsLightboxCounterEl = document.getElementById("momentsLightboxCounter");
const momentsLightboxCloseBtn = document.getElementById("momentsLightboxClose");
const momentsLightboxPrevBtn = document.getElementById("momentsLightboxPrev");
const momentsLightboxNextBtn = document.getElementById("momentsLightboxNext");
const itineraryTitleEl = document.getElementById("itineraryTitle");
const timelineListEl = document.getElementById("timelineList");
const dresscodeTitleEl = document.getElementById("dresscodeTitle");
const dresscodeTypeEl = document.getElementById("dresscodeType");
const regalosTitleEl = document.getElementById("regalosTitle");
const regalosIntroEl = document.getElementById("regalosIntro");
const regalosCashTextEl = document.getElementById("regalosCashText");
const regalosCashLinkEl = document.getElementById("regalosCashLink");
const regalosBankPanelEl = document.getElementById("regalosBankPanel");
const regalosBankNameEl = document.getElementById("regalosBankName");
const regalosBankNumberEl = document.getElementById("regalosBankNumber");
const regalosNoteEl = document.getElementById("regalosNote");
const venueWazeLinkEl = document.getElementById("venueWazeLink");
const locationModalEl = document.getElementById("locationModal");
const locationModalCloseBtn = document.getElementById("locationModalClose");
const locationModalMapLinkEl = document.getElementById("locationModalMapLink");
const locationModalWazeLinkEl = document.getElementById("locationModalWazeLink");
const sectionModalEl = document.getElementById("sectionModal");
const sectionModalBodyEl = document.getElementById("sectionModalBody");
const sectionModalTitleEl = document.getElementById("sectionModalTitle");
const sectionModalCloseBtn = document.getElementById("sectionModalClose");
const sectionModalOverlayEl = sectionModalEl ? sectionModalEl.querySelector(".section-modal__overlay") : null;
const sectionModalDialogEl = sectionModalEl ? sectionModalEl.querySelector(".section-modal__dialog") : null;
const momentsLightboxOverlayEl = momentsLightboxEl ? momentsLightboxEl.querySelector(".moments-lightbox__overlay") : null;
const momentsLightboxDialogEl = momentsLightboxEl ? momentsLightboxEl.querySelector(".moments-lightbox__dialog") : null;
const bgLayerEl = document.getElementById("bg-layer");
const bgGradientEl = document.getElementById("bg-gradient");
const bgOverlayEl = document.getElementById("bg-overlay");

// Configuracion global editable.
const PLAYER_STATE_KEY = "wedding_music_state_v1";
const DEFAULT_VOLUME = 0.5;
const RSVP_API_URL = "https://script.google.com/macros/s/AKfycbzemF74qu_QD0OPHsfeVT4lD6GCxiwSecDuBuCByJ2J4OROtTTVkhAvFlbZ0I4KIV5A/exec";
const EVENT_DATE = new Date("2026-06-27T17:00:00");
const RSVP_CLOSE_DATE = new Date("2026-06-13T00:00:00");
const RSVP_LOCAL_KEY_PREFIX = "wedding_rsvp_state_v1_";
const FINAL_RSVP_STATES = new Set(["CONFIRMADO", "NO_ASISTE"]);
const GUEST_SEARCH_MIN_LENGTH = 2;
const GUEST_SEARCH_DEBOUNCE_MS = 300;
const GSAP_INSTANCE = window.gsap;
const REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");
let noteAnimationTween = null;
let musicNotesTimer = null;
let currentGuestName = "";
let currentGuestCupos = null;
let currentGuestId = "";
let searchDebounceTimer = null;
let guestSearchRequestId = 0;
// Bloqueo de doble click durante la animacion del sobre.
let isEnvelopeAnimating = false;
let regalosCopyStatusTimer = null;
let lastVolumeBeforeMute = DEFAULT_VOLUME;
let wasPlayingBeforeHidden = false;
let pausedMusicForPageLifecycle = false;
// Ajustar aqui la frecuencia de particulas (en ms, rango min/max).
const FRECUENCIA_PARTICULAS = { min: 300, max: 600 };
// Ajustar aqui el tamano base de particulas.
const TAMANIO_PARTICULAS = 22;
// Ajustar aqui la opacidad inicial de las particulas.
const OPACIDAD_INICIAL = 0.96;
// Ajustar aqui la duracion de la animacion de particulas (segundos).
const DURACION_ANIMACION = 1.8;
// Ajustar aqui la velocidad de animacion de la nota principal (segundos por giro).
const VELOCIDAD_ANIMACION_NOTA = 7.5;
// Ajustar aqui iniciales del sello.
const ENVELOPE_INITIALS = "J&S";
// Editar aqui textos de agradecimiento y cierre "Nos vemos pronto".
const RSVP_POST_CONFIG = {
  closingText: "Nos vemos pronto",
  messages: {
    CONFIRMADO: {
      title: "Gracias {nombre}",
      body: "Nos llena de alegría saber que nos acompañaras en nuestro gran día."
    },
    NO_ASISTE: {
      title: "Gracias {nombre} por avisarnos.",
      body: "Te vamos a extrañar ese día, pero sabemos que nos acompañas de corazón."
    }
  },
  icons: {
    CONFIRMADO: "<svg viewBox='0 0 24 24' width='34' height='34' preserveAspectRatio='xMidYMid meet'><path d='M12 20.5 4.7 13.9a4.6 4.6 0 0 1 6.5-6.5l.8.8.8-.8a4.6 4.6 0 1 1 6.5 6.5z' fill='currentColor'/></svg>",
    NO_ASISTE: "<svg viewBox='0 0 24 24' width='34' height='34' preserveAspectRatio='xMidYMid meet'><path d='M3.2 7.8A2.8 2.8 0 0 1 6 5h12a2.8 2.8 0 0 1 2.8 2.8v8.4A2.8 2.8 0 0 1 18 19H6a2.8 2.8 0 0 1-2.8-2.8zm1.6 0v.5L12 12.8l7.2-4.5v-.5c0-.7-.5-1.2-1.2-1.2H6c-.7 0-1.2.5-1.2 1.2m14.4 2.4-6.8 4.3a.8.8 0 0 1-.8 0L4.8 10.2v6c0 .7.5 1.2 1.2 1.2h12c.7 0 1.2-.5 1.2-1.2z' fill='currentColor'/></svg>"
  }
};
// Editar aqui cantidad/intensidad de particulas del mensaje post-confirmacion.
const RSVP_POST_PARTICLES_CONFIG = {
  count: 8,
  minSize: 4,
  maxSize: 8,
  minOpacity: 0.24,
  maxOpacity: 0.5,
  minDuration: 1.2,
  maxDuration: 1.8
};
// Editar aqui timings de animacion del bloque post-confirmacion.
const RSVP_POST_ANIMATION_TIMINGS = {
  formHideDuration: 0.34,
  postRevealDuration: 0.42,
  iconPopDuration: 0.34,
  underlineDuration: 0.5
};
const INVITATION_INFO_CONFIG = {
  moments: {
    title: "Nuestros Momentos",
    subtitle: "Cada recuerdo nos trajo hasta este para siempre.",
    // Editar aqui el intervalo de auto-rotacion del carrusel (en milisegundos).
    autoRotateIntervalMs: 5000,
    // Editar aqui la duracion de la transicion crossfade (en milisegundos).
    transitionDurationMs: 1300,
    // Editar aqui las imagenes y frases del carrusel.
    slides: [
      {
        src: "assets/icons_carrusel/carrusel1.png",
        alt: "Julio y Sara compartiendo un momento especial",
        caption: "Tu sonrisa siempre sera mi lugar favorito."
      },
      {
        src: "assets/icons_carrusel/carrusel2.png",
        alt: "Julio y Sara celebrando su historia",
        caption: "Dos vidas, una promesa para toda la vida."
      },
      {
        src: "assets/icons_carrusel/carrusel3.png",
        alt: "Julio y Sara en un recuerdo romantico",
        caption: "Contigo, cada atardecer sabe a eternidad."
      },
      {
        src: "assets/icons_carrusel/carrusel4.png",
        alt: "Julio y Sara sonriendo juntos",
        caption: "Lo mas bonito de la vida es caminarla contigo."
      },
      {
        src: "assets/icons_carrusel/carrusel5.png",
        alt: "Julio y Sara compartiendo una mirada",
        caption: "En tus ojos encontre mi hogar."
      },
      {
        src: "assets/icons_carrusel/carrusel6.png",
        alt: "Julio y Sara viviendo un momento feliz",
        caption: "Cada instante contigo se vuelve recuerdo favorito."
      },
      {
        src: "assets/icons_carrusel/carrusel7.jpeg",
        alt: "Julio y Sara abrazados",
        caption: "Nuestro amor es la historia que mas nos gusta contar."
      },
      {
        src: "assets/icons_carrusel/carrusel8.jpeg",
        alt: "Julio y Sara juntos",
        caption: "Y asi, de la mano, elegimos para siempre."
      }
    ]
  },
  itinerary: {
    title: "Itinerario",
    // Editar aqui la lista de eventos del itinerario (agregar, eliminar o reordenar).
    // Cada evento usa una tarjeta principal y una ilustracion decorativa alineada.
    events: [
      { time: "16:30 PM", title: "Llegada de invitados", location: "Deck Caelo", artSrc: "assets/icons/llegada.svg", artAlt: "Ilustracion fotografica" },
      { time: "17:00 PM", title: "Ceremonia", location: "Deck Caelo", artSrc: "assets/icons/ceremonia2.svg", artAlt: "Ilustracion de ceremonia" },
      { time: "18:00 PM", title: "Sesion de Recuerdos", location: "Corredor de Jardin", artSrc: "assets/icons/sesion.svg", artAlt: "Ilustracion de sesion de recuerdos" },
      { time: "19:00 PM", title: "Recepción", location: "Salon Colonial", artSrc: "assets/icons/recepcion.svg", artAlt: "Ilustracion fotografica" },
      { time: "19:30 PM", title: "Cena", location: "Salon Colonial", artSrc: "assets/icons/cena.svg", artAlt: "Ilustracion de cena" },
      { time: "20:30 PM", title: "Primer Baile", location: "Salon Colonial", artSrc: "assets/icons/baile.svg", artAlt: "Ilustracion de baile" }
    ]
  },
  dresscode: {
    // Cambiar aqui el texto del dresscode.
    title: "Dresscode",
    // Cambiar aqui el tipo de vestimenta.
    type: "Formal",
    // Cambiar aqui la descripcion del dresscode.
    description: "Te sugerimos un look formal con tonos neutros, suaves y elegantes."
  },
  regalos: {
    title: "Regalos",
    intro: "El mejor regalo es compartir contigo, pero si deseas darnos un detalle, agradeceremos que sea en efectivo o transferencia",
    // Cambiar aqui el texto principal de regalo en efectivo.
    cashText: "",
    // Cambiar aqui el texto del boton.
    cashGiftCta: "CUENTA BANCARIA",
    // Cambiar aqui el nombre del titular de la cuenta.
    bankAccountName: "Julio Josue Valladares Cardona",
    // Cambiar aqui el numero de cuenta bancaria.
    bankAccountNumber: "0800062317",
    // Cambiar aqui la nota de mesa fisica en el evento.
    note: "Habran sobres disponibles el día del evento para quienes prefieran entregar su regalo en efectivo."
  }
};

const SECTION_MODAL_CONFIG = [
  {
    sectionSelector: "#dresscode",
    title: "Dresscode",
    detailSelectors: [".dresscode-detail-shell"],
    summaryResolver: (section) => section.querySelector("#dresscodeType")?.textContent?.trim() || "",
    originImageSelector: ".dresscode-trigger-icon",
    modalImageSelector: ".dresscode-modal-hero-icon",
    modalBodyClass: "section-modal__body--dresscode-unified"
  },
  {
    sectionSelector: "#regalos",
    title: "Regalos",
    detailSelectors: [".regalos-intro", ".regalos-card"],
    summaryResolver: (section) => section.querySelector("#regalosIntro")?.textContent?.trim() || "",
    originImageSelector: ".regalos-trigger-icon",
    modalImageSelector: ".regalos-modal-hero-icon",
    modalBodyClass: "section-modal__body--regalos-flat",
    modalContentWrapperClass: "regalos-modal-stack",
    unwrapSelectorsInModal: [".regalos-card"]
  }
];

// Modales de detalle de secciones.
function initializeSectionDetailModals() {
  if (!sectionModalEl || !sectionModalBodyEl || !sectionModalTitleEl) return;

  const reduceMotion = REDUCED_MOTION_QUERY.matches;
  let activeModalEntry = null;
  let restoreFocusEl = null;
  let activeOpenTween = null;
  let activeOriginClone = null;

  const clearTransientOpenState = () => {
    if (activeOpenTween) {
      activeOpenTween.kill();
      activeOpenTween = null;
    }
    if (activeOriginClone) {
      activeOriginClone.remove();
      activeOriginClone = null;
    }
  };

  const runDefaultOpenAnimation = () => {
    if (!GSAP_INSTANCE || reduceMotion || !sectionModalOverlayEl || !sectionModalDialogEl) return;
    GSAP_INSTANCE.set(sectionModalOverlayEl, { autoAlpha: 0 });
    GSAP_INSTANCE.set(sectionModalDialogEl, { autoAlpha: 0, scale: 0.97, y: 12, x: 0 });
    GSAP_INSTANCE.to(sectionModalOverlayEl, { autoAlpha: 1, duration: 0.24, ease: "power2.out" });
    GSAP_INSTANCE.to(sectionModalDialogEl, {
      autoAlpha: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.28,
      ease: "power2.out"
    });
  };

  const animateModalFromOrigin = (entry) => {
    if (!GSAP_INSTANCE || reduceMotion || !sectionModalOverlayEl || !sectionModalDialogEl) return false;
    if (!entry.originImageSelector || !entry.modalImageSelector) return false;

    const originEl = entry.section.querySelector(entry.originImageSelector);
    const modalImageEl = sectionModalBodyEl.querySelector(entry.modalImageSelector);
    if (!originEl || !modalImageEl) return false;

    const originRect = originEl.getBoundingClientRect();
    const dialogRect = sectionModalDialogEl.getBoundingClientRect();
    const modalImageRect = modalImageEl.getBoundingClientRect();
    if (!originRect.width || !originRect.height || !dialogRect.width || !dialogRect.height || !modalImageRect.width || !modalImageRect.height) {
      return false;
    }

    clearTransientOpenState();

    const originClone = originEl.cloneNode(true);
    originClone.classList.add("modal-origin-clone");
    originClone.setAttribute("aria-hidden", "true");
    originClone.style.left = `${originRect.left}px`;
    originClone.style.top = `${originRect.top}px`;
    originClone.style.width = `${originRect.width}px`;
    originClone.style.height = `${originRect.height}px`;
    document.body.appendChild(originClone);
    activeOriginClone = originClone;

    const dialogOffsetX = (originRect.left + (originRect.width / 2)) - (dialogRect.left + (dialogRect.width / 2));
    const dialogOffsetY = (originRect.top + (originRect.height / 2)) - (dialogRect.top + (dialogRect.height / 2));

    GSAP_INSTANCE.set(sectionModalOverlayEl, { autoAlpha: 0 });
    GSAP_INSTANCE.set(sectionModalDialogEl, {
      autoAlpha: 0,
      scale: 0.5,
      x: dialogOffsetX,
      y: dialogOffsetY
    });
    GSAP_INSTANCE.set(modalImageEl, { autoAlpha: 0 });

    activeOpenTween = GSAP_INSTANCE.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        GSAP_INSTANCE.set(modalImageEl, { clearProps: "opacity,visibility" });
        if (activeOriginClone) {
          activeOriginClone.remove();
          activeOriginClone = null;
        }
        activeOpenTween = null;
      }
    });

    activeOpenTween
      .to(sectionModalOverlayEl, { autoAlpha: 1, duration: 0.28 }, 0)
      .to(sectionModalDialogEl, {
        autoAlpha: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.68
      }, 0.04)
      .to(originClone, {
        left: modalImageRect.left,
        top: modalImageRect.top,
        width: modalImageRect.width,
        height: modalImageRect.height,
        duration: 0.74,
        ease: "power3.inOut"
      }, 0)
      .to(originClone, { autoAlpha: 0, duration: 0.18 }, 0.58)
      .to(modalImageEl, { autoAlpha: 1, duration: 0.2 }, 0.56);

    return true;
  };

  const closeModal = () => {
    if (!activeModalEntry) return;
    clearTransientOpenState();

    const runClose = () => {
      activeModalEntry.details.forEach((detail) => {
        if (detail.unwrapInModal) {
          detail.movedNodes?.forEach((node) => detail.node.appendChild(node));
          detail.movedNodes = [];
          return;
        }

        if (detail.placeholder.parentNode) {
          detail.placeholder.parentNode.insertBefore(detail.node, detail.placeholder.nextSibling);
        }
      });
      sectionModalBodyEl.innerHTML = "";
      sectionModalBodyEl.className = "section-modal__body";
      sectionModalEl.hidden = true;
      sectionModalEl.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      activeModalEntry = null;
      restoreFocusEl?.focus?.();
      restoreFocusEl = null;
    };

    if (GSAP_INSTANCE && !reduceMotion && sectionModalDialogEl && sectionModalOverlayEl) {
      GSAP_INSTANCE.to(sectionModalDialogEl, {
        autoAlpha: 0,
        scale: 0.97,
        x: 0,
        y: 10,
        duration: 0.22,
        ease: "power2.inOut"
      });
      GSAP_INSTANCE.to(sectionModalOverlayEl, {
        autoAlpha: 0,
        duration: 0.18,
        ease: "power2.out",
        onComplete: runClose
      });
      return;
    }

    runClose();
  };

  const openModal = (entry, triggerBtn) => {
    if (activeModalEntry) closeModal();
    restoreFocusEl = triggerBtn;
    activeModalEntry = entry;

    sectionModalTitleEl.textContent = entry.title;
    sectionModalBodyEl.innerHTML = "";
    sectionModalBodyEl.className = "section-modal__body";
    if (entry.modalBodyClass) {
      sectionModalBodyEl.classList.add(entry.modalBodyClass);
    }
    const contentWrapperEl = entry.modalContentWrapperClass ? document.createElement("div") : null;
    if (contentWrapperEl) {
      contentWrapperEl.className = entry.modalContentWrapperClass;
      sectionModalBodyEl.appendChild(contentWrapperEl);
    }
    const contentTargetEl = contentWrapperEl || sectionModalBodyEl;

    entry.details.forEach((detail) => {
      if (detail.unwrapInModal) {
        detail.movedNodes = Array.from(detail.node.children);
        detail.movedNodes.forEach((node) => contentTargetEl.appendChild(node));
        return;
      }

      contentTargetEl.appendChild(detail.node);
    });

    sectionModalEl.hidden = false;
    sectionModalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (GSAP_INSTANCE && !reduceMotion) {
      window.requestAnimationFrame(() => {
        if (!animateModalFromOrigin(entry)) {
          runDefaultOpenAnimation();
        }
      });
    }
  };

  const modalEntries = SECTION_MODAL_CONFIG.map((config) => {
    const section = document.querySelector(config.sectionSelector);
    if (!section) return null;

    const details = config.detailSelectors
      .map((selector) => section.querySelector(selector))
      .filter(Boolean)
      .map((node, index) => {
        const selector = config.detailSelectors[index];
        const placeholder = document.createComment("modal-detail-return");
        node.parentNode?.insertBefore(placeholder, node);
        node.classList.add("modal-detail-source");
        return {
          node,
          placeholder,
          unwrapInModal: Array.isArray(config.unwrapSelectorsInModal) && config.unwrapSelectorsInModal.includes(selector),
          movedNodes: []
        };
      });

    if (!details.length) return null;

    const summaryText = config.summaryResolver(section);
    if (summaryText) {
      const summaryEl = document.createElement("p");
      summaryEl.className = "section-summary";
      summaryEl.textContent = summaryText;
      section.appendChild(summaryEl);
    }

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "btn-secondary section-details-btn";
    trigger.textContent = "Ver detalles";
    trigger.addEventListener("click", () => openModal(entryRef, trigger));
    section.appendChild(trigger);

    const entryRef = {
      title: config.title,
      section,
      details,
      modalBodyClass: config.modalBodyClass,
      modalContentWrapperClass: config.modalContentWrapperClass,
      originImageSelector: config.originImageSelector,
      modalImageSelector: config.modalImageSelector
    };
    return entryRef;
  }).filter(Boolean);

  sectionModalEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.matches("[data-modal-close]")) {
      closeModal();
    }
  });

  sectionModalCloseBtn?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sectionModalEl.hidden) {
      closeModal();
    }
  });

  if (!modalEntries.length) return;
}

// Modal de ubicacion.
function initializeLocationModal() {
  if (!venueWazeLinkEl || !locationModalEl || !locationModalCloseBtn || !locationModalMapLinkEl || !locationModalWazeLinkEl) return;

  const wazeUrl = venueWazeLinkEl.getAttribute("href") || "";
  let restoreFocusEl = null;
  let previousBodyOverflow = "";

  locationModalMapLinkEl.href = wazeUrl;
  locationModalWazeLinkEl.href = wazeUrl;

  const openLocationModal = (event) => {
    event?.preventDefault();
    restoreFocusEl = event?.currentTarget instanceof HTMLElement ? event.currentTarget : document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    locationModalEl.hidden = false;
    locationModalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (GSAP_INSTANCE && !REDUCED_MOTION_QUERY.matches) {
      const overlayEl = locationModalEl.querySelector(".location-modal__overlay");
      const dialogEl = locationModalEl.querySelector(".location-modal__dialog");
      GSAP_INSTANCE.set([overlayEl, dialogEl], { autoAlpha: 0 });
      GSAP_INSTANCE.set(dialogEl, { y: 18, scale: 0.97 });
      GSAP_INSTANCE.to(overlayEl, { autoAlpha: 1, duration: 0.22, ease: "power2.out" });
      GSAP_INSTANCE.to(dialogEl, { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    }

    locationModalCloseBtn.focus?.();
  };

  const closeLocationModal = () => {
    if (locationModalEl.hidden) return;

    const finishClose = () => {
      locationModalEl.hidden = true;
      locationModalEl.setAttribute("aria-hidden", "true");
      document.body.style.overflow = previousBodyOverflow;
      restoreFocusEl?.focus?.();
      restoreFocusEl = null;
    };

    if (GSAP_INSTANCE && !REDUCED_MOTION_QUERY.matches) {
      const overlayEl = locationModalEl.querySelector(".location-modal__overlay");
      const dialogEl = locationModalEl.querySelector(".location-modal__dialog");
      GSAP_INSTANCE.to(dialogEl, { autoAlpha: 0, y: 12, scale: 0.98, duration: 0.2, ease: "power2.inOut" });
      GSAP_INSTANCE.to(overlayEl, { autoAlpha: 0, duration: 0.18, ease: "power2.out", onComplete: finishClose });
      return;
    }

    finishClose();
  };

  venueWazeLinkEl.addEventListener("click", openLocationModal);
  locationModalCloseBtn.addEventListener("click", closeLocationModal);
  locationModalEl.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.matches("[data-location-modal-close]")) {
      closeLocationModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !locationModalEl.hidden) {
      closeLocationModal();
    }
  });
}

// Animaciones de entrada.
function initializeSectionRevealAnimations() {
  const sections = Array.from(document.querySelectorAll(".reveal-section"));
  if (!sections.length) return;

  const revealPlan = [
    [".reveal-section", "reveal-up"],
    [".section-icon-img, .camera-icon-wrap", "reveal-scale"],
    [".kicker, .hero-names, .section-title", "reveal-up reveal-title"],
    [".hero-quote, .section-subtitle, .section-text, .section-summary, .ceremony-month, .ceremony-date-row, .hero-date-line, .location-line, .parking-section__text", "reveal-up"],
    [".countdown > div", "reveal-scale"],
    [".moments-carousel, .dresscode-detail-shell, .regalos-card, .rsvp-guest-search, #rsvpFormContainer, .rsvp-post", "reveal-up"],
    [".itinerary-row--left .itinerary-card, .itinerary-row--right .itinerary-art", "reveal-left"],
    [".itinerary-row--right .itinerary-card, .itinerary-row--left .itinerary-art", "reveal-right"],
    [".dresscode-color-chip, .regalos-bank-panel__content, .rsvp-search-results", "reveal-scale"],
    [".btn-primary, .btn-secondary, .action-btn, .section-details-btn, .waze-btn", "reveal-up"],
    [".rsvp-form > *", "reveal-up"]
  ];

  const revealItems = [];
  const addRevealItem = (element, variantClasses) => {
    if (!(element instanceof Element)) return;
    element.classList.add("reveal", ...variantClasses.split(" ").filter(Boolean));
    revealItems.push(element);
  };

  revealPlan.forEach(([selector, variantClasses]) => {
    document.querySelectorAll(selector).forEach((element) => addRevealItem(element, variantClasses));
  });

  const staggerGroups = [
    [".hero-section", ".kicker, .hero-names, .hero-quote"],
    [".hero-date-section", ".section-icon-img, .ceremony-title, .ceremony-month, .ceremony-date-row, .hero-date-line"],
    [".countdown-section", ".section-icon-img, .section-title, .countdown > div"],
    [".moments-section", ".camera-icon-wrap, .section-title, .section-subtitle, .moments-carousel"],
    [".venue-section", ".section-icon-img, .section-title, .location-line, .waze-btn"],
    [".regalos-section", ".section-icon-img, .section-title, .section-summary, .section-details-btn"],
    [".dresscode-section", ".section-icon-img, .section-title, .section-summary, .section-details-btn"],
    [".rsvp-section", ".section-icon-img, .section-title, .rsvp-guest-search, .section-text, #rsvpFormContainer, .rsvp-form > *"]
  ];

  staggerGroups.forEach(([scopeSelector, itemSelector]) => {
    document.querySelectorAll(scopeSelector).forEach((scope) => {
      scope.querySelectorAll(itemSelector).forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${Math.min(index * 110, 660)}ms`);
      });
    });
  });

  document.querySelectorAll(".itinerary-row").forEach((row, rowIndex) => {
    row.querySelectorAll(".itinerary-card, .itinerary-art").forEach((element, itemIndex) => {
      element.style.setProperty("--reveal-delay", `${Math.min((rowIndex * 80) + (itemIndex * 90), 720)}ms`);
    });
  });

  if (REDUCED_MOTION_QUERY.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((element) => element.classList.add("reveal-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  Array.from(new Set(revealItems)).forEach((element) => observer.observe(element));
}

// Carrusel y lightbox de momentos.
function initializeMomentsCarousel(momentsConfig) {
  if (!momentsTrackEl || !momentsDotsEl || !momentsCarouselEl) return;

  const slides = Array.isArray(momentsConfig.slides) ? momentsConfig.slides : [];
  if (!slides.length) return;

  const isReducedMotion = REDUCED_MOTION_QUERY.matches;
  const rotateInterval = Math.max(2500, Number(momentsConfig.autoRotateIntervalMs) || 5000);
  const transitionMs = Math.max(400, Number(momentsConfig.transitionDurationMs) || 1300);

  momentsCarouselEl.style.setProperty("--moments-transition-ms", `${transitionMs}ms`);
  momentsTrackEl.innerHTML = "";
  momentsDotsEl.innerHTML = "";

  slides.forEach((slide, index) => {
    const article = document.createElement("article");
    article.className = "moment-slide";
    article.setAttribute("aria-hidden", "true");
    article.dataset.index = String(index);

    const image = document.createElement("img");
    image.className = "moment-image";
    image.src = slide.src;
    image.alt = slide.alt || "Momento romantico";
    image.loading = index === 0 ? "eager" : "lazy";
    image.decoding = "async";

    const zoomTrigger = document.createElement("button");
    zoomTrigger.className = "moment-zoom-trigger";
    zoomTrigger.type = "button";
    zoomTrigger.setAttribute("aria-label", `Ampliar imagen ${index + 1} de ${slides.length}`);

    const zoomTriggerText = document.createElement("span");
    zoomTriggerText.className = "sr-only";
    zoomTriggerText.textContent = `Ver en grande: ${slide.alt || "Momento romantico"}`;
    zoomTrigger.appendChild(zoomTriggerText);

    const zoomBadge = document.createElement("span");
    zoomBadge.className = "moment-zoom-badge";
    zoomBadge.setAttribute("aria-hidden", "true");
    zoomBadge.textContent = "Ampliar";

    const caption = document.createElement("p");
    caption.className = "moment-caption";
    caption.textContent = slide.caption || "";

    article.append(image, zoomTrigger, zoomBadge, caption);
    momentsTrackEl.appendChild(article);

    const dot = document.createElement("button");
    dot.className = "moment-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a imagen ${index + 1}`);
    dot.dataset.index = String(index);
    momentsDotsEl.appendChild(dot);
  });

  const slideElements = Array.from(momentsTrackEl.querySelectorAll(".moment-slide"));
  const dotElements = Array.from(momentsDotsEl.querySelectorAll(".moment-dot"));
  if (slideElements.length < 2) {
    if (momentsPrevBtn) momentsPrevBtn.hidden = true;
    if (momentsNextBtn) momentsNextBtn.hidden = true;
    if (momentsDotsEl) momentsDotsEl.hidden = true;
  } else {
    if (momentsPrevBtn) momentsPrevBtn.hidden = false;
    if (momentsNextBtn) momentsNextBtn.hidden = false;
    if (momentsDotsEl) momentsDotsEl.hidden = false;
  }
  let currentIndex = 0;
  let autoTimer = null;
  let resumeTimer = null;
  let touchStartX = 0;
  let isLightboxOpen = false;
  let lightboxIndex = 0;
  let restoreLightboxFocusEl = null;
  let lightboxTouchStartX = 0;
  let activeLightboxOpenTween = null;
  let activeLightboxSwapTween = null;
  let activeLightboxOriginClone = null;

  const restoreBodyScrollState = () => {
    const shouldLockScroll =
      (sectionModalEl && !sectionModalEl.hidden) ||
      (momentsLightboxEl && !momentsLightboxEl.hidden);
    document.body.style.overflow = shouldLockScroll ? "hidden" : "";
  };

  const clearLightboxTransientState = () => {
    if (activeLightboxOpenTween) {
      activeLightboxOpenTween.kill();
      activeLightboxOpenTween = null;
    }

    if (activeLightboxSwapTween) {
      activeLightboxSwapTween.kill();
      activeLightboxSwapTween = null;
    }

    if (activeLightboxOriginClone) {
      activeLightboxOriginClone.remove();
      activeLightboxOriginClone = null;
    }
  };

  function setActiveSlide(nextIndex) {
    currentIndex = (nextIndex + slideElements.length) % slideElements.length;

    slideElements.forEach((slideEl, index) => {
      const isActive = index === currentIndex;
      slideEl.classList.toggle("is-active", isActive);
      slideEl.setAttribute("aria-hidden", String(!isActive));
    });

    dotElements.forEach((dotEl, index) => {
      const isActive = index === currentIndex;
      dotEl.classList.toggle("is-active", isActive);
      dotEl.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function stopAutoRotation() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function startAutoRotation() {
    if (isReducedMotion || slideElements.length < 2) return;
    stopAutoRotation();
    autoTimer = setInterval(() => {
      setActiveSlide(currentIndex + 1);
    }, rotateInterval);
  }

  function pauseAndResumeAutoRotation() {
    stopAutoRotation();
    if (resumeTimer) clearTimeout(resumeTimer);
    if (isReducedMotion || slideElements.length < 2 || isLightboxOpen) return;

    resumeTimer = setTimeout(() => {
      startAutoRotation();
    }, rotateInterval);
  }

  function applyLightboxSlide(index) {
    if (!momentsLightboxImageEl || !momentsLightboxCaptionEl || !momentsLightboxCounterEl) return;

    const normalizedIndex = (index + slides.length) % slides.length;
    const slide = slides[normalizedIndex];
    lightboxIndex = normalizedIndex;
    setActiveSlide(normalizedIndex);
    momentsLightboxImageEl.src = slide.src;
    momentsLightboxImageEl.alt = slide.alt || "Momento romantico";
    momentsLightboxCaptionEl.textContent = slide.caption || "";
    momentsLightboxCounterEl.textContent = `Imagen ${normalizedIndex + 1} de ${slides.length}`;

    if (momentsLightboxPrevBtn) {
      momentsLightboxPrevBtn.hidden = slides.length < 2;
      momentsLightboxPrevBtn.disabled = slides.length < 2;
    }

    if (momentsLightboxNextBtn) {
      momentsLightboxNextBtn.hidden = slides.length < 2;
      momentsLightboxNextBtn.disabled = slides.length < 2;
    }
  }

  function updateLightboxSlide(index, options = {}) {
    const { animate = false, direction = 1 } = options;

    if (!animate || !GSAP_INSTANCE || isReducedMotion || !momentsLightboxImageEl || !momentsLightboxCaptionEl || !momentsLightboxCounterEl) {
      applyLightboxSlide(index);
      return;
    }

    activeLightboxSwapTween?.kill();

    const targets = [momentsLightboxImageEl, momentsLightboxCaptionEl, momentsLightboxCounterEl];
    const offset = direction >= 0 ? 18 : -18;

    activeLightboxSwapTween = GSAP_INSTANCE.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        activeLightboxSwapTween = null;
      }
    });

    activeLightboxSwapTween
      .to(targets, {
        autoAlpha: 0,
        x: -offset,
        duration: 0.16,
        stagger: 0.02,
        ease: "power1.in"
      })
      .add(() => {
        applyLightboxSlide(index);
        GSAP_INSTANCE.set(targets, { x: offset });
      })
      .to(targets, {
        autoAlpha: 1,
        x: 0,
        duration: 0.24,
        stagger: 0.02
      });
  }

  function animateLightboxOpen(originImageEl) {
    if (!momentsLightboxEl || !momentsLightboxOverlayEl || !momentsLightboxDialogEl || !momentsLightboxImageEl) return;

    if (!GSAP_INSTANCE || isReducedMotion || !originImageEl) {
      if (GSAP_INSTANCE) {
        GSAP_INSTANCE.set(momentsLightboxOverlayEl, { autoAlpha: 0 });
        GSAP_INSTANCE.set(momentsLightboxDialogEl, { autoAlpha: 0, scale: 0.96, y: 16 });
        GSAP_INSTANCE.to(momentsLightboxOverlayEl, { autoAlpha: 1, duration: 0.22, ease: "power2.out" });
        GSAP_INSTANCE.to(momentsLightboxDialogEl, { autoAlpha: 1, scale: 1, y: 0, duration: 0.28, ease: "power2.out" });
      }
      return;
    }

    const originRect = originImageEl.getBoundingClientRect();
    const targetRect = momentsLightboxImageEl.getBoundingClientRect();

    if (!originRect.width || !originRect.height || !targetRect.width || !targetRect.height) {
      GSAP_INSTANCE.set(momentsLightboxOverlayEl, { autoAlpha: 0 });
      GSAP_INSTANCE.set(momentsLightboxDialogEl, { autoAlpha: 0, scale: 0.96, y: 16 });
      GSAP_INSTANCE.to(momentsLightboxOverlayEl, { autoAlpha: 1, duration: 0.22, ease: "power2.out" });
      GSAP_INSTANCE.to(momentsLightboxDialogEl, { autoAlpha: 1, scale: 1, y: 0, duration: 0.28, ease: "power2.out" });
      return;
    }

    clearLightboxTransientState();

    const originClone = originImageEl.cloneNode(true);
    originClone.classList.add("moments-lightbox-origin-clone");
    originClone.setAttribute("aria-hidden", "true");
    originClone.style.left = `${originRect.left}px`;
    originClone.style.top = `${originRect.top}px`;
    originClone.style.width = `${originRect.width}px`;
    originClone.style.height = `${originRect.height}px`;
    document.body.appendChild(originClone);
    activeLightboxOriginClone = originClone;

    GSAP_INSTANCE.set(momentsLightboxOverlayEl, { autoAlpha: 0 });
    GSAP_INSTANCE.set(momentsLightboxDialogEl, { autoAlpha: 0, scale: 1, x: 0, y: 0 });
    GSAP_INSTANCE.set(momentsLightboxImageEl, { autoAlpha: 0 });

    activeLightboxOpenTween = GSAP_INSTANCE.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        GSAP_INSTANCE.set(momentsLightboxImageEl, { clearProps: "opacity,visibility" });
        activeLightboxOriginClone?.remove();
        activeLightboxOriginClone = null;
        activeLightboxOpenTween = null;
      }
    });

    activeLightboxOpenTween
      .to(momentsLightboxOverlayEl, { autoAlpha: 1, duration: 0.24 }, 0)
      .to(momentsLightboxDialogEl, { autoAlpha: 1, duration: 0.28 }, 0.08)
      .to(originClone, {
        left: targetRect.left,
        top: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        borderRadius: 24,
        duration: 0.48,
        ease: "power3.inOut"
      }, 0)
      .to(originClone, { autoAlpha: 0, duration: 0.14 }, 0.4)
      .to(momentsLightboxImageEl, { autoAlpha: 1, duration: 0.18 }, 0.36);
  }

  function openLightbox(triggerEl) {
    if (!momentsLightboxEl || !momentsLightboxImageEl) return;

    isLightboxOpen = true;
    restoreLightboxFocusEl = triggerEl || document.activeElement;
    if (resumeTimer) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
    stopAutoRotation();

    applyLightboxSlide(currentIndex);
    momentsLightboxEl.hidden = false;
    momentsLightboxEl.setAttribute("aria-hidden", "false");
    restoreBodyScrollState();

    requestAnimationFrame(() => {
      const originImageEl = slideElements[currentIndex]?.querySelector(".moment-image");
      animateLightboxOpen(originImageEl);
      momentsLightboxCloseBtn?.focus();
    });
  }

  function closeLightbox() {
    if (!momentsLightboxEl || momentsLightboxEl.hidden) return;

    clearLightboxTransientState();

    const finalizeClose = () => {
      momentsLightboxEl.hidden = true;
      momentsLightboxEl.setAttribute("aria-hidden", "true");
      if (GSAP_INSTANCE && momentsLightboxOverlayEl && momentsLightboxDialogEl) {
        GSAP_INSTANCE.set([momentsLightboxOverlayEl, momentsLightboxDialogEl], { clearProps: "opacity,visibility,transform" });
      }
      restoreBodyScrollState();
      isLightboxOpen = false;
      restoreLightboxFocusEl?.focus?.();
      restoreLightboxFocusEl = null;
      pauseAndResumeAutoRotation();
    };

    if (!GSAP_INSTANCE || isReducedMotion || !momentsLightboxOverlayEl || !momentsLightboxDialogEl) {
      finalizeClose();
      return;
    }

    GSAP_INSTANCE.timeline({ onComplete: finalizeClose })
      .to(momentsLightboxDialogEl, { autoAlpha: 0, scale: 0.97, y: 18, duration: 0.2, ease: "power2.in" }, 0)
      .to(momentsLightboxOverlayEl, { autoAlpha: 0, duration: 0.18, ease: "power2.in" }, 0);
  }

  function navigateLightbox(step) {
    if (!isLightboxOpen) return;
    updateLightboxSlide(lightboxIndex + step, { animate: true, direction: step });
  }

  momentsPrevBtn?.addEventListener("click", () => {
    setActiveSlide(currentIndex - 1);
    pauseAndResumeAutoRotation();
  });

  momentsNextBtn?.addEventListener("click", () => {
    setActiveSlide(currentIndex + 1);
    pauseAndResumeAutoRotation();
  });

  dotElements.forEach((dotEl) => {
    dotEl.addEventListener("click", () => {
      const nextIndex = Number(dotEl.dataset.index);
      setActiveSlide(nextIndex);
      pauseAndResumeAutoRotation();
    });
  });

  slideElements.forEach((slideEl, index) => {
    const zoomTriggerEl = slideEl.querySelector(".moment-zoom-trigger");
    zoomTriggerEl?.addEventListener("click", () => {
      setActiveSlide(index);
      openLightbox(zoomTriggerEl);
    });
  });

  momentsCarouselEl.addEventListener("mouseenter", stopAutoRotation);
  momentsCarouselEl.addEventListener("mouseleave", pauseAndResumeAutoRotation);
  momentsCarouselEl.addEventListener("click", pauseAndResumeAutoRotation);
  momentsCarouselEl.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stopAutoRotation();
  }, { passive: true });
  momentsCarouselEl.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 45) {
      if (swipeDistance > 0) {
        setActiveSlide(currentIndex - 1);
      } else {
        setActiveSlide(currentIndex + 1);
      }
    }

    pauseAndResumeAutoRotation();
  }, { passive: true });

  momentsLightboxOverlayEl?.addEventListener("click", closeLightbox);
  momentsLightboxCloseBtn?.addEventListener("click", closeLightbox);
  momentsLightboxPrevBtn?.addEventListener("click", () => navigateLightbox(-1));
  momentsLightboxNextBtn?.addEventListener("click", () => navigateLightbox(1));

  momentsLightboxDialogEl?.addEventListener("touchstart", (event) => {
    lightboxTouchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  momentsLightboxDialogEl?.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - lightboxTouchStartX;

    if (Math.abs(swipeDistance) <= 45) return;
    if (swipeDistance > 0) {
      navigateLightbox(-1);
    } else {
      navigateLightbox(1);
    }
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (!isLightboxOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigateLightbox(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigateLightbox(1);
    }
  });

  setActiveSlide(0);
  if (!isReducedMotion) {
    startAutoRotation();
  }
}

// Render de secciones configurables.
function createItineraryCard(eventInfo) {
  const card = document.createElement("article");
  card.className = "itinerary-card";

  const time = document.createElement("p");
  time.className = "itinerary-card__time";
  time.textContent = eventInfo.time || "";

  const title = document.createElement("h3");
  title.className = "itinerary-card__title";
  title.textContent = eventInfo.title || "";

  const location = document.createElement("p");
  location.className = "itinerary-card__location";
  location.textContent = eventInfo.location || "";

  card.append(time, title, location);
  return card;
}

function createItineraryArt(eventInfo) {
  const artWrap = document.createElement("div");
  artWrap.className = "itinerary-art";

  const art = document.createElement("img");
  art.className = "itinerary-art__image";
  art.src = eventInfo.artSrc || "assets/icons/fotos.svg";
  art.alt = eventInfo.artAlt || "";
  art.loading = "lazy";

  artWrap.appendChild(art);
  return artWrap;
}

function createItineraryRow(eventInfo, index) {
  const row = document.createElement("li");
  const isLeftAligned = index % 2 === 0;
  row.className = `itinerary-row ${isLeftAligned ? "itinerary-row--left" : "itinerary-row--right"}`;

  const mainSide = document.createElement("div");
  mainSide.className = "itinerary-row__side itinerary-row__side--main";
  mainSide.appendChild(createItineraryCard(eventInfo));

  const axis = document.createElement("div");
  axis.className = "itinerary-row__axis";
  axis.setAttribute("aria-hidden", "true");

  const marker = document.createElement("span");
  marker.className = "itinerary-marker";

  const markerFill = document.createElement("span");
  markerFill.className = "itinerary-marker__fill";

  marker.appendChild(markerFill);
  axis.appendChild(marker);

  const artSide = document.createElement("div");
  artSide.className = "itinerary-row__side itinerary-row__side--art";
  artSide.appendChild(createItineraryArt(eventInfo));

  if (isLeftAligned) {
    row.append(mainSide, axis, artSide);
  } else {
    row.append(artSide, axis, mainSide);
  }

  return row;
}

function setNodeText(node, value) {
  if (node) node.textContent = value;
}

function renderMomentsSection(moments) {
  setNodeText(momentsTitleEl, moments.title);
  setNodeText(momentsSubtitleEl, moments.subtitle);
  initializeMomentsCarousel(moments);
}

function renderItinerarySection(itinerary) {
  setNodeText(itineraryTitleEl, itinerary.title);
  if (!timelineListEl) return;

  timelineListEl.innerHTML = "";
  const itineraryRows = itinerary.events.map((eventInfo, index) => createItineraryRow(eventInfo, index));
  itineraryRows.forEach((row) => timelineListEl.appendChild(row));
  initializeItineraryScrollProgress();
}

function renderDresscodeSection(dresscode) {
  setNodeText(dresscodeTitleEl, dresscode.title);
  setNodeText(dresscodeTypeEl, dresscode.type);
}

function renderRegalosSection(regalos) {
  setNodeText(regalosTitleEl, regalos.title);
  setNodeText(regalosIntroEl, regalos.intro);
  setNodeText(regalosCashTextEl, regalos.cashText);
  if (regalosCashTextEl) {
    regalosCashTextEl.hidden = !regalos.cashText?.trim();
  }
  setNodeText(regalosCashLinkEl, regalos.cashGiftCta);
  setNodeText(regalosBankNameEl, regalos.bankAccountName);
  setNodeText(regalosBankNumberEl, regalos.bankAccountNumber);
  setNodeText(regalosNoteEl, regalos.note);
  initializeRegalosBankPanel();
  initializeRegalosCopyActions();
  setRegalosCopyStatus("");
}

// Efectos visuales y reproductor de musica.
function initializeCameraIconAnimation() {
  const cameraIconEl = document.querySelector(".camera-icon");
  const cameraFocusRingEl = document.querySelector(".camera-focus-ring");
  const cameraSheenEl = document.querySelector(".camera-sheen");
  const animatedIconEls = [
    ".hero-date-section > .section-icon-img",
    ".countdown-section > .section-icon-img",
    ".venue-section > .section-icon-img",
    ".regalos-section > .section-icon-img",
    ".dresscode-section > .section-icon-img",
    "#rsvpSection > .section-icon-img",
    ".camera-icon"
  ]
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);

  if (!animatedIconEls.length || !cameraFocusRingEl || !cameraSheenEl || !GSAP_INSTANCE) return;

  const animatedIconTargets = Array.from(new Set(animatedIconEls));
  const cameraEffectsReady = Boolean(cameraIconEl && cameraFocusRingEl && cameraSheenEl);

  let nextShotCall = null;
  let activeShotTween = null;

  const clearAnimation = () => {
    if (nextShotCall) {
      nextShotCall.kill();
      nextShotCall = null;
    }
    if (activeShotTween) {
      activeShotTween.kill();
      activeShotTween = null;
    }
    GSAP_INSTANCE.killTweensOf([...animatedIconTargets, cameraFocusRingEl, cameraSheenEl]);
    GSAP_INSTANCE.set(animatedIconTargets, { scale: 1, transformOrigin: "50% 50%" });
    if (cameraEffectsReady) {
      GSAP_INSTANCE.set(cameraFocusRingEl, { autoAlpha: 0, scale: 0.85 });
      GSAP_INSTANCE.set(cameraSheenEl, { autoAlpha: 0, xPercent: -120 });
    }
  };

  const scheduleNextShot = () => {
    const delay = 1.5 + (Math.random() * 1.5);
    nextShotCall = GSAP_INSTANCE.delayedCall(delay, runShot);
  };

  const runShot = () => {
    if (REDUCED_MOTION_QUERY.matches) return;

    activeShotTween = GSAP_INSTANCE.timeline({
      onComplete: () => {
        activeShotTween = null;
        scheduleNextShot();
      }
    });

    activeShotTween
      .to(animatedIconTargets, { scale: 1.03, duration: 0.22, ease: "power2.out" }, 0)
      .to(animatedIconTargets, { scale: 1, duration: 0.23, ease: "power2.out" }, 0.22);

    if (cameraEffectsReady) {
      activeShotTween
        .fromTo(
          cameraFocusRingEl,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 0.25, scale: 1.15, duration: 0.7, ease: "power2.out" },
          0.02
        )
        .to(cameraFocusRingEl, { autoAlpha: 0, duration: 0.22, ease: "power2.in" }, 0.5)
        .fromTo(
          cameraSheenEl,
          { autoAlpha: 0, xPercent: -120 },
          { autoAlpha: 0.14, xPercent: 120, duration: 0.6, ease: "power2.out" },
          0.04
        )
        .to(cameraSheenEl, { autoAlpha: 0, duration: 0.14, ease: "power2.in" }, 0.5);
    }
  };

  const syncWithMotionPreference = () => {
    clearAnimation();
    if (REDUCED_MOTION_QUERY.matches) return;
    scheduleNextShot();
  };

  syncWithMotionPreference();
  if (typeof REDUCED_MOTION_QUERY.addEventListener === "function") {
    REDUCED_MOTION_QUERY.addEventListener("change", syncWithMotionPreference);
  } else if (typeof REDUCED_MOTION_QUERY.addListener === "function") {
    REDUCED_MOTION_QUERY.addListener(syncWithMotionPreference);
  }
}

function clampVolume(value) {
  return Math.min(1, Math.max(0, value));
}

function setMusicPanelOpen(isOpen) {
  if (!musicPanel || !musicToggle) return;
  musicToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    musicPanel.hidden = false;
    musicPanel.classList.add("is-open");
    if (GSAP_INSTANCE && !REDUCED_MOTION_QUERY.matches) {
      GSAP_INSTANCE.killTweensOf(musicPanel);
      GSAP_INSTANCE.fromTo(
        musicPanel,
        { autoAlpha: 0, scale: 0.94, y: 8 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    }
    return;
  }

  if (GSAP_INSTANCE && !REDUCED_MOTION_QUERY.matches) {
    GSAP_INSTANCE.killTweensOf(musicPanel);
    GSAP_INSTANCE.to(musicPanel, {
      autoAlpha: 0,
      scale: 0.94,
      y: 8,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        musicPanel.classList.remove("is-open");
        musicPanel.hidden = true;
      }
    });
    return;
  }

  musicPanel.classList.remove("is-open");
  musicPanel.hidden = true;
}

function stopMusicNotes() {
  if (musicNotesTimer) {
    clearTimeout(musicNotesTimer);
    musicNotesTimer = null;
  }
}

function spawnMusicNote() {
  if (!musicNotesLayer || !musicToggle || !GSAP_INSTANCE || REDUCED_MOTION_QUERY.matches) return;

  const note = document.createElement("span");
  note.className = "music-note";
  note.textContent = "♫";
  note.style.fontSize = `${TAMANIO_PARTICULAS}px`;
  musicNotesLayer.appendChild(note);

  const rect = musicToggle.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const driftX = (Math.random() - 0.5) * 52;
  const travelY = 58 + Math.random() * 40;
  const initialScale = 0.9 + Math.random() * 0.35;
  const endScale = initialScale + 0.25 + Math.random() * 0.2;
  const duration = DURACION_ANIMACION + (Math.random() * 0.45 - 0.2);

  GSAP_INSTANCE.fromTo(
    note,
    {
      x: centerX,
      y: centerY,
      opacity: OPACIDAD_INICIAL,
      rotate: -10 + Math.random() * 20,
      scale: initialScale
    },
    {
      x: centerX + driftX,
      y: centerY - travelY,
      opacity: 0,
      rotate: -24 + Math.random() * 48,
      scale: endScale,
      duration: Math.max(1.2, duration),
      ease: "power1.out",
      onComplete: () => {
        note.remove();
      }
    }
  );
}

function startMusicNotesIfNeeded() {
  if (!bgMusic) return;

  const shouldRun = !bgMusic.paused && !REDUCED_MOTION_QUERY.matches && Boolean(GSAP_INSTANCE);
  if (!shouldRun) {
    stopMusicNotes();
    return;
  }

  if (musicNotesTimer) return;
  spawnMusicNote();
  const scheduleNextNote = () => {
    if (musicNotesTimer) clearTimeout(musicNotesTimer);
    if (bgMusic.paused) {
      musicNotesTimer = null;
      return;
    }
    spawnMusicNote();
    const interval = FRECUENCIA_PARTICULAS.min + Math.random() * (FRECUENCIA_PARTICULAS.max - FRECUENCIA_PARTICULAS.min);
    musicNotesTimer = setTimeout(scheduleNextNote, interval);
  };
  const firstInterval = FRECUENCIA_PARTICULAS.min + Math.random() * (FRECUENCIA_PARTICULAS.max - FRECUENCIA_PARTICULAS.min);
  musicNotesTimer = setTimeout(scheduleNextNote, firstInterval);
}

function syncVinylAnimation() {
  if (!musicToggle || !musicNoteIcon || !bgMusic) return;

  if (!GSAP_INSTANCE || REDUCED_MOTION_QUERY.matches) {
    if (noteAnimationTween) {
      noteAnimationTween.kill();
      noteAnimationTween = null;
    }
    startMusicNotesIfNeeded();
    return;
  }

  if (!noteAnimationTween) {
    noteAnimationTween = GSAP_INSTANCE.to(musicNoteIcon, {
      rotation: 360,
      repeat: -1,
      ease: "none",
      duration: VELOCIDAD_ANIMACION_NOTA,
      transformOrigin: "50% 50%",
      paused: true
    });
  }

  if (!bgMusic.paused) {
    noteAnimationTween.play();
  } else {
    noteAnimationTween.pause();
  }

  startMusicNotesIfNeeded();
}

function initializeBackgroundEffects() {
  if (!bgLayerEl || !bgGradientEl || !bgOverlayEl) return;

  bgLayerEl.style.transform = "translate3d(0, 0, 0)";
  bgLayerEl.style.filter = "none";
  bgGradientEl.style.transform = "translate3d(0, 0, 0)";
  bgGradientEl.style.opacity = "0.12";
  bgOverlayEl.style.background = "transparent";
  bgOverlayEl.style.opacity = "0";
}

function initializeItineraryScrollProgress() {
  if (!timelineListEl) return;

  let rafId = null;

  function clamp01(value) {
    if (!Number.isFinite(value)) return 0;
    return Math.min(1, Math.max(0, value));
  }

  function updateProgress() {
    rafId = null;
    const markers = Array.from(timelineListEl.querySelectorAll(".itinerary-marker"));
    if (!markers.length) return;

    const listRect = timelineListEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    const start = viewportHeight * 0.86;
    const end = viewportHeight * 0.14;
    const travel = Math.max(1, listRect.height + (start - end));
    const progress = clamp01((start - listRect.top) / travel);
    const fillHeightPx = listRect.height * progress;

    timelineListEl.style.setProperty("--itinerary-line-progress", progress.toFixed(4));

    markers.forEach((markerEl) => {
      const markerRect = markerEl.getBoundingClientRect();
      const markerCenterInList = (markerRect.top - listRect.top) + (markerRect.height / 2);
      const markerFill = markerRect.height
        ? clamp01((fillHeightPx - (markerCenterInList - (markerRect.height / 2))) / markerRect.height)
        : 0;
      markerEl.style.setProperty("--itinerary-marker-progress", markerFill.toFixed(4));
    });
  }

  function queueUpdate() {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(updateProgress);
  }

  if (timelineListEl.dataset.progressReady !== "true") {
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate, { passive: true });
    timelineListEl.dataset.progressReady = "true";
  }

  queueUpdate();
}

function setRegalosBankPanelOpen(isOpen) {
  if (!regalosCashLinkEl || !regalosBankPanelEl) return;

  regalosCashLinkEl.classList.toggle("is-open", isOpen);
  regalosCashLinkEl.setAttribute("aria-expanded", String(isOpen));
  regalosBankPanelEl.classList.toggle("is-open", isOpen);
  regalosBankPanelEl.setAttribute("aria-hidden", String(!isOpen));
}

function setRegalosCopyStatus(message, type = "") {
  const statusEl = document.getElementById("regalosCopyStatus");
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.classList.remove("is-success", "is-error");
  if (type) statusEl.classList.add(type);

  if (regalosCopyStatusTimer) {
    window.clearTimeout(regalosCopyStatusTimer);
    regalosCopyStatusTimer = null;
  }

  if (message) {
    regalosCopyStatusTimer = window.setTimeout(() => {
      const nextStatusEl = document.getElementById("regalosCopyStatus");
      if (!nextStatusEl) return;
      nextStatusEl.textContent = "";
      nextStatusEl.classList.remove("is-success", "is-error");
    }, 2200);
  }
}

function copyTextFallback(text) {
  try {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(temp);
    return copied;
  } catch {
    return false;
  }
}

async function copyTextToClipboard(text) {
  if (!text) return false;

  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback a execCommand cuando clipboard API falle.
  }

  return copyTextFallback(text);
}

function initializeRegalosCopyActions() {
  if (!regalosBankPanelEl) return;
  const panelContentEl = regalosBankPanelEl.querySelector(".regalos-bank-panel__content");
  if (!panelContentEl) return;

  const copyTargets = [
    { element: regalosBankNameEl, label: "Nombre" },
    { element: regalosBankNumberEl, label: "Numero de cuenta" }
  ];

  copyTargets.forEach(({ element, label }) => {
    if (!element || !element.id) return;

    let groupEl = element.closest(".regalos-bank-copy-group");
    if (!groupEl) {
      groupEl = document.createElement("span");
      groupEl.className = "regalos-bank-copy-group";
      element.insertAdjacentElement("afterend", groupEl);
      groupEl.appendChild(element);
    } else if (!groupEl.contains(element)) {
      groupEl.prepend(element);
    }

    const selector = `.regalos-copy-btn[data-copy-target="${element.id}"]`;
    let copyBtnEl = groupEl.querySelector(selector);
    if (!copyBtnEl) {
      copyBtnEl = document.createElement("button");
      copyBtnEl.type = "button";
      copyBtnEl.className = "regalos-copy-btn";
      copyBtnEl.dataset.copyTarget = element.id;
      copyBtnEl.dataset.copyLabel = label;
      copyBtnEl.textContent = "Copiar";
      groupEl.appendChild(copyBtnEl);
    }
  });

  if (!panelContentEl.querySelector("#regalosCopyStatus")) {
    const statusEl = document.createElement("p");
    statusEl.id = "regalosCopyStatus";
    statusEl.className = "copy-status regalos-copy-status";
    statusEl.setAttribute("aria-live", "polite");
    panelContentEl.appendChild(statusEl);
  }

  if (regalosBankPanelEl.dataset.copyReady === "true") return;

  regalosBankPanelEl.addEventListener("click", async (event) => {
    const copyBtnEl = event.target.closest(".regalos-copy-btn");
    if (!copyBtnEl) return;

    const targetId = copyBtnEl.dataset.copyTarget || "";
    const label = copyBtnEl.dataset.copyLabel || "Dato";
    const targetEl = document.getElementById(targetId);
    const textToCopy = targetEl?.textContent?.trim() || "";

    if (!textToCopy) {
      setRegalosCopyStatus(`${label} no disponible para copiar.`, "is-error");
      return;
    }

    const copied = await copyTextToClipboard(textToCopy);
    if (copied) {
      setRegalosCopyStatus(`${label} copiado.`, "is-success");
    } else {
      setRegalosCopyStatus(`No se pudo copiar ${label.toLowerCase()}.`, "is-error");
    }
  });

  regalosBankPanelEl.dataset.copyReady = "true";
}

function initializeRegalosBankPanel() {
  if (!regalosCashLinkEl || !regalosBankPanelEl) return;
  if (regalosCashLinkEl.dataset.toggleReady === "true") return;

  setRegalosBankPanelOpen(false);

  regalosCashLinkEl.addEventListener("click", () => {
    const isCurrentlyOpen = regalosCashLinkEl.getAttribute("aria-expanded") === "true";
    setRegalosBankPanelOpen(!isCurrentlyOpen);
  });

  regalosCashLinkEl.dataset.toggleReady = "true";
}

function initializeInvitationInfo() {
  const { moments, itinerary, dresscode, regalos } = INVITATION_INFO_CONFIG;

  renderMomentsSection(moments);
  renderItinerarySection(itinerary);
  renderDresscodeSection(dresscode);
  renderRegalosSection(regalos);
}

function loadPlayerState() {
  const fallback = {
    volume: DEFAULT_VOLUME,
    isMuted: false,
    isPaused: true,
    lastVolume: DEFAULT_VOLUME
  };

  try {
    const raw = localStorage.getItem(PLAYER_STATE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      volume: clampVolume(Number(parsed.volume ?? DEFAULT_VOLUME)),
      isMuted: Boolean(parsed.isMuted),
      isPaused: Boolean(parsed.isPaused),
      lastVolume: clampVolume(Number(parsed.lastVolume ?? DEFAULT_VOLUME))
    };
  } catch {
    return fallback;
  }
}

function savePlayerState() {
  if (!bgMusic) return;

  try {
    localStorage.setItem(
      PLAYER_STATE_KEY,
      JSON.stringify({
        volume: bgMusic.volume,
        isMuted: bgMusic.muted,
        isPaused: bgMusic.paused,
        lastVolume: lastVolumeBeforeMute
      })
    );
  } catch {
    // Almacenamiento no disponible: no se interrumpe la experiencia.
  }
}

async function safePlayMusic() {
  if (!bgMusic) return;

  try {
    await bgMusic.play();
  } catch {
    // Fallo silencioso por politicas de autoplay u otros motivos.
  } finally {
    updatePlayerUI();
    savePlayerState();
  }
}

function isPageVisibleToUser() {
  const hasDocumentFocus = typeof document.hasFocus !== "function" || document.hasFocus();
  return !document.hidden && hasDocumentFocus;
}

function pauseMusicForHiddenPage() {
  if (!bgMusic) return;

  if (pausedMusicForPageLifecycle) return;

  wasPlayingBeforeHidden = !bgMusic.paused;
  if (!wasPlayingBeforeHidden) return;

  pausedMusicForPageLifecycle = true;
  bgMusic.pause();
  updatePlayerUI();
  savePlayerState();
}

function resumeMusicForVisiblePage() {
  if (!bgMusic || !isPageVisibleToUser()) return;

  const shouldResume = pausedMusicForPageLifecycle && wasPlayingBeforeHidden;
  pausedMusicForPageLifecycle = false;
  wasPlayingBeforeHidden = false;

  if (!shouldResume) return;

  safePlayMusic();
}

function handleMusicVisibilityChange() {
  if (document.hidden) {
    pauseMusicForHiddenPage();
    return;
  }

  resumeMusicForVisiblePage();
}

function updatePlayerUI() {
  if (!bgMusic || !musicToggle || !muteToggle || !volumeSlider) return;

  musicToggle.classList.toggle("is-playing", !bgMusic.paused);
  musicToggle.classList.toggle("is-paused", bgMusic.paused);
  musicToggle.classList.toggle("is-muted", bgMusic.muted);
  if (playPauseToggle) {
    playPauseToggle.textContent = bgMusic.paused ? "Play" : "Pause";
  }
  muteToggle.textContent = bgMusic.muted ? "Unmute" : "Mute";
  volumeSlider.value = String(Math.round(bgMusic.volume * 100));
  syncVinylAnimation();
}

function startEnvelopeOpeningSequence() {
  if (!envelope || !invitation || isEnvelopeAnimating) return;
  if (envelope.classList.contains("is-open")) return;
  isEnvelopeAnimating = true;
  envelope.classList.add("is-open");
  if (envelopeWrap) {
    envelopeWrap.classList.add("is-opened");
  }
  envelope.setAttribute("aria-expanded", "true");
  invitation.hidden = false;

  // Inicio de musica: mismo click que abre el sobre.
  if (bgMusic?.paused) {
    safePlayMusic();
  }

  // Oculta el sobre ya abierto para que no quede visible sobre el contenido.
  window.setTimeout(() => {
    envelope.hidden = true;
    // Fuerza siempre el inicio de la pagina al abrir el contenido (desktop y mobile).
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, 2300);

  window.setTimeout(() => {
    isEnvelopeAnimating = false;
  }, 2500);
}

function initializeEnvelopeOpening() {
  if (!envelope) return;

  envelope.addEventListener("click", (event) => {
    event.preventDefault();
    startEnvelopeOpeningSequence();
  });
}

function initializeMusicPlayer() {
  if (!bgMusic || !musicToggle || !muteToggle || !volumeSlider) return;

  const initialState = loadPlayerState();
  lastVolumeBeforeMute = initialState.lastVolume > 0 ? initialState.lastVolume : DEFAULT_VOLUME;

  bgMusic.volume = initialState.volume;
  bgMusic.muted = initialState.isMuted;
  volumeSlider.value = String(Math.round(initialState.volume * 100));
  updatePlayerUI();

  musicToggle.addEventListener("click", () => {
    const isOpen = !musicPanel?.hidden;
    setMusicPanelOpen(!isOpen);
  });

  playPauseToggle?.addEventListener("click", () => {
    if (bgMusic.paused) {
      safePlayMusic();
    } else {
      bgMusic.pause();
      updatePlayerUI();
      savePlayerState();
    }
  });

  musicPanel?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  musicWidget?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (!musicWidget || !musicPanel) return;
    if (musicPanel.hidden) return;
    if (musicWidget.contains(event.target)) return;
    setMusicPanelOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setMusicPanelOpen(false);
  });

  muteToggle.addEventListener("click", () => {
    if (bgMusic.muted) {
      bgMusic.muted = false;
      const restoredVolume = lastVolumeBeforeMute > 0 ? lastVolumeBeforeMute : DEFAULT_VOLUME;
      bgMusic.volume = clampVolume(restoredVolume);
    } else {
      if (bgMusic.volume > 0) {
        lastVolumeBeforeMute = bgMusic.volume;
      }
      bgMusic.muted = true;
    }

    updatePlayerUI();
    savePlayerState();
  });

  volumeSlider.addEventListener("input", (event) => {
    const percent = Number(event.target.value);
    const nextVolume = clampVolume(percent / 100);
    bgMusic.volume = nextVolume;

    if (nextVolume > 0) {
      lastVolumeBeforeMute = nextVolume;
      bgMusic.muted = false;
    } else {
      bgMusic.muted = true;
    }

    updatePlayerUI();
    savePlayerState();
  });

  bgMusic.addEventListener("play", () => {
    updatePlayerUI();
    savePlayerState();
  });

  bgMusic.addEventListener("pause", () => {
    stopMusicNotes();
    updatePlayerUI();
    savePlayerState();
  });

  document.addEventListener("visibilitychange", handleMusicVisibilityChange);
  window.addEventListener("pagehide", pauseMusicForHiddenPage);
  window.addEventListener("pageshow", resumeMusicForVisiblePage);
  window.addEventListener("blur", pauseMusicForHiddenPage);
  window.addEventListener("focus", resumeMusicForVisiblePage);
}

// RSVP y busqueda de invitados.
function getGuestIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const rawId = (params.get("id") || "").trim();
  return rawId;
}

function getRsvpStorageKey(guestId) {
  return `${RSVP_LOCAL_KEY_PREFIX}${guestId}`;
}

function writeLocalRsvpState(guestId, state) {
  if (!guestId) return;

  try {
    localStorage.setItem(getRsvpStorageKey(guestId), JSON.stringify(state));
  } catch {
    // Sin almacenamiento disponible: no romper experiencia.
  }
}

function setRsvpStatus(message, type = "") {
  if (!rsvpStatus) return;

  rsvpStatus.textContent = message;
  rsvpStatus.className = "rsvp-status";
  if (type) {
    rsvpStatus.classList.add(type);
  }
}

function setRsvpIdentity(name, cupos) {
  const parsedCupos = Number(cupos);
  currentGuestCupos = Number.isFinite(parsedCupos) ? parsedCupos : null;
  currentGuestName = name || currentGuestName || "";
  if (rsvpGreeting) rsvpGreeting.textContent = name ? `Hola, ${name}` : "Hola";
  if (rsvpCupos) rsvpCupos.textContent = `Cupos asignados: ${cupos ?? "CUPOS"}`;
}

function clearRsvpIdentity() {
  currentGuestName = "";
  currentGuestCupos = null;
  if (rsvpGreeting) rsvpGreeting.textContent = "Hola";
  if (rsvpCupos) rsvpCupos.textContent = "Cupos asignados: -";
}

function isRsvpPeriodClosed(referenceDate = new Date()) {
  if (!(referenceDate instanceof Date) || Number.isNaN(referenceDate.getTime())) return false;
  if (!(RSVP_CLOSE_DATE instanceof Date) || Number.isNaN(RSVP_CLOSE_DATE.getTime())) return false;
  return referenceDate >= RSVP_CLOSE_DATE;
}

function setRsvpElementHidden(element, hidden) {
  if (!element) return;
  element.hidden = hidden;
}

function showRsvpClosedMessage() {
  setRsvpElementHidden(rsvpClosedMessage, false);
  setRsvpElementHidden(rsvpGuestSearch, true);
  setRsvpElementHidden(rsvpGreeting, true);
  setRsvpElementHidden(rsvpCupos, true);
  clearGuestSearchResults();
  hideRsvpThankYou();
  hideRsvpFormContainer(false);
  setRsvpFormInteractivity(false, true);
  if (guestSearchInput) guestSearchInput.disabled = true;
  setRsvpStatus("", "");
}

function hideRsvpClosedMessage() {
  setRsvpElementHidden(rsvpClosedMessage, true);
  setRsvpElementHidden(rsvpGuestSearch, false);
  setRsvpElementHidden(rsvpGreeting, false);
  setRsvpElementHidden(rsvpCupos, false);
  if (guestSearchInput) guestSearchInput.disabled = false;
}

function normalizeSearchInputValue(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/Ñ/g, "__ENIE__")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/__ENIE__/g, "Ñ")
    .replace(/[^A-ZÑ\s]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeSearchText(value) {
  return normalizeSearchInputValue(value).trim();
}

function applyGuestSearchInputNormalization() {
  if (!guestSearchInput) return "";

  const rawValue = guestSearchInput.value;
  const selectionStart = guestSearchInput.selectionStart;
  const selectionEnd = guestSearchInput.selectionEnd;
  const normalizedValue = normalizeSearchInputValue(rawValue);

  if (rawValue !== normalizedValue) {
    guestSearchInput.value = normalizedValue;

    if (selectionStart !== null && selectionEnd !== null) {
      const lengthDelta = normalizedValue.length - rawValue.length;
      const nextStart = Math.max(0, selectionStart + lengthDelta);
      const nextEnd = Math.max(0, selectionEnd + lengthDelta);
      guestSearchInput.setSelectionRange(nextStart, nextEnd);
    }
  }

  return normalizedValue;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());
}

function updateCorreoRequiredByRespuesta() {
  if (!correoField || !respuestaField) return;
  correoField.required = respuestaField.value === "CONFIRMA";
}

function clearGuestSearchResults() {
  if (!guestSearchResults) return;
  guestSearchResults.innerHTML = "";
}

function renderGuestSearchState(message, type = "") {
  if (!guestSearchResults) return;
  clearGuestSearchResults();

  const state = document.createElement("div");
  state.className = "rsvp-search-state";
  if (type) state.classList.add(`rsvp-search-state--${type}`);
  state.setAttribute("role", type === "error" ? "alert" : "status");
  state.setAttribute("aria-live", "polite");

  if (type === "loading") {
    const spinner = document.createElement("span");
    spinner.className = "rsvp-search-spinner";
    spinner.setAttribute("aria-hidden", "true");
    state.appendChild(spinner);
  }

  const text = document.createElement("span");
  text.textContent = message;
  state.appendChild(text);
  guestSearchResults.appendChild(state);
}

function renderGuestSearchLoading() {
  renderGuestSearchState("Buscando coincidencias...", "loading");
}

function renderGuestSearchEmpty() {
  renderGuestSearchState("No se encontraron invitados con ese nombre.", "empty");
}

function renderGuestSearchError() {
  renderGuestSearchState("No pudimos buscar en este momento. Intenta de nuevo.", "error");
}

function renderGuestSearchResults(results) {
  if (!guestSearchResults) return;
  clearGuestSearchResults();

  results.forEach((guest) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "rsvp-search-item";
    button.setAttribute("role", "option");

    const nameEl = document.createElement("span");
    nameEl.textContent = guest.nombre || "";

    const detailEl = document.createElement("small");
    detailEl.textContent = `Cupos: ${guest.cupos} · Estado: ${guest.estado}`;

    button.append(nameEl, detailEl);
    button.addEventListener("click", () => {
      if (isRsvpPeriodClosed()) {
        showRsvpClosedMessage();
        return;
      }

      currentGuestId = String(guest.id || "").trim();
      guestSearchRequestId += 1;
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = null;
      }
      if (guestSearchInput) {
        guestSearchInput.value = normalizeSearchInputValue(guest.nombre || "");
      }
      setRsvpIdentity(guest.nombre, guest.cupos);
      clearGuestSearchResults();

      if (FINAL_RSVP_STATES.has(guest.estado)) {
        lockRsvpFromServerState(currentGuestId, guest.estado, "Tu respuesta ya fue registrada. Gracias.", {
          guestName: guest.nombre,
          guestCupos: guest.cupos,
          celebrate: false,
          animateForm: false
        });
        return;
      }

      hideRsvpThankYou();
      showRsvpFormContainer();
      setRsvpFormInteractivity(true, false);
      setRsvpStatus("Completa el formulario para confirmar.", "ok");
    });
    guestSearchResults.appendChild(button);
  });
}

function getRsvpPostContent(estado, name) {
  const safeName = (name || currentGuestName || "invitado").trim();
  const template = RSVP_POST_CONFIG.messages[estado] || RSVP_POST_CONFIG.messages.CONFIRMADO;
  const icon = RSVP_POST_CONFIG.icons[estado] || RSVP_POST_CONFIG.icons.CONFIRMADO;

  return {
    title: template.title.replace("{nombre}", safeName),
    body: template.body,
    icon
  };
}

function triggerRsvpPostParticles() {
  if (!rsvpPostParticles || !GSAP_INSTANCE || REDUCED_MOTION_QUERY.matches) return;

  for (let index = 0; index < RSVP_POST_PARTICLES_CONFIG.count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "rsvp-post-particle";
    const size = RSVP_POST_PARTICLES_CONFIG.minSize + Math.random() * (RSVP_POST_PARTICLES_CONFIG.maxSize - RSVP_POST_PARTICLES_CONFIG.minSize);
    const startX = 45 + Math.random() * 10;
    const driftX = -26 + Math.random() * 52;
    const riseY = 10 + Math.random() * 24;
    const duration = RSVP_POST_PARTICLES_CONFIG.minDuration + Math.random() * (RSVP_POST_PARTICLES_CONFIG.maxDuration - RSVP_POST_PARTICLES_CONFIG.minDuration);

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}%`;
    particle.style.bottom = "22%";
    rsvpPostParticles.appendChild(particle);

    GSAP_INSTANCE.fromTo(
      particle,
      {
        x: 0,
        y: 0,
        opacity: RSVP_POST_PARTICLES_CONFIG.minOpacity + Math.random() * (RSVP_POST_PARTICLES_CONFIG.maxOpacity - RSVP_POST_PARTICLES_CONFIG.minOpacity),
        scale: 0.8 + Math.random() * 0.5
      },
      {
        x: driftX,
        y: -riseY,
        opacity: 0,
        duration,
        ease: "power1.out",
        onComplete: () => {
          particle.remove();
        }
      }
    );
  }
}

function revealRsvpPostConfirmation(estado, guestName, options = {}) {
  if (!rsvpThankYou || !rsvpPostTitle || !rsvpPostMessage || !rsvpPostIcon || !rsvpPostClosing) return;

  const { celebrate = false, animated = true } = options;
  const content = getRsvpPostContent(estado, guestName);
  rsvpThankYou.dataset.state = estado;
  rsvpPostIcon.innerHTML = content.icon;
  rsvpPostTitle.textContent = content.title;
  rsvpPostMessage.textContent = content.body;
  rsvpPostClosing.textContent = RSVP_POST_CONFIG.closingText;
  if (rsvpPostUnderline) {
    rsvpPostUnderline.style.transform = "scaleX(0)";
  }

  rsvpThankYou.hidden = false;
  rsvpThankYou.style.display = "block";
  rsvpStatus.textContent = "";

  if (!animated || !GSAP_INSTANCE || REDUCED_MOTION_QUERY.matches) {
    rsvpThankYou.classList.add("is-visible");
    if (rsvpPostUnderline) rsvpPostUnderline.style.transform = "scaleX(1)";
    return;
  }

  GSAP_INSTANCE.killTweensOf(rsvpThankYou);
  GSAP_INSTANCE.set(rsvpThankYou, { autoAlpha: 0, scale: 0.98, y: 10 });
  GSAP_INSTANCE.to(rsvpThankYou, {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    duration: RSVP_POST_ANIMATION_TIMINGS.postRevealDuration,
    ease: "power2.out"
  });

  GSAP_INSTANCE.fromTo(
    rsvpPostIcon,
    { autoAlpha: 0, scale: 0.9 },
    {
      autoAlpha: 1,
      scale: 1,
      duration: RSVP_POST_ANIMATION_TIMINGS.iconPopDuration,
      delay: 0.1,
      ease: "power2.out"
    }
  );

  if (rsvpPostUnderline) {
    GSAP_INSTANCE.fromTo(
      rsvpPostUnderline,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: RSVP_POST_ANIMATION_TIMINGS.underlineDuration,
        delay: 0.22,
        ease: "power2.inOut"
      }
    );
  }

  if (celebrate) {
    triggerRsvpPostParticles();
  }
}

function setRsvpFormInteractivity(enabled, hideSubmit = false) {
  const elements = [respuestaField, telefonoField, correoField, mensajeField];
  elements.forEach((el) => {
    if (el) el.disabled = !enabled;
  });
  if (guestSearchInput) guestSearchInput.disabled = false;
  rsvpForm?.classList.toggle("is-disabled", !enabled);
  if (rsvpSubmit) {
    rsvpSubmit.disabled = !enabled;
    rsvpSubmit.hidden = Boolean(hideSubmit);
  }
}

function showRsvpFormContainer() {
  if (!rsvpFormContainer) return;
  rsvpFormContainer.hidden = false;
  rsvpFormContainer.style.display = "block";
  rsvpFormContainer.style.opacity = "";
  rsvpFormContainer.style.transform = "";
}

function hideRsvpFormContainer(animated = false, onComplete) {
  if (!rsvpFormContainer) {
    if (onComplete) onComplete();
    return;
  }

  if (!animated || !GSAP_INSTANCE || REDUCED_MOTION_QUERY.matches) {
    rsvpFormContainer.hidden = true;
    rsvpFormContainer.style.display = "none";
    rsvpFormContainer.style.opacity = "";
    rsvpFormContainer.style.transform = "";
    if (onComplete) onComplete();
    return;
  }

  GSAP_INSTANCE.killTweensOf(rsvpFormContainer);
  GSAP_INSTANCE.to(rsvpFormContainer, {
    autoAlpha: 0,
    y: 10,
    duration: RSVP_POST_ANIMATION_TIMINGS.formHideDuration,
    ease: "power2.inOut",
    onComplete: () => {
      rsvpFormContainer.hidden = true;
      rsvpFormContainer.style.display = "none";
      rsvpFormContainer.style.opacity = "";
      rsvpFormContainer.style.transform = "";
      if (onComplete) onComplete();
    }
  });
}

function hideRsvpThankYou() {
  if (!rsvpThankYou) return;
  rsvpThankYou.hidden = true;
  rsvpThankYou.style.display = "none";
  rsvpThankYou.classList.remove("is-visible");
}

function renderRSVPState(state) {
  const {
    estado,
    nombre = currentGuestName,
    cupos,
    celebrate = false,
    animateTransition = false
  } = state;

  setRsvpIdentity(nombre, cupos);
  const isFinal = FINAL_RSVP_STATES.has(estado);

  if (!isFinal) {
    hideRsvpThankYou();
    showRsvpFormContainer();
    setRsvpFormInteractivity(true, false);
    return;
  }

  setRsvpFormInteractivity(false, true);
  hideRsvpFormContainer(animateTransition, () => {
    revealRsvpPostConfirmation(estado, nombre, {
      celebrate,
      animated: animateTransition || celebrate
    });
  });
}

function isValidPhone(phone) {
  return /^\+?[0-9()\-\s]{7,20}$/.test(phone);
}

async function lookupGuest(guestId) {
  const query = new URLSearchParams({ action: "lookup", id: guestId });
  const response = await fetch(`${RSVP_API_URL}?${query.toString()}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("No fue posible consultar el invitado.");
  }

  return response.json();
}

async function searchGuestsByName(nombre) {
  const query = new URLSearchParams({ action: "searchByName", nombre });
  const response = await fetch(`${RSVP_API_URL}?${query.toString()}`, {
    method: "GET"
  });

  if (!response.ok) {
    throw new Error("No fue posible buscar invitados.");
  }

  return response.json();
}

async function submitRsvp(payload) {
  if (isRsvpPeriodClosed()) {
    return {
      ok: false,
      code: "RSVP_CLOSED",
      message: "El periodo de confirmación de asistencia ha finalizado."
    };
  }

  const body = new URLSearchParams({
    action: "submit",
    id: payload.id,
    respuesta: payload.respuesta,
    telefono: payload.telefono,
    correo: payload.correo || "",
    mensaje: payload.mensaje || "",
    userAgent: payload.userAgent || ""
  });

  const response = await fetch(RSVP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: body.toString()
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar la confirmacion.");
  }

  return response.json();
}

function lockRsvpFromServerState(guestId, finalState, finalMessage, options = {}) {
  const { guestName = currentGuestName, guestCupos = null, celebrate = false, animateForm = false } = options;
  renderRSVPState({
    estado: finalState,
    nombre: guestName,
    cupos: guestCupos,
    celebrate,
    animateTransition: animateForm
  });
  const statusText = finalMessage || "Tu respuesta ya fue registrada. Gracias.";
  setRsvpStatus(statusText, "ok");
  setRsvpStatus("", "");
  writeLocalRsvpState(guestId, {
    confirmed: true,
    estado: finalState,
    nombre: guestName || "",
    cupos: guestCupos,
    updatedAt: new Date().toISOString()
  });
}

async function initializeRsvp() {
  if (!rsvpForm || !rsvpStatus || !rsvpGreeting || !rsvpCupos || !rsvpSubmit || !respuestaField || !telefonoField || !correoField || !mensajeField) {
    return;
  }

  if (isRsvpPeriodClosed()) {
    showRsvpClosedMessage();
    return;
  }

  const guestIdFromUrl = getGuestIdFromUrl();
  hideRsvpClosedMessage();
  hideRsvpThankYou();
  showRsvpFormContainer();
  setRsvpFormInteractivity(false, false);
  updateCorreoRequiredByRespuesta();
  setRsvpStatus("Busca y selecciona tu nombre para confirmar asistencia.", "warn");

  if (guestSearchInput) {
    guestSearchInput.addEventListener("input", async () => {
      if (isRsvpPeriodClosed()) {
        showRsvpClosedMessage();
        return;
      }

      const requestId = guestSearchRequestId + 1;
      guestSearchRequestId = requestId;
      currentGuestId = "";
      clearRsvpIdentity();
      setRsvpFormInteractivity(false, false);

      const normalizedInput = applyGuestSearchInputNormalization();
      const searchTerm = normalizeSearchText(normalizedInput);
      clearGuestSearchResults();

      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }

      if (searchTerm.length < GUEST_SEARCH_MIN_LENGTH) return;
      renderGuestSearchLoading();

      searchDebounceTimer = setTimeout(async () => {
        if (requestId !== guestSearchRequestId) return;

        try {
          const data = await searchGuestsByName(searchTerm);
          if (requestId !== guestSearchRequestId || normalizeSearchText(guestSearchInput.value) !== searchTerm) return;

          const results = Array.isArray(data.results) ? data.results : [];
          if (!results.length) {
            renderGuestSearchEmpty();
            return;
          }

          renderGuestSearchResults(results);
        } catch {
          if (requestId !== guestSearchRequestId) return;
          renderGuestSearchError();
        }
      }, GUEST_SEARCH_DEBOUNCE_MS);
    });
  }

  if (guestIdFromUrl) {
    try {
      const data = await lookupGuest(guestIdFromUrl);
      if (data && data.exists) {
        currentGuestId = String(data.id || guestIdFromUrl).trim();
        setRsvpIdentity(data.nombre, data.cupos);
        if (guestSearchInput) guestSearchInput.value = normalizeSearchInputValue(data.nombre || "");

        if (FINAL_RSVP_STATES.has(data.estado)) {
          lockRsvpFromServerState(currentGuestId, data.estado, "Tu respuesta ya fue registrada. Gracias.", {
            guestName: data.nombre || "",
            guestCupos: data.cupos,
            celebrate: false,
            animateForm: false
          });
        } else {
          setRsvpFormInteractivity(true, false);
          setRsvpStatus("Invitado identificado. Completa el formulario para confirmar.", "ok");
        }
      }
    } catch {
      setRsvpStatus("No pudimos precargar el invitado por ID. Usa el buscador.", "warn");
    }
  }

  rsvpForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isRsvpPeriodClosed()) {
      showRsvpClosedMessage();
      return;
    }

    const telefono = telefonoField.value.trim();
    const correo = correoField.value.trim();
    const respuesta = respuestaField.value;
    const mensaje = mensajeField.value.trim();

    if (!currentGuestId) {
      setRsvpStatus("Debes buscar y seleccionar tu nombre antes de enviar.", "error");
      return;
    }

    if (!telefono) {
      setRsvpStatus("El telefono es obligatorio.", "error");
      return;
    }

    if (!isValidPhone(telefono)) {
      setRsvpStatus("Ingresa un telefono valido.", "error");
      return;
    }

    if (respuesta === "CONFIRMA" && !correo) {
      setRsvpStatus("El correo es obligatorio para confirmar asistencia.", "error");
      return;
    }

    if (correo && !isValidEmail(correo)) {
      setRsvpStatus("Ingresa un correo electronico valido.", "error");
      return;
    }

    rsvpSubmit.disabled = true;
    setRsvpStatus("Enviando confirmacion...", "warn");

    try {
      const result = await submitRsvp({
        id: currentGuestId,
        respuesta,
        telefono,
        correo,
        mensaje,
        userAgent: navigator.userAgent || ""
      });

      if (!result.ok) {
        if (result.code === "RSVP_CLOSED") {
          showRsvpClosedMessage();
          return;
        }

        if (result.code === "ALREADY_SUBMITTED" && FINAL_RSVP_STATES.has(result.estado)) {
          lockRsvpFromServerState(currentGuestId, result.estado, "Tu respuesta ya fue registrada. Gracias.", {
            guestName: currentGuestName,
            guestCupos: currentGuestCupos,
            celebrate: false,
            animateForm: true
          });
          return;
        }

        setRsvpStatus(result.message || "No fue posible registrar la respuesta.", "error");
        rsvpSubmit.disabled = false;
        return;
      }

      lockRsvpFromServerState(currentGuestId, result.estadoFinal, "Tu respuesta fue registrada con exito. Gracias.", {
        guestName: currentGuestName || result.nombre || "",
        guestCupos: currentGuestCupos,
        celebrate: true,
        animateForm: true
      });
    } catch {
      rsvpSubmit.disabled = false;
      setRsvpStatus("No se pudo enviar por un problema de red. Intenta nuevamente.", "error");
    }
  });

  if (respuestaField) {
    respuestaField.addEventListener("change", updateCorreoRequiredByRespuesta);
  }
}

// Contador e inicializacion general.
const countdownEl = document.getElementById("countdown");
const eventDayMessageEl = document.getElementById("eventDayMessage");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function getLocalDayStart(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isEventDayOrLater(referenceDate = new Date()) {
  const eventDayStart = getLocalDayStart(EVENT_DATE);
  const currentDayStart = getLocalDayStart(referenceDate);
  if (!eventDayStart || !currentDayStart) return false;
  return currentDayStart >= eventDayStart;
}

function setEventDayCountdownMode(isEventDay) {
  if (countdownEl) countdownEl.hidden = isEventDay;
  if (eventDayMessageEl) eventDayMessageEl.hidden = !isEventDay;
}

function updateCountdown() {
  const now = new Date();
  const isEventDay = isEventDayOrLater(now);
  setEventDayCountdownMode(isEventDay);

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  if (isEventDay) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "0";
    minutesEl.textContent = "0";
    secondsEl.textContent = "0";
    return;
  }

  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(remainingSeconds).padStart(2, "0");
}

function initializeCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

function initializeApp() {
  if (invitation) {
    invitation.hidden = true;
  }
  if (envelopeSeal) {
    envelopeSeal.textContent = ENVELOPE_INITIALS;
  }

  initializeBackgroundEffects();
  initializeInvitationInfo();
  initializeCameraIconAnimation();
  initializeLocationModal();
  initializeSectionDetailModals();
  initializeEnvelopeOpening();
  initializeMusicPlayer();
  initializeCountdown();
  void initializeRsvp();
  initializeSectionRevealAnimations();
}

initializeApp();
