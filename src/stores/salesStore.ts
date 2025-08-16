import { create } from 'zustand';
import { mockSales, Sale } from '../data/mockData';

interface SalesState {
  sales: Sale[];
  loading: boolean;
  getSalesByArtist: (artistId: string) => Sale[];
  getSalesByCustomer: (customerId: string) => Sale[];
  getTotalRevenue: () => number;
  getRevenueByArtist: (artistId: string) => number;
  getMonthlySales: () => { month: string; sales: number; revenue: number }[];
  addSale: (sale: Omit<Sale, 'id'>) => void;
  updateSaleStatus: (saleId: string, status: Sale['status']) => void;
}

export const useSalesStore = create<SalesState>((set, get) => ({
  sales: mockSales,
  loading: false,
  
  getSalesByArtist: (artistId: string) => {
    return get().sales.filter(sale => sale.artistId === artistId);
  },
  
  getSalesByCustomer: (customerId: string) => {
    return get().sales.filter(sale => sale.customerId === customerId);
  },
  
  getTotalRevenue: () => {
    return get().sales
      .filter(sale => sale.status === 'completed')
      .reduce((total, sale) => total + sale.price, 0);
  },
  
  getRevenueByArtist: (artistId: string) => {
    return get().sales
      .filter(sale => sale.artistId === artistId && sale.status === 'completed')
      .reduce((total, sale) => total + sale.price, 0);
  },
  
  getMonthlySales: () => {
    const sales = get().sales;
    const monthlyData: { [key: string]: { sales: number; revenue: number } } = {};
    
    sales.forEach(sale => {
      const month = new Date(sale.date).toLocaleDateString('en-US', { month: 'short' });
      if (!monthlyData[month]) {
        monthlyData[month] = { sales: 0, revenue: 0 };
      }
      monthlyData[month].sales += 1;
      if (sale.status === 'completed') {
        monthlyData[month].revenue += sale.price;
      }
    });
    
    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data,
    }));
  },
  
  addSale: (newSale) => {
    const sale: Sale = {
      ...newSale,
      id: `sale-${Date.now()}`,
    };
    set(state => ({
      sales: [...state.sales, sale]
    }));
  },
  
  updateSaleStatus: (saleId, status) => {
    set(state => ({
      sales: state.sales.map(sale => 
        sale.id === saleId ? { ...sale, status } : sale
      )
    }));
  },
}));