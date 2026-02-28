import styles from "./Footer.module.css";

const navLinks = [
  { href: "#colors", label: "Цвета" },
  { href: "#works", label: "Наши работы" },
  { href: "#constructor", label: "Конструктор" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.8 4.7c.2-.9-.6-1.6-1.5-1.3L2.9 10.2c-1 .4-1 1.8.1 2.1l4.8 1.5 1.9 5.8c.3.9 1.5 1 2 .2l2.8-4.1 4.9 3.6c.8.6 2 .1 2.2-.9L21.8 4.7Zm-14 8.6 9.8-6.1-7.5 7.2-.3 3.2-1.6-5.1-.4-.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5 3.5A11 11 0 0 0 3.8 18.7L3 22l3.4-.9A11 11 0 0 0 20.5 3.5Zm-8.6 18a9 9 0 0 1-4.6-1.3l-.3-.2-2 .5.5-1.9-.2-.3a9 9 0 1 1 6.6 3.2Zm5.3-6.5c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 .9-.2.1-.4.1-.7-.1-.3-.1-1.3-.5-2.5-1.6-.9-.8-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.1-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.6 1 2.8c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.8-1.4.2-.7.2-1.3.2-1.4 0-.1-.2-.2-.5-.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 5.28595 0 2.92893 1.46447 1.46447C2.92893 0 5.28595 0 10 0C14.714 0 17.0711 0 18.5355 1.46447C20 2.92893 20 5.28595 20 10C20 14.714 20 17.0711 18.5355 18.5355C17.0711 20 14.714 20 10 20C5.28595 20 2.92893 20 1.46447 18.5355C0 17.0711 0 14.714 0 10ZM10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V10.1893L12.4697 8.4697C12.7626 8.1768 13.2374 8.1768 13.5303 8.4697C13.8232 8.7626 13.8232 9.2374 13.5303 9.5303L10.5303 12.5303C10.3897 12.671 10.1989 12.75 10 12.75C9.8011 12.75 9.6103 12.671 9.4697 12.5303L6.46967 9.5303C6.17678 9.2374 6.17678 8.7626 6.46967 8.4697C6.76256 8.1768 7.23744 8.1768 7.53033 8.4697L9.25 10.1893V5C9.25 4.58579 9.5858 4.25 10 4.25ZM6 14.25C5.58579 14.25 5.25 14.5858 5.25 15C5.25 15.4142 5.58579 15.75 6 15.75H14C14.4142 15.75 14.75 15.4142 14.75 15C14.75 14.5858 14.4142 14.25 14 14.25H6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className={styles.root}>
      <div className="fst-container">
        <div className={"fst-grid " + styles.grid}>
          <nav className={styles.nav} aria-label="Footer">
            {navLinks.map((l) => (
              <a key={l.href} className={styles.navLink} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={styles.phone}>
            <a className={styles.contactLink} href="tel:+78888888888">
              8 888 888 88 88
            </a>
          </div>

          <div className={styles.email}>
            <a className={styles.contactLink} href="mailto:email.mail.ru">
              email.mail.ru
            </a>
          </div>

          <div className={styles.social} aria-label="Social">
            <a className={styles.socialLink} href="#" aria-label="Telegram">
              <TelegramIcon />
            </a>
            <a className={styles.socialLink} href="#" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
            <a className={styles.socialLink} href="#" aria-label="Download">
              <DownloadIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
