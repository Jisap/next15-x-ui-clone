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
        <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
          <div className="px-2 xsm:px-4 xxl:px-8 bg-red-200 h-screen">
            <LeftBar />
          </div>
          <div className="px-2 bg-red-200 h-screen">{children}</div>
          <div className="px-2 bg-red-200 h-screen">
            <RightBar />
          </div>
        </div>
      </body>
    </html>
  );
}
