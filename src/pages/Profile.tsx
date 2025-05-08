
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-semibold text-center">Your Profile</h1>
          <p className="text-center text-gray-600 mt-4">Profile page coming soon.</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
