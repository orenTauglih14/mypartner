import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';

export default function Layout({
  children,
  title,
  showLogo = false,
  showBack = false,
  showNav = true,
  mainClass = '',
}) {
  return (
    <div className="app-shell">
      <Navbar title={title} showLogo={showLogo} showBack={showBack} />
      <main className={`page-content ${mainClass}`.trim()}>
        {children}
        <Footer />
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
