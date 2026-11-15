'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rwuuppmdzmadcsbefpsc.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DormSpaceHome() {
  const [examMode, setExamMode] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [showVault, setShowVault] = useState(false);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*');
    if (data && data.length > 0) {
      setProducts(data);
    } else {
      setProducts([
        { id: 1, name: 'קפה שחור / נמס איכותי', description: 'להתעוררות מהירה בלילות לבנים ותקופת מבחנים.', price: 25, image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
        { id: 2, name: 'חטיף אנרגיה שוקולד-אגוזים', description: 'בוסט אנרגיה מהיר ומפנק להתרכזות עמוקה.', price: 12, image_url: 'https://images.unsplash.com/photo-1622484218942-6e2fb60e8d35?auto=format&fit=crop&w=600&q=80' },
        { id: 3, name: 'משקה אנרגיה XL', description: 'הדלק הרשמי להגשת פרויקטים ומבחני אמצע.', price: 8, image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80' },
        { id: 4, name: 'שוקולד חלב מובחר', description: 'פינוק מתוק להפסקה קצרה בחדר המעונות.', price: 18, image_url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80' }
      ]);
    }
  }

  const addToCart = (product: any) => {
    const newCart = [...cart, product];
    setCart(newCart);
    const total = newCart.reduce((sum, item) => sum + item.price, 0);
    if (total >= 79 && !vaultUnlocked) {
      setVaultUnlocked(true);
      setShowVault(true);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div dir="rtl" className={`min-h-screen transition-colors duration-500 ${examMode ? 'bg-[#1a120b] text-[#f3e5ab]' : 'bg-[#0f172a] text-slate-100'}`}>
      <header className={`border-b sticky top-0 z-50 backdrop-blur-md ${examMode ? 'bg-[#26190f]/80 border-[#3d2717]' : 'bg-slate-900/80 border-slate-800'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              DormSpace ⚡
            </h1>
            <p className="text-xs opacity-75">החנות הרשמית לסטודנטים במעונות</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-amber-500/30">
              <span className="text-xs font-medium">🌙 מצב מבחנים</span>
              <input 
                type="checkbox" 
                checked={examMode} 
                onChange={() => setExamMode(!examMode)}
                className="toggle accent-amber-500 cursor-pointer"
              />
            </div>
            <div className="bg-amber-500/20 text-amber-400 px-4 py-2 rounded-xl font-bold border border-amber-500/40">
              🛒 עגלה: {cart.length} פריטים ({totalPrice} ₪)
            </div>
          </div>
        </div>
      </header>

      <div className="bg-amber-500 text-slate-950 font-bold py-1.5 text-center text-xs overflow-hidden whitespace-nowrap">
        🔥 משלוח מהיר עד דלת החדר במעונות • רכשו מעל 79 ₪ ופתחו את כספת ההפתעות! • בהצלחה במבחנים מאיר! 🎓
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6 border-r-4 border-amber-500 pr-3">מוצרים מומלצים למעונות</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className={`group relative rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl border ${
                examMode 
                  ? 'bg-[#24170d] border-amber-900/40 hover:border-amber-500' 
                  : 'bg-slate-800/60 border-slate-700 hover:border-amber-500'
              }`}
            >
              <div className="h-40 rounded-xl overflow-hidden mb-4 bg-slate-900">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-xs opacity-70 mb-4 h-10">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-amber-400">{product.price} ₪</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all"
                >
                  הוסף לחדר 🚪
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className={`mt-12 p-6 rounded-2xl border ${examMode ? 'bg-[#24170d] border-amber-900' : 'bg-slate-800/90 border-slate-700'}`}>
            <h3 className="text-lg font-bold mb-4">📦 סיום הזמנה ומשלוח למעונות</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input 
                type="text" 
                placeholder="הכנס מספר חדר (למשל: 304, בניין ב')" 
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="bg-black/40 border border-slate-600 px-4 py-3 rounded-xl w-full sm:w-80 text-sm focus:outline-none focus:border-amber-500"
              />
              <button 
                onClick={() => alert(`ההזמנה נקלטה בהצלחה ונשלחת לחדר ${roomNumber || 'כללי'}! 🚀`)}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all"
              >
                שלח הזמנה עכשיו ({totalPrice} ₪)
              </button>
            </div>
          </div>
        )}

        {showVault && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-b from-amber-900 to-slate-900 border-2 border-amber-400 p-8 rounded-3xl max-w-md text-center shadow-2xl">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-2xl font-black text-amber-300 mb-2">כספת ההפתעות נפתחה!</h3>
              <p className="text-sm text-slate-200 mb-6">עברת את סכום ה-79 ₪! זכית בשדרוג חינם: חטיף אנרגיה נוסף מתנה בהזמנה זו!</p>
              <button 
                onClick={() => setShowVault(false)}
                className="bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-amber-300"
              >
                ישש, תודה! 🚀
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
