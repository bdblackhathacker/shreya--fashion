import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Facebook,
  Flower2,
  Heart,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';

const FACEBOOK_PAGE = 'https://www.facebook.com/profile.php?id=61596030993714';
const FACEBOOK_MESSAGES = 'https://www.facebook.com/messages/t/61596030993714';

const collections = [
  {
    id: 'beauty',
    category: 'Beauty & personal care',
    title: 'Everyday beauty, your way.',
    description: 'Explore cosmetics and personal-care favourites chosen to help you feel like yourself.',
    image: '/images/beauty-collection.jpg',
    alt: 'Editorial arrangement of luxury cosmetics, lipsticks, and beauty-care products in rose, ivory and berry tones',
    eyebrow: 'THE BEAUTY EDIT',
  },
  {
    id: 'accessories',
    category: 'Fashion accessories',
    title: 'The finishing touch.',
    description: 'Discover accessories that bring a little more personality to your everyday style.',
    image: '/images/accessories-collection.jpg',
    alt: 'Editorial arrangement of a blush designer handbag, gold jewelry and stylish sunglasses',
    eyebrow: 'THE STYLE EDIT',
  },
];

function Logo({ compact = false }) {
  return (
    <a className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}`} href="#home" aria-label="Shreya Fashion & Beauty home">
      <img src="/assets/shreya-fashion-beauty-logo.png" alt="Shreya Fashion & Beauty" />
      <span className="brand-copy">
        <span className="brand-name">Shreya</span>
        <span className="brand-subtitle">FASHION &amp; BEAUTY</span>
      </span>
    </a>
  );
}

function Header({ itemCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <div className="announcement"><Sparkles size={13} strokeWidth={1.7} /><span>Beauty, fashion &amp; a little something just for you</span></div>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav${menuOpen ? ' main-nav--open' : ''}`} aria-label="Main navigation">
            <a href="#collections" onClick={closeMenu}>Collections</a>
            <a href="#our-story" onClick={closeMenu}>Our story</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-facebook" href={FACEBOOK_PAGE} target="_blank" rel="noreferrer" onClick={closeMenu}><Facebook size={15} /> Facebook <ArrowUpRight size={13} /></a>
          </nav>
          <button className="bag-button" type="button" onClick={onOpenCart} aria-label={`Open enquiry basket, ${itemCount} items`}>
            <ShoppingBag size={18} strokeWidth={1.65} /><span className="bag-label">Your picks</span><span className="bag-count">{itemCount}</span>
          </button>
        </div>
      </header>
    </>
  );
}

