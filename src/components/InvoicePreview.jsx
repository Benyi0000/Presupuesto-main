import React from 'react';
import { format } from 'date-fns';

export function InvoicePreview({ products, companyInfo }) {
  const total = products.reduce((sum, product) => sum + (product.quantity * product.unitPrice), 0);

  return (
    <div id="invoice-preview" className="bg-white p-8 shadow-lg rounded-lg">
      <div className="flex justify-between items-start mb-8">
        <div>
          <img src={companyInfo.logo} alt="Logo" className="h-16 w-auto" />
          <h2 className="text-xl font-bold mt-4">{companyInfo.name}</h2>
          <p className="text-gray-600">{companyInfo.address}</p>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold">PRESUPUESTO</h1>
          <p className="text-gray-600">Fecha: {format(new Date(), 'dd/MM/yyyy')}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Producto</th>
            <th className="text-right py-2">Cantidad</th>
            <th className="text-right py-2">Precio Unit.</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2">{product.name}</td>
              <td className="text-right py-2">{product.quantity}</td>
              <td className="text-right py-2">${product.unitPrice.toFixed(2)}</td>
              <td className="text-right py-2">${(product.quantity * product.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-right font-bold py-4">Total:</td>
            <td className="text-right font-bold py-4">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
