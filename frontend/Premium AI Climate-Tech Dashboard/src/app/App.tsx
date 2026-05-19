import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, BarChart3, TrendingUp, ChevronDown, Database, Cpu, Clock, Play, RotateCcw, FileCode, Flame } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { FeatureInput } from './components/FeatureInput';
import { RiskGauge } from './components/RiskGauge';
import { FeatureImportanceChart } from './components/FeatureImportanceChart';
import { PredictionHistory, PredictionRecord } from './components/PredictionHistory';
import { RiskTrendChart } from './components/RiskTrendChart';
import { Toaster } from 'sonner';
import { CollapsibleSection } from './components/CollapsibleSection';
import { PulseRadar } from './components/PulseRadar';

interface Features {
  mean_red: number;
  mean_green: number;
  mean_blue: number;
  red_blue_ratio: number;
  smoke_whiteness: number;
  haze_index: number;
  edge_density: number;
  hot_pixel_fraction: number;
  intensity_std: number;
  local_contrast: number;
}

interface PredictionResponse {
  fire_probability: number;
  fire_detected: boolean;
  confidence: number;
  risk_level: string;
  message: string;
  model_version?: string;
}

const featureImportanceData = [
  { name: 'Hot Pixel Fraction', importance: 0.24 },
  { name: 'Red/Blue Ratio', importance: 0.19 },
  { name: 'Smoke Whiteness', importance: 0.16 },
  { name: 'Haze Index', importance: 0.13 },
  { name: 'Edge Density', importance: 0.11 },
  { name: 'Mean Red', importance: 0.08 },
  { name: 'Intensity Std', importance: 0.05 },
  { name: 'Local Contrast', importance: 0.04 },
];

