export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  size?: string;
  crust?: string;
  stuffedCrust?: string;
  stuffedCrustPrice?: number;
  sauces?: string[];
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Order {
  id?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderType: 'pickup' | 'delivery';
  customerName: string;
  phone: string;
  address?: string;
  instructions?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
  source: 'web' | 'voice';
}
