import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Cake,
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  Mail,
  Music,
  Pause,
  Play,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import "./style.css";

/* =====================================================
   CUSTOMIZE THESE
   ===================================================== */

const PERSON_NAME = "Hishara";

const LETTER_TEXT =
  "----------------------------------------------------------------------------------------------------------------------------------------------------------------------I had so many things to write about you… I even started writing a whole paragraph. But the moment I started, my mind went completely blank. 😂 So, I have nothing to write anymore!Anyway, Happy Birthday Cutieee 🥳❤️Stay happy, stay crazy, and please don’t get any older… you’re already old enough! 😂🎉";

const SONG = "/music/birthday-song.mp3";

const PHOTOS = [
  {
    src: "/photos/1.jpeg",
    caption: "Our first beautiful memory",
  },
  {
    src: "/photos/2.jpeg",
    caption: "That smile I love",
  },
  {
    src: "/photos/3.jpeg",
    caption: "A day worth remembering",
  },
  {
    src: "/photos/4.jpeg",
    caption: "Just us ❤️",
  },
  {
    src: "/photos/5.jpeg",
    caption: "One of my favorite moments",
  },
  {
    src: "/photos/6.jpeg",
    caption: "Another little memory",
  },
  {
    src: "/photos/7.jpeg",
    caption: "Forever grateful for you",
  },
  {
    src: "/photos/8.jpeg",
    caption: "More memories to come...",
  },
];


const REASONS = [
  "Your smile can instantly make my day better.",
  "You make ordinary moments feel special.",
  "I love the way you care about the people around you.",
  "You can make me laugh even when I am having a bad day.",
  "Life would be boring without your nonsense.",
  "Your little habits somehow became my favorite things.",
  "Just hearing your voice makes my day.",
  "I love the memories we have already created.",
  "You are not just my cousin, you are my unpaid therapist.",
  "Simply because you are you. ❤️",
];

/* =====================================================
   HELPERS
   ===================================================== */

