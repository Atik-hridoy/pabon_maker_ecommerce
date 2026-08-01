import React, { useState, useEffect } from 'react';
import AddProductModal from './AddProductModal';
import { BASE_URL, getImageUrl } from '../../../api/client';
import { getProducts, createProduct, updateProduct, deleteProduct, updateProductStock } from '../../../api/productService';
import { toast } from '../../../components/ToastContainer';

export default function InventoryView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Search & KPI Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'LOW', 'OUT_OF_STOCK'

  // Quick Restock Modal State
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockAmount, setRestockAmount] = useState(10);
  const [updatingStock, setUpdatingStock] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getProducts();
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error("Failed to load products", err);
      toast.error("Failed to load inventory products.", "Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (formData, rawData) => {
    try {
      formData.append('stock_count', rawData.stock);
      
      let response;
      if (editingProduct) {
        response = await updateProduct(editingProduct.id, formData);
        toast.success(`Product "${rawData.name || editingProduct.name}" updated successfully!`, "Product Saved");
      } else {
        response = await createProduct(formData);
        toast.success(`Product "${rawData.name || 'Item'}" created and added to inventory!`, "Product Created");
      }
      
      setShowAddProduct(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Failed to save product details.", "Save Failed");
      throw err;
    }
  };

  const handleQuickRestockSubmit = async (e) => {
    e.preventDefault();
    if (!restockProduct) return;
    const addQty = parseInt(restockAmount, 10) || 0;
    const newStock = Math.max(0, (restockProduct.stock_count || 0) + addQty);
    setUpdatingStock(true);
    try {
      await updateProductStock(restockProduct.id, newStock);
      setProducts(prev => prev.map(p => p.id === restockProduct.id ? { ...p, stock_count: newStock } : p));
      toast.success(`Restocked "${restockProduct.name}" (+${addQty} units). New stock: ${newStock}`, "Stock Restocked");
      setRestockProduct(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product stock", "Restock Failed");
    } finally {
      setUpdatingStock(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}" from inventory?`)) return;
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      setProducts(prev => prev.filter(p => p.id !== product.id));
      toast.success(`Product "${product.name}" deleted from inventory.`, "Product Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product.", "Delete Error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleBulkReplenish = async () => {
    const lowStockItems = products.filter(p => p.stock_count <= 10);
    if (lowStockItems.length === 0) {
      toast.info("All products are currently well-stocked!", "No Low Stock");
      return;
    }
    if (!window.confirm(`Bulk replenish (+20 units) for all ${lowStockItems.length} low/out-of-stock products?`)) return;

    try {
      await Promise.all(lowStockItems.map(p => updateProductStock(p.id, p.stock_count + 20)));
      setProducts(prev => prev.map(p => {
        const item = lowStockItems.find(l => l.id === p.id);
        return item ? { ...p, stock_count: p.stock_count + 20 } : p;
      }));
      toast.success(`Bulk replenished ${lowStockItems.length} low-stock items (+20 units each)!`, "Replenish Complete");
    } catch (err) {
      console.error(err);
      toast.error("Failed to complete bulk replenishment.", "Bulk Error");
    }
  };

  // Enhanced Frontend Live Search across all product fields
  const filteredProducts = products.filter(p => {
    if (!searchQuery.trim()) {
      if (filterStatus === 'LOW') return p.stock_count <= 10 && p.stock_count > 0;
      if (filterStatus === 'OUT_OF_STOCK') return p.stock_count === 0;
      return true;
    }

    const q = searchQuery.toLowerCase().trim();
    const nameMatch = p.name?.toLowerCase().includes(q);
    const skuMatch = p.sku?.toLowerCase().includes(q);
    const categoryName = typeof p.category === 'object' ? p.category?.name : (p.category_name || p.category || '');
    const categoryMatch = String(categoryName).toLowerCase().includes(q);
    const descMatch = p.description?.toLowerCase().includes(q);
    const priceMatch = String(p.price || '').includes(q);
    const statusMatch = String(p.status || '').toLowerCase().includes(q);

    const matchesSearch = nameMatch || skuMatch || categoryMatch || descMatch || priceMatch || statusMatch;
    if (!matchesSearch) return false;

    if (filterStatus === 'LOW') return p.stock_count <= 10 && p.stock_count > 0;
    if (filterStatus === 'OUT_OF_STOCK') return p.stock_count === 0;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Inventory Management</h2>
          <p className="text-on-surface-variant text-sm mt-1">Track components, manage stock levels, and reorder supplies.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleBulkReplenish}
            className="px-4 py-2 bg-white border border-outline-variant text-on-surface font-label-caps text-[11px] uppercase rounded-xl hover:bg-surface transition-all flex items-center gap-2 font-bold shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">add_business</span> Bulk Replenish
          </button>
          <button 
            onClick={() => { setEditingProduct(null); setShowAddProduct(true); }}
            className="px-4 py-2 bg-primary text-white font-label-caps text-[11px] uppercase rounded-xl hover:bg-on-primary-fixed-variant transition-all flex items-center gap-2 font-bold shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> New Product
          </button>
        </div>
      </div>

      {/* KPI Cards (Interactive Filters) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setFilterStatus('ALL')} 
          className={`bg-white p-4 rounded-xl border transition-all cursor-pointer shadow-sm ${filterStatus === 'ALL' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/60 hover:shadow-md'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
            <div>
              <div className="text-[10px] font-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Total Products</div>
              <div className="text-2xl font-black text-on-surface">{products.length}</div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFilterStatus('LOW')} 
          className={`bg-white p-4 rounded-xl border border-l-4 border-l-orange-500 transition-all cursor-pointer shadow-sm ${filterStatus === 'LOW' ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-outline-variant/60 hover:shadow-md'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <div>
              <div className="text-[10px] font-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Low Stock (≤10)</div>
              <div className="text-2xl font-black text-orange-600">
                {products.filter(p => p.stock_count <= 10 && p.stock_count > 0).length} Items
              </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setFilterStatus('OUT_OF_STOCK')} 
          className={`bg-white p-4 rounded-xl border border-l-4 border-l-error transition-all cursor-pointer shadow-sm ${filterStatus === 'OUT_OF_STOCK' ? 'border-error ring-2 ring-error/20' : 'border-outline-variant/60 hover:shadow-md'}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-error-container/20 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[24px]">block</span>
            </div>
            <div>
              <div className="text-[10px] font-label-caps text-on-surface-variant uppercase font-bold tracking-wider">Out of Stock</div>
              <div className="text-2xl font-black text-error">
                {products.filter(p => p.stock_count === 0).length} Items
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Table Card */}
      <div className="bg-white rounded-xl border border-outline-variant/60 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-outline-variant/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-surface-container-low">
          <div className="flex items-center gap-3">
            <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">
              Product Catalog ({filteredProducts.length})
            </h3>
            {filterStatus !== 'ALL' && (
              <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary text-[11px] font-bold rounded-full flex items-center gap-1">
                Filter: {filterStatus}
                <button onClick={() => setFilterStatus('ALL')} className="hover:text-error">×</button>
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-full flex items-center gap-1">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-error font-bold">×</button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-outline-variant w-full sm:w-72 focus-within:ring-2 focus-within:ring-primary transition-all">
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 text-xs font-bold text-on-surface w-full placeholder:text-outline-variant p-0 outline-none" 
              placeholder="Search product, SKU or category..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-0.5 hover:bg-surface-variant rounded-full">
                <span className="material-symbols-outlined text-[16px] text-outline">close</span>
              </button>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center text-secondary font-bold flex items-center justify-center gap-2">
              <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>
              <span>Loading inventory catalog from database...</span>
            </div>
          ) : (
            <table className="w-full high-density-table min-w-[800px]">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock Level</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-technical-data">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-on-surface-variant font-medium text-xs">
                      No inventory items match your search or status filter.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const isOutOfStock = product.stock_count === 0;
                    const isLowStock = product.stock_count <= 10 && product.stock_count > 0;
                    const statusText = isOutOfStock ? 'OUT OF STOCK' : isLowStock ? 'LOW STOCK' : 'IN STOCK';
                    const statusStyle = isOutOfStock ? 'text-error border-error bg-error/5' : isLowStock ? 'text-orange-600 border-orange-500 bg-orange-500/5' : 'text-green-600 border-green-500 bg-green-500/5';

                    return (
                      <tr key={product.id || product.sku} className="hover:bg-surface-container-low transition-colors group">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-surface-container rounded-lg border border-outline-variant flex items-center justify-center shrink-0 overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                <img src={getImageUrl(product.images.find(i => i.is_cover)?.image || product.images[0].image)} className="w-full h-full object-cover" alt={product.name}/>
                              ) : (
                                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">category</span>
                              )}
                            </div>
                            <div>
                              <span className="font-bold block text-on-surface text-xs">{product.name}</span>
                              <span className="text-[10px] text-on-surface-variant">{product.category?.name || 'General'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-on-surface-variant font-mono text-xs font-bold">{product.sku}</td>
                        <td className="font-bold text-on-surface">৳ {Number(product.price).toLocaleString()}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                              <div 
                                className={`h-full ${isOutOfStock ? 'bg-error' : isLowStock ? 'bg-orange-500' : 'bg-green-500'}`} 
                                style={{ width: `${Math.min(100, (product.stock_count / 50) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs w-8 text-right font-bold">{product.stock_count}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${statusStyle}`}>
                            {statusText}
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="flex gap-1 justify-end">
                            {/* Quick Restock Action */}
                            <button 
                              onClick={() => { setRestockProduct(product); setRestockAmount(10); }}
                              className="p-1.5 hover:bg-green-100 text-green-700 rounded-lg transition-colors" 
                              title="Quick Restock"
                            >
                              <span className="material-symbols-outlined text-[18px]">add_box</span>
                            </button>

                            {/* Edit Product Action */}
                            <button 
                              onClick={() => { setEditingProduct(product); setShowAddProduct(true); }}
                              className="p-1.5 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors" 
                              title="Edit Product"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>

                            {/* Delete Product Action */}
                            <button 
                              onClick={() => handleDeleteProduct(product)}
                              disabled={deletingId === product.id}
                              className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg transition-colors disabled:opacity-50" 
                              title="Delete Product"
                            >
                              <span className="material-symbols-outlined text-[18px]">{deletingId === product.id ? 'sync' : 'delete'}</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showAddProduct && (
        <AddProductModal 
          initialData={editingProduct}
          onClose={() => { setShowAddProduct(false); setEditingProduct(null); }} 
          onSave={handleSaveProduct} 
        />
      )}

      {/* Quick Restock Modal */}
      {restockProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setRestockProduct(null)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden border border-outline-variant animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <h3 className="font-bold text-on-surface text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">add_box</span>
                Quick Stock Replenish
              </h3>
              <button onClick={() => setRestockProduct(null)} className="p-1 hover:bg-surface-variant rounded-lg">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleQuickRestockSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                  প্রোডাক্ট (Product)
                </label>
                <div className="p-3 bg-surface-container-low rounded-xl font-bold text-sm text-on-surface">
                  {restockProduct.name} ({restockProduct.sku})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    বর্তমান স্টক (Current Stock)
                  </label>
                  <div className="p-3 bg-surface-container-low rounded-xl font-bold text-sm text-on-surface">
                    {restockProduct.stock_count} টি
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                    নতুন স্টক সংখ্যা (+ Add Quantity)
                  </label>
                  <input 
                    type="number"
                    min="1"
                    value={restockAmount}
                    onChange={(e) => setRestockAmount(e.target.value)}
                    className="w-full px-3 py-2.5 border border-outline-variant rounded-xl font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
                    placeholder="কয়টি নতুন আইটেম যোগ করবেন?"
                    required
                  />
                </div>
              </div>

              {/* Dynamic Stock Calculation Preview Box */}
              <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                <div className="text-xs text-green-900">
                  <span className="font-medium">হিসাব: </span> 
                  {restockProduct.stock_count} (বর্তমান) + {parseInt(restockAmount || 0, 10)} (নতুন)
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-green-700 font-bold uppercase block">মোট নতুন স্টক হবে</span>
                  <span className="text-base font-black text-green-800">
                    {Math.max(0, (restockProduct.stock_count || 0) + (parseInt(restockAmount || 0, 10)))} টি
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setRestockProduct(null)} 
                  className="px-4 py-2 border border-outline-variant text-on-surface font-bold text-xs rounded-xl hover:bg-surface-variant transition-colors"
                >
                  Cancel (বাতিল)
                </button>
                <button 
                  type="submit" 
                  disabled={updatingStock}
                  className="px-5 py-2 bg-green-600 text-white font-bold text-xs rounded-xl hover:bg-green-700 transition-colors shadow-md disabled:opacity-50 flex items-center gap-1"
                >
                  {updatingStock ? 'Saving...' : 'স্টক যোগ করুন (Save Stock)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
