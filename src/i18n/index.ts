import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      artworks: 'Artworks',
      artists: 'Artists',
      about: 'About',
      contact: 'Contact',
      cart: 'Cart',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      dashboard: 'Dashboard',
      
      // Hero Section
      heroTitle: 'Discover Unique Artworks',
      heroSubtitle: 'Explore handcrafted and digital art from talented artists around the world',
      shopNow: 'Shop Now',
      
      // Categories
      physical: 'Physical Art',
      digital: 'Digital Art',
      featured: 'Featured Artworks',
      
      // Filters
      category: 'Category',
      price: 'Price',
      artist: 'Artist',
      search: 'Search artworks...',
      allCategories: 'All Categories',
      priceRange: 'Price Range',
      
      // Artwork Details
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
      dimensions: 'Dimensions',
      medium: 'Medium',
      year: 'Year',
      tags: 'Tags',
      
      // Cart
      viewCart: 'View Cart',
      checkout: 'Checkout',
      emptyCart: 'Your cart is empty',
      total: 'Total',
      quantity: 'Quantity',
      
      // Authentication
      email: 'Email',
      password: 'Password',
      name: 'Name',
      role: 'Role',
      customer: 'Customer',
      artist: 'Artist',
      admin: 'Admin',
      
      // Dashboard
      myArtworks: 'My Artworks',
      addArtwork: 'Add Artwork',
      sales: 'Sales',
      statistics: 'Statistics',
      users: 'Users',
      
      // Common
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success!',
    }
  },
  fr: {
    translation: {
      // Navigation
      home: 'Accueil',
      artworks: 'Œuvres d\'art',
      artists: 'Artistes',
      about: 'À propos',
      contact: 'Contact',
      cart: 'Panier',
      login: 'Connexion',
      logout: 'Déconnexion',
      register: 'S\'inscrire',
      dashboard: 'Tableau de bord',
      
      // Hero Section
      heroTitle: 'Découvrez des œuvres d\'art uniques',
      heroSubtitle: 'Explorez l\'art artisanal et numérique d\'artistes talentueux du monde entier',
      shopNow: 'Acheter maintenant',
      
      // Categories
      physical: 'Art physique',
      digital: 'Art numérique',
      featured: 'Œuvres mises en avant',
      
      // Filters
      category: 'Catégorie',
      price: 'Prix',
      artist: 'Artiste',
      search: 'Rechercher des œuvres...',
      allCategories: 'Toutes les catégories',
      priceRange: 'Gamme de prix',
      
      // Artwork Details
      addToCart: 'Ajouter au panier',
      outOfStock: 'Rupture de stock',
      dimensions: 'Dimensions',
      medium: 'Support',
      year: 'Année',
      tags: 'Tags',
      
      // Cart
      viewCart: 'Voir le panier',
      checkout: 'Commander',
      emptyCart: 'Votre panier est vide',
      total: 'Total',
      quantity: 'Quantité',
      
      // Authentication
      email: 'Email',
      password: 'Mot de passe',
      name: 'Nom',
      role: 'Rôle',
      customer: 'Client',
      artist: 'Artiste',
      admin: 'Admin',
      
      // Dashboard
      myArtworks: 'Mes œuvres',
      addArtwork: 'Ajouter une œuvre',
      sales: 'Ventes',
      statistics: 'Statistiques',
      users: 'Utilisateurs',
      
      // Common
      save: 'Sauvegarder',
      cancel: 'Annuler',
      edit: 'Modifier',
      delete: 'Supprimer',
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      success: 'Succès !',
    }
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      artworks: 'الأعمال الفنية',
      artists: 'الفنانون',
      about: 'حول',
      contact: 'اتصال',
      cart: 'العربة',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      register: 'التسجيل',
      dashboard: 'لوحة القيادة',
      
      // Hero Section
      heroTitle: 'اكتشف الأعمال الفنية الفريدة',
      heroSubtitle: 'استكشف الفن المصنوع يدوياً والرقمي من فنانين موهوبين حول العالم',
      shopNow: 'تسوق الآن',
      
      // Categories
      physical: 'فن مادي',
      digital: 'فن رقمي',
      featured: 'أعمال مميزة',
      
      // Filters
      category: 'الفئة',
      price: 'السعر',
      artist: 'الفنان',
      search: 'البحث عن الأعمال الفنية...',
      allCategories: 'جميع الفئات',
      priceRange: 'نطاق السعر',
      
      // Artwork Details
      addToCart: 'أضف إلى العربة',
      outOfStock: 'نفدت الكمية',
      dimensions: 'الأبعاد',
      medium: 'الوسط',
      year: 'السنة',
      tags: 'العلامات',
      
      // Cart
      viewCart: 'عرض العربة',
      checkout: 'الدفع',
      emptyCart: 'العربة فارغة',
      total: 'المجموع',
      quantity: 'الكمية',
      
      // Authentication
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      name: 'الاسم',
      role: 'الدور',
      customer: 'عميل',
      artist: 'فنان',
      admin: 'مدير',
      
      // Dashboard
      myArtworks: 'أعمالي الفنية',
      addArtwork: 'إضافة عمل فني',
      sales: 'المبيعات',
      statistics: 'الإحصائيات',
      users: 'المستخدمون',
      
      // Common
      save: 'حفظ',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'نجح!',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;