import React, { useState, useEffect } from 'react';
import AddProductModal from './AddProductModal';
import { BASE_URL } from '../../../api/client';
import { getProducts, createProduct } from '../../../api/productService';

export default function InventoryView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();
        if (response.success && response.data) {
          setProducts(response.data);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSaveProduct = async (formData, rawData, coverImagePreview) => {
    try {
      // Append stock_count since AddProductModal form state is 'stock'
      formData.append('stock_count', rawData.stock);
      
      const response = await createProduct(formData);
      if (response.success && response.data) {
        setProducts([response.data, ...products]);
        setShowAddProduct(false);
      }
    } catch (err) {
      console.error("Error creating product:", err);
      throw err; // Re-throw to be handled by AddProductModal's try-catch
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Inventory Management</h2>
          <p className="text-on-surface-variant text-sm mt-1">Track components, manage stock levels, and reorder supplies.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-outline-variant text-on-surface font-label-caps text-[11px] uppercase rounded hover:bg-surface transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">add_business</span> Bulk Replenish
          </button>
          <button 
            onClick={() => setShowAddProduct(true)}
            className="px-4 py-2 bg-primary-container text-white font-label-caps text-[11px] uppercase rounded hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">add</span> New Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg level-1-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">inventory_2</span>
          </div>
          <div>
            <div className="text-[10px] font-label-caps text-on-surface-variant uppercase">Total Products</div>
            <div className="text-2xl font-black">{products.length}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg level-1-card border-l-4 border-l-error flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error">
            <span className="material-symbols-outlined text-[24px]">warning</span>
          </div>
          <div>
            <div className="text-[10px] font-label-caps text-on-surface-variant uppercase">Low / Out of Stock</div>
            <div className="text-2xl font-black text-error">{products.filter(p => p.stock_count <= 10).length}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg level-1-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
          </div>
          <div>
            <div className="text-[10px] font-label-caps text-on-surface-variant uppercase">Pending Restock</div>
            <div className="text-2xl font-black text-green-600">{products.filter(p => p.stock_count === 0).length} Items</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Product Catalog</h3>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-outline-variant w-64">
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-xs font-medium text-on-surface w-full placeholder:text-outline-variant p-0" placeholder="Search by SKU or name..." type="text" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
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
              {products.map((product) => (
                <tr key={product.sku} className="hover:bg-surface-container-low transition-colors group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-surface-container rounded border border-outline-variant flex items-center justify-center shrink-0 overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img src={`${BASE_URL}${product.images.find(i => i.is_cover)?.image || product.images[0].image}`} className="w-full h-full object-cover" alt="product"/>
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">category</span>
                        )}
                      </div>
                      <span className="font-bold cursor-pointer hover:text-secondary-container">{product.name}</span>
                    </div>
                  </td>
                  <td className="text-on-surface-variant font-mono text-xs">{product.sku}</td>
                  <td className="font-bold">৳ {product.price}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full ${product.stock_count === 0 ? 'bg-error' : product.stock_count <= 10 ? 'bg-orange-500' : 'bg-green-500'}`} 
                          style={{ width: `${Math.min(100, (product.stock_count / 50) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-8 text-right font-bold">{product.stock_count}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] uppercase border ${
                      product.status === 'URGENT' || product.status === 'OUT OF STOCK' ? 'text-error border-error bg-error/5' :
                      product.status === 'LOW STOCK' ? 'text-orange-600 border-orange-500 bg-orange-500/5' :
                      'text-green-600 border-green-500 bg-green-500/5'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1.5 hover:bg-secondary-container/10 rounded text-secondary-container transition-colors tooltip-trigger" title="Add Stock">
                        <span className="material-symbols-outlined text-[18px]">add_box</span>
                      </button>
                      <button className="p-1.5 hover:bg-surface-container rounded text-primary transition-colors tooltip-trigger" title="Edit Product">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddProduct && (
        <AddProductModal 
          onClose={() => setShowAddProduct(false)} 
          onSave={handleSaveProduct} 
        />
      )}
    </div>
  );
}
