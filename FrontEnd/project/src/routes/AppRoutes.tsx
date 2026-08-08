import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Landing from '@/pages/Landing';
import { FullPageLoader } from '@/components/Skeletons';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import Candidates from '@/pages/Candidates';
import CandidateDetails from '@/pages/CandidateDetails';


// Pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const UploadResume = lazy(() => import('@/pages/UploadResume'));
const UploadJob = lazy(() => import('@/pages/UploadJob'));
const Prediction = lazy(() => import('@/pages/Prediction'));
const PredictionPage = lazy(() => import('@/pages/PredictionPage'));
const CandidateRanking = lazy(() => import('@/pages/CandidateRanking'));
const JobList = lazy(() => import('@/pages/JobList'));
const JobDetails = lazy(() => import('@/pages/JobDetails'));
const ResumeList = lazy(() => import('@/pages/ResumeList'));
const ResumeDetails = lazy(() => import('@/pages/ResumeDetails'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Settings = lazy(() => import('@/pages/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function withError(LazyComponent: React.LazyExoticComponent<React.ComponentType>) {
  return function Wrapped() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<FullPageLoader />}>
          <LazyComponent />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

const LazyDashboard = withError(Dashboard);
const LazyUploadResume = withError(UploadResume);
const LazyUploadJob = withError(UploadJob);
const LazyPrediction = withError(Prediction);
const LazyPredictionPage = withError(PredictionPage);
const LazyCandidateRanking = withError(CandidateRanking);
const LazyJobList = withError(JobList);
const LazyJobDetails = withError(JobDetails);
const LazyResumeList = withError(ResumeList);
const LazyResumeDetails = withError(ResumeDetails);
const LazyAnalytics = withError(Analytics);
const LazySettings = withError(Settings);
const LazyNotFound = withError(NotFound);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/landing" element={<Landing />} />

      {/* App shell */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LazyDashboard />} />
        <Route path="upload-resume" element={<LazyUploadResume />} />
        <Route path="upload-job" element={<LazyUploadJob />} />
        <Route path="predictions" element={<LazyPrediction />} />
        <Route path="predictions/:resumeId" element={<LazyPredictionPage />} />
        <Route path="candidate-ranking" element={<LazyCandidateRanking />} />
        <Route path="jobs" element={<LazyJobList />} />
        <Route path="jobs/:id" element={<LazyJobDetails />} />
        <Route path="resumes" element={<LazyResumeList />} />
        <Route path="resumes/:id" element={<LazyResumeDetails />} />
        <Route path="analytics" element={<LazyAnalytics />} />
        <Route path="settings" element={<LazySettings />} />
        <Route path="*" element={<LazyNotFound />} />
      </Route>
      <Route path="/candidates" element={<Candidates />} />
      <Route path="/candidates/:id" element={<CandidateDetails />}/>
      <Route
        path="/candidate-ranking"
        element={<CandidateRanking />}
      />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}
