import React from 'react';
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
  const { activeTab, selectedEventForImpact, setSelectedEventForImpact } = useCampus();

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
    <div className="flex h-screen w-screen bg-[#F8F9FA] text-[#202124] overflow-hidden font-serif selection:bg-[#E8F0FE] selection:text-[#1A73E8]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#F8F9FA]">
        <HeaderBar />

        {/* Viewport container */}
        <main className="flex-1 overflow-y-auto">
          {renderActiveScreen()}
        </main>

        <Footer />
      </div>

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
