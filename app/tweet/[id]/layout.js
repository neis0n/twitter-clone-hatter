import '../../globals.css';

export default function RootLayout({ children }) {
  return (
    <main className={'flex flex-col min-h-screen'}>

      {/* every page of the web app will be wrapped in this layout */}
      <div className="mb-6 bg-amber-100">Tweet Details Layout</div>
      {children}
    </main>
  );
}
