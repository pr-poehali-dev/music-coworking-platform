import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/784edd8f-d0f7-40ca-bd8f-1ee0fac23838/files/bab018ca-edd9-45c4-bc35-2eed5638b79b.jpg";
const VOCAL_IMG = "https://cdn.poehali.dev/projects/784edd8f-d0f7-40ca-bd8f-1ee0fac23838/files/3282adf3-2e7c-474a-87c2-58b1cc4dab35.jpg";
const CLASS_IMG = "https://cdn.poehali.dev/projects/784edd8f-d0f7-40ca-bd8f-1ee0fac23838/files/7854b1c2-cce8-4968-978d-cf2064fd0924.jpg";

const NAV_LINKS = [
  { label: "О студии", href: "#about" },
  { label: "Направления", href: "#classes" },
  { label: "Педагоги", href: "#teachers" },
  { label: "Расписание", href: "#schedule" },
  { label: "Контакты", href: "#contacts" },
];

const DIRECTIONS = [
  { icon: "Mic2", name: "Вокал", desc: "Академический, эстрадный, джазовый. Постановка голоса, дыхание, сцена.", tags: ["Сольный", "Хор", "Ансамбль"] },
  { icon: "Music", name: "Гитара", desc: "Акустическая и электро. От азов до профессионального исполнения.", tags: ["Классика", "Поп", "Рок"] },
  { icon: "Music2", name: "Скрипка", desc: "Классическая школа, постановка смычка, ансамблевая игра.", tags: ["Классика", "Фолк"] },
  { icon: "Drum", name: "Барабаны", desc: "Ударная установка, ритмика, джазовая импровизация, рок-техника.", tags: ["Джаз", "Рок", "Поп"] },
  { icon: "Piano", name: "Фортепиано", desc: "Классический репертуар, эстрадное направление, аккомпанемент.", tags: ["Классика", "Эстрада"] },
  { icon: "PersonStanding", name: "Танец + Музыка", desc: "Комплексные классы: вокал с хореографией, сценическое движение.", tags: ["Хор", "Ансамбль", "Танцы"] },
];

const TEACHERS = [
  {
    name: "Башa",
    title: "Основатель, педагог по вокалу",
    experience: "15 лет",
    spec: "Эстрадный и джазовый вокал",
    img: VOCAL_IMG,
  },
  {
    name: "Мария Орлова",
    title: "Педагог по скрипке и ансамблю",
    experience: "11 лет",
    spec: "Классическая скрипка, камерный ансамбль",
    img: CLASS_IMG,
  },
  {
    name: "Дмитрий Власов",
    title: "Педагог по гитаре и барабанам",
    experience: "9 лет",
    spec: "Электро-гитара, барабанная установка",
    img: HERO_IMG,
  },
];

