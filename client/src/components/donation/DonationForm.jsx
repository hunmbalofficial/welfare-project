import { useState } from 'react';
import { motion } from 'framer-motion';
import { DONATION_METHODS } from '../../utils/constants';
import showToast from '../../utils/toast';
import { submitDonation } from '../../services/donationService';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    amount: '',
    paymentMethod: '',
    transactionId: '',
    message: '',
  });
  const [screenshot, setScreenshot] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.donorName || !formData.donorEmail || !formData.amount || !formData.paymentMethod) {
      showToast('Please fill all required fields', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (screenshot) data.append('screenshot', screenshot);
      await submitDonation(data);
      showToast('Thank you for your donation!');
      setFormData({ donorName: '', donorEmail: '', amount: '', paymentMethod: '', transactionId: '', message: '' });
      setScreenshot(null);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit donation', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="donorEmail"
            value={formData.donorEmail}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount ($) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          >
            <option value="">Select payment method</option>
            {DONATION_METHODS.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {formData.paymentMethod && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-primary-50 p-4 rounded-lg"
          >
            <p className="text-sm text-primary-800 font-medium">
              Send donation to: {DONATION_METHODS.find(m => m.id === formData.paymentMethod)?.number || DONATION_METHODS.find(m => m.id === formData.paymentMethod)?.details}
            </p>
          </motion.div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID / Screenshot</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all mb-3"
            placeholder="Enter transaction ID"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
            placeholder="Leave a message..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition-all disabled:opacity-50"
        >
          {submitting ? 'Processing...' : 'Complete Donation'}
        </button>
      </div>
    </motion.form>
  );
};

export default DonationForm;
