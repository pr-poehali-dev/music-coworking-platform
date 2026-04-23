import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/784edd8f-d0f7-40ca-bd8f-1ee0fac23838/files/65de9b38-3701-4498-9a3b-afec0fed387c.jpg";
const TEACHER_IMG = "https://cdn.poehali.dev/projects/784edd8f-d0f7-40ca-bd8f-1ee0fac23838/files/0a2ee2bf-7fa7-4709-b87c-d1d2b1e9355e.jpg";
const CLASS_IMG = "https://cdn.poehali.dev/projects/784edd8f-d0f7-40ca-bd8f-1ee0fac23838/files/cf0a9f24-cd24-4918-bf58-0388d7f7fb30.jpg";

const NAV_LINKS = [
  { label: "О студии", href: "#about" },
  { label: "Классы", href: "#classes" },
  { label: "Педагоги", href: "#teachers" },
  { label: "Расписание", href: "#schedule" },
  { label: "Контакты", href: "#contacts" },
];

const CLASSES = [
  { name: "Классический балет", level: "Все уровни", duration: "60 мин", age: "от 5 лет" },
  { name: "Современный танец", level: "Начинающие / продвинутые", duration: "90 мин", age: "от 12 лет" },
  { name: "Джаз-фанк", level: "Начинающие", duration: "60 мин", age: "от 14 лет" },
  { name: "Стретчинг", level: "Все уровни", duration: "60 мин", age: "от 6 лет" },
];

const TEACHERS = [
  {
    name: "Анна Соколова",
    title: "Хореограф, педагог классического балета",
    experience: "18 лет опыта",
    bio: "Выпускница Академии русского балета им. Вагановой. Лауреат международных конкурсов.",
    img: TEACHER_IMG,
  },
  {
    name: "Михаил Дорофеев",
    title: "Педагог современного танца",
    experience: "12 лет опыта",
    bio: "Участник труппы Большого театра. Специализация — contemporary и джаз.",
    img: CLASS_IMG,
  },
];

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const SCHEDULE: Record<string, { time: string; name: string; teacher: string; free: boolean }[]> = {
  Пн: [
    { time: "10:00", name: "Классический балет", teacher: "А. Соколова", free: true },
    { time: "12:00", name: "Стретчинг", teacher: "А. Соколова", free: false },
    { time: "18:00", name: "Джаз-фанк", teacher: "М. Дорофеев", free: true },
  ],
  Вт: [
    { time: "11:00", name: "Современный танец", teacher: "М. Дорофеев", free: true },
    { time: "19:00", name: "Классический балет", teacher: "А. Соколова", free: true },
  ],
  Ср: [
    { time: "10:00", name: "Стретчинг", teacher: "А. Соколова", free: false },
    { time: "17:00", name: "Современный танец", teacher: "М. Дорофеев", free: true },
    { time: "20:00", name: "Джаз-фанк", teacher: "М. Дорофеев", free: false },
  ],
  Чт: [
    { time: "10:00", name: "Классический балет", teacher: "А. Соколова", free: true },
    { time: "19:00", name: "Стретчинг", teacher: "А. Соколова", free: true },
  ],
  Пт: [
    { time: "11:00", name: "Джаз-фанк", teacher: "М. Дорофеев", free: true },
    { time: "18:00", name: "Современный танец", teacher: "М. Дорофеев", free: false },
  ],
  Сб: [
    { time: "10:00", name: "Классический балет", teacher: "А. Соколова", free: true },
    { time: "12:00", name: "Современный танец", teacher: "М. Дорофеев", free: true },
    { time: "14:00", name: "Стретчинг", teacher: "А. Соколова", free: false },
  ],
};