const WEEK_DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const SCHEDULE: Record<string, { time: string; name: string; teacher: string; free: boolean }[]> = {
  Пн: [
    { time: "10:00", name: "Вокал (соло)", teacher: "Башa", free: true },
    { time: "12:00", name: "Гитара", teacher: "Д. Власов", free: false },
    { time: "17:00", name: "Хор и ансамбль", teacher: "Башa", free: true },
    { time: "19:00", name: "Барабаны", teacher: "Д. Власов", free: true },
  ],
  Вт: [
    { time: "11:00", name: "Скрипка", teacher: "М. Орлова", free: true },
    { time: "15:00", name: "Фортепиано", teacher: "М. Орлова", free: true },
    { time: "18:00", name: "Танец + Вокал", teacher: "Башa", free: false },
  ],
  Ср: [
    { time: "10:00", name: "Вокал (соло)", teacher: "Башa", free: true },
    { time: "13:00", name: "Гитара", teacher: "Д. Власов", free: true },
    { time: "16:00", name: "Ансамбль", teacher: "М. Орлова", free: false },
    { time: "19:00", name: "Барабаны", teacher: "Д. Власов", free: true },
  ],
  Чт: [
    { time: "11:00", name: "Хор", teacher: "Башa", free: true },
    { time: "15:00", name: "Скрипка", teacher: "М. Орлова", free: false },
    { time: "18:00", name: "Фортепиано", teacher: "М. Орлова", free: true },
  ],
  Пт: [
    { time: "10:00", name: "Вокал (соло)", teacher: "Башa", free: false },
    { time: "14:00", name: "Танец + Вокал", teacher: "Башa", free: true },
    { time: "17:00", name: "Гитара", teacher: "Д. Власов", free: true },
    { time: "20:00", name: "Барабаны", teacher: "Д. Власов", free: false },
  ],
  Сб: [
    { time: "10:00", name: "Хор и ансамбль", teacher: "Башa", free: true },
    { time: "12:00", name: "Скрипка", teacher: "М. Орлова", free: true },
    { time: "14:00", name: "Гитара", teacher: "Д. Власов", free: true },
    { time: "16:00", name: "Танец + Вокал", teacher: "Башa", free: false },
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
    <div className="min-h-screen bg-white text-foreground overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-2xl font-semibold tracking-wide" style={{ color: "hsl(338,65%,62%)" }}>
            BASHA<span className="font-light text-foreground"> VOCALS</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="font-body text-xs tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#schedule")}
              className="font-body text-xs px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
            >
              Записаться
            </button>
          </div>
          <button className="md:hidden text-muted-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="text-left font-body text-sm text-muted-foreground hover:text-foreground">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#schedule")} className="font-body text-sm px-6 py-3 rounded-full bg-primary text-primary-foreground w-full">
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-16 min-h-screen flex items-center">
        <div
          className="absolute top-20 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(338,80%,78%) 0%, transparent 70%)", borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(338,80%,72%) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-body text-xs text-muted-foreground tracking-wide">Музыкальная студия · Москва</span>
            </div>
            <h1 className="animate-fade-in-up delay-200 font-display text-6xl md:text-7xl font-light leading-[1.05] mb-6">
              Здесь рождается<br />
              <span style={{ color: "hsl(338,65%,62%)" }}>музыка</span>
            </h1>
            <p className="animate-fade-in-up delay-300 font-body text-sm text-muted-foreground leading-relaxed max-w-sm mb-10">
              Вокал, гитара, скрипка, барабаны, фортепиано и танцевально-музыкальные классы. Педагоги с опытом от 9 лет. Для детей и взрослых.
            </p>
            <div className="animate-fade-in-up delay-400 flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#schedule")}
                className="font-body text-sm px-8 py-3.5 rounded-full bg-primary text-white hover:opacity-90 transition-opacity shadow-md"
              >
                Записаться на занятие
              </button>
              <button
                onClick={() => scrollTo("#classes")}
                className="font-body text-sm px-8 py-3.5 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Все направления
              </button>
            </div>
          </div>

          <div className="animate-fade-in-up delay-300 relative">
            <div
              className="absolute inset-0 -m-4 rounded-3xl opacity-30"
              style={{ background: "linear-gradient(135deg, hsl(338,80%,85%) 0%, transparent 60%)" }}
            />
            <div
              className="img-zoom relative rounded-3xl overflow-hidden aspect-[4/5]"
              style={{ boxShadow: "0 30px 80px -10px hsla(338,65%,68%,0.3)" }}
            >
              <img src={HERO_IMG} alt="BASHA VOCALS студия" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Icon name="Star" size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-body text-xs font-medium">400+ учеников</p>
                <p className="font-body text-xs text-muted-foreground">доверяют нам</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4">О нас</p>
            <h2 className="font-display text-4xl font-light leading-tight">Музыка<br />для каждого</h2>
          </div>
          <div className="md:col-span-2 space-y-5">
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              BASHA VOCALS — студия, где профессиональные педагоги помогают раскрыть музыкальный потенциал. Мы работаем с детьми и взрослыми, новичками и теми, кто уже имеет опыт.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Наши танцевально-музыкальные классы объединяют вокал, хор, ансамбль и хореографию — идеальный формат для комплексного развития.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[["6+", "педагогов"], ["12", "направлений"], ["400+", "учеников"]].map(([num, label]) => (
                <div key={label} className="text-center p-4 bg-white rounded-2xl shadow-sm">
                  <p className="font-display text-3xl font-light mb-1" style={{ color: "hsl(338,65%,62%)" }}>{num}</p>
                  <p className="font-body text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="classes" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4">Направления</p>
          <h2 className="font-display text-5xl font-light mb-16">Что мы преподаём</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIRECTIONS.map((d, i) => (
              <div key={i} className="card-hover bg-white border border-border rounded-2xl p-8 group">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Icon name={d.icon} size={20} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-light mb-3">{d.name}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed mb-5">{d.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {d.tags.map((tag) => (
                    <span key={tag} className="font-body text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4">Команда</p>
          <h2 className="font-display text-5xl font-light mb-16">Наши педагоги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TEACHERS.map((t, i) => (
              <div key={i} className="card-hover group">
                <div className="img-zoom relative rounded-3xl overflow-hidden aspect-[3/4] mb-6">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="px-1">
                  <span className="font-body text-xs px-3 py-1 rounded-full bg-secondary text-primary mb-3 inline-block">{t.experience}</span>
                  <h3 className="font-display text-2xl font-light mb-1">{t.name}</h3>
                  <p className="font-body text-xs font-medium text-muted-foreground mb-1">{t.title}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-28">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4">Расписание</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <h2 className="font-display text-5xl font-light">Запись на занятие</h2>
            <div className="flex items-center gap-5 font-body text-xs text-muted-foreground">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary inline-block" />есть места</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-border border border-border inline-block" />занято</span>
            </div>
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {WEEK_DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`font-body text-xs px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                  activeDay === day ? "bg-primary text-white shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(SCHEDULE[activeDay] || []).map((slot, i) => (
              <div
                key={i}
                className={`border rounded-2xl p-5 ${slot.free ? "border-border bg-white slot-available" : "border-border bg-secondary/30 slot-booked"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-2xl font-light">{slot.time}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${slot.free ? "bg-primary" : "bg-muted-foreground/30"}`} />
                </div>
                <p className="font-body text-sm font-medium mb-1">{slot.name}</p>
                <p className="font-body text-xs text-muted-foreground mb-4">{slot.teacher}</p>
                {slot.free && (
                  <button className="w-full font-body text-xs py-2.5 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-white transition-all">
                    Записаться
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-4">Контакты</p>
            <h2 className="font-display text-5xl font-light mb-10">Приходите<br />к нам</h2>
            <div className="space-y-7">
              {[
                { icon: "MapPin", label: "Адрес", text: "ул. Музыкальная, 8, Москва" },
                { icon: "Phone", label: "Телефон", text: "+7 (495) 000-00-00" },
                { icon: "Mail", label: "Email", text: "hello@bashavovals.ru" },
                { icon: "Clock", label: "Часы работы", text: "Пн–Пт: 9:00–22:00 · Сб: 10:00–18:00" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs font-medium mb-0.5">{c.label}</p>
                    <p className="font-body text-sm text-muted-foreground">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-sm">
            <h3 className="font-display text-2xl font-light mb-8">Задайте вопрос</h3>
            <div className="space-y-5">
              <div>
                <label className="font-body text-xs tracking-wide uppercase text-muted-foreground block mb-2">Имя</label>
                <input type="text" placeholder="Ваше имя" className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="font-body text-xs tracking-wide uppercase text-muted-foreground block mb-2">Телефон</label>
                <input type="tel" placeholder="+7" className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="font-body text-xs tracking-wide uppercase text-muted-foreground block mb-2">Какой класс интересует?</label>
                <select className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors bg-white text-foreground">
                  <option value="">Выберите направление</option>
                  {DIRECTIONS.map((d) => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-body text-xs tracking-wide uppercase text-muted-foreground block mb-2">Сообщение</label>
                <textarea rows={3} placeholder="Ваш вопрос..." className="w-full border border-border rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
              </div>
              <button className="w-full bg-primary text-white font-body text-sm py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-md">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl font-semibold" style={{ color: "hsl(338,65%,62%)" }}>
            BASHA<span className="font-light text-foreground"> VOCALS</span>
          </span>
          <p className="font-body text-xs text-muted-foreground">© 2024 BASHA VOCALS. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
