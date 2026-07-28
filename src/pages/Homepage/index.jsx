import React, { useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Hero from './components/Hero';
import CategoriesGrid from './components/CategoriesGrid';
import NewArrivals from './components/NewArrivals';
import LearningGuides from './components/LearningGuides';
import Newsletter from './components/Newsletter';

export default function Homepage() {
  useEffect(() => {
    // Smooth scroll implementation
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Simple intersection observer for reveal animations
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <MainLayout>
      <Hero />
      <CategoriesGrid />
      <NewArrivals />
      <LearningGuides />
      <Newsletter />
    </MainLayout>
  );
}
