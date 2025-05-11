"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  FileText,
  Eye,
  Briefcase,
  Target,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";
import { BASE_URL, GET_ABOUTS } from "@/lib/config";
import { Loader2 } from "lucide-react";

interface About {
  id: number;
  title: string;
  serial_number: number;
  image: string;
  icon: string;
  details: string;
}

interface AboutCardProps {
  image: string;
  title: string;
  description: string;
  icon: string;
}

// Map icon strings to Lucide icons
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ElementType> = {
    mission: MessageCircle,
    plan: FileText,
    vision: Eye,
    briefcase: Briefcase,
    target: Target,
    lightbulb: Lightbulb,
    // Add more mappings as needed
  };

  // Default to Lightbulb if icon not found
  return iconMap[iconName.toLowerCase()] || Lightbulb;
};

function AboutCard({ image, title, description, icon }: AboutCardProps) {
  const Icon = getIconComponent(icon);

  return (
    <Card className="overflow-hidden ">
      <div className="relative h-48 md:h-40">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2">
          <Image
            src={image.startsWith("/media") ? `${BASE_URL}${image}` : image}
            alt={title}
            width={100}
            height={100}
            className="w-200 h-[100px] object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
      <CardContent className="relative pt-6 pb-6 px-2 text-center">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
    </Card>
  );
}

interface AboutUsProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
}

export default function AboutUs({
  title = "ABOUT US",
  description = "Bluebay IT Limited, one of Bangladesh's largest recruiting & travel conglomerates, has been a pioneer in providing a global platform to the Bangladesh recruiting & Travel industry by enabling access to state of the art recruiting & travel automation technology.",
  backgroundImage = "/aboutus1.svg?height=1200&width=1920",
}: AboutUsProps) {
  const [abouts, setAbouts] = useState<About[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const response = await fetch(GET_ABOUTS);
        if (!response.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await response.json();
        if (data && data.abouts) {
          // Sort by serial_number
          const sortedAbouts = [...data.abouts].sort(
            (a, b) => a.serial_number - b.serial_number
          );
          setAbouts(sortedAbouts);
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError("Failed to load about data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbouts();
  }, []);

  // Fallback cards if API fails or is loading
  const fallbackCards = [
    {
      image:
        "https://lottie.host/5965db75-2656-423e-834e-8d0a0015d8d9/m83x7B9bfm.lottie",
      title: "Our Mission",
      description:
        "We will grow and achieve market leadership by exceeding customers' expectations and will gain operational efficiencies in all our business activities.",
      icon: "mission",
    },
    {
      image:
        "https://lottie.host/e82ee24b-6b80-4dc8-b822-573988fec895/vJwjdYFU8f.lottie",
      title: "Our Plan",
      description:
        "Our Plan today is made up of our vision and promise that all come together to support our purpose as a company, to work with our customers and partners.",
      icon: "plan",
    },
    {
      image:
        "https://lottie.host/3a759236-1b5b-4326-85e4-2cddaf11f48c/cVUjlBUvms.lottie",
      title: "Our Vision",
      description:
        "We want to be a market leader in all the business segments in which we operate and deliver exceptional satisfaction to our customers.",
      icon: "vision",
    },
  ];

  // Use API data if available, otherwise use fallback
  const displayCards =
    abouts.length > 0
      ? abouts.map((about) => ({
          image: about.image,
          title: about.title,
          description: about.details,
          icon:
            about.icon || about.title.toLowerCase().includes("mission")
              ? "mission"
              : about.title.toLowerCase().includes("plan")
              ? "plan"
              : about.title.toLowerCase().includes("vision")
              ? "vision"
              : "lightbulb",
        }))
      : fallbackCards;

  return (
    <>
      <section
        className="relative mt-10 mb-10 px-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-white/90" />

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Illustration */}
            <div className="flex justify-center">
              <img
                src="/user-interface-img.png"
                alt="Illustration"
                className="max-w-full h-auto"
              />
            </div>

            {/* Text Content */}
            <div>
              <p className="text-sm font-semibold text-[#3b2ccc] uppercase tracking-wide">
                About Rams
              </p>
              <h2 className="text-4xl font-extrabold mb-4">
                Why the best choose to{" "}
                <span className="italic text-[#3b2ccc]">work with us</span>
              </h2>
              <div className="w-16 h-1 bg-[#3b2ccc] mb-4" />
              <p className="text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                sodales dictum viverra. Nam gravida dignissim eros. Vivamus
                congue erat ante, volutpat dictum neque dignissim eget.
              </p>
              <ul className="space-y-3 text-gray-800">
                <li className="flex items-start">
                  <span className="text-[#3b2ccc] mr-2 mt-1">▣</span> Nullam
                  placerat nunc id ornare convallis.
                </li>
                <li className="flex items-start">
                  <span className="text-[#3b2ccc] mr-2 mt-1">▣</span> Mauris id
                  dui aliquam, dapibus felis vel, iaculis risus.
                </li>
                <li className="flex items-start">
                  <span className="text-[#3b2ccc] mr-2 mt-1">▣</span> Integer
                  dapibus lorem in nisl hendrerit dictum.
                </li>
              </ul>
              <button className="mt-6 bg-[#3b2ccc] text-white px-6 py-3 rounded shadow hover:bg-[#291ba2] transition">
                PURCHASE NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/90" />

      <div className="container mx-auto relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center mt-10 mb-10">
            <Loader2 className="w-10 h-10 animate-spin text-[#0066FF]" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCards.map((card, index) => (
              <AboutCard key={index} {...card} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
