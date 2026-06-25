import { createContext, useContext, useState } from 'react';

const INIT_LEADS = [
  { id: 1, name: 'אברהם כהן', jobType: 'תיקון נזילה', date: '12 באוקטובר', phone: '050-1234567', status: 'חדש', hot: true },
  { id: 2, name: 'נועה לוי', jobType: 'התקנת דוד', date: '10 באוקטובר', phone: '052-9876543', status: 'בטיפול', hot: false },
  { id: 3, name: 'יוסי מזרחי', jobType: 'בדיקת לחץ מים', date: '09 באוקטובר', phone: '054-5544433', status: 'נסגר', hot: false },
];

const INIT_CUSTOMERS = [
  { id: 1, name: 'מיכל ברק', phone: '054-9988776', address: 'רוטשילד 22, תל אביב', visits: 12, revenue: '₪28,500', rating: 5.0, lastVisit: 'אתמול', status: 'vip', initials: 'מב' },
  { id: 2, name: 'אבי כהן', phone: '050-1234567', address: 'הרצל 12, תל אביב', visits: 8, revenue: '₪12,400', rating: 4.8, lastVisit: 'לפני 3 ימים', status: 'active', initials: 'אכ' },
  { id: 3, name: 'שרה גולדברג', phone: '052-8765432', address: 'ביאליק 5, רמת גן', visits: 3, revenue: '₪4,200', rating: 4.5, lastVisit: 'לפני שבוע', status: 'active', initials: 'שג' },
  { id: 4, name: 'יצחק פרץ', phone: '058-4433221', address: 'בגין 88, חולון', visits: 1, revenue: '₪1,800', rating: 4.0, lastVisit: 'לפני חודש', status: 'new', initials: 'יפ' },
  { id: 5, name: 'רונית אברהם', phone: '053-7766554', address: 'ויצמן 3, פתח תקווה', visits: 5, revenue: '₪7,900', rating: 4.7, lastVisit: 'לפני 5 ימים', status: 'active', initials: 'רא' },
];

const INIT_QUOTES = [
  { id: '#001248', client: 'אבי כהן', job: 'שיפוץ חדר אמבטיה', amount: '₪8,400', amountNum: 8400, status: 'open', statusLabel: 'פתוח', date: '12 באוקטובר', viewed: true, hot: true },
  { id: '#001247', client: 'שרה גולד', job: 'החלפת ברזים', amount: '₪1,200', amountNum: 1200, status: 'accepted', statusLabel: 'אושר', date: '10 באוקטובר', viewed: true, hot: false },
  { id: '#001246', client: 'מיכל לוי', job: 'התקנת דוד שמש', amount: '₪5,600', amountNum: 5600, status: 'pending', statusLabel: 'ממתין', date: '09 באוקטובר', viewed: false, hot: false },
  { id: '#001245', client: 'יוסי מזרחי', job: 'בדיקת מערכת ניקוז', amount: '₪900', amountNum: 900, status: 'rejected', statusLabel: 'נדחה', date: '07 באוקטובר', viewed: true, hot: false },
  { id: '#001244', client: 'רונית אברהם', job: 'שיפוץ מטבח', amount: '₪14,200', amountNum: 14200, status: 'open', statusLabel: 'פתוח', date: '05 באוקטובר', viewed: false, hot: true },
];

const INIT_PAYMENTS = [
  { id: '#001248', client: 'אבי כהן', job: 'שיפוץ אמבטיה', amount: '₪8,400', amountNum: 8400, due: '12 באוקטובר', status: 'overdue', daysLate: 3 },
  { id: '#001247', client: 'שרה גולד', job: 'החלפת ברזים', amount: '₪1,200', amountNum: 1200, due: '20 באוקטובר', status: 'pending', daysLate: 0 },
  { id: '#001246', client: 'מיכל לוי', job: 'התקנת דוד שמש', amount: '₪5,600', amountNum: 5600, due: '25 באוקטובר', status: 'pending', daysLate: 0 },
  { id: '#001244', client: 'רונית אברהם', job: 'שיפוץ מטבח', amount: '₪14,200', amountNum: 14200, due: '30 באוקטובר', status: 'pending', daysLate: 0 },
  { id: '#001243', client: 'יוסי מזרחי', job: 'בדיקת ניקוז', amount: '₪900', amountNum: 900, due: '05 ספטמבר', status: 'paid', daysLate: 0 },
];

