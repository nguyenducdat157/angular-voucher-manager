export interface Voucher {
  id: string;
  code: string;
  description: string;
  status: 'Available' | 'Used' | 'Expired';
  expiryDate: Date;
}