function fireworkBurst() {
  const end = Date.now() + 1300;

  const colors = [
    "#ff4fa3",
    "#c084fc",
    "#ffffff",
    "#ffd166",
  ];

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 65,
      origin: { x: 0 },
      colors,
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 65,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

function scrollToId(id) {
  document
    .getElementById(id)
    ?.scrollIntoView({
      behavior: "smooth",
    });
}

/* =====================================================
   MAIN APP
   ===================================================== */

function App() {
  const [started, setStarted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [reasonOpen, setReasonOpen] = useState(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  const audioRef = useRef(null);

  const startJourney = async () => {
    setStarted(true);

    fireworkBurst();

    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.65;

        await audioRef.current.play();

        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    }

    setTimeout(() => {
      scrollToId("hero");
    }, 100);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();

      setMusicPlaying(false);
    } else {
      try {
        await audioRef.current.play();

        setMusicPlaying(true);
      } catch {
        alert(
          "Add your MP3 file to public/music/birthday-song.mp3 first."
        );
      }
    }
  };

  return (
    <div className="app">

      <audio
        ref={audioRef}
        src={SONG}
        loop
        preload="auto"
      />

      <Background />

      <AnimatePresence mode="wait">

        {!started ? (

          <OpeningScreen
            key="opening"
            onStart={startJourney}
          />

        ) : (

          <motion.main
            key="main"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >

            <Hero
              name={PERSON_NAME}
              onNext={() => scrollToId("cake")}
            />

            <CakeSection
              onWish={fireworkBurst}
            />

            <Memories
              photos={PHOTOS}
              onOpen={(photo) =>
                setLightbox(photo)
              }
            />

           <VideoMemories /> 

            <BirthdayLetter
              open={letterOpen}
              setOpen={setLetterOpen}
              text={LETTER_TEXT}
            />

            <Reasons
              open={reasonOpen}
              setOpen={setReasonOpen}
            />

            <Gallery
              photos={PHOTOS}
              onOpen={(photo) =>
                setLightbox(photo)
              }
            />

            <MusicSection
              playing={musicPlaying}
              onToggle={toggleMusic}
            />

            <Surprise
              open={giftOpen}
              setOpen={setGiftOpen}
              onCelebrate={fireworkBurst}
            />

            <FinalSection
              name={PERSON_NAME}
              onCelebrate={fireworkBurst}
            />

            <MusicControls
              playing={musicPlaying}
              onToggle={toggleMusic}
            />

          </motion.main>
        )}

      </AnimatePresence>

      <AnimatePresence>

        {lightbox && (

          <Lightbox
            photo={lightbox}
            photos={PHOTOS}
            onClose={() =>
              setLightbox(null)
            }
          />

        )}

      </AnimatePresence>

    </div>
  );
}

/* =====================================================
   BACKGROUND
   ===================================================== */

function Background() {

  const stars = useMemo(
    () =>
      Array.from(
        {
          length: 70,
        },
        (_, i) => ({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: `${Math.random() * 5}s`,
          size: `${1 + Math.random() * 3}px`,
        })
      ),
    []
  );

  return (
    <div
      className="background"
      aria-hidden="true"
    >

      <div className="orb orb-one" />

      <div className="orb orb-two" />

      <div className="orb orb-three" />

      {stars.map((star) => (

        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />

      ))}

      <div className="heart-field">

        {Array.from(
          {
            length: 14,
          },
          (_, i) => (

            <Heart
              key={i}
              size={12 + (i % 4) * 5}
              className="floating-heart"
              style={{
                left: `${5 + ((i * 17) % 90)}%`,
                animationDelay: `${i * 1.3}s`,
                animationDuration: `${10 + (i % 4) * 3}s`,
              }}
            />

          )
        )}

      </div>

    </div>
  );
}

/* =====================================================
   OPENING SCREEN
   ===================================================== */

function OpeningScreen({ onStart }) {

  return (
    <motion.section
      className="opening-screen"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >

      <div className="opening-glow" />

      <motion.div
        className="opening-card"
        initial={{
          scale: 0.8,
          opacity: 0,
          y: 30,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          type: "spring",
        }}
      >

        <motion.div
          className="envelope-icon"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <Mail
            size={60}
            strokeWidth={1.4}
          />
        </motion.div>

        <p className="eyebrow">
          A little surprise for you
        </p>

        <h1>
          Happy Birthday
          <span>cutieeee</span>
        </h1>

        <p className="opening-text">
          A small collection of memories,
          words, wishes and love.
        </p>

        <button
          className="primary-button"
          onClick={onStart}
        >
          <Mail size={18} />
          Tap to Open 💌
        </button>

        <div className="opening-stars">
          <Sparkles size={16} />

          <span>
            Turn your sound on
          </span>

          <Sparkles size={16} />
        </div>

      </motion.div>

    </motion.section>
  );
}

/* =====================================================
   HERO
   ===================================================== */

function Hero({ name, onNext }) {

  return (
    <section
      id="hero"
      className="hero section"
    >

      <div className="hero-content">

        <motion.div
          className="hero-badge"
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
        >
          <Sparkles size={16} />

          Today is all about you

          <Sparkles size={16} />
        </motion.div>

        <motion.p
          className="hero-small"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
        >
          Happy Birthday
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.65,
            duration: 0.8,
          }}
        >
          {name}

          <span>
            ❤️
          </span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
          }}
        >
          May your day be as beautiful,
          warm and unforgettable as you are.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
          }}
        >

          <button
            className="primary-button"
            onClick={onNext}
          >
            Start the journey

            <ArrowDown size={18} />
          </button>

        </motion.div>

      </div>

      <motion.div
        className="scroll-indicator"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >

        <span>
          Scroll slowly
        </span>

        <ArrowDown size={18} />

      </motion.div>

    </section>
  );
}

/* =====================================================
   CAKE
   ===================================================== */

function CakeSection({ onWish }) {

  const [blown, setBlown] =
    useState(false);

  const blow = () => {

    setBlown(true);

    onWish();
  };

  return (
    <section
      id="cake"
      className="section cake-section"
    >

      <SectionTitle
        icon={<Cake />}
        eyebrow="Make a wish"
        title="One candle, one wish"
        subtitle="Close your eyes, make a wish, and tap the candle."
      />

      <motion.div
        className="cake-scene"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
      >

        <div className="cake-glow" />

        <div className="cake">

          <div className="cake-candle">

            <div
              className={`flame ${
                blown ? "blown" : ""
              }`}
            />

            <div className="wick" />

            <div className="candle-stick" />

          </div>

          <div className="cake-top" />

          <div className="cake-middle" />

          <div className="cake-bottom" />

          <div className="cake-cream cream-one" />

          <div className="cake-cream cream-two" />

          <div className="cake-cream cream-three" />

        </div>

        <button
          className="wish-button"
          onClick={blow}
        >
          {blown
            ? "Wish made ✨"
            : "Blow the candle 🕯️"}
        </button>

      </motion.div>

    </section>
  );
}

/* =====================================================
   MEMORIES
   ===================================================== */

