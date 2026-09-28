/**
 * Tenfold Events – mobile-first landing page
 * ------------------------------------------------------------
 * Setup (once):   npm install bootstrap
 * Files:          src/App.jsx  +  src/App.css
 * Images:         put your images in  public/images/  (see the CONTENT section
 *                 below – every image path is defined in ONE place, so you only
 *                 need to rename the paths there).
 *
 * Later you can split this file like so:
 *   components/Icon.jsx, Logo.jsx, SafeImg.jsx, Lightbox.jsx, Gallery.jsx,
 *   SectionView.jsx, Contact.jsx, Feedback.jsx, Footer.jsx, data/content.js
 */
import { useState, useEffect, useRef, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

/* =============================================================
   CONTENT  –  edit text, phone numbers and image paths here
   ============================================================= */
const BUSINESS = {
  name: "Tenfold Events",
  logo: "/images/logo.png",
  phones: ["9591446918", "9741933493"],
  whatsapp: "919591446918",
  email: "eventtenfold@gmail.com",
  instagramUser: "tenfold_events_",
  instagramUrl: "https://www.instagram.com/tenfold_events_",
};

// Makes ["/images/mascot/1.jpg", ...]. Change count / names as you like.
const makeGallery = (folder, count, label) =>
  Array.from({ length: count }, (_, i) => ({
    src: `/images/${folder}/${i + 1}.png`,
    alt: `${label} ${i + 1}`,
  }));

const PERKS = [
  "Professional event management",
  "Creative themes & decorations",
  "Experienced team for seamless execution",
];

const TABS = [
  {
    id: "mascot",
    icon: "🦍",
    label: "Mascot",
    heroImage: "/images/mascot/hero.png",
    chip: "Making your moments more special",
    title: "Let's enjoy together!",
    subtitle:
      "Fun-loving mascots that get everyone dancing at birthdays, parties, marriages and processions.",
    aboutTitle: "About our mascot entertainment",
    about: [
      "Bring Your Celebration to Life",
      "Our mascots don’t just show up — they steal the spotlight. Expect big energy, hilarious moments, amazing photos, and memories your guests will talk about long after the event.",
    ],
    listTitle: "Where we perform",
    list: [
      "Birthday parties",
      "Parties",
      "Marriages",
      "Processions",
      "And more events",
    ],
    gallery: makeGallery("mascot", 11, "Mascot entertainment photo"),
  },
  {
    id: "catering",
    icon: "🍽️",
    label: "Catering",
    heroImage: "/images/catering/hero.png",
    chip: "Good food, great vibes, memorable moments",
    title: "Catering for all your special occasions",
    subtitle:
      "From intimate gatherings to grand celebrations, we bring taste, quality and elegance to every moment.",
    aboutTitle: "About our catering",
    about: [
      "Serve Moments. Create Memories.",
      "Our catering doesn’t just fill plates — it elevates the entire celebration. From delicious flavours and beautifully presented dishes to seamless service, we make every bite part of the experience. Fresh food, flawless presentation, and flavours your guests will be talking about long after the event.",
    ],
    listTitle: "Occasions we cater",
    list: [
      "Weddings",
      "Birthday parties",
      "Corporate events",
      "House warming & get-togethers",
      "Anniversaries",
      "Custom events",
    ],
    gallery: makeGallery("catering", 10, "Catering photo"),
  },
  {
    id: "event",
    icon: "🎉",
    label: "Full Event Management",
    heroImage: "/images/event/hero.png",
    chip: "Weddings, shoots, catering and more",
    title: "Making your special moments memorable",
    subtitle:
      "From the pre-wedding shoot to the last dance, we plan and run every part of your event.",
    aboutTitle: "About our event management",
    about: [
      "You Dream It. We Make It Happen.",
      "We don’t just manage events — we bring your vision to life. From planning and décor to entertainment, catering, and flawless execution, we handle every detail so you can focus on enjoying the moment. Big ideas, seamless execution, unforgettable experiences.",
    ],
    listTitle: "What we handle",
    list: [
      "Pre-wedding shoot",
      "Engagement",
      "Haldi ceremony",
      "Marriage / wedding",
      "Photography & videography",
      "Catering services",
      "Mascot entertainment",
    ],
    gallery: makeGallery("event", 10, "Event photo"),
  },
];

/* =============================================================
   SMALL HELPERS
   ============================================================= */
function Icon({ name, size = 20, filled = false }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
  };
  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <path d="M17.5 6.5h.01" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    case "left":
      return (
        <svg {...common}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    case "right":
      return (
        <svg {...common}>
          <path d="M9 18l6-6-6-6" />
        </svg>
      );
    case "back":
      return (
        <svg {...common}>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return null;
  }
}

/** Shows the logo image; if the file is missing shows a "TF" badge instead. */
function Logo({ size = 48 }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        className="logo-badge"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        TF
      </span>
    );
  }
  return (
    <img
      className="logo-img"
      src={BUSINESS.logo}
      alt={`${BUSINESS.name} logo`}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}

