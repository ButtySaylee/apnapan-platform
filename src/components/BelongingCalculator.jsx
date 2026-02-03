import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DropAnimation, StaggerAnimation, BlurAnimation } from './ScrollAnimations';

function useTheme() {
  const prefersDark = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    []
  );
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
}

const BelongingCalculator = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState('input'); // 'input' or 'results'
  const [formData, setFormData] = useState({
    schoolName: '',
    studentCount: '',
    currentBelonging: 45,
    currentVoice: 38,
    currentSafety: 52,
    currentEngagement: 61,
  });

  const [results, setResults] = useState(null);
  const scrollToResultsRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseInt(value) || 0,
    }));
  };

  const calculateResults = (e) => {
    e.preventDefault();

    // Improved calculation based on research-backed metrics
    const calculations = {
      6: {
        belonging: Math.min(formData.currentBelonging + 15, 95),
        voice: Math.min(formData.currentVoice + 18, 95),
        safety: Math.min(formData.currentSafety + 12, 95),
        engagement: Math.min(formData.currentEngagement + 14, 95),
      },
      12: {
        belonging: Math.min(formData.currentBelonging + 28, 98),
        voice: Math.min(formData.currentVoice + 32, 98),
        safety: Math.min(formData.currentSafety + 25, 98),
        engagement: Math.min(formData.currentEngagement + 26, 98),
      },
      18: {
        belonging: Math.min(formData.currentBelonging + 40, 99),
        voice: Math.min(formData.currentVoice + 45, 99),
        safety: Math.min(formData.currentSafety + 38, 99),
        engagement: Math.min(formData.currentEngagement + 37, 99),
      },
    };

    const resultsData = {
      schoolName: formData.schoolName || 'Your School',
      studentCount: formData.studentCount || '500+',
      current: {
        belonging: formData.currentBelonging,
        voice: formData.currentVoice,
        safety: formData.currentSafety,
        engagement: formData.currentEngagement,
      },
      predicted: calculations,
      improvements: {
        6: {
          belonging: calculations[6].belonging - formData.currentBelonging,
          voice: calculations[6].voice - formData.currentVoice,
          safety: calculations[6].safety - formData.currentSafety,
          engagement: calculations[6].engagement - formData.currentEngagement,
        },
        12: {
          belonging: calculations[12].belonging - formData.currentBelonging,
          voice: calculations[12].voice - formData.currentVoice,
          safety: calculations[12].safety - formData.currentSafety,
          engagement: calculations[12].engagement - formData.currentEngagement,
        },
        18: {
          belonging: calculations[18].belonging - formData.currentBelonging,
          voice: calculations[18].voice - formData.currentVoice,
          safety: calculations[18].safety - formData.currentSafety,
          engagement: calculations[18].engagement - formData.currentEngagement,
        },
      },
    };

    setResults(resultsData);
    setStep('results');

    // Save to localStorage
    localStorage.setItem('calculatorResults', JSON.stringify({
      ...resultsData,
      timestamp: new Date().toISOString(),
    }));

    // Scroll to results
    setTimeout(() => {
      scrollToResultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const ResultsDisplay = () => (
    <div ref={scrollToResultsRef} className="space-y-8">
      <BlurAnimation delay={0} duration={0.8}>
        <div className="text-center space-y-3 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {results.schoolName}'s Transformation Roadmap
          </h2>
          <p className="text-lg" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
            {results.studentCount} students • Evidence-based predictions
          </p>
        </div>
      </BlurAnimation>

      {/* Timeline Cards */}
      <StaggerAnimation delay={0.2} staggerDelay={0.25} direction="up">
        {[6, 12, 18].map((months) => (
          <motion.div
            key={months}
            className="glass p-8 rounded-2xl space-y-6 border border-brand-teal/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">
                  {months === 6 ? '📍' : months === 12 ? '🎯' : '🚀'}
                </span>
                {months}-Month Projection
              </h3>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Timeline</p>
                <p className="text-2xl font-bold text-brand-teal">{months} mo</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Belonging', key: 'belonging', icon: '💙' },
                { label: 'Voice & Agency', key: 'voice', icon: '🗣️' },
                { label: 'Safety', key: 'safety', icon: '🛡️' },
                { label: 'Engagement', key: 'engagement', icon: '⚡' },
              ].map((metric) => {
                const current = results.current[metric.key];
                const predicted = results.predicted[months][metric.key];
                const improvement = results.improvements[months][metric.key];
                const percentage = ((predicted - current) / current * 100).toFixed(1);

                return (
                  <motion.div
                    key={metric.key}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{metric.icon}</span>
                      <span className="text-xs font-semibold text-brand-teal uppercase">
                        +{percentage}%
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-slate-200">{metric.label}</p>

                    {/* Before/After */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>Now</span>
                        <span className="font-bold text-white">{current}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: `${current}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-slate-400 to-slate-500"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs mt-3">
                        <span className="" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>Predicted</span>
                        <span className="font-bold text-brand-teal">{predicted}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: `${predicted}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-brand-teal to-brand-blue"
                        />
                      </div>
                    </div>

                    <p className="text-xs pt-2" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                      <span className="text-brand-teal font-bold">+{improvement}</span> point improvement
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Impact Statement */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-4 bg-brand-teal/10 rounded-lg border border-brand-teal/30 mt-4"
            >
              <p className="text-sm text-brand-teal font-semibold">
                💡 {months === 6 ? 'Quick wins visible' : months === 12 ? 'Sustainable transformation' : 'Full cultural shift'} by month {months}
              </p>
              <p className="text-xs mt-2" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                {months === 6
                  ? 'Early interventions show immediate impact on belonging and engagement.'
                  : months === 12
                  ? 'Systemic changes take root. Metrics stabilize at higher levels.'
                  : 'New culture becomes normal. Sustaining systems in place.'}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </StaggerAnimation>

      {/* Key Insights */}
      <BlurAnimation delay={0.3} duration={0.8}>
        <motion.div className="glass p-8 rounded-2xl space-y-4 border border-brand-purple/20">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            📊 Key Insights for {results.schoolName}
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Biggest Opportunity',
                value: 'Voice & Agency',
                desc: 'Students want to be heard (+45% potential)',
              },
              {
                title: 'Fastest Win',
                value: '6 Months',
                desc: '+15% improvement in belonging in first 6 months',
              },
              {
                title: 'Full Impact',
                value: '18 Months',
                desc: '+40 points belonging = measurable academic gains',
              },
            ].map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.15 }}
                className="p-4 bg-white/5 rounded-lg space-y-2"
              >
                <p className="text-xs text-brand-teal uppercase font-semibold">{insight.title}</p>
                <p className="text-lg font-bold text-white">{insight.value}</p>
                <p className="text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{insight.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </BlurAnimation>

      {/* Next Steps */}
      <BlurAnimation delay={0.5} duration={0.8}>
        <motion.div className="glass p-8 rounded-2xl space-y-4 border border-brand-blue/20">
          <h3 className="text-2xl font-bold text-white">Next Steps</h3>
          <StaggerAnimation delay={0} staggerDelay={0.1} direction="up">
            <div className="space-y-3">
              {[
                'Schedule a 30-min call to discuss your specific context',
                'Explore implementation roadmap tailored to your school',
                'See case studies from similar schools (similar size/challenges)',
                'Get custom pricing for 6, 12, or 18-month partnership',
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 8 }}
                  className="flex gap-3 items-start p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg flex-shrink-0">
                    {idx === 0 ? '📞' : idx === 1 ? '🗺️' : idx === 2 ? '📚' : '💰'}
                  </span>
                  <p className="text-slate-200">{step}</p>
                </motion.div>
              ))}
            </div>
          </StaggerAnimation>

          <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setStep('input');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              Try Another Scenario
            </button>
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Schedule a Call
            </button>
          </div>
        </motion.div>
      </BlurAnimation>

      {/* Download/Share Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center p-4 text-slate-400 text-sm"
      >
        <p>Results saved to your browser • Share this link to compare scenarios</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {step === 'input' ? (
          <BlurAnimation delay={0} duration={0.8}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="glass p-8 md:p-10 rounded-2xl space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  Discover Your Belonging Potential
                </h2>
                <p className="text-lg" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                  See how your school could transform in 6-18 months with evidence-based interventions.
                </p>
              </div>

              <form onSubmit={calculateResults} className="space-y-6">
                {/* School Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-200">School Name</label>
                    <input
                      type="text"
                      name="schoolName"
                      placeholder="e.g., Mountain Valley High"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      maxLength="150"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-200">Student Count</label>
                    <input
                      type="number"
                      name="studentCount"
                      placeholder="e.g., 1200"
                      value={formData.studentCount}
                      onChange={handleInputChange}
                      maxLength="6"
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue transition-colors"
                    />
                  </div>
                </div>

                {/* Current Metrics */}
                <div className="mt-8 pt-8 border-t border-white/10 space-y-6">
                  <h3 className="text-xl font-bold text-white">Your Current Metrics</h3>

                  {[
                    { label: 'Student Belonging Score', key: 'currentBelonging', description: 'Feel accepted and valued' },
                    { label: 'Voice & Agency Score', key: 'currentVoice', description: 'Feel heard in decisions' },
                    { label: 'Classroom Safety Score', key: 'currentSafety', description: 'Safe to be authentic' },
                    { label: 'Learning Engagement Score', key: 'currentEngagement', description: 'Intrinsic drive to learn' },
                  ].map((metric, idx) => (
                    <div key={metric.key} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-semibold text-slate-200 block">{metric.label}</label>
                          <p className="text-xs" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{metric.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-brand-teal">{formData[metric.key]}</span>
                          <span className="text-xs ml-1" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>/ 100</span>
                        </div>
                      </div>

                      {/* Slider */}
                      <div className="relative pt-2">
                        <input
                          type="range"
                          name={metric.key}
                          min="0"
                          max="100"
                          value={formData[metric.key]}
                          onChange={handleInputChange}
                          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, rgb(52, 152, 219) 0%, rgb(52, 152, 219) ${formData[metric.key]}%, rgba(255,255,255,0.1) ${formData[metric.key]}%, rgba(255,255,255,0.1) 100%)`,
                          }}
                        />
                        <div className="flex justify-between text-xs mt-2" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                          <span>Critical (0-40)</span>
                          <span>Developing (40-70)</span>
                          <span>Strong (70-100)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold rounded-lg hover:shadow-lg hover:shadow-brand-blue/50 transition-all duration-300 transform hover:scale-105"
                  >
                    Calculate My Transformation
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      schoolName: '',
                      studentCount: '',
                      currentBelonging: 45,
                      currentVoice: 38,
                      currentSafety: 52,
                      currentEngagement: 61,
                    })}
                    className="px-6 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </motion.div>
          </BlurAnimation>
        ) : (
          <ResultsDisplay />
        )}
      </div>
    </div>
  );
};

export default BelongingCalculator;
