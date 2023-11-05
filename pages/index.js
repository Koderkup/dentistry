
import { Inter } from 'next/font/google'
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Loading/>
      <p>home</p>
    </>
  );
}