/** <img> that shows a neat placeholder if the file isn't there yet. */
function SafeImg({ src, alt, className = "", ...rest }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  if (failed) {
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt}>
        <span>Add image</span>
        <small>{src}</small>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

/* =============================================================
   LIGHTBOX (full-screen image viewer with Back + Close)
   ============================================================= */
function Lightbox({ images, index, onClose, onIndex }) {
  const count = images.length;
  const touchX = useRef(null);
  const closeRef = useRef(null);

  const prev = useCallback(
    () => onIndex((index - 1 + count) % count),
    [index, count, onIndex],
  );
  const next = useCallback(
    () => onIndex((index + 1) % count),
    [index, count, onIndex],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock page scroll behind popup
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  }, [onClose, prev, next]);

  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
  };

  const img = images[index];
  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div className="lb-top">
        <button type="button" className="lb-btn" onClick={onClose}>
          <Icon name="back" /> <span>Back</span>
        </button>
        <span className="lb-count" aria-live="polite">
          {index + 1} / {count}
        </span>
        <button
          type="button"
          ref={closeRef}
          className="lb-btn lb-btn-icon"
          onClick={onClose}
          aria-label="Close image"
        >
          <Icon name="close" size={22} />
        </button>
      </div>

      {/* tapping the dark area closes; tapping the image itself does not */}
      <div
        className="lb-stage"
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SafeImg
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="lb-img"
          loading="eager"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="lb-nav lb-prev"
            onClick={prev}
            aria-label="Previous image"
          >
            <Icon name="left" size={26} />
          </button>
          <button
            type="button"
            className="lb-nav lb-next"
            onClick={next}
            aria-label="Next image"
          >
            <Icon name="right" size={26} />
          </button>
        </>
      )}
    </div>
  );
}

/* =============================================================
   GALLERY (grid + lightbox)
   ============================================================= */
