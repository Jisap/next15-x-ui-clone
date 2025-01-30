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
        <div className="flex justify-between xsm:bg-yellow-200 lg:bg-green-500 xxl:bg-pink-400">
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
