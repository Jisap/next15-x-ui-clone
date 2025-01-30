import LeftBar from "@/components/LeftBar";
import "./globals.css";
import RightBar from "@/components/RightBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex justify-between sm:bg-blue-300 md:bg-green-300 lg:bg-pink-400 xl:bg-yellow-200 2xl:bg-slate-400">
          <div>
            <LeftBar />
          </div>
          <div>{children}</div>
          <div>
            <RightBar />
          </div>
        </div>
      </body>
    </html>
  );
}
