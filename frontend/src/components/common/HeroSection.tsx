
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
}: HeroSectionProps) => {
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <section
      className={`relative py-20 ${
        backgroundImage
          ? "bg-cover bg-center"
          : "bg-gradient-to-r from-devblue-700 to-devpurple-700"
      }`}
      style={backgroundStyle}
    >
      {/* Overlay for better text contrast if background image is provided */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">{subtitle}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {ctaText && ctaLink && (
              <Link
                to={ctaLink}
                className="px-8 py-3 bg-white text-devblue-700 hover:bg-devgray-100 font-medium rounded-md transition-colors duration-300"
              >
                {ctaText}
              </Link>
            )}
            
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                to={secondaryCtaLink}
                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-md transition-colors duration-300"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