const INIT_EVENTS = [
  // יום א׳ (index 0)
  { id: 10, dayIndex: 0, time: '10:00', endTime: '11:30', name: 'דוד לוי', job: 'בדיקת דוד שמש', address: 'רוטשילד 22, תל אביב', phone: '052-1111222', status: 'done', statusLabel: 'הושלם', amount: '₪600' },
  // יום ב׳ (index 1)
  { id: 11, dayIndex: 1, time: '09:30', endTime: '11:00', name: 'רחל שמש', job: 'התקנת ברז מטבח', address: 'הנביאים 5, ירושלים', phone: '053-3334444', status: 'done', statusLabel: 'הושלם', amount: '₪350' },
  { id: 12, dayIndex: 1, time: '14:00', endTime: '15:30', name: 'יעקב אברהם', job: 'תיקון אסלה', address: 'בגין 88, רמת גן', phone: '054-7778888', status: 'done', statusLabel: 'הושלם', amount: '₪480' },
  // יום ג׳ (index 2)
  { id: 13, dayIndex: 2, time: '11:00', endTime: '12:30', name: 'חנה כץ', job: 'פריקת מים קשים', address: 'הרצוג 3, פתח תקווה', phone: '050-9990000', status: 'done', statusLabel: 'הושלם', amount: '₪720' },
  // יום ד׳ (index 3) — "היום"
  { id: 1, dayIndex: 3, time: '09:00', endTime: '10:30', name: 'אבי כהן', job: 'תיקון נזילה', address: 'הרצל 12, תל אביב', phone: '050-1234567', status: 'done', statusLabel: 'הושלם', amount: '₪850' },
  { id: 2, dayIndex: 3, time: '11:30', endTime: '13:00', name: 'מיכל לוי', job: 'פגישת ייעוץ ראשונית', address: 'ביאליק 5, רמת גן', phone: '052-9876543', status: 'active', statusLabel: 'בביצוע', amount: '₪0' },
  { id: 3, dayIndex: 3, time: '14:00', endTime: '15:30', name: 'יוסי מזרחי', job: 'בדיקת לחץ מים', address: 'בן גוריון 88, חולון', phone: '054-5544433', status: 'waiting', statusLabel: 'ממתין', amount: '₪400' },
  { id: 4, dayIndex: 3, time: '16:30', endTime: '18:00', name: 'שרה גולדברג', job: 'התקנת מקלחון', address: 'ויצמן 3, פתח תקווה', phone: '052-8765432', status: 'waiting', statusLabel: 'ממתין', amount: '₪1,200' },
  // יום ה׳ (index 4)
  { id: 14, dayIndex: 4, time: '08:30', endTime: '10:00', name: 'משה פרידמן', job: 'החלפת צינורות', address: 'ז׳בוטינסקי 44, ב״ב', phone: '058-5556666', status: 'waiting', statusLabel: 'ממתין', amount: '₪1,400' },
  { id: 15, dayIndex: 4, time: '13:00', endTime: '14:30', name: 'לאה גולן', job: 'סתימה בכיור', address: 'סוקולוב 12, חולון', phone: '052-4445555', status: 'waiting', statusLabel: 'ממתין', amount: '₪320' },
  // יום ו׳ (index 5)
  { id: 16, dayIndex: 5, time: '09:00', endTime: '10:00', name: 'שמשון גרין', job: 'בדיקה לפני שבת', address: 'אחד העם 7, תל אביב', phone: '054-2223333', status: 'waiting', statusLabel: 'ממתין', amount: '₪200' },
  // שבת (index 6) — ריק
];

