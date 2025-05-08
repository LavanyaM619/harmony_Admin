import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define the interface for branch data
interface Branch {
  id: number;
  name: string;
  district: string;
  address: string;
  phone: string;
  manager: string;
  hours: string;
}

// Define the interface for root data (similar to branch data)
interface Root {
  id: number;
  name: string;
  district: string;
  address: string;
  phone: string;
  manager: string;
  hours: string;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BranchAndRootDetails = () => {
  const { location } = useParams<{ location: string }>(); // Get the district from the URL params
  const [branches, setBranches] = useState<Branch[]>([]); // Store all the branches
  const [roots, setRoots] = useState<Root[]>([]); // Store all the roots
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchBranchAndRootDetails = async () => {
      try {
        // Fetch branch data
        const branchResponse = await fetch(`${API_BASE_URL}/branches`);

        const branchData = await branchResponse.json();

        // Fetch root data
        const rootResponse = await fetch(`${API_BASE_URL}/roots`);

        const rootData = await rootResponse.json();

        // Filter branches and roots based on the district in the URL (case-insensitive)
        const filteredBranches = branchData.filter((branch: Branch) => branch.district.toLowerCase() === location.toLowerCase());
        const filteredRoots = rootData.filter((root: Root) => root.district.toLowerCase() === location.toLowerCase());

        setBranches(filteredBranches); // Set the filtered branches
        setRoots(filteredRoots); // Set the filtered roots
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching branch and root details:', error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchBranchAndRootDetails(); // Fetch branch and root data when the component mounts or location changes
  }, [location]); // Re-run the effect if the location changes

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-display font-semibold">Loading...</h1>
            <p className="text-gray-600 mt-4">Please wait while we fetch the branch and root details.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (branches.length === 0 && roots.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-display font-semibold">No Data Found</h1>
            <p className="text-gray-600 mt-4">No branches or roots found for {location}.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-semibold text-center text-gray-800">{location} Details</h1>

          {/* Display Branch Details */}
          {branches.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-display font-semibold text-center text-indigo-700 mb-8">Branches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {branches.map((branch) => (
                  <div key={branch.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-display font-semibold text-gray-800">{branch.name}</h3>
                        <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">Branch</span>
                      </div>
                      <div className="space-y-4 text-gray-600">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Address:</strong> {branch.address}</p>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Phone:</strong> {branch.phone}</p>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Manager:</strong> {branch.manager}</p>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Open Time:</strong> {branch.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display Root Details */}
          {roots.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-display font-semibold text-center text-green-700 mb-8">Routes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roots.map((root) => (
                  <div key={root.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-display font-semibold text-gray-800">{root.name}</h3>
                        <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-50 rounded-full">Route</span>
                      </div>
                      <div className="space-y-4 text-gray-600">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Address:</strong> {root.address}</p>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Phone:</strong> {root.phone}</p>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Manager:</strong> {root.manager}</p>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="flex-1"><strong className="text-gray-700">Open Time:</strong> {root.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BranchAndRootDetails;
