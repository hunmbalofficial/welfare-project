import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/ui/Button';
import { ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found - WelfareOrg</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <h1 className="font-display text-9xl text-primary-200 font-bold leading-none mb-4">
            404
          </h1>
          <h2 className="font-display text-3xl text-primary-800 mb-4">Page Not Found</h2>
          <p className="text-neutral-500 mb-8 max-w-md mx-auto">
            The page you are looking for does not exist.
          </p>
          <Link to="/">
            <Button icon={ArrowRight}>
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
