import {Link} from "react-router-dom";

export default function NotFound(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-xl text-indigo-100 mb-8">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl hover:bg-indigo-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
