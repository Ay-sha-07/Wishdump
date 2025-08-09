export interface Wish {
  id: string;
  title: string;
  description: string;
  category: 'funny' | 'weird' | 'wholesome' | 'life-changing' | 'whimsical';
  priceRange: string;
  imageUrl?: string;
  isGranted: boolean;
  grantedBy?: string;
  createdAt: Date;
  grantedAt?: Date;
}

export interface WishGranter {
  id: string;
  name: string;
  wishesGranted: number;
  totalSpent: number;
}