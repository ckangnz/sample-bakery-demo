import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes } from '@instinct/files';
import croissant from './photos/croissant.jpg';
import loaf from './photos/loaf.jpg';
import cookie from './photos/cookie.jpg';
import flatwhite from './photos/flatwhite.jpg';
import iced from './photos/iced.jpg';
import interior from './photos/interior.jpg';
import windowSeat from './photos/window.jpg';
import displayCase from './photos/case.jpg';

type L = 'ko' | 'en';
type T = { ko: string; en: string };

const text = {
    banner: { ko: '샘플 사이트 · 가상 업체입니다', en: 'Sample site · fictional business' },
    name: { ko: '데모 베이커리', en: 'Demo Bakery' },
    home: { ko: '홈', en: 'Home' }, menu: { ko: '메뉴', en: 'Menu' }, contact: { ko: '문의', en: 'Contact' },
    heroKicker: { ko: 'Auckland · 동네 빵집', en: 'Auckland · neighbourhood bakery' },
    heroLine1: { ko: '오늘 아침에', en: 'Baked this' },
    heroLine2: { ko: '구운 빵', en: 'morning' },
    heroSub: { ko: '매일 새벽 반죽하고 아침에 굽습니다. 그날의 빵과 커피만 준비합니다.', en: 'Dough before dawn, out of the oven by morning. Only today\'s bread and coffee.' },
    ctaMenu: { ko: '메뉴 보기', en: 'See the menu' },
    ctaContact: { ko: '문의하기', en: 'Get in touch' },
    scroll: { ko: '아래로', en: 'Scroll' },
    craftKicker: { ko: '우리의 방식', en: 'How we bake' },
    craftTitle: { ko: '천천히, 매일', en: 'Slowly, daily' },
    craftBody: { ko: '천연 발효종으로 반죽하고 하루 이상 숙성합니다. 시간이 맛을 만든다고 믿는 작은 빵집입니다.', en: 'Naturally leavened dough, rested overnight. A small bakery that believes time makes the flavour.' },
    stat1n: '6AM', stat1: { ko: '첫 오븐', en: 'first oven' },
    stat2n: '100%', stat2: { ko: '당일 판매', en: 'sold same day' },
    stat3n: '20+', stat3: { ko: '매일 굽는 품목', en: 'items baked daily' },
    spaceKicker: { ko: '공간', en: 'The space' },
    spaceTitle: { ko: '앉아서 쉬어 가세요', en: 'Stay a while' },
    spaceBody: { ko: '창가 자리와 커피, 그리고 갓 구운 빵.', en: 'A window seat, a coffee, and bread still warm.' },
    menuTitle: { ko: '메뉴', en: 'Menu' },
    menuNote: { ko: '가격은 예시입니다. GST 표기는 실제 업체가 정합니다. 사진은 샘플 스톡 이미지입니다.', en: 'Prices are examples. A real business decides GST display. Photos are sample stock images.' },
    contactTitle: { ko: '문의와 위치', en: 'Contact and location' },
    formIntro: { ko: '이 양식은 샘플이라 실제로 전송되지 않습니다.', en: 'This form is a sample. Nothing is actually sent.' },
    fName: { ko: '이름', en: 'Your name' }, fMsg: { ko: '문의 내용', en: 'Message' },
    send: { ko: '보내기 (샘플)', en: 'Send (sample)' },
    sent: { ko: '샘플이라 아무것도 전송되지 않았습니다. 실제 사이트에서는 업체 이메일로 문의가 전달됩니다.', en: 'Nothing was sent because this is a sample. On a real site this reaches the business by email.' },
    hours: { ko: '영업시간', en: 'Hours' },
    address: { ko: '주소', en: 'Address' },
    addr: { ko: '123 Example Street, Auckland (가상 주소)', en: '123 Example Street, Auckland (fictional address)' },
    foot: { ko: '샘플 사이트 · 가상 업체 · 사진 Unsplash 스톡', en: 'Sample site · fictional business · stock photos via Unsplash' },
};

const menuItems: { img: string; alt: string; name: T; desc: T; price: string; tag: T }[] = [
    { img: loaf, alt: 'Rustic sourdough loaves', name: { ko: '사워도우', en: 'Sourdough' }, desc: { ko: '천연발효, 하루 숙성', en: 'Naturally leavened, rested overnight' }, price: 'NZ$9.00', tag: { ko: '대표', en: 'Signature' } },
    { img: croissant, alt: 'Butter croissants with sugar falling', name: { ko: '버터 크루아상', en: 'Butter croissant' }, desc: { ko: '겹겹이 바삭한 버터 결', en: 'Flaky layers of butter' }, price: 'NZ$5.50', tag: { ko: '인기', en: 'Popular' } },
    { img: cookie, alt: 'Chocolate chip cookies in a bowl', name: { ko: '초코칩 쿠키', en: 'Choc-chip cookie' }, desc: { ko: '겉은 바삭, 속은 촉촉', en: 'Crisp outside, soft inside' }, price: 'NZ$4.50', tag: { ko: '디저트', en: 'Sweet' } },
    { img: flatwhite, alt: 'Flat white with latte art', name: { ko: '플랫 화이트', en: 'Flat white' }, desc: { ko: '더블 샷, 고소한 우유', en: 'Double shot, silky milk' }, price: 'NZ$5.00', tag: { ko: '커피', en: 'Coffee' } },
    { img: iced, alt: 'Iced long black with cream pouring', name: { ko: '아이스 롱 블랙', en: 'Iced long black' }, desc: { ko: '시원하고 깔끔하게', en: 'Cold and clean' }, price: 'NZ$5.50', tag: { ko: '커피', en: 'Coffee' } },
];

