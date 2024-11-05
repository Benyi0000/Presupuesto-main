import React, { useState } from 'react';
import { ProductList } from './components/ProductList';
import { InvoicePreview } from './components/InvoicePreview';
import { generatePDF } from './utils/pdfGenerator';
import { companyInfo } from './config/company';

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = () => {
    const newProduct = {
      id: crypto.randomUUID(),
      name: '',
      quantity: 1,
      unitPrice: 0
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleGeneratePDF = () => {
    if (products.length === 0) {
      alert('Agregue al menos un producto antes de generar la factura.');
      return;
    }

    if (products.some(p => !p.name)) {
      alert('Por favor complete el nombre de todos los productos.');
      return;
    }

    generatePDF(products, companyInfo);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generador de Facturas</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lista de Productos</h2>
            <button
              onClick={addProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar Producto
            </button>
          </div>
          <ProductList
            products={products}
            onDelete={deleteProduct}
            onUpdate={updateProduct}
          />
        </div>

        {products.length > 0 && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Vista Previa</h2>
              <InvoicePreview products={products} companyInfo={companyInfo} />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGeneratePDF}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
              >
                Generar PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;