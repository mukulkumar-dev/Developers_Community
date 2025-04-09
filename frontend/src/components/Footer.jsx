export default function Footer() {
    return (
        <section className=" relative bg-[#0D0F20] pb-0">
      <footer className="bg-[#0D0F20] text-white pt-16 text-center">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Develop from code to cloud <br /> 
            <span className="text-blue-400">with partners that you trust</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Our partnerships ensure that your development pipeline network will work in your preferred environment — 
            whether local or in the cloud.
          </p>
          <a href="#" className="text-blue-400 font-semibold mt-3 inline-block">Our trusted partners →</a>
        </div>
  
        {/* Partner Logos & Description */}
        <div className="flex flex-wrap justify-center gap-10 mt-12 px-6">
          <div className="max-w-xs text-left">
            <img src="https://img.icons8.com/?size=100&id=33039&format=png&color=000000" alt="AWS" className="h-8" />
            <p className="mt-2 text-gray-400 text-sm">
              Simplify the development of your multi-container applications from Docker CLI to Amazon EKS and Serverless.
            </p>
          </div>
          <div className="max-w-xs text-left">
            <img src="/azure.svg" alt="Azure" className="h-8" />
            <p className="mt-2 text-gray-400 text-sm">
              Seamlessly bring container applications from your local machine and run them in Azure Container Instances.
            </p>
          </div>
          <div className="max-w-xs text-left">
            <img src="/jfrog.svg" alt="JFrog" className="h-8" />
            <p className="mt-2 text-gray-400 text-sm">
              Easily distribute and share Docker images with the JFrog Artifactory image repository and integrate all of your development tools.
            </p>
          </div>
        </div>
  
        {/* Integration Tools Section */}
        <h3 className="text-xl font-semibold mt-16">Integrate with your favorite tools and images</h3>
        <div className="flex flex-wrap justify-center gap-8 mt-6 px-6">
          {["GitLab", "MongoDB", "CircleCI", "GitHub", "Redis", "NGINX", "JFrog", "Kubernetes", "Elastic", "Bitbucket"].map((tool) => (
            <div key={tool} className="text-gray-400 text-lg flex items-center space-x-2">
              <img src={`/${tool.toLowerCase()}.svg`} alt={tool} className="h-6" />
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </footer>
      <div className="absolute top-0 left-0 w-full">
    <svg
      viewBox="0 0 1220 240"
      className="w-full h-full rotate-180"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ffffff"
        fillOpacity="1"
        d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,186.7C840,171,960,117,1080,101.3C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>
  </div>
  </section>
    );
  }
  