function Memories({
  photos,
  onOpen,
}) {

  return (
    <section className="section memories-section">

      <SectionTitle
        icon={<Heart />}
        eyebrow="Little moments"
        title="Our memories"
        subtitle="Some moments are small, but they stay in your heart forever."
      />

      <div className="polaroid-grid">

        {photos
          .slice(0, 6)
          .map((photo, index) => (

            <motion.button
              className={`polaroid polaroid-${
                index + 1
              }`}
              key={photo.src}
              onClick={() =>
                onOpen(photo)
              }
              initial={{
                opacity: 0,
                y: 40,
                rotate:
                  index % 2
                    ? 3
                    : -3,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate:
                  index % 2
                    ? 3
                    : -3,
              }}
              whileHover={{
                y: -12,
                rotate: 0,
                scale: 1.04,
              }}
              viewport={{
                once: true,
              }}
            >

              <div className="photo-frame">

                <img
                  src={photo.src}
                  alt={photo.caption}
                />

              </div>

              <span>
                {photo.caption}
              </span>

            </motion.button>

          ))}

      </div>

      

    </section>
  );
}



/* =====================================================
   LETTER
   ===================================================== */

function BirthdayLetter({
  open,
  setOpen,
  text,
}) {

  return (
    <section className="section letter-section">

      <SectionTitle
        icon={<Mail />}
        eyebrow="A letter for you"
        title="Open when you're ready"
        subtitle="There are some words I wanted you to have."
      />

      <div
        className={`letter-wrap ${
          open ? "is-open" : ""
        }`}
      >

        <motion.button
          className="envelope"
          onClick={() =>
            setOpen(!open)
          }
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
        >

          <div className="envelope-back" />

          <div className="envelope-paper">

            {open && (
              <TypeWriter
                text={text}
              />
            )}

          </div>

          <div className="envelope-flap" />

          <div className="envelope-front">

            <Heart
              size={32}
              fill="currentColor"
            />

            <span>
              {open
                ? "With all my love"
                : "Open me ❤️"}
            </span>

          </div>

        </motion.button>

      </div>

    </section>
  );
}

function TypeWriter({ text }) {

  const [
    displayed,
    setDisplayed,
  ] = useState("");

  useEffect(() => {

    setDisplayed("");

    let index = 0;

    const timer =
      setInterval(() => {

        index += 1;

        setDisplayed(
          text.slice(0, index)
        );

        if (
          index >= text.length
        ) {
          clearInterval(timer);
        }

      }, 20);

    return () =>
      clearInterval(timer);

  }, [text]);

  return (
    <p className="typewriter">
      {displayed}
    </p>
  );
}

/* =====================================================
   REASONS
   ===================================================== */