const INIT_INVOICES = [
  {
    id: 'INV-00124', type: 'חשבונית מס/קבלה',
    client: 'מיכל ברק', clientPhone: '054-9988776', clientVAT: '',
    job: 'תיקון דוד שמש והחלפת אנוד',
    items: [
      { desc: 'בדיקת מערכת דוד שמש', qty: 1, unit: 'עבודה', price: 350 },
      { desc: 'החלפת אנוד מגנזיום', qty: 1, unit: 'יח\'', price: 280 },
    ],
    subtotal: 630, vat: 107, total: 737,
    status: 'paid', date: '10 ביוני 2026', quoteRef: '#001247', paymentMethod: 'ביט',
  },
  {
    id: 'INV-00123', type: 'חשבונית מס',
    client: 'אבי כהן', clientPhone: '050-1234567', clientVAT: '',
    job: 'שיפוץ חדר אמבטיה מלא',
    items: [
      { desc: 'פירוק ריצוף קיים', qty: 1, unit: 'עבודה', price: 800 },
      { desc: 'ריצוף חדר אמבטיה', qty: 8, unit: 'מ"ר', price: 320 },
      { desc: 'אריחי קיר', qty: 18, unit: 'מ"ר', price: 280 },
      { desc: 'התקנת מקלחון', qty: 1, unit: 'יח\'', price: 1200 },
      { desc: 'חיבורי אינסטלציה', qty: 1, unit: 'עבודה', price: 1400 },
    ],
    subtotal: 12960, vat: 2203, total: 15163,
    status: 'sent', date: '12 ביוני 2026', quoteRef: '#001248', paymentMethod: 'העברה בנקאית',
  },
  {
    id: 'INV-00122', type: 'קבלה',
    client: 'שרה גולדברג', clientPhone: '052-8765432', clientVAT: '',
    job: 'החלפת ברזים',
    items: [
      { desc: 'החלפת ברז מטבח', qty: 1, unit: 'יח\'', price: 600 },
      { desc: 'עבודה', qty: 1, unit: 'שעות', price: 600 },
    ],
    subtotal: 1025, vat: 174, total: 1199,
    status: 'paid', date: '5 ביוני 2026', quoteRef: '', paymentMethod: 'מזומן',
  },
  {
    id: 'INV-00121', type: 'חשבונית מס',
    client: 'יצחק פרץ', clientPhone: '058-4433221', clientVAT: '',
    job: 'בדיקת מערכת ניקוז',
    items: [
      { desc: 'בדיקת ניקוז ואבחון', qty: 1, unit: 'עבודה', price: 450 },
      { desc: 'שחרור סתימה', qty: 1, unit: 'יח\'', price: 320 },
    ],
    subtotal: 770, vat: 131, total: 901,
    status: 'overdue', date: '1 ביוני 2026', quoteRef: '', paymentMethod: 'צ׳ק',
  },
];

const INIT_SUPPLIERS = [
  { id: 1, name: 'מחסן הצנרת ישראלי', contact: 'ניסים חדד', phone: '03-1234567', specialty: 'צינורות, חיבורים, ספיגות', rating: 4.8, lastOrder: 'לפני שבוע', terms: '30 ימים', category: 'צנרת' },
  { id: 2, name: 'גלר ציוד סניטרי', contact: 'יוסי גלר', phone: '052-5551234', specialty: 'כלים סניטריים, ברזים, אמבטיות', rating: 4.5, lastOrder: 'לפני חודש', terms: 'מיידי', category: 'סניטרי' },
  { id: 3, name: 'מחסן הריצוף המרכזי', contact: 'ולד מולצ׳ן', phone: '054-9876543', specialty: 'אריחי קרמיקה, פורצלן, ריצוף', rating: 4.2, lastOrder: 'לפני שבועיים', terms: '14 ימים', category: 'ריצוף' },
  { id: 4, name: 'שיא חומרי בניין', contact: 'רמי לוי', phone: '08-5551111', specialty: 'מלט, חול, חומרי בנייה כלליים', rating: 4.6, lastOrder: 'היום', terms: '60 ימים', category: 'חומרים' },
];

