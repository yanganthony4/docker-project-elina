export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black">
        <div className="container mx-auto p-6">
          <nav className="bg-blue-500 text-white p-4 rounded mb-6">
            <a href="/" className="mr-4">Home</a>
            <a href="/admin">Admin Panel</a>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
