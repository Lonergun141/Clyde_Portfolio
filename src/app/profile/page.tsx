import { technologies } from "@/lib/constants";

const Profile = () => {
  const mainTechnologies = [
    'React', 'Next.js', 'TypeScript', 'TailwindCSS', 'React Native'
  ];

  const creativeTools = [
    'Adobe Lightroom', 'Adobe Premiere Pro', 'Canon Photography', 'UI/UX Design', 
     'Video Editing'
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] pt-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-4 auto-rows-[250px] gap-6 mb-12">
          {/* Main Info Card */}
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/20 p-8">
            <h1 className="text-5xl font-light text-brand-primary mb-6">
              About <span className="font-medium">Me</span>
            </h1>
            <p className="text-lg text-brand-secondary/80 leading-relaxed">
              I'm a versatile creator specializing in frontend development and digital media. 
              Combining my passion for code with videography and design, I create engaging 
              digital experiences across web, mobile, and video platforms.
            </p>
          </div>

          {/* Profile Image */}
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl">
            <div className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/profile-image.jpg')" }} />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-4 auto-rows-[200px] gap-6">
          {/* Development Stack */}
          <div className="col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/20 p-8">
            <h2 className="text-2xl font-medium text-brand-primary mb-6">
              Development Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {mainTechnologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-white/30 backdrop-blur-sm 
                           text-brand-primary rounded-full text-sm
                           border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Creative Tools */}
          <div className="col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/20 p-8">
            <h2 className="text-2xl font-medium text-brand-primary mb-6">
              Creative Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {creativeTools.map((tool) => (
                <span 
                  key={tool} 
                  className="px-4 py-2 bg-white/30 backdrop-blur-sm 
                           text-brand-primary rounded-full text-sm
                           border border-white/20"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