const INIT_INVENTORY = [
  { id: 1, name: 'ברז מטבח מדגם A200', sku: 'BRZ-001', qty: 8, minQty: 3, unit: 'יח\'', price: 145, supplier: 'גלר ציוד סניטרי', category: 'ברזים' },
  { id: 2, name: 'צינור PVC 50mm', sku: 'PVC-050', qty: 2, minQty: 10, unit: 'מ\'', price: 18, supplier: 'מחסן הצנרת ישראלי', category: 'צנרת' },
  { id: 3, name: 'קומד אמבטיה לבן', sku: 'SAN-301', qty: 5, minQty: 2, unit: 'יח\'', price: 480, supplier: 'גלר ציוד סניטרי', category: 'סניטרי' },
  { id: 4, name: 'אריחי קרמיקה 60×60', sku: 'TIL-601', qty: 45, minQty: 20, unit: 'מ"ר', price: 85, supplier: 'מחסן הריצוף המרכזי', category: 'ריצוף' },
  { id: 5, name: 'גמיש מים חמים/קרים', sku: 'FLX-100', qty: 0, minQty: 5, unit: 'יח\'', price: 35, supplier: 'מחסן הצנרת ישראלי', category: 'צנרת' },
  { id: 6, name: 'מיכל שטיפה 6 ליטר', sku: 'TLT-601', qty: 12, minQty: 4, unit: 'יח\'', price: 95, supplier: 'גלר ציוד סניטרי', category: 'אסלות' },
  { id: 7, name: 'זפת קיטוע גגות', sku: 'TAR-200', qty: 3, minQty: 5, unit: 'ק"ג', price: 65, supplier: 'שיא חומרי בניין', category: 'חומרים' },
  { id: 8, name: 'מיכסה אוטומטי לאסלה', sku: 'TLT-CVR', qty: 7, minQty: 3, unit: 'יח\'', price: 125, supplier: 'גלר ציוד סניטרי', category: 'אסלות' },
];

const INIT_PURCHASE_ORDERS = [
  { id: 'PO-0024', supplier: 'מחסן הצנרת ישראלי', items: [{ name: 'צינור PVC 50mm', qty: 20, price: 18 }, { name: 'גמיש מים חמים/קרים', qty: 10, price: 35 }], total: 710, status: 'pending', date: 'היום', eta: 'מחר' },
  { id: 'PO-0023', supplier: 'גלר ציוד סניטרי', items: [{ name: 'ברז מטבח A200', qty: 5, price: 145 }], total: 725, status: 'received', date: 'לפני שבוע', eta: 'התקבל' },
  { id: 'PO-0022', supplier: 'מחסן הריצוף המרכזי', items: [{ name: 'אריחי קרמיקה 60×60', qty: 30, price: 85 }], total: 2550, status: 'pending', date: 'לפני 3 ימים', eta: 'בעוד 5 ימים' },
  { id: 'PO-0021', supplier: 'שיא חומרי בניין', items: [{ name: 'זפת קיטוע גגות', qty: 15, price: 65 }], total: 975, status: 'cancelled', date: 'לפני חודש', eta: 'בוטל' },
];