function Reasons({
  open,
  setOpen,
}) {

  return (
    <section className="section reasons-section">

      <SectionTitle
        icon={<Heart />}
        eyebrow="Just because"
        title="10 little reasons"
        subtitle="Tap a card. Each one has a tiny secret inside."
      />

      <div className="reason-grid">

        {REASONS.map(
          (reason, index) => {

            const active =
              open === index;

            return (
              <motion.button
                className={`reason-card ${
                  active
                    ? "active"
                    : ""
                }`}
                key={index}
                onClick={() =>
                  setOpen(
                    active
                      ? null
                      : index
                  )
                }
                whileHover={{
                  y: -5,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >

                <div className="reason-inner">

                  <div className="reason-front">

                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <Heart
                      size={26}
                    />

                    <small>
                      Tap me
                    </small>

                  </div>

                  <div className="reason-back">

                    <strong>
                      Reason #
                      {index + 1}
                    </strong>

                    <p>
                      {reason}
                    </p>

                  </div>

                </div>

              </motion.button>
            );
          }
        )}

      </div>

    </section>
  );
}

/* =====================================================
   GALLERY
   ===================================================== */

function Gallery({
  photos,
  onOpen,
}) {

  return (
    <section className="section gallery-section">

      <SectionTitle
        icon={<Sparkles />}
        eyebrow="Captured moments"
        title="Our little gallery"
        subtitle="A wall of memories waiting to be clicked."
      />

      <div className="gallery-grid">

        {photos.map(
          (photo, index) => (

            <motion.button
              className={`gallery-item gallery-item-${
                index + 1
              }`}
              key={photo.src}
              onClick={() =>
                onOpen(photo)
              }
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              whileHover={{
                scale: 1.03,
              }}
              viewport={{
                once: true,
              }}
            >

              <img
                src={photo.src}
                alt={photo.caption}
              />

              <div className="gallery-overlay">

                <Heart
                  size={22}
                  fill="currentColor"
                />

                <span>
                  {photo.caption}
                </span>

              </div>

            </motion.button>

          )
        )}

      </div>

    </section>
  );
}

/* =====================================================
   MUSIC
   ===================================================== */

function MusicSection({
  playing,
  onToggle,
}) {

  return (
    <section className="section music-section">

      <div className="music-card">

        <div className="music-disc">

          <div
            className={`disc-center ${
              playing
                ? "spinning"
                : ""
            }`}
          >

            <Music size={30} />

          </div>

        </div>

        <div className="music-info">

          <span>
            OUR BIRTHDAY SONG
          </span>

          <h2>
            Press play and let
            the memories play too.
          </h2>

          
        
        
            
            
          

          <div className="visualizer">

            {Array.from(
              {
                length: 18,
              },
              (_, i) => (

                <i
                  key={i}
                  className={
                    playing
                      ? "bar dancing"
                      : "bar"
                  }
                  style={{
                    animationDelay:
                      `${i * 0.07}s`,
                  }}
                />

              )
            )}

          </div>

          <button
            className="music-button"
            onClick={onToggle}
          >

            {playing ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}

            {playing
              ? "Pause music"
              : "Play music"}

          </button>

        </div>

      </div>

    </section>
  );
}

/* =====================================================
   SURPRISE GIFT
   ===================================================== */

function Surprise({
  open,
  setOpen,
  onCelebrate,
}) {

  const openGift = () => {

    setOpen(true);

    onCelebrate();
  };

  return (
    <section className="section surprise-section">

      <SectionTitle
        icon={<Gift />}
        eyebrow="One more thing"
        title="There's a surprise"
        subtitle="I kept one little gift until the end."
      />

      <div
        className={`gift-box-wrap ${
          open ? "opened" : ""
        }`}
      >

        <motion.button
          className="gift-box"
          onClick={openGift}
          whileHover={{
            scale: 1.05,
            y: -5,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >

          <div className="gift-lid">

            <div className="ribbon vertical" />

            <div className="bow">

              <span />

              <span />

            </div>

          </div>

          <div className="gift-body">

            <div className="ribbon vertical" />

            <div className="ribbon horizontal" />

          </div>

        </motion.button>

        <AnimatePresence>

         {open && (
  <motion.div
    className="surprise-message"
    initial={{
      opacity: 0,
      scale: 0.7,
      y: 30,
    }}
    animate={{
      opacity: 1,
      scale: 1,
      y: 0,
    }}
    transition={{
      duration: 0.7,
      ease: "easeOut",
    }}
  >

    {/* Gift Photo */}
    <div className="gift-photo">
      <img
        src="/photos/gift-photo.png"
        alt="A special memory"
      />
    </div>

    <Sparkles />

    <h3>
      A little surprise for you 💕
    </h3>

    <p>
      Congratulations! 🎉
Your dream iPhone 18 Pro has finally arrived…
in PNG format. 😂📱
      <br />
      The iPhone is currently available only in picture format. 😭📱

So congratulations! You have officially received a FREE iPhone 18 Pro Image Subscription — 1 year plan. 😂

Terms & Conditions:
* Phone is 100% free.
* Delivery is 100% imaginary.
* Warranty is my responsibility… emotionally. 😂
* You can zoom the picture as much as you want.
* Actual phone purchase is coming… in another lifetime. 😭

Anyway, jokes aside,
Happy Birthday to my favourite cousin! ❤️

Stay happy, stay crazy, and please don’t block me after seeing this gift. 😂

With love,
Your favourite cousin & CEO of Fake iPhone Gifts 📱😂
    </p>

  </motion.div>
)}
          

        </AnimatePresence>

      </div>

    </section>
  );
}

/* =====================================================
   FINAL SECTION
   ===================================================== */

function FinalSection({
  name,
  onCelebrate,
}) {

  return (
    <section className="final-section">

      <div className="final-stars">

        {Array.from(
          {
            length: 25,
          },
          (_, i) => (

            <Sparkles
              key={i}
              style={{
                left:
                  `${(i * 37) % 100}%`,
                top:
                  `${(i * 53) % 100}%`,
              }}
            />

          )
        )}

      </div>

      <motion.div
        className="final-content"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
      >

        <div className="final-heart">

          <Heart
            size={48}
            fill="currentColor"
          />

        </div>

        <p className="eyebrow">
          And finally...
        </p>

        <h2>

          Happy Birthday,

          <span>
            Hishara 
          </span>

        </h2>

        <p className="final-text">
          May this year be full of
          beautiful surprises, big
          dreams, peaceful days,
          loud laughter and all the
          happiness you deserve.
        </p>

        <button
          className="primary-button"
          onClick={onCelebrate}
        >
          Celebrate again

          <Sparkles size={18} />

        </button>

        <div className="final-signature">

          Made with love

          <Heart
            size={14}
            fill="currentColor"
          />

        </div>

      </motion.div>

    </section>
  );
}

/* =====================================================
   LIGHTBOX
   ===================================================== */

function Lightbox({
  photo,
  photos,
  onClose,
}) {

  const index =
    photos.findIndex(
      (p) => p.src === photo.src
    );

  const [
    current,
    setCurrent,
  ] = useState(index);

  const next = () => {
    setCurrent(
      (i) =>
        (i + 1) %
        photos.length
    );
  };

  const prev = () => {
    setCurrent(
      (i) =>
        (i - 1 +
          photos.length) %
        photos.length
    );
  };

  useEffect(() => {

    const onKey = (event) => {

      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        next();
      }

      if (
        event.key ===
        "ArrowLeft"
      ) {
        prev();
      }

    };

    window.addEventListener(
      "keydown",
      onKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKey
      );

  });

  const currentPhoto =
    photos[current];

  return (
    <motion.div
      className="lightbox"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClose}
    >

      <button
        className="lightbox-close"
        onClick={onClose}
      >
        <X />
      </button>

      <button
        className="lightbox-arrow left"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        <ChevronLeft />
      </button>

      <motion.div
        className="lightbox-content"
        initial={{
          scale: 0.9,
        }}
        animate={{
          scale: 1,
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <img
          src={currentPhoto.src}
          alt={currentPhoto.caption}
        />

        <p>
          {currentPhoto.caption}
        </p>

        <small>
          {current + 1} /{" "}
          {photos.length}
        </small>

      </motion.div>

      <button
        className="lightbox-arrow right"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        <ChevronRight />
      </button>

    </motion.div>
  );
}

/* =====================================================
   SECTION TITLE
   ===================================================== */

function SectionTitle({
  icon,
  eyebrow,
  title,
  subtitle,
}) {

  return (
    <motion.div
      className="section-title"
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
    >

      <div className="section-icon">
        {icon}
      </div>

      <span className="eyebrow">
        {eyebrow}
      </span>

      <h2>
        {title}
      </h2>

      <p>
        {subtitle}
      </p>

    </motion.div>
  );
}

/* =====================================================
   FLOATING MUSIC CONTROL
   ===================================================== */

function MusicControls({
  playing,
  onToggle,
}) {

  return (
    <button
      className="floating-music"
      onClick={onToggle}
      aria-label="Toggle music"
    >

      {playing ? (
        <Pause size={18} />
      ) : (
        <Play size={18} />
      )}

      <span>
        {playing
          ? "Playing"
          : "Music"}
      </span>

    </button>
  );
}

/* =====================================================
   RENDER
   ===================================================== */

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function VideoMemories() {
  const videos = [
    {
      src: "/videos/video1.MOV",
      title: "Our Little Moments ❤️",
      caption: "Some memories I never want to forget."
    },
    {
      src: "/videos/video2.MOV",
      title: "That Funny Day 😂",
      caption: "Still makes me smile every time."
    },
    {
      src: "/videos/video3.MOV",
      title: "A Special Memory ✨",
      caption: "One of my favorite moments with you."
    },
    {
      src: "/videos/video4.MOV",
      title: "Forever Memories 💕",
      caption: "A little piece of our story."
    }
  ];

  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="video-section" id="videos">

      <div className="video-floating-heart">
        <Heart size={30} fill="currentColor" />
      </div>

      <div className="video-floating-heart">
        <Heart size={24} fill="currentColor" />
      </div>

      <div className="video-floating-heart">
        <Heart size={35} fill="currentColor" />
      </div>

      <div className="video-header">
        <div className="video-small-title">
          🎥 Our Memories
        </div>

        <h2>Little Moments</h2>

        <p>
          Some moments are too special to stay only in our memories.
          So I saved them here forever. ❤️
        </p>
      </div>

      <div className="video-grid">

        {videos.map((video, index) => (
          <motion.div
            className="video-card"
            key={video.src}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.12
            }}
          >

            <div className="video-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="video-heart">
              <Heart size={18} fill="currentColor" />
            </div>

            <div className="video-wrapper">

              <video
                src={video.src}
                controls
                preload="metadata"
                playsInline
              />

            </div>

            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.caption}</p>
            </div>

          </motion.div>
        ))}

      </div>

      <div className="video-bottom-text">
        Every video holds a memory.
        <br />
        Every memory holds a piece of <span>us ❤️</span>
      </div>

    </section>
  );
}