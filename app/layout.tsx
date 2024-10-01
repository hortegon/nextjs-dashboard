import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import RestaurantApp from './RestaurantApp';
import { Button } from './ui/button';


/* export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
} */
  
// Importa el componente RestaurantApp


export default function DashboardPage() {
  return (
    <html lang="es">
      <body className='p-4'>
      
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {}
          <div className="col-span-1 md:col-span-2">
          <RestaurantApp />
        
          </div>
        </div>
      </body>
    </html>
  );
}
