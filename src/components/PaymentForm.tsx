import React, { useState } from 'react';
import { CreditCardIcon, ShieldCheckIcon, LockIcon } from 'lucide-react';
interface PaymentFormProps {
  amount: number;
  serviceName: string;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}
export function PaymentForm({
  amount,
  serviceName,
  onPaymentSuccess,
  onCancel
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const platformFee = amount * 0.05; // 5% platform fee
  const total = amount + platformFee;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
      {/* Payment Details */}
      <div className="p-8 md:w-2/3">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Payment Details
        </h2>

        {/* Payment Method Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 font-medium transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
            
            <CreditCardIcon className="h-5 w-5" />
            Credit / Debit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 font-medium transition-colors ${paymentMethod === 'paypal' ? 'border-[#00457C] bg-[#00457C]/5 text-[#00457C]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
            
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg">
              
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
            </svg>
            PayPal
          </button>
        </div>

        {paymentMethod === 'card' ?
        <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="label">Cardholder Name</label>
                <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                required />
              
              </div>

              <div>
                <label className="label">Card Number</label>
                <div className="relative">
                  <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  required />
                
                  <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="label">Expiry Date</label>
                  <input
                  type="text"
                  className="input-field"
                  placeholder="MM/YY"
                  maxLength={5}
                  required />
                
                </div>
                <div>
                  <label className="label">CVV</label>
                  <input
                  type="text"
                  className="input-field"
                  placeholder="123"
                  maxLength={4}
                  required />
                
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline flex-1"
              disabled={isProcessing}>
              
                Cancel
              </button>
              <button
              type="submit"
              className="btn btn-primary flex-1 flex items-center justify-center gap-2"
              disabled={isProcessing}>
              
                {isProcessing ?
              <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </> :

              <>
                    <LockIcon className="h-4 w-4" />
                    Pay Rs. {total.toLocaleString()}
                  </>
              }
              </button>
            </div>
          </form> :

        <div className="text-center py-8">
            <p className="text-gray-600 mb-6">
              You will be redirected to PayPal to complete your secure payment.
            </p>
            <div className="flex items-center gap-4">
              <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline flex-1">
              
                Cancel
              </button>
              <button
              type="button"
              onClick={handleSubmit}
              className="btn bg-[#0079C1] hover:bg-[#00457C] text-white flex-1"
              disabled={isProcessing}>
              
                {isProcessing ? 'Redirecting...' : 'Proceed to PayPal'}
              </button>
            </div>
          </div>
        }
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-8 md:w-1/3 border-l border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{serviceName}</span>
            <span className="font-medium text-gray-900">
              Rs. {amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              Platform Fee
              <span
                className="text-xs text-gray-400"
                title="Helps us maintain the platform">
                
                (5%)
              </span>
            </span>
            <span className="font-medium text-gray-900">
              Rs. {platformFee.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-primary">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
          <ShieldCheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-relaxed">
            Payments are secure and encrypted. CloudServe holds your payment
            until the service is completed to your satisfaction.
          </p>
        </div>
      </div>
    </div>);

}