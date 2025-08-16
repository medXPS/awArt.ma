import React from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Users, Award, Globe, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const { t } = useTranslation();

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const stats = [
    { label: 'Artists Worldwide', value: '1,200+', icon: Users },
    { label: 'Artworks Available', value: '15,000+', icon: Palette },
    { label: 'Countries Served', value: '50+', icon: Globe },
    { label: 'Customer Satisfaction', value: '99%', icon: Award },
  ];

  const features = [
    {
      icon: Palette,
      title: 'Curated Collection',
      description: 'Every artwork is carefully selected and verified for authenticity and quality by our team of art experts.',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'All purchases are protected with advanced security measures and buyer protection guarantees.',
    },
    {
      icon: Heart,
      title: 'Supporting Artists',
      description: 'We provide artists with the tools and platform they need to showcase and sell their work globally.',
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with art lovers, collectors, and artists from around the world in our vibrant community.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=300&h=300&fit=crop&crop=face',
      bio: 'Former gallery curator with 15 years in the art world.',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Technology',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=300&h=300&fit=crop&crop=face',
      bio: 'Tech entrepreneur passionate about connecting art and technology.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Artist Relations',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?w=300&h=300&fit=crop&crop=face',
      bio: 'Professional artist and advocate for emerging talent.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%227%22 cy=%227%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              {t('about')} ArtVault
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
            >
              We're on a mission to democratize art by connecting talented artists with art lovers worldwide, 
              creating a vibrant marketplace where creativity thrives.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="text-center"
              >
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  ArtVault was born from a simple belief: that exceptional art should be accessible to everyone, 
                  and talented artists should have a platform to share their work with the world.
                </p>
                <p>
                  Founded in 2020 by a team of art enthusiasts and technology experts, we started with a vision 
                  to bridge the gap between artists and art lovers through innovative technology and a deep 
                  appreciation for creativity.
                </p>
                <p>
                  Today, we're proud to be home to over 1,200 artists from 50+ countries, offering everything 
                  from traditional paintings to cutting-edge digital art. Every piece tells a story, and we're 
                  here to help those stories find their perfect audience.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/1070527/pexels-photo-1070527.jpeg?w=300&h=400&fit=crop"
                  alt="Art gallery"
                  className="w-full aspect-[3/4] object-cover rounded-2xl shadow-lg"
                />
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?w=300&h=300&fit=crop"
                    alt="Artist working"
                    className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                  />
                  <img
                    src="https://images.pexels.com/photos/1292115/pexels-photo-1292115.jpeg?w=300&h=200&fit=crop"
                    alt="Art collection"
                    className="w-full aspect-[3/2] object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a marketplace – we're a community dedicated to supporting artists and art lovers alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind ArtVault who are dedicated to supporting artists and art lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg group-hover:shadow-xl transition-shadow"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
              Whether you're an artist looking to showcase your work or an art lover seeking unique pieces, 
              we invite you to be part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-medium">
                Browse Artworks
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-colors font-medium">
                Become an Artist
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;