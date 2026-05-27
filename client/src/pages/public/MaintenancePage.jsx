import { Helmet } from 'react-helmet-async';
import { Wrench } from 'lucide-react';

const MaintenancePage = () => {
  return (
    <>
      <Helmet><title>Under Maintenance - WelfareOrg</title></Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 px-4">
        <div className="text-center max-w-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-700/50 mb-8">
            <Wrench className="w-10 h-10 text-primary-200" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Under Maintenance</h1>
          <p className="text-primary-200 text-lg mb-8">
            We are currently performing scheduled maintenance to improve your experience.
            Please check back soon.
          </p>
          <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full" />
        </div>
      </div>
    </>
  );
};

export default MaintenancePage;
