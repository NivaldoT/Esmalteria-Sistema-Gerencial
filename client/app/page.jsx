import Image from "next/image";
import { Cormorant_Garamond, Jost } from "next/font/google";
import styles from "./page.module.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const WHATSAPP =
  "https://wa.me/5518996410389?text=Olá!%20Gostaria%20de%20agendar%20um%20horário.";

const servicos = [
  {
    nome: "Manicure clássica",
    texto:
      "Cutilagem perfeita, hidratação e esmaltação impecável para unhas bonitas e saudáveis no dia a dia.",
  },
  {
    nome: "Nail art e design",
    texto:
      "Das artes sutis às criações ousadas, cada desenho é pensado e feito só para você.",
  },
  {
    nome: "Alongamento em gel",
    texto:
      "Unhas longas, resistentes e com aparência natural, para durar mais e ficar forte.",
  },
];

const galeria = [
  { src: "/img/pe1.jpeg", alt: "Unha decorada 1" },
  { src: "/img/pe2.jpeg", alt: "Unha decorada 2" },
  { src: "/img/pe3.jpeg", alt: "Unha decorada 3" },
  { src: "/img/mao1.jpeg", alt: "Unha decorada 4" },
  { src: "/img/mao2.jpeg", alt: "Unha decorada 5" },
  { src: "/img/mao3.jpeg", alt: "Unha decorada 6" },
];

export default function Home() {
  return (
    <div className={`${styles.page} ${display.variable} ${body.variable}`}>
      <header className={styles.header}>
        <a href="#hero" className={styles.brand}>Sorelle</a>
        <nav className={styles.nav} aria-label="Principal">
          <a href="#servicos">Serviços</a>
          <a href="#galeria">Trabalhos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section id="hero" className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Unhas perfeitas, confiança renovada
          </h1>
          <p className={styles.lead}>
            Cuidado, arte e beleza em cada detalhe. A sua autoestima merece esse
            carinho.
          </p>
          <a
            href="#contato"
            className={styles.button}
          >
            Agende seu horário
          </a>
        </div>

        <div className={styles.heroImages}>
          <div className={`${styles.arch} ${styles.heroMain}`}>
            <Image
              src="/img/mao1.jpeg"
              alt="Unha decorada em destaque"
              fill
              priority
              sizes="(max-width: 860px) 70vw, 380px"
              className={styles.cover}
            />
          </div>
          <div className={`${styles.arch} ${styles.heroSmall}`}>
            <Image
              src="/img/pe1.jpeg"
              alt="Unha do pé decorada"
              fill
              sizes="(max-width: 860px) 40vw, 200px"
              className={styles.cover}
            />
          </div>
        </div>
      </section>

      <section id="servicos" className={styles.section}>
        <h2 className={styles.title}>Nossos serviços</h2>
        <ul className={styles.services}>
          {servicos.map((s) => (
            <li key={s.nome} className={styles.service}>
              <h3 className={styles.serviceName}>{s.nome}</h3>
              <p className={styles.serviceText}>{s.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="galeria" className={`${styles.section} ${styles.tinted}`}>
        <h2 className={styles.title}>Nossos trabalhos</h2>
        <div className={styles.gallery}>
          {galeria.map((g) => (
            <div key={g.src} className={styles.shot}>
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 860px) 50vw, 33vw"
                className={styles.cover}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="sobre" className={styles.section}>
        <div className={styles.about}>
          <div className={`${styles.arch} ${styles.aboutImage}`}>
            <Image
              src="/img/profissional1.jpg"
              alt="Profissional de manicure"
              fill
              sizes="(max-width: 860px) 80vw, 420px"
              className={styles.cover}
            />
          </div>
          <div className={styles.aboutText}>
            <h2 className={styles.title}>Sobre nós</h2>
            <p>
              Olá! Me chamo Silene Lima, a artista por trás do Salão Sorelle.
              Com mais de 15 anos de experiência, minha paixão é realçar a
              beleza natural das suas mãos e elevar sua autoestima através de
              unhas impecáveis.
            </p>
            <p>
              Aqui, cada cliente é especial. Utilizo apenas produtos de alta
              qualidade e técnicas atualizadas para garantir um resultado
              incrível e duradouro. Meu compromisso é com a sua satisfação e
              bem-estar, em um ambiente aconchegante e seguro.
            </p>
          </div>
        </div>
      </section>

      <section id="contato" className={styles.contact}>
        <h2 className={styles.contactTitle}>Pronta para brilhar?</h2>
        <p className={styles.contactLead}>
          Entre em contato e agende seu horário. Será um prazer cuidar de você!
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.buttonLight}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.4.1.1.1.7-.1 1.4Z" />
          </svg>
          Agendar pelo WhatsApp
        </a>
        <p className={styles.social}>
          Siga o salão:{" "}
          <a href="https://instagram.com/silene_sil1" target="_blank" rel="noopener noreferrer">Instagram</a>
          {" e "}
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
        </p>
      </section>

      <footer className={styles.footer}>
        Salão Sorelle · Silene Lima
      </footer>
    </div>
  );
}