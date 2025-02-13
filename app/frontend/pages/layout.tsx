

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
