import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PrimaryActions } from './components/PrimaryActions';
import { RecentWork } from './components/RecentWork';
import { ProfileShortlisting } from './components/ProfileShortlisting';
import { RankedResults } from './components/RankedResults';
import { ResumeMDSummary } from './components/ResumeMDSummary';
import { ResumeMDProjectDetails } from './components/ResumeMDProjectDetails';
import { SubmissionReportSummary } from './components/SubmissionReportSummary';
import { SubmissionReportDetailed } from './components/SubmissionReportDetailed';
import { SubmissionReportPDF } from './components/SubmissionReportPDF';

import { TalentCloud } from './components/TalentCloud';
import { CandidateDossier } from './components/CandidateDossier';
import { ReadinessAssessment } from './components/ReadinessAssessment';
import { DeliveryReadinessCandidate } from './components/DeliveryReadinessCandidate';
import { DeliveryReadinessSummary } from './components/DeliveryReadinessSummary';
import { DeliveryReadinessReportPDF } from './components/DeliveryReadinessReportPDF';
import { PrecisionMatchReport } from './components/PrecisionMatchReport';
import { TechnicalFitReport } from './components/TechnicalFitReport';
import { CulturalFitReport } from './components/CulturalFitReport';
import { PanelFitReport } from './components/PanelFitReport';

const AVATAR_URL = "https://images.unsplash.com/photo-1717068341511-204207d72705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjb3Jwb3JhdGUlMjBwZXJzb24lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzAxOTI0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