const INIT_REMINDERS = [
  { id: 1, client: 'אבי כהן', type: 'תזכורת תשלום', channel: 'WhatsApp', nextSend: 'היום ב-10:00', lastSent: 'לפני 3 ימים', active: true, count: 3 },
  { id: 2, client: 'שרה גולד', type: 'מעקב הצעת מחיר', channel: 'SMS', nextSend: 'מחר ב-09:00', lastSent: 'לפני שבוע', active: true, count: 1 },
  { id: 3, client: 'מיכל לוי', type: 'אישור ביקור', channel: 'Email', nextSend: 'אחרי מחר ב-08:00', lastSent: 'לפני יומיים', active: false, count: 2 },
  { id: 4, client: 'יצחק פרץ', type: 'תזכורת תשלום', channel: 'WhatsApp', nextSend: 'בעוד 5 ימים', lastSent: 'לפני חודש', active: true, count: 5 },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [leads, setLeads] = useState(INIT_LEADS);
  const [customers, setCustomers] = useState(INIT_CUSTOMERS);
  const [quotes, setQuotes] = useState(INIT_QUOTES);
  const [payments, setPayments] = useState(INIT_PAYMENTS);
  const [events, setEvents] = useState(INIT_EVENTS);
  const [invoices, setInvoices] = useState(INIT_INVOICES);
  const [reminders, setReminders] = useState(INIT_REMINDERS);
  const [suppliers, setSuppliers] = useState(INIT_SUPPLIERS);
  const [inventory, setInventory] = useState(INIT_INVENTORY);
  const [purchaseOrders, setPurchaseOrders] = useState(INIT_PURCHASE_ORDERS);

  return (
    <AppContext.Provider value={{
      // Leads
      leads,
      addLead: (lead) =>
        setLeads((p) => [{ id: Date.now(), date: 'היום', hot: false, ...lead }, ...p]),
      updateLeadStatus: (id, status) =>
        setLeads((p) => p.map((l) => (l.id === id ? { ...l, status } : l))),

      // Customers
      customers,
      addCustomer: (c) =>
        setCustomers((p) => [{
          id: Date.now(),
          visits: 0,
          revenue: '₪0',
          rating: 5.0,
          lastVisit: 'היום',
          initials: (c.name || '?').slice(0, 2),
          ...c,
        }, ...p]),

      // Quotes
      quotes,
      addQuote: (q) =>
        setQuotes((p) => [{
          id: `#${String(Date.now()).slice(-6)}`,
          date: 'היום',
          viewed: false,
          hot: false,
          status: 'open',
          statusLabel: 'פתוח',
          ...q,
        }, ...p]),
      updateQuoteStatus: (id, status, statusLabel) =>
        setQuotes((p) => p.map((q) => (q.id === id ? { ...q, status, statusLabel } : q))),
      markQuoteViewed: (id) =>
        setQuotes((p) => p.map((q) => (q.id === id ? { ...q, viewed: true } : q))),

      // Payments
      payments,
      markPaymentPaid: (id) =>
        setPayments((p) => p.map((pay) => (pay.id === id ? { ...pay, status: 'paid', daysLate: 0 } : pay))),

      // Events
      events,
      addEvent: (ev) =>
        setEvents((p) => [...p, { id: Date.now(), status: 'waiting', statusLabel: 'ממתין', amount: '₪0', ...ev }]),
      markEventDone: (id) =>
        setEvents((p) => p.map((e) => (e.id === id ? { ...e, status: 'done', statusLabel: 'הושלם' } : e))),
      markEventActive: (id) =>
        setEvents((p) => p.map((e) => (e.id === id ? { ...e, status: 'active', statusLabel: 'בביצוע' } : e))),

      // Invoices
      invoices,
      addInvoice: (inv) => setInvoices((p) => [inv, ...p]),
      markInvoicePaid: (id) => setInvoices((p) => p.map((i) => i.id === id ? { ...i, status: 'paid' } : i)),

      // Suppliers
      suppliers,
      addSupplier: (s) => setSuppliers((p) => [{ id: Date.now(), rating: 5.0, lastOrder: 'טרם הוזמן', ...s }, ...p]),

      // Inventory
      inventory,
      adjustQty: (id, delta) =>
        setInventory((p) => p.map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)),
      addInventoryItem: (item) =>
        setInventory((p) => [{ id: Date.now(), qty: 0, ...item }, ...p]),

      // Purchase Orders
      purchaseOrders,
      addPurchaseOrder: (po) =>
        setPurchaseOrders((p) => [{ id: `PO-${String(Date.now()).slice(-4)}`, date: 'היום', status: 'pending', eta: 'בתיאום', ...po }, ...p]),
      markPOReceived: (id) =>
        setPurchaseOrders((p) => p.map((o) => o.id === id ? { ...o, status: 'received', eta: 'התקבל' } : o)),

      // Reminders
      reminders,
      toggleReminder: (id) =>
        setReminders((p) => p.map((r) => (r.id === id ? { ...r, active: !r.active } : r))),
      addReminder: (r) =>
        setReminders((p) => [{
          id: Date.now(),
          count: 0,
          active: true,
          lastSent: 'טרם נשלח',
          nextSend: 'מחר ב-09:00',
          ...r,
        }, ...p]),
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
