import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

export function ProductList({ products, onDelete, onUpdate }) {
  const handleNumberChange = (id, field, value) => {
    // Remove leading zeros and convert to number
    const cleanValue = value.replace(/^0+/, '') || '0';
    onUpdate(id, field, Number(cleanValue));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => onUpdate(product.id, 'name', e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={product.quantity}
                  onChange={(e) => handleNumberChange(product.id, 'quantity', e.target.value)}
                  className="border rounded px-2 py-1 w-24"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*\.?[0-9]*"
                  value={product.unitPrice}
                  onChange={(e) => handleNumberChange(product.id, 'unitPrice', e.target.value)}
                  className="border rounded px-2 py-1 w-24"
                />
              </td>
              <td className="px-6 py-4">
                ${(product.quantity * product.unitPrice).toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}