function CollectionCard({ collection, onAdd }) {
  return (
    <article className="collection-card" id={collection.id}>
      <div className="collection-photo-wrap">
        <img className="collection-photo" src={collection.image} alt={collection.alt} loading="lazy" />
        <span className="photo-caption"><span className="photo-dot" /> Collection inspiration</span>
      </div>
      <div className="collection-copy">
        <span className="eyebrow">{collection.eyebrow}</span>
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
        <div className="collection-bottom">
          <span className="category-tag">{collection.category}</span>
          <button className="text-link" type="button" onClick={() => onAdd(collection.id)}>
            Add to your picks <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Basket({ open, onClose, items, onChangeQuantity, onRemove }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('drawer-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('drawer-open');
    };
  }, [open, onClose]);

  if (!open) return null;
  const lines = Object.entries(items);
  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="basket-drawer" role="dialog" aria-modal="true" aria-labelledby="basket-title">
        <div className="basket-head">
          <div><span className="eyebrow">A LITTLE LIST OF LOVES</span><h2 id="basket-title">Your picks</h2></div>
          <button className="icon-button" type="button" aria-label="Close basket" onClick={onClose}><X size={21} /></button>
        </div>
        {lines.length === 0 ? (
          <div className="basket-empty"><span className="empty-flower"><Flower2 size={27} /></span><h3>Nothing in your picks yet</h3><p>Browse the collection edits and add something you would like to ask us about.</p><button className="button button--berry" type="button" onClick={onClose}>Explore collections <ArrowDown size={15} /></button></div>
        ) : (
          <>
            <div className="basket-lines">
              {lines.map(([id, quantity]) => {
                const collection = collections.find((item) => item.id === id);
                return (
                  <div className="basket-line" key={id}>
                    <img src={collection.image} alt="" />
                    <div className="basket-line-copy"><span className="basket-category">{collection.category}</span><strong>{collection.title}</strong><span className="price-note">Price &amp; availability confirmed by message</span><div className="quantity-control"><button type="button" aria-label={`Remove one ${collection.category}`} onClick={() => onChangeQuantity(id, quantity - 1)}><Minus size={13} /></button><span>{quantity}</span><button type="button" aria-label={`Add one ${collection.category}`} onClick={() => onChangeQuantity(id, quantity + 1)}><Plus size={13} /></button></div></div>
                    <button className="remove-line" type="button" onClick={() => onRemove(id)}>Remove</button>
                  </div>
                );
              })}
            </div>
            <div className="basket-note"><Heart size={15} /><p>We'll help confirm the current items, price, availability and delivery details before you order.</p></div>
            <div className="basket-footer"><a className="button button--berry button--wide" href={FACEBOOK_MESSAGES} target="_blank" rel="noreferrer" onClick={onClose}>Continue on Facebook <ArrowUpRight size={16} /></a><p>No payment details are collected on this website. Confirm checkout and payment directly with Shreya Fashion.</p></div>
          </>
        )}
      </aside>
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState({});
  const [basketOpen, setBasketOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const itemCount = useMemo(() => Object.values(items).reduce((total, quantity) => total + quantity, 0), [items]);

  const addToPicks = (id) => {
    setItems((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setNotice('Added to your picks');
    window.setTimeout(() => setNotice(''), 2200);
  };
  const changeQuantity = (id, quantity) => {
    setItems((current) => {
      if (quantity < 1) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: quantity };
    });
  };
  const removeItem = (id) => setItems((current) => {
    const next = { ...current };
    delete next[id];
    return next;
  });

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header itemCount={itemCount} onOpenCart={() => setBasketOpen(true)} />
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true" />
          <div className="hero-sheen" aria-hidden="true" />
          <div className="hero-content page-width">
            <span className="eyebrow hero-eyebrow"><span className="tiny-flower">✿</span> SHREYA FASHION &amp; BEAUTY · DINAJPUR</span>
            <h1 id="hero-title">Beauty, made <em>personal.</em></h1>
            <p className="hero-description">Explore beauty essentials and fashion accessories to help you enhance your beauty and express your style.</p>
            <div className="hero-actions"><a className="button button--berry" href="#collections">Discover the edits <ArrowRight size={16} /></a><a className="hero-secondary" href={FACEBOOK_MESSAGES} target="_blank" rel="noreferrer">Ask us a question <ArrowUpRight size={15} /></a></div>
            <div className="hero-place"><span className="place-icon"><Flower2 size={15} /></span><span><strong>Local to Dinajpur</strong><small>Bangladesh · Always open on Facebook</small></span></div>
          </div>
          <div className="hero-mark" aria-hidden="true"><span>BEAUTY</span><i>✳</i><span>STYLE</span></div>
          <a className="scroll-hint" href="#collections"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="intro-strip" aria-label="Store categories">
          <div className="page-width intro-strip-inner"><span><Sparkles size={15} /> BEAUTY &amp; PERSONAL CARE</span><i>✳</i><span>FASHION ACCESSORIES</span><i>✳</i><span>MADE FOR YOUR EVERYDAY</span></div>
        </section>

        <section className="collections-section section-pad" id="collections">
          <div className="page-width">
            <div className="section-heading">
              <div><span className="eyebrow"><span className="tiny-flower">✿</span> A LOVELY PLACE TO START</span><h2>Find your <em>feel-good.</em></h2></div>
              <p>Browse our collection inspiration, then message us for today's styles, prices and availability.</p>
            </div>
            <div className="collections-grid">
              {collections.map((collection) => <CollectionCard key={collection.id} collection={collection} onAdd={addToPicks} />)}
            </div>
            <p className="catalog-note"><Sparkles size={14} /> Collection imagery is for inspiration. Product selection, price and availability are confirmed directly with the business.</p>
          </div>
        </section>

        <section className="story-section" id="our-story">
          <div className="story-ornament" aria-hidden="true"><Flower2 size={130} strokeWidth={0.6} /><span>✿</span></div>
          <div className="page-width story-inner">
            <div className="story-symbol"><img src="/assets/shreya-fashion-beauty-logo.png" alt="" loading="lazy" /></div>
            <div className="story-copy"><span className="eyebrow">A NOTE FROM SHREYA FASHION</span><h2>Look beautiful.<br /><em>Feel confident.</em></h2><p>Beauty and style are personal. Shreya Fashion brings together cosmetics, beauty care and fashion accessories for the little moments that make you feel more like you.</p><a className="text-link story-link" href={FACEBOOK_PAGE} target="_blank" rel="noreferrer">Get to know us on Facebook <ArrowUpRight size={15} /></a></div>
            <div className="story-pill"><span className="pill-icon"><MapPinIcon /></span><span><strong>From Dinajpur</strong><small>Serving the local community</small></span></div>
          </div>
        </section>

        <section className="promise-section section-pad">
          <div className="page-width">
            <div className="promise-heading"><span className="eyebrow">SIMPLE, PERSONAL, DIRECT</span><h2>A little more <em>you.</em></h2></div>
            <div className="promise-grid">
              <article><span className="promise-icon"><Sparkles size={18} /></span><span className="eyebrow">01 / EXPLORE</span><h3>Find your favourites</h3><p>Browse beauty-care and fashion-accessory inspiration in one easy place.</p></article>
              <article><span className="promise-icon"><Facebook size={18} /></span><span className="eyebrow">02 / CONNECT</span><h3>Ask us directly</h3><p>Message Shreya Fashion for current picks, prices and product details.</p></article>
              <article><span className="promise-icon"><Check size={18} /></span><span className="eyebrow">03 / CONFIRM</span><h3>Know before you order</h3><p>Confirm availability, delivery and payment details with the business before checkout.</p></article>
            </div>
          </div>
        </section>

        <section className="social-cta" id="contact">
          <div className="social-glow" aria-hidden="true" />
          <div className="page-width social-cta-inner"><span className="social-icon"><Facebook size={22} /></span><div className="social-copy"><span className="eyebrow">LET'S MAKE IT PERSONAL</span><h2>Questions? We're just a <em>message away.</em></h2><p>See the latest from Shreya Fashion and ask about products directly on Facebook.</p></div><a className="button button--light" href={FACEBOOK_MESSAGES} target="_blank" rel="noreferrer">Message Shreya Fashion <ArrowUpRight size={16} /></a></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div className="footer-brand"><Logo compact /><p>Enhance your beauty.<br />Express your style.</p><a className="footer-facebook" href={FACEBOOK_PAGE} target="_blank" rel="noreferrer"><Facebook size={16} /> Find us on Facebook <ArrowUpRight size={13} /></a></div>
          <div className="footer-col"><span className="eyebrow">EXPLORE</span><a href="#collections">Beauty &amp; personal care</a><a href="#accessories">Fashion accessories</a><a href="#our-story">Our story</a></div>
          <div className="footer-col"><span className="eyebrow">NEED TO KNOW</span><a href={FACEBOOK_MESSAGES} target="_blank" rel="noreferrer">Product &amp; price questions</a><a href={FACEBOOK_MESSAGES} target="_blank" rel="noreferrer">Ordering &amp; delivery</a><a href={FACEBOOK_MESSAGES} target="_blank" rel="noreferrer">Returns &amp; store policies</a></div>
          <div className="footer-local"><span className="eyebrow">SAY HELLO</span><p><MapPinIcon /> Dinajpur, Bangladesh</p><a href={FACEBOOK_MESSAGES} target="_blank" rel="noreferrer">Message us on Facebook <ArrowUpRight size={13} /></a><small>Business hours listed as always open on Facebook.</small></div>
        </div>
        <div className="page-width footer-bottom"><span>© {new Date().getFullYear()} Shreya Fashion &amp; Beauty</span><span>Product details, prices and availability are confirmed directly by the business.</span><a href={FACEBOOK_PAGE} target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={12} /></a></div>
      </footer>

      {notice && <div className="toast" role="status"><Check size={16} /> {notice}</div>}
      <Basket open={basketOpen} onClose={() => setBasketOpen(false)} items={items} onChangeQuantity={changeQuantity} onRemove={removeItem} />
    </>
  );
}

function MapPinIcon() {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5" /></svg>;
}