const hours: { d: T; t: T }[] = [
    { d: { ko: '월~금', en: 'Mon-Fri' }, t: { ko: '7:00 - 16:00', en: '7:00 - 16:00' } },
    { d: { ko: '토', en: 'Sat' }, t: { ko: '8:00 - 15:00', en: '8:00 - 15:00' } },
    { d: { ko: '일', en: 'Sun' }, t: { ko: '휴무', en: 'Closed' } },
];

const marquee: T[] = [
    { ko: '사워도우', en: 'Sourdough' }, { ko: '크루아상', en: 'Croissants' }, { ko: '초코칩 쿠키', en: 'Cookies' },
    { ko: '플랫 화이트', en: 'Flat white' }, { ko: '롱 블랙', en: 'Long black' }, { ko: '매일 아침 7시 오픈', en: 'Open 7am daily' },
];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [play, setPlay] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!('IntersectionObserver' in window)) { setPlay(true); return; }
        const io = new IntersectionObserver((es) => {
            es.forEach((e) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return <div ref={ref} className={`rv ${play ? 'play' : ''} ${className}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}

function useScrolled() {
    const [s, setS] = useState(false);
    useEffect(() => {
        const f = () => setS(window.scrollY > 30);
        f();
        window.addEventListener('scroll', f, { passive: true });
        return () => window.removeEventListener('scroll', f);
    }, []);
    return s;
}

function useParallax() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let raf = 0;
        const f = () => {
            raf = 0;
            if (ref.current) ref.current.style.transform = `translateY(${Math.min(window.scrollY * 0.28, 220)}px)`;
        };
        const on = () => { if (!raf) raf = requestAnimationFrame(f); };
        window.addEventListener('scroll', on, { passive: true });
        return () => { window.removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf); };
    }, []);
    return ref;
}

function RotatingBadge({ l }: { l: L }) {
    const label = l === 'ko' ? 'SAMPLE SITE · DEMO BAKERY · ' : 'DEMO BAKERY · SAMPLE SITE · ';
    return <div className="s-badge" aria-hidden="true">
        <svg viewBox="0 0 120 120" width="110" height="110">
            <defs><path id="cir" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
            <text className="s-badge-t"><textPath href="#cir">{label + label}</textPath></text>
        </svg>
        <div className="s-badge-c">✳</div>
    </div>;
}

function Hero({ l }: { l: L }) {
    const px = useParallax();
    return <section className="s-hero bleed">
        <div className="s-hero-px" ref={px}><img src={croissant} alt="" className="s-hero-img" /></div>
        <div className="s-hero-veil" />
        <div className="s-hero-in">
            <p className="s-kicker light up d1">{text.heroKicker[l]}</p>
            <h1 className="s-hero-h">
                <span className="up d2">{text.heroLine1[l]}</span>
                <span className="up d3 accent">{text.heroLine2[l]}</span>
            </h1>
            <p className="s-hero-sub up d4">{text.heroSub[l]}</p>
            <div className="s-hero-cta up d5">
                <Link className="s-btn" to="/menu">{text.ctaMenu[l]}</Link>
                <Link className="s-btn ghost" to="/contact">{text.ctaContact[l]}</Link>
            </div>
        </div>
        <RotatingBadge l={l} />
        <div className="s-scrollcue up d6"><span>{text.scroll[l]}</span><i /></div>
    </section>;
}

function Marquee({ l }: { l: L }) {
    const row = marquee.map((m, i) => <span key={i} className="s-mq-i">{m[l]}<b>✦</b></span>);
    return <div className="s-mq bleed" aria-hidden="true"><div className="s-mq-t">{row}{row}</div></div>;
}

function Craft({ l }: { l: L }) {
    return <section className="s-craft">
        <Reveal className="s-craft-media"><img src={loaf} alt="Rustic loaves with wheat" /><span className="s-chip">{l === 'ko' ? '매일 아침' : 'Every morning'}</span></Reveal>
        <div className="s-craft-t">
            <Reveal><p className="s-kicker">{text.craftKicker[l]}</p><h2 className="s-h2">{text.craftTitle[l]}</h2></Reveal>
            <Reveal delay={90}><p className="s-body">{text.craftBody[l]}</p></Reveal>
            <Reveal delay={160}>
                <ul className="s-stats">
                    <li><b>{text.stat1n}</b><span>{text.stat1[l]}</span></li>
                    <li><b>{text.stat2n}</b><span>{text.stat2[l]}</span></li>
                    <li><b>{text.stat3n}</b><span>{text.stat3[l]}</span></li>
                </ul>
            </Reveal>
        </div>
    </section>;
}

function Space({ l }: { l: L }) {
    return <section className="s-space">
        <Reveal><p className="s-kicker">{text.spaceKicker[l]}</p><h2 className="s-h2">{text.spaceTitle[l]}</h2><p className="s-body">{text.spaceBody[l]}</p></Reveal>
        <div className="s-strip">
            <Reveal className="s-strip-i"><img src={interior} alt="Bakery cafe interior" /></Reveal>
            <Reveal className="s-strip-i" delay={80}><img src={windowSeat} alt="Window table with coffee" /></Reveal>
            <Reveal className="s-strip-i" delay={160}><img src={displayCase} alt="Pastry display case" /></Reveal>
        </div>
    </section>;
}

function MenuCard({ it, l, i }: { it: typeof menuItems[number]; l: L; i: number }) {
    return <Reveal delay={(i % 3) * 70}>
        <article className="s-card">
            <div className="s-card-img"><img src={it.img} alt={it.alt} /><span className="s-tag">{it.tag[l]}</span></div>
            <div className="s-card-b">
                <div><h3>{it.name[l]}</h3><p>{it.desc[l]}</p></div>
                <span className="s-price">{it.price}</span>
            </div>
        </article>
    </Reveal>;
}

function MenuGrid({ l }: { l: L }) {
    return <div className="s-grid">{menuItems.map((m, i) => <MenuCard key={m.name.en} it={m} l={l} i={i} />)}</div>;
}

function Hours({ l }: { l: L }) {
    return <section className="s-hours"><h3 className="s-h3">{text.hours[l]}</h3>
        <table><tbody>{hours.map((r) => <tr key={r.d.en}><th>{r.d[l]}</th><td>{r.t[l]}</td></tr>)}</tbody></table>
    </section>;
}

function Home({ l }: { l: L }) {
    return <>
        <Hero l={l} />
        <Marquee l={l} />
        <Craft l={l} />
        <Space l={l} />
        <section className="s-menuprev">
            <Reveal><p className="s-kicker">{text.menu[l]}</p><h2 className="s-h2">{l === 'ko' ? '오늘의 진열대' : 'On the shelf today'}</h2></Reveal>
            <MenuGrid l={l} />
            <Reveal><Link className="s-btn wide" to="/menu">{text.ctaMenu[l]}</Link></Reveal>
        </section>
        <Reveal><Hours l={l} /></Reveal>
    </>;
}

function Menu({ l }: { l: L }) {
    return <section className="s-page">
        <Reveal><p className="s-kicker">{text.name[l]}</p><h1 className="s-h1">{text.menuTitle[l]}</h1></Reveal>
        <MenuGrid l={l} />
        <p className="s-note">{text.menuNote[l]}</p>
    </section>;
}

function Contact({ l }: { l: L }) {
    const [sent, setSent] = useState(false);
    return <section className="s-page">
        <Reveal><p className="s-kicker">{text.name[l]}</p><h1 className="s-h1">{text.contactTitle[l]}</h1>
        <p className="s-body">{text.formIntro[l]}</p></Reveal>
        <div className="s-contact">
            <Reveal className="s-form-wrap">
                <div className="s-form">
                    <label>{text.fName[l]}<input name="n" autoComplete="off" /></label>
                    <label>{text.fMsg[l]}<textarea name="m" rows={4} /></label>
                    <button className="s-btn" type="button" onClick={() => setSent(true)}>{text.send[l]}</button>
                    {sent && <p className="s-sent" role="status">{text.sent[l]}</p>}
                </div>
            </Reveal>
            <Reveal delay={100} className="s-info">
                <div>
                    <h3 className="s-h3">{text.address[l]}</h3>
                    <p className="s-body">{text.addr[l]}<br />+64 9 000 0000</p>
                </div>
                <Hours l={l} />
            </Reveal>
        </div>
    </section>;
}

export function App() {
    const [l, setL] = useState<L>('en');
    const scrolled = useScrolled();
    return <div className="site" lang={l}>
        <div className="s-banner">{text.banner[l]}</div>
        <header className={`s-top ${scrolled ? 'scrolled' : ''}`}>
            <Link className="s-brand" to="/"><span className="s-brand-dot">●</span>{text.name[l]}</Link>
            <nav>
                <NavLink to="/" end>{text.home[l]}</NavLink>
                <NavLink to="/menu">{text.menu[l]}</NavLink>
                <NavLink to="/contact">{text.contact[l]}</NavLink>
                <button type="button" className="s-lang" onClick={() => setL(l === 'ko' ? 'en' : 'ko')}>{l === 'ko' ? 'EN' : '한국어'}</button>
            </nav>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<Home l={l} />} />
                <Route path="/menu" element={<Menu l={l} />} />
                <Route path="/contact" element={<Contact l={l} />} />
            </Routes>
        </main>
        <footer className="s-foot">{text.foot[l]}</footer>
    </div>;
}
