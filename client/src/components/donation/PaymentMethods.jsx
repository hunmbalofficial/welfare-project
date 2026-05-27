import { motion } from 'framer-motion';
import { FaMobileAlt, FaUniversity } from 'react-icons/fa';
import { DONATION_METHODS } from '../../utils/constants';

const icons = {
  jazzcash: FaMobileAlt,
  easypaisa: FaMobileAlt,
  bank: FaUniversity,
};

const PaymentMethods = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Payment Methods</h3>
      <div className="space-y-4">
        {DONATION_METHODS.map((method, index) => {
          const Icon = icons[method.id];
          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center p-4 bg-gray-50 rounded-xl"
            >
              <Icon className="text-2xl text-primary-600 mr-4" />
              <div>
                <div className="font-semibold text-gray-900">{method.name}</div>
                <div className="text-sm text-gray-500">{method.number || method.details}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;