export default function Index() {
  const [activeDay, setActiveDay] = useState("Пн");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-2xl font-light tracking-widest uppercase">Студия</span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors link-underline"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#schedule")}
              className="font-body text-sm px-5 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Записаться
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-left font-body text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-16 h-screen min-h-[600px] flex items-end">
        <div className="absolute inset-0 img-zoom">
          <img src={HERO_IMG} alt="Студия танца" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <p className="animate-fade-in-up delay-100 font-body text-sm tracking-[0.25em] uppercase text-white/70 mb-4">
            Добро пожаловать в
          </p>
          <h1 className="animate-fade-in-up delay-200 font-display text-6xl md:text-8xl font-light text-white leading-none mb-6">
            Студия<br />Танца
          </h1>
          <p className="animate-fade-in-up delay-300 font-body text-base text-white/80 max-w-md mb-10 leading-relaxed">
            Место, где движение становится искусством. Классы для всех возрастов и уровней подготовки.
          </p>
          <div className="animate-fade-in-up delay-400 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#schedule")}
              className="font-body text-sm px-8 py-3 bg-white text-foreground hover:bg-white/90 transition-colors"
            >
              Записаться на занятие
            </button>
            <button
              onClick={() => scrollTo("#classes")}
              className="font-body text-sm px-8 py-3 border border-white text-white hover:bg-white/10 transition-colors"
            >
              Узнать о классах
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">О нас</p>
            <h2 className="font-display text-5xl font-light leading-tight mb-8">
              Танец как<br />способ жить
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Наша студия работает с 2012 года. За это время мы стали домом для более чем 400 учеников — от детей до взрослых, от начинающих до профессиональных танцоров.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-10">
              Мы верим, что танец доступен каждому. Наши педагоги создают атмосферу, в которой легко учиться, расти и радоваться движению.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-display text-4xl font-light">400+</p>
                <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">учеников</p>
              </div>
              <div>
                <p className="font-display text-4xl font-light">12</p>
                <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">лет на рынке</p>
              </div>
              <div>
                <p className="font-display text-4xl font-light">6</p>
                <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">педагогов</p>
              </div>
            </div>
          </div>
          <div className="img-zoom aspect-[3/4] rounded-sm overflow-hidden">
            <img src={CLASS_IMG} alt="Занятие в студии" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">Направления</p>
          <h2 className="font-display text-5xl font-light mb-16">Наши классы</h2>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {CLASSES.map((cls, i) => (
              <div key={i} className="bg-background p-10 group hover:bg-secondary/60 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="font-display text-2xl font-light">{cls.name}</h3>
                  <Icon name="ArrowUpRight" size={18} className="text-muted-foreground group-hover:text-foreground transition-colors mt-1" />
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="font-body text-xs text-muted-foreground border border-border px-3 py-1">{cls.level}</span>
                  <span className="font-body text-xs text-muted-foreground border border-border px-3 py-1">{cls.duration}</span>
                  <span className="font-body text-xs text-muted-foreground border border-border px-3 py-1">{cls.age}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="py-28 max-w-6xl mx-auto px-6">
        <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">Команда</p>
        <h2 className="font-display text-5xl font-light mb-16">Педагоги</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {TEACHERS.map((t, i) => (
            <div key={i} className="group">
              <div className="img-zoom aspect-[4/5] mb-6 rounded-sm overflow-hidden">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" />
              </div>
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">{t.experience}</p>
              <h3 className="font-display text-3xl font-light mb-1">{t.name}</h3>
              <p className="font-body text-sm text-muted-foreground mb-4">{t.title}</p>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCHEDULE / BOOKING */}
      <section id="schedule" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">Расписание</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <h2 className="font-display text-5xl font-light">Запись на занятие</h2>
            <p className="font-body text-sm text-muted-foreground">
              <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2 align-middle" />
              есть места &nbsp;
              <span className="inline-block w-3 h-3 bg-border border border-border rounded-full mr-2 align-middle" />
              занято
            </p>
          </div>

          {/* Day tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
            {WEEK_DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`font-body text-sm px-5 py-2.5 transition-colors whitespace-nowrap ${
                  activeDay === day
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:border-foreground"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Slots */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(SCHEDULE[activeDay] || []).map((slot, i) => (
              <div
                key={i}
                className={`border p-6 rounded-sm ${
                  slot.free
                    ? "border-border bg-background slot-available"
                    : "border-border bg-background slot-booked"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-2xl font-light">{slot.time}</span>
                  {slot.free ? (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  ) : (
                    <span className="font-body text-xs text-muted-foreground">занято</span>
                  )}
                </div>
                <p className="font-body text-sm font-medium mb-1">{slot.name}</p>
                <p className="font-body text-xs text-muted-foreground mb-4">{slot.teacher}</p>
                {slot.free && (
                  <button className="w-full font-body text-xs py-2 border border-current text-center tracking-wide uppercase">
                    Записаться
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">Контакты</p>
            <h2 className="font-display text-5xl font-light mb-12">Свяжитесь<br />с нами</h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <Icon name="MapPin" size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-sm font-medium mb-1">Адрес</p>
                  <p className="font-body text-sm text-muted-foreground">ул. Танцевальная, 12, Москва</p>
                </div>
              </div>
              <div className="flex gap-5">
                <Icon name="Phone" size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-sm font-medium mb-1">Телефон</p>
                  <p className="font-body text-sm text-muted-foreground">+7 (495) 000-00-00</p>
                </div>
              </div>
              <div className="flex gap-5">
                <Icon name="Mail" size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-sm font-medium mb-1">Email</p>
                  <p className="font-body text-sm text-muted-foreground">hello@studiodance.ru</p>
                </div>
              </div>
              <div className="flex gap-5">
                <Icon name="Clock" size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-body text-sm font-medium mb-1">Часы работы</p>
                  <p className="font-body text-sm text-muted-foreground">Пн–Пт: 9:00 – 22:00</p>
                  <p className="font-body text-sm text-muted-foreground">Сб–Вс: 10:00 – 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-secondary/40 p-10">
            <h3 className="font-display text-2xl font-light mb-8">Задайте вопрос</h3>
            <div className="space-y-5">
              <div>
                <label className="font-body text-xs tracking-wide uppercase text-muted-foreground block mb-2">Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-wide uppercase text-muted-foreground block mb-2">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7"
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs tracking-wide uppercase text-muted-foreground block mb-2">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Ваш вопрос..."
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-primary text-primary-foreground font-body text-sm py-3 hover:opacity-90 transition-opacity">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl font-light tracking-widest uppercase">Студия Танца</span>
          <p className="font-body text-xs text-muted-foreground">© 2024 Все права защищены</p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