export default function App() {
  const [features, setFeatures] = useState<Features>({
    mean_red: 120,
    mean_green: 80,
    mean_blue: 60,
    red_blue_ratio: 2.0,
    smoke_whiteness: 0.3,
    haze_index: 0.4,
    edge_density: 0.5,
    hot_pixel_fraction: 0.02,
    intensity_std: 25,
    local_contrast: 0.6,
  });

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [showApiResponse, setShowApiResponse] = useState(false);

  const API_URL = 'http://localhost:8000/predict';

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await axios.get('http://localhost:8000/health', { timeout: 2000 });
      setBackendOnline(true);
    } catch {
      setBackendOnline(false);
    }
  };

  const updateFeature = (key: keyof Features, value: number) => {
    setFeatures((prev) => ({ ...prev, [key]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await axios.post<PredictionResponse>(API_URL, features, {
        timeout: 5000,
      });
      setPrediction(response.data);
      setApiResponse(response.data);
      setBackendOnline(true);

      const newRecord: PredictionRecord = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        probability: response.data.fire_probability * 100,
        riskLevel: response.data.risk_level,
        detected: response.data.fire_detected,
        confidence: response.data.confidence,
      };
      setPredictions((prev) => [...prev, newRecord]);

      toast.success('Prediction complete', {
        description: response.data.message,
      });
    } catch (error) {
      setBackendOnline(false);
      toast.error('Prediction failed', {
        description: 'Unable to connect to the backend API',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFeatures({
      mean_red: 120,
      mean_green: 80,
      mean_blue: 60,
      red_blue_ratio: 2.0,
      smoke_whiteness: 0.3,
      haze_index: 0.4,
      edge_density: 0.5,
      hot_pixel_fraction: 0.02,
      intensity_std: 25,
      local_contrast: 0.6,
    });
    toast.info('Features reset to defaults');
  };

  const loadSampleData = () => {
    setFeatures({
      mean_red: 185,
      mean_green: 95,
      mean_blue: 70,
      red_blue_ratio: 2.64,
      smoke_whiteness: 0.72,
      haze_index: 0.68,
      edge_density: 0.43,
      hot_pixel_fraction: 0.08,
      intensity_std: 38,
      local_contrast: 0.52,
    });
    toast.info('Sample high-risk data loaded');
  };

  const trendData = predictions.map((p) => ({
    timestamp: p.timestamp,
    probability: p.probability,
  }));

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
        }}
      />

      <Header backendOnline={backendOnline} predictionCount={predictions.length} />

      <main className="mx-auto max-w-[1800px] px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              AI Forest Fire Detection
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">
              Environmental Risk Intelligence Platform
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Predict wildfire and smoke probability using aerial-image extracted spatial features and ML inference.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              label="Model Status"
              value="Active"
              icon={Cpu}
              subtitle="Random Forest"
            />
            <StatCard
              label="API Status"
              value={backendOnline ? 'Online' : 'Offline'}
              icon={Activity}
            />
            <StatCard
              label="Predictions"
              value={predictions.length}
              icon={BarChart3}
            />
            <StatCard
              label="Avg Risk"
              value={
                predictions.length > 0
                  ? `${(predictions.reduce((acc, p) => acc + p.probability, 0) / predictions.length).toFixed(0)}%`
                  : 'N/A'
              }
              icon={TrendingUp}
            />
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Panel - Feature Control */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
            >
              <div className="border-b border-white/5 bg-slate-900/50 p-4">
                <h3 className="font-semibold text-white">Feature Control Center</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Adjust input parameters for prediction
                </p>
              </div>

              <div className="space-y-4 p-4">
                {/* Environmental Features */}
                <CollapsibleSection title="Environmental Features" defaultOpen={true}>
                  <FeatureInput
                    label="Mean Red"
                    value={features.mean_red}
                    onChange={(v) => updateFeature('mean_red', v)}
                    min={0}
                    max={255}
                    step={1}
                  />
                  <FeatureInput
                    label="Mean Green"
                    value={features.mean_green}
                    onChange={(v) => updateFeature('mean_green', v)}
                    min={0}
                    max={255}
                    step={1}
                  />
                  <FeatureInput
                    label="Mean Blue"
                    value={features.mean_blue}
                    onChange={(v) => updateFeature('mean_blue', v)}
                    min={0}
                    max={255}
                    step={1}
                  />
                  <FeatureInput
                    label="Red/Blue Ratio"
                    value={features.red_blue_ratio}
                    onChange={(v) => updateFeature('red_blue_ratio', v)}
                    min={0}
                    max={5}
                    step={0.1}
                  />
                </CollapsibleSection>

                {/* Smoke Indicators */}
                <CollapsibleSection title="Smoke Indicators" defaultOpen={true}>
                  <FeatureInput
                    label="Smoke Whiteness"
                    value={features.smoke_whiteness}
                    onChange={(v) => updateFeature('smoke_whiteness', v)}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                  <FeatureInput
                    label="Haze Index"
                    value={features.haze_index}
                    onChange={(v) => updateFeature('haze_index', v)}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                  <FeatureInput
                    label="Edge Density"
                    value={features.edge_density}
                    onChange={(v) => updateFeature('edge_density', v)}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </CollapsibleSection>

                {/* Heat & Texture */}
                <CollapsibleSection title="Heat & Texture" defaultOpen={true}>
                  <FeatureInput
                    label="Hot Pixel Fraction"
                    value={features.hot_pixel_fraction}
                    onChange={(v) => updateFeature('hot_pixel_fraction', v)}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                  <FeatureInput
                    label="Intensity Std"
                    value={features.intensity_std}
                    onChange={(v) => updateFeature('intensity_std', v)}
                    min={0}
                    max={100}
                    step={1}
                  />
                  <FeatureInput
                    label="Local Contrast"
                    value={features.local_contrast}
                    onChange={(v) => updateFeature('local_contrast', v)}
                    min={0}
                    max={1}
                    step={0.01}
                  />
                </CollapsibleSection>

                {/* Action Buttons */}
                <div className="space-y-2 border-t border-white/5 pt-4">
                  <button
                    onClick={handlePredict}
                    disabled={loading || !backendOnline}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Flame className="size-4" />
                    {loading ? 'Analyzing...' : 'Analyze Fire Risk'}
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-800/50 px-3 py-2 text-xs text-slate-300 ring-1 ring-white/5 transition-all hover:bg-slate-800"
                    >
                      <RotateCcw className="size-3" />
                      Reset Inputs
                    </button>
                    <button
                      onClick={loadSampleData}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-800/50 px-3 py-2 text-xs text-slate-300 ring-1 ring-white/5 transition-all hover:bg-slate-800"
                    >
                      <Database className="size-3" />
                      Load Sample
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Panel - Detection Intelligence */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
            >
              <div className="border-b border-white/5 bg-slate-900/50 p-4">
                <h3 className="font-semibold text-white">Live Detection Intelligence</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Real-time fire risk assessment
                </p>
              </div>

              <div className="p-6">
                {prediction ? (
                  <div className="space-y-6">
                    {/* Live Radar */}
                    <PulseRadar />

                    {/* Risk Gauge - WOW Factor */}
                    <RiskGauge
                      value={prediction.fire_probability * 100}
                      label="Fire Probability"
                    />

                    {/* Live Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-900/50 p-4 ring-1 ring-white/5">
                        <div className="text-xs text-slate-400">Live Confidence</div>
                        <div className="mt-1 text-2xl font-semibold text-white">
                          {(prediction.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-800">
                          <motion.div
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${prediction.confidence * 100}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                      <div className="rounded-xl bg-slate-900/50 p-4 ring-1 ring-white/5">
                        <div className="text-xs text-slate-400">Response Time</div>
                        <div className="mt-1 text-2xl font-semibold text-white">
                          &lt;100ms
                        </div>
                        <div className="mt-2 flex items-center gap-1.5">
                          <div className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                          <span className="text-xs text-emerald-400">Fast</span>
                        </div>
                      </div>
                    </div>

                    {/* Detection Status Card */}
                    <div className="rounded-xl bg-slate-900/50 p-4 ring-1 ring-white/5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-slate-400">Detection Status</div>
                          <div
                            className={`mt-1 text-lg font-semibold ${prediction.fire_detected ? 'text-red-400' : 'text-emerald-400'}`}
                          >
                            {prediction.fire_detected ? 'Fire Detected' : 'No Fire Detected'}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">
                            {prediction.message}
                          </div>
                        </div>
                        <div
                          className={`flex size-10 items-center justify-center rounded-full ${prediction.fire_detected ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}
                        >
                          <Flame
                            className={`size-5 ${prediction.fire_detected ? 'text-red-400' : 'text-emerald-400'}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* System Status */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-lg bg-slate-900/50 p-2.5 text-center ring-1 ring-white/5">
                        <div className="text-xs text-slate-500">Backend</div>
                        <div className="mt-0.5 text-xs font-medium text-emerald-400">
                          Online
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-900/50 p-2.5 text-center ring-1 ring-white/5">
                        <div className="text-xs text-slate-500">Model</div>
                        <div className="mt-0.5 text-xs font-medium text-emerald-400">
                          Ready
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-900/50 p-2.5 text-center ring-1 ring-white/5">
                        <div className="text-xs text-slate-500">Status</div>
                        <div className="mt-0.5 text-xs font-medium text-emerald-400">
                          Success
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[600px] flex-col items-center justify-center text-center">
                    <PulseRadar />
                    <div className="mt-8 mb-4 flex size-20 items-center justify-center rounded-full bg-slate-800/50 ring-1 ring-white/5">
                      <Zap className="size-10 text-slate-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-white">
                      Ready for Analysis
                    </h4>
                    <p className="mt-2 max-w-sm text-sm text-slate-400">
                      Adjust the feature parameters and click "Analyze Fire Risk" to start prediction.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Panel - AI Insights */}
          <div className="space-y-6 lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
            >
              <div className="border-b border-white/5 bg-slate-900/50 p-4">
                <h3 className="font-semibold text-white">Feature Importance</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Model decision factors
                </p>
              </div>
              <div className="p-4">
                <FeatureImportanceChart data={featureImportanceData} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
            >
              <div className="border-b border-white/5 bg-slate-900/50 p-4">
                <h3 className="font-semibold text-white">Model Metadata</h3>
                <p className="mt-1 text-xs text-slate-400">
                  System information
                </p>
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Model Type</span>
                  <span className="text-sm font-medium text-white">Random Forest</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Input Features</span>
                  <span className="text-sm font-medium text-white">10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">API Framework</span>
                  <span className="text-sm font-medium text-white">FastAPI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Version</span>
                  <span className="text-sm font-medium text-white">
                    {prediction?.model_version || '1.0.0'}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
            >
              <div className="border-b border-white/5 bg-slate-900/50 p-4">
                <h3 className="font-semibold text-white">System Health</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Service status monitoring
                </p>
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Backend API</span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-2 rounded-full ${backendOnline ? 'bg-emerald-400' : 'bg-slate-500'}`}
                    />
                    <span className="text-sm font-medium text-white">
                      {backendOnline ? 'Operational' : 'Offline'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Prediction Engine</span>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium text-white">Ready</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Response Time</span>
                  <span className="text-sm font-medium text-white">&lt; 100ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Analytics */}
        <div className="mt-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
          >
            <div className="border-b border-white/5 bg-slate-900/50 p-4">
              <h3 className="font-semibold text-white">Prediction History</h3>
              <p className="mt-1 text-xs text-slate-400">
                Recent analysis results
              </p>
            </div>
            <div className="p-4">
              <PredictionHistory predictions={predictions} />
            </div>
          </motion.div>

          {trendData.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
              >
                <div className="border-b border-white/5 bg-slate-900/50 p-4">
                  <h3 className="font-semibold text-white">Risk Trend</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Probability over time
                  </p>
                </div>
                <div className="p-4">
                  <RiskTrendChart data={trendData} />
                </div>
              </motion.div>

              {apiResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 ring-1 ring-white/5"
                >
                  <button
                    onClick={() => setShowApiResponse(!showApiResponse)}
                    className="flex w-full items-center justify-between border-b border-white/5 bg-slate-900/50 p-4 transition-colors hover:bg-slate-900/70"
                  >
                    <div className="text-left">
                      <h3 className="font-semibold text-white">API Response</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Technical details
                      </p>
                    </div>
                    <ChevronDown
                      className={`size-5 text-slate-400 transition-transform ${showApiResponse ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {showApiResponse && (
                    <div className="p-4">
                      <pre className="overflow-x-auto rounded-xl bg-slate-950/50 p-4 text-xs text-slate-300 ring-1 ring-white/5">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
