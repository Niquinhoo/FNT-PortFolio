import React, { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import AnimatedContent from './AnimatedContent';

// Web3Forms entrega los mensajes al email con el que se generó esta clave (pública por diseño).
const WEB3FORMS_ACCESS_KEY = 'a5cdc062-265c-49db-b0c4-f8d6f88f6ad2';
// Sitekey compartida que Web3Forms habilita gratis para hCaptcha.
const HCAPTCHA_SITEKEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2';
const MIN_FILL_MS = 3000;

const inputClass = "w-full bg-transparent border-b border-outline px-0 py-3 outline-none focus:border-primary hover:border-on-surface-variant transition-all duration-300 placeholder:text-on-surface-variant/40 text-on-surface font-label text-sm tracking-wide";
const labelClass = "font-label text-[10px] uppercase tracking-widest text-on-surface-variant";

const statusMessages = {
  sending: 'Enviando…',
  success: '¡Gracias! Tu mensaje llegó, te respondo a la brevedad.',
  captcha: 'Completá la verificación antes de enviar.',
  error: 'No se pudo enviar. Probá de nuevo o escribime a nicotrib699@gmail.com.',
  unconfigured: 'El formulario todavía no está configurado. Escribime a nicotrib699@gmail.com.',
};

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef(null);
  const renderedAt = useRef(Date.now());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot o envío instantáneo: bot. Fingimos éxito para no darle pistas.
    if (data.get('botcheck') || Date.now() - renderedAt.current < MIN_FILL_MS) {
      setStatus('success');
      form.reset();
      return;
    }
    if (!WEB3FORMS_ACCESS_KEY) return setStatus('unconfigured');
    if (!captchaToken) return setStatus('captcha');

    data.append('access_key', WEB3FORMS_ACCESS_KEY);
    data.append('h-captcha-response', captchaToken);
    data.append('from_name', 'Portfolio — formulario de contacto');
    data.set('subject', `Portfolio: ${data.get('subject')}`);
    data.append('replyto', data.get('email'));

    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      setCaptchaToken('');
      captchaRef.current?.resetCaptcha();
    }
  };

  const message = statusMessages[status];
  return (
    <section
      className="py-32 border-b border-outline relative z-10 bg-transparent"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* grid: header + form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

        {/* Left: Header block — mirrors About/Projects layout */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-16">
          <AnimatedContent distance={40}>
            <span className="font-label text-xs uppercase tracking-widest text-primary block mb-6">
              05 — Contacto
            </span>
            <h3 className="font-headline text-[clamp(2rem,6vw,3rem)] md:text-6xl font-bold leading-tight text-on-surface">
              ¿Construimos<br />
              <span className="italic font-normal text-primary">algo nuevo?</span>
            </h3>
            <div className="w-20 h-px bg-outline mt-8" />
            <p className="mt-8 text-on-surface-variant text-base leading-relaxed max-w-sm">
              Me interesan oportunidades como Backend Developer o Full Stack Developer, especialmente en equipos que trabajen con infraestructura cloud, automatización, CI/CD y sistemas orientados a producción.
            </p>
          </AnimatedContent>

          {/* Contact info links */}
          <AnimatedContent distance={40} className="flex flex-col gap-4">
            {[
              { label: 'Email', value: 'nicotrib699@gmail.com', href: 'mailto:nicotrib699@gmail.com' },
              { label: 'LinkedIn', value: 'linkedin.com/in/nicolastriberti', href: 'https://www.linkedin.com/in/nicolas-triberti-224651247/' },
              { label: 'GitHub', value: 'github.com/Niquinhoo', href: 'https://github.com/Niquinhoo' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline gap-6 group"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant w-20 shrink-0">{item.label}</span>
                <span className="min-w-0 break-words [overflow-wrap:anywhere] font-label text-sm text-on-surface group-hover:text-primary transition-colors duration-200 relative">
                  {item.value}
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ))}
          </AnimatedContent>
        </div>

        {/* Right: Form — separated by border like About stats */}
        <AnimatedContent distance={40} className="lg:col-span-7 lg:border-l lg:border-outline lg:pl-16">
          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className={labelClass}>Nombre</label>
                <input id="contact-name" name="name" className={inputClass} placeholder="Tu nombre" type="text" autoComplete="name" required maxLength={80} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className={labelClass}>Email</label>
                <input id="contact-email" name="email" className={inputClass} placeholder="tu@email.com" type="email" autoComplete="email" required maxLength={120} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-subject" className={labelClass}>Asunto</label>
              <input id="contact-subject" name="subject" className={inputClass} placeholder="Sobre qué proyecto querés hablar" type="text" required maxLength={120} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className={labelClass}>Mensaje</label>
              <textarea
                id="contact-message"
                name="message"
                className={`${inputClass} resize-none border-b`}
                placeholder="Contame los detalles..."
                rows="5"
                required
                minLength={10}
                maxLength={4000}
              />
            </div>

            {/* Honeypot: invisible para personas, los bots lo completan. */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <HCaptcha
              ref={captchaRef}
              sitekey={HCAPTCHA_SITEKEY}
              reCaptchaCompat={false}
              theme="dark"
              languageOverride="es"
              onVerify={(token) => { setCaptchaToken(token); if (status === 'captcha') setStatus('idle'); }}
              onExpire={() => setCaptchaToken('')}
            />

            <div className="pt-4 flex flex-col gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex w-fit items-center gap-4 font-label text-[10px] uppercase tracking-[0.22em] text-on-surface hover:text-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-wait"
              >
                {status === 'sending' ? 'Enviando' : 'Enviar Mensaje'}
                <span className="inline-block w-14 h-px bg-on-surface group-hover:bg-primary group-hover:w-20 transition-all duration-300" />
              </button>
              <p role="status" aria-live="polite" className={`min-h-5 text-sm ${status === 'success' ? 'text-primary' : 'text-on-surface-variant'}`}>
                {message}
              </p>
            </div>
          </form>
        </AnimatedContent>

        </div>{/* end grid */}

      </div>
    </section>
  );
};

export default Contact;
