import Navbar from "@/components/Navbar/HomeNavbar/navbar";
import Footer from "@/components/Footer/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="space-y-12">
            {/* Header Section */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-black dark:text-white">
                About Us
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                We're a team of passionate designers and developers committed to creating stunning digital experiences that drive results.
              </p>
            </div>

            {/* Mission Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center py-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-black dark:text-white">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  We believe in the power of great design and technology to transform businesses. Our mission is to help companies elevate their digital presence and connect meaningfully with their audience.
                </p>
              </div>
              <div className="bg-gray-900 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-400">Vision Image</p>
              </div>
            </div>

            {/* Values Section */}
            <div className="py-12">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
                Our Values
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    Innovation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We stay ahead of trends and embrace new technologies to deliver cutting-edge solutions.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    Quality
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Excellence is not an act but a habit. We are committed to delivering the highest quality work.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    Collaboration
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We work closely with our clients to understand their vision and bring it to life.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="py-12">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
                Our Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Our diverse team of designers, developers, and strategists brings together expertise and creativity to solve complex challenges.
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-3 text-center">
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg h-48 flex items-center justify-center">
                      <p className="text-gray-400">Team Member {i}</p>
                    </div>
                    <h3 className="font-semibold text-black dark:text-white">
                      Team Member {i}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Role
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
