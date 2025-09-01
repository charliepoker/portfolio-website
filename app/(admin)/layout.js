export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* No navbar or footer here - just the studio */}
        {children}
      </body>
    </html>
  )
}