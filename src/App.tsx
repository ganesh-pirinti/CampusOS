import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Radio, 
  Bus, 
  GraduationCap, 
  Zap, 
  X 
} from 'lucide-react';
import { CampusProvider, useCampus } from './context/CampusContext';
import { Sidebar } from './components/layout/Sidebar';
import { HeaderBar } from './components/layout/HeaderBar';
import { Footer } from './components/layout/Footer';
import { OverviewScreen } from './components/overview/OverviewScreen';
import { LiveCampusScreen } from './components/mobility/LiveCampusScreen';
import { MobilityOSScreen } from './components/mobility/MobilityOSScreen';
import { AchievementOSScreen } from './components/achievement/AchievementOSScreen';
import { MentorOSScreen } from './components/mentor/MentorOSScreen';
import { RouteOSScreen } from './components/route/RouteOSScreen';
import { AccessOSScreen } from './components/access/AccessOSScreen';
import { SystemGraphScreen } from './components/graph/SystemGraphScreen';
import { EventSimulatorScreen } from './components/simulator/EventSimulatorScreen';
import { ImpactModal } from './components/common/ImpactModal';

const DashboardContent: React.FC = () => {
  const { activeTab, setActiveTab, selectedEventForImpact, setSelectedEventForImpact } = useCampus();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewScreen />;
      case 'live_campus':
        return <LiveCampusScreen />;
      case 'mobility':
        return <MobilityOSScreen />;
      case 'achievement':
        return <AchievementOSScreen />;
      case 'mentor':
        return <MentorOSScreen />;
      case 'route':
        return <RouteOSScreen />;
      case 'access':
        return <AccessOSScreen />;
      case 'graph':
        return <SystemGraphScreen />;
      case 'simulator':
        return <EventSimulatorScreen />;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F8F9FA] text-[#202124] overflow-hidden font-serif selection:bg-[#E8F0FE] selection:text-[#1A73E8] relative">
      {/* Desktop Sidebar Navigation */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-[#202124]/50 backdrop-blur-xs lg:hidden animate-fadeIn"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col justify-between animate-fadeIn">
            <div className="flex justify-end p-3 border-b border-[#DADCE0]">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] hover:text-[#202124]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar 
              className="w-full h-full border-r-0 shadow-none" 
              onItemClick={() => setIsMobileMenuOpen(false)} 
            />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#F8F9FA]">
        <HeaderBar onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)} />

        {/* Viewport container */}
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
          {renderActiveScreen()}
        </main>

        <Footer className="hidden lg:block" />
      </div>

      {/* Bottom Mobile Thumb Navigation Bar (for small phone screens) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 border-t border-[#DADCE0] px-2 py-1 flex items-center justify-around shadow-lg pb-safe backdrop-blur-md">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-2 rounded-md transition-colors ${
            activeTab === 'overview' ? 'text-[#1A73E8] font-bold' : 'text-[#5F6368]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-[10px] font-serif mt-0.5">Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('live_campus')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-2 rounded-md transition-colors ${
            activeTab === 'live_campus' ? 'text-[#1A73E8] font-bold' : 'text-[#5F6368]'
          }`}
        >
          <Radio className="w-4 h-4 text-[#EA4335]" />
          <span className="text-[10px] font-serif mt-0.5">Live</span>
        </button>

        <button
          onClick={() => setActiveTab('mobility')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-2 rounded-md transition-colors ${
            activeTab === 'mobility' ? 'text-[#1A73E8] font-bold' : 'text-[#5F6368]'
          }`}
        >
          <Bus className="w-4 h-4 text-[#4285F4]" />
          <span className="text-[10px] font-serif mt-0.5">Mobility</span>
        </button>

        <button
          onClick={() => setActiveTab('mentor')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-2 rounded-md transition-colors ${
            activeTab === 'mentor' ? 'text-[#1A73E8] font-bold' : 'text-[#5F6368]'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-[#FBBC05]" />
          <span className="text-[10px] font-serif mt-0.5">Mentor</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-2 rounded-md transition-colors ${
            activeTab === 'simulator' ? 'text-[#1A73E8] font-bold' : 'text-[#5F6368]'
          }`}
        >
          <Zap className="w-4 h-4 text-[#4285F4]" />
          <span className="text-[10px] font-serif mt-0.5">Simulator</span>
        </button>
      </nav>

      {/* Global Impact Modal */}
      {selectedEventForImpact && (
        <ImpactModal
          event={selectedEventForImpact}
          onClose={() => setSelectedEventForImpact(null)}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <CampusProvider>
      <DashboardContent />
    </CampusProvider>
  );
}

export default App;