function Gallery({ images }) {
  const [active, setActive] = useState(null);

  // Phone "back" button closes the popup instead of leaving the page
  useEffect(() => {
    const onPop = () => setActive(null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const open = (i) => {
    window.history.pushState({ lightbox: true }, "");
    setActive(i);
  };
  const close = useCallback(() => {
    if (window.history.state && window.history.state.lightbox)
      window.history.back();
    else setActive(null);
  }, []);

  return (
    <section id="gallery" className="block">
      <div className="container">
        <h2 className="block-title">Gallery</h2>
        <p className="block-lead">Tap any photo to view it full screen.</p>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <button
              type="button"
              key={img.src}
              className="g-item"
              onClick={() => open(i)}
              aria-label={`Open ${img.alt}`}
            >
              <SafeImg src={img.src} alt={img.alt} />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <Lightbox
          images={images}
          index={active}
          onClose={close}
          onIndex={setActive}
        />
      )}
    </section>
  );
}

/* =============================================================
   SECTION (hero + about + gallery) – one per toggle
   ============================================================= */
function SectionView({ tab }) {
  return (
    <div className="section-view" key={tab.id}>
      {/* HERO */}
      <header className="hero">
        <SafeImg
          src={tab.heroImage}
          alt=""
          className="hero-img"
          loading="eager"
        />
        <div className="hero-shade" />
        <div className="container hero-body">
          <span className="hero-chip">{tab.chip}</span>
          <h1 className="hero-title">{tab.title}</h1>
          <p className="hero-sub">{tab.subtitle}</p>
          <div className="hero-actions">
            <a href="#contact" className="tf-btn tf-btn-solid">
              Book now
            </a>
            <a href="#gallery" className="tf-btn tf-btn-ghost">
              See gallery
            </a>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="block">
        <div className="container">
          <h2 className="block-title">{tab.aboutTitle}</h2>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              {tab.about.map((p, i) => (
                <p className="about-text" key={i}>
                  {p}
                </p>
              ))}
              <ul className="perks">
                {PERKS.map((p) => (
                  <li key={p}>
                    <span className="perk-tick">
                      <Icon name="check" size={14} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-md-6">
              <div className="offer-card">
                <h3 className="offer-title">{tab.listTitle}</h3>
                <ul className="offer-list">
                  {tab.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <Gallery images={tab.gallery} />
    </div>
  );
}

/* =============================================================
   COMMON: CONTACT, FEEDBACK, FOOTER
   ============================================================= */
function Contact() {
  return (
    <section id="contact" className="block block-alt">
      <div className="container">
        <h2 className="block-title">Contact us</h2>
        <p className="block-lead">
          Call or message us to check your date and get a quote.
        </p>
        <div className="row g-3">
          {BUSINESS.phones.map((p) => (
            <div className="col-6 col-md-3" key={p}>
              <a className="contact-tile" href={`tel:+91${p}`}>
                <span className="tile-icon">
                  <Icon name="phone" />
                </span>
                <span className="tile-label">Call us</span>
                <span className="tile-value">{p}</span>
              </a>
            </div>
          ))}
          <div className="col-6 col-md-3">
            <a
              className="contact-tile"
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
                "Hi Tenfold Events, I'd like to enquire about an event.",
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="tile-icon">
                <Icon name="whatsapp" />
              </span>
              <span className="tile-label">WhatsApp</span>
              <span className="tile-value">{BUSINESS.phones[0]}</span>
            </a>
          </div>
          <div className="col-6 col-md-3">
            <a
              className="contact-tile"
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="tile-icon">
                <Icon name="instagram" />
              </span>
              <span className="tile-label">Instagram</span>
              <span className="tile-value">@{BUSINESS.instagramUser}</span>
            </a>
          </div>
          <div className="col-12">
            <a
              className="contact-tile contact-tile-wide"
              href={`mailto:${BUSINESS.email}`}
            >
              <span className="tile-icon">
                <Icon name="mail" />
              </span>
              <span>
                <span className="tile-label d-block">Email</span>
                <span className="tile-value">{BUSINESS.email}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feedback() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // No backend yet: this opens the customer's email app with the feedback
    // filled in. Replace with your API / EmailJS / Formspree call later.
    const subject = encodeURIComponent(`Feedback from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nRating: ${rating ? rating + "/5" : "not given"}\n\n${form.message}`,
    );
    window.location.href = `mailto:${BUSINESS.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const reset = () => {
    setForm({ name: "", message: "" });
    setRating(0);
    setSent(false);
  };

  return (
    <section id="feedback" className="block">
      <div className="container">
        <h2 className="block-title">Share your feedback</h2>
        <p className="block-lead">
          Tell us how your event went. We read every message.
        </p>

        {sent ? (
          <div className="feedback-done">
            <h3>Thank you, {form.name}!</h3>
            <p>
              Your feedback is ready to send from your email app. Tap send there
              to finish.
            </p>
            <button
              type="button"
              className="tf-btn tf-btn-ghost"
              onClick={reset}
            >
              Write another
            </button>
          </div>
        ) : (
          <form className="tf-form" onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="fb-name" className="form-label">
                Your name
              </label>
              <input
                id="fb-name"
                name="name"
                className="form-control"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
                required
              />
            </div>

            <div className="mb-3">
              <span className="form-label d-block" id="fb-rating-label">
                Your rating
              </span>
              <div
                className="stars"
                role="group"
                aria-labelledby="fb-rating-label"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    className={`star ${n <= rating ? "on" : ""}`}
                    onClick={() => setRating(n === rating ? 0 : n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    aria-pressed={n <= rating}
                  >
                    <Icon name="star" size={30} filled={n <= rating} />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="fb-msg" className="form-label">
                Your feedback
              </label>
              <textarea
                id="fb-msg"
                name="message"
                rows={4}
                className="form-control"
                value={form.message}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="tf-btn tf-btn-solid tf-btn-block">
              Send feedback
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer({ onPickTab }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-brand">
          <Logo size={56} />
          <div>
            <div className="footer-name">{BUSINESS.name}</div>
            <div className="footer-tag">
              Making your special moments memorable
            </div>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {TABS.map((t) => (
            <button type="button" key={t.id} onClick={() => onPickTab(t.id)}>
              {t.label}
            </button>
          ))}
          <a href="#contact">Contact us</a>
          <a href="#feedback">Feedback</a>
        </nav>

        <div className="footer-contact">
          <a href={`tel:+91${BUSINESS.phones[0]}`}>{BUSINESS.phones[0]}</a>
          <a href={`tel:+91${BUSINESS.phones[1]}`}>{BUSINESS.phones[1]}</a>
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          <a href={BUSINESS.instagramUrl} target="_blank" rel="noreferrer">
            @{BUSINESS.instagramUser}
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* =============================================================
   APP
   ============================================================= */
export default function App() {
  const [activeId, setActiveId] = useState("mascot"); // opens on Mascot
  const mainRef = useRef(null);
  const tab = TABS.find((t) => t.id === activeId);

  const pick = (id) => {
    setActiveId(id);
    // if the user has scrolled down, bring them back to the top of the new section
    requestAnimationFrame(() => {
      const el = mainRef.current;
      if (el && el.getBoundingClientRect().top < 90) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <div className="app" data-theme={tab.id}>
      {/* TOP BAR: logo space + brand + quick book button */}
      <div className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand" aria-label={`${BUSINESS.name} home`}>
            <Logo size={44} />
            <span className="brand-name">{BUSINESS.name}</span>
          </a>
          <a href="#contact" className="tf-btn tf-btn-solid tf-btn-sm">
            Book now
          </a>
        </div>
      </div>

      {/* THE THREE TOGGLES */}
      <div className="tabs-wrap" id="top">
        <div className="container">
          <div className="tabs" role="tablist" aria-label="Our services">
            {TABS.map((t) => (
              <button
                type="button"
                key={t.id}
                role="tab"
                aria-selected={t.id === activeId}
                className={`tab-btn ${t.id === activeId ? "active" : ""}`}
                onClick={() => pick(t.id)}
              >
                <span className="tab-emoji" aria-hidden="true">
                  {t.icon}
                </span>
                <span className="tab-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main ref={mainRef} className="main">
        <SectionView tab={tab} />
        <Contact />
        <Feedback />
      </main>

      <Footer
        onPickTab={(id) => {
          pick(id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Phone-only sticky call / WhatsApp bar */}
      <div className="action-bar d-md-none">
        <a href={`tel:+91${BUSINESS.phones[0]}`} className="action-call">
          <Icon name="phone" size={18} /> Call
        </a>
        <a
          href={`https://wa.me/${BUSINESS.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="action-wa"
        >
          <Icon name="whatsapp" size={18} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
