import "@/app/globals.css";
import Footer from "@/components/Footer"

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <header className="flex justify-center hide-on-small-parent">
            <h1 className="hover:text-black">Welcome to Amazing Shift Tracker™</h1>
          </header>

          {children}

          <footer className="flex justify-center">
            <Footer/>
          </footer>
        </div>
      </body>
    </html>
  );
}