type View = 'home' | 'shortlisting' | 'results' | 'talent-cloud' | 'candidate-detail' | 'readiness' | 'candidate-readiness-summary' | 'candidate-readiness-detailed' | 'candidate-readiness-summary-pdf' | 'candidate-readiness-detailed-pdf' | 'precision-match' | 'technical-fit' | 'cultural-fit' | 'panel-fit' | 'resume-summary' | 'resume-project-details' | 'submission-summary' | 'submission-detailed' | 'submission-pdf';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [previousView, setPreviousView] = useState<View>('home');
  const [isComparing, setIsComparing] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);

  const handleNavigate = (view: View) => {
    if (view !== 'candidate-detail' && view !== 'candidate-readiness-summary' && view !== 'candidate-readiness-detailed') {
      setIsComparing(false);
    }
    setPreviousView(currentView);
    setCurrentView(view);
  };

  const handleViewCandidate = (id: string) => {
    setSelectedCandidateId(id);
    setPreviousView(currentView);
    setCurrentView('candidate-detail');
  };

  const handleViewReadiness = (id: string) => {
    setSelectedCandidateId(id);
    setPreviousView(currentView);
    setCurrentView('candidate-readiness-summary');
  };

  // Ensure we scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="h-screen bg-[#F8FAFC] flex font-sans antialiased overflow-hidden">
      {/* Collapsible Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
      />

      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {currentView === 'home' && (
          <div className="flex flex-col h-full">
            {/* [A] Header / Context Strip */}
            <Header avatarUrl={AVATAR_URL} />

            <div className="flex-1 overflow-y-auto">
              <main className="w-full max-w-[1280px] mx-auto px-6 py-10 space-y-12">
                
                {/* [B] Primary Actions (3 large cards) */}
                <section>
                  <PrimaryActions 
                    onShortlist={() => handleNavigate('shortlisting')} 
                    onDiscover={() => handleNavigate('talent-cloud')}
                    onAssess={() => handleNavigate('readiness')}
                  />
                </section>

                {/* [C] My Recent Work (decision continuity) */}
                <section>
                  <RecentWork />
                </section>
              </main>
            </div>
          </div>
        )}

        {currentView === 'shortlisting' && (
          <div className="flex-1 h-full overflow-hidden">
            <ProfileShortlisting 
              onBack={() => handleNavigate('home')} 
              onShortlist={() => handleNavigate('results')}
            />
          </div>
        )}

        {currentView === 'results' && (
          <div className="flex-1 h-full overflow-hidden">
            <RankedResults 
              onBack={() => handleNavigate('shortlisting')} 
              onViewCandidate={handleViewCandidate}
              onCheckReadiness={handleViewReadiness}
              onViewResumeIntelligence={() => handleNavigate('resume-summary')}
              onGenerateSubmissionReport={() => handleNavigate('submission-summary')}
              isComparing={isComparing}
              setIsComparing={setIsComparing}
              selectedProfiles={selectedProfiles}
              setSelectedProfiles={setSelectedProfiles}
            />
          </div>
        )}

        {currentView === 'talent-cloud' && (
          <div className="flex-1 h-full overflow-hidden">
            <TalentCloud 
              onBack={() => handleNavigate('home')} 
              onViewCandidate={handleViewCandidate}
            />
          </div>
        )}

        {currentView === 'candidate-detail' && (
          <div className="flex-1 h-full overflow-hidden">
            <CandidateDossier 
              candidateId={selectedCandidateId} 
              onBack={() => setCurrentView(previousView)}
            />
          </div>
        )}

        {currentView === 'readiness' && (
          <div className="flex-1 h-full overflow-hidden">
            <ReadinessAssessment 
              onBack={() => handleNavigate('home')} 
              onExploreTalent={() => handleNavigate('talent-cloud')}
            />
          </div>
        )}

        {currentView === 'candidate-readiness-summary' && (
          <div className="flex-1 h-full overflow-hidden">
            <DeliveryReadinessSummary 
              candidateId={selectedCandidateId} 
              onBack={() => setCurrentView(previousView)}
              onViewPrecisionMatch={() => setCurrentView('precision-match')}
              onViewTechnicalReport={() => setCurrentView('technical-fit')}
              onViewCulturalReport={() => setCurrentView('cultural-fit')}
              onViewPanelReport={() => setCurrentView('panel-fit')}
              onSwitchToDetailed={() => setCurrentView('candidate-readiness-detailed')}
              onDownloadPDF={() => setCurrentView('candidate-readiness-summary-pdf')}
            />
          </div>
        )}

        {currentView === 'candidate-readiness-detailed' && (
          <div className="flex-1 h-full overflow-hidden">
            <DeliveryReadinessCandidate 
              candidateId={selectedCandidateId} 
              onBack={() => setCurrentView(previousView)}
              onViewPrecisionMatch={() => setCurrentView('precision-match')}
              onViewTechnicalReport={() => setCurrentView('technical-fit')}
              onViewCulturalReport={() => setCurrentView('cultural-fit')}
              onViewPanelReport={() => setCurrentView('panel-fit')}
              onSwitchToSummary={() => setCurrentView('candidate-readiness-summary')}
              onDownloadPDF={() => setCurrentView('candidate-readiness-detailed-pdf')}
            />
          </div>
        )}

        {currentView === 'precision-match' && (
          <div className="flex-1 h-full overflow-hidden">
            <PrecisionMatchReport 
              onBack={() => setCurrentView(previousView === 'candidate-readiness-summary' ? 'candidate-readiness-summary' : 'candidate-readiness-detailed')}
              candidateId={selectedCandidateId}
            />
          </div>
        )}

        {currentView === 'technical-fit' && (
          <div className="flex-1 h-full overflow-hidden">
            <TechnicalFitReport 
              onBack={() => setCurrentView(previousView === 'candidate-readiness-summary' ? 'candidate-readiness-summary' : 'candidate-readiness-detailed')}
              candidateId={selectedCandidateId}
            />
          </div>
        )}

        {currentView === 'cultural-fit' && (
          <div className="flex-1 h-full overflow-hidden">
            <CulturalFitReport 
              onBack={() => setCurrentView(previousView === 'candidate-readiness-summary' ? 'candidate-readiness-summary' : 'candidate-readiness-detailed')}
              candidateId={selectedCandidateId}
            />
          </div>
        )}

        {currentView === 'panel-fit' && (
          <div className="flex-1 h-full overflow-hidden">
            <PanelFitReport 
              onBack={() => setCurrentView(previousView === 'candidate-readiness-summary' ? 'candidate-readiness-summary' : 'candidate-readiness-detailed')}
              candidateId={selectedCandidateId}
            />
          </div>
        )}

        {currentView === 'candidate-readiness-summary-pdf' && (
          <div className="flex-1 h-full overflow-hidden">
            <DeliveryReadinessReportPDF 
              onBack={() => setCurrentView('candidate-readiness-summary')}
            />
          </div>
        )}

        {currentView === 'candidate-readiness-detailed-pdf' && (
          <div className="flex-1 h-full overflow-hidden">
            <DeliveryReadinessReportPDF 
              onBack={() => setCurrentView('candidate-readiness-detailed')}
            />
          </div>
        )}

        {currentView === 'resume-summary' && (
          <div className="flex-1 h-full overflow-hidden">
            <ResumeMDSummary 
              onBack={() => setCurrentView('results')}
              onOpenProjectDetails={() => setCurrentView('resume-project-details')}
            />
          </div>
        )}

        {currentView === 'resume-project-details' && (
          <div className="flex-1 h-full overflow-hidden">
            <ResumeMDProjectDetails 
              onBack={() => setCurrentView('resume-summary')}
            />
          </div>
        )}

        {currentView === 'submission-summary' && (
          <div className="flex-1 h-full overflow-hidden">
            <SubmissionReportSummary 
              onBack={() => setCurrentView('results')}
              onSwitchToDetailed={() => setCurrentView('submission-detailed')}
              onOpenPDFPreview={() => setCurrentView('submission-pdf')}
            />
          </div>
        )}

        {currentView === 'submission-detailed' && (
          <div className="flex-1 h-full overflow-hidden">
            <SubmissionReportDetailed 
              onBack={() => setCurrentView('results')}
              onSwitchToSummary={() => setCurrentView('submission-summary')}
              onOpenPDFPreview={() => setCurrentView('submission-pdf')}
            />
          </div>
        )}

        {currentView === 'submission-pdf' && (
          <div className="flex-1 h-full overflow-hidden">
            <SubmissionReportPDF 
              onBack={() => setCurrentView(previousView === 'submission-summary' ? 'submission-summary' : 'submission-detailed')}
            />
          </div>
        )}
      </div>
    </div>
  );
}