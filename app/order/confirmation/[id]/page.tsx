import Link from 'next/link';
import { CheckCircle, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params;
  const isDelivery = !id.includes('PICKUP');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-400" />
        </div>

        <h1 className="font-display text-4xl font-bold text-[#FFD700] mb-3">
          Order Confirmed!
        </h1>
        <p className="text-gray-300 text-lg mb-2">
          Thank you! Your order has been received.
        </p>
        <p className="text-sm text-gray-500 mb-8">Order #{id}</p>

        <div className="bg-[#2d0a0a] border border-[#5c1010] rounded-xl p-6 mb-8 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-5 h-5 text-[#FFD700]" />
            <div>
              <p className="font-semibold text-white">Estimated Time</p>
              <p className="text-[#FFD700] font-bold text-xl">
                {isDelivery ? '30–45 minutes' : '20–30 minutes'}
              </p>
              <p className="text-xs text-gray-400">
                {isDelivery ? 'Delivery' : 'Ready for pickup'}
              </p>
            </div>
          </div>

          <div className="border-t border-[#5c1010] pt-4">
            <p className="text-gray-300 text-sm mb-2">Questions about your order?</p>
            <a
              href="tel:6134461291"
              className="flex items-center justify-center gap-2 text-[#FFD700] font-bold text-lg hover:text-[#FFE44D] transition-colors"
            >
              <Phone className="w-5 h-5" />
              613-446-1291
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-[#FFD700] hover:bg-[#FFE44D] text-[#1a0505] font-bold"
          >
            <Link href="/menu">Order Again</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#5c1010] text-gray-300 hover:bg-[#2d0a0a] bg-transparent"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
