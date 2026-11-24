import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Server, 
  GitBranch, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Lock,
  Layers,
  Terminal,
  RefreshCw
} from 'lucide-react';

interface PipelineRun {
  id: string;
  repo: string;
  branch: string;
  commit: string;
  stage: string;
  status: 'passed' | 'running' | 'failed';
  duration: string;
}

const initialPipelines: PipelineRun[] = [
  { id: '1', repo: 'trivy-scanner-action', branch: 'main', commit: 'a638d81', stage: 'SARIF Gate Evaluation', status: 'passed', duration: '42s' },
  { id: '2', repo: 'semgrep-sast-rules', branch: 'main', commit: 'cb22c93', stage: 'AST Pattern Matching', status: 'passed', duration: '18s' },
  { id: '3', repo: 'sonarqube-quality-gate', branch: 'main', commit: '587066c', stage: 'REST API Gate Poller', status: 'passed', duration: '1m 12s' },
  { id: '4', repo: 'git-hooks-pre-commit', branch: 'main', commit: '68eba0c', stage: 'Gitleaks & Trivy Scan', status: 'passed', duration: '8s' },
  { id: '5', repo: 'renovate-dependency-bot', branch: 'main', commit: '7619040', stage: 'Automerge Gatekeeper', status: 'passed', duration: '24s' },
  { id: '6', repo: 'github-reusable-workflows', branch: 'main', commit: '6a37e16', stage: 'Buildx Multi-Arch', status: 'passed', duration: '1m 45s' },
  { id: '7', repo: 'gitlab-multistage-cloud', branch: 'main', commit: '1f72fa0', stage: 'DinD Layer Cache Deploy', status: 'passed', duration: '2m 10s' },
  { id: '8', repo: 'zero-trust-network-security', branch: 'main', commit: '13734a1', stage: 'mTLS SVID Attestation', status: 'passed', duration: '35s' },
];

export default function App() {
  const [pipelines, setPipelines] = useState<PipelineRun[]>(initialPipelines);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">Cloud DevSecOps Platform</span>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                PROD-US-EAST
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-3 py-1.5 border border-slate-200 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition shadow-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Metrics
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              TM
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Highlights Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3 text-blue-600">
                <Server className="h-6 w-6" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Workloads</dt>
                  <dd className="text-2xl font-bold text-slate-900">142 Pods</dd>
                </dl>
              </div>
            </div>
            <div className="mt-3 text-xs text-emerald-600 font-medium flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> All clusters healthy
            </div>
          </div>

          <div className="bg-white overflow-hidden rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-emerald-50 rounded-lg p-3 text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Quality Gate Status</dt>
                  <dd className="text-2xl font-bold text-slate-900">100% Passed</dd>
                </dl>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-500 font-medium">
              Zero Critical CVEs detected
            </div>
          </div>

          <div className="bg-white overflow-hidden rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-50 rounded-lg p-3 text-indigo-600">
                <Lock className="h-6 w-6" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Zero Trust Mesh</dt>
                  <dd className="text-2xl font-bold text-slate-900">SPIFFE mTLS</dd>
                </dl>
              </div>
            </div>
            <div className="mt-3 text-xs text-indigo-600 font-medium">
              Hourly SVID Key Rotation Active
            </div>
          </div>

          <div className="bg-white overflow-hidden rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-50 rounded-lg p-3 text-amber-600">
                <Activity className="h-6 w-6" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Pipeline Latency</dt>
                  <dd className="text-2xl font-bold text-slate-900">48 Seconds</dd>
                </dl>
              </div>
            </div>
            <div className="mt-3 text-xs text-emerald-600 font-medium">
              82% cache hit ratio (Layer & NPM)
            </div>
          </div>
        </div>

        {/* Real-Time Enterprise Pipelines Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Production CI/CD Pipelines</h2>
              <p className="text-xs text-slate-500 mt-0.5">Automated quality gates, static security audits, and multi-cloud delivery.</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
              8 Active Pipelines
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Repository</th>
                  <th className="px-6 py-3">Branch & Commit</th>
                  <th className="px-6 py-3">Active Stage</th>
                  <th className="px-6 py-3">Execution Time</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                {pipelines.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 flex items-center space-x-2 text-slate-900 font-semibold">
                      <GitBranch className="h-4 w-4 text-slate-400" />
                      <span>{p.repo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                        {p.branch}@{p.commit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {p.stage}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{p.duration}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        PASSED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Controls & Microsegmentation Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center">
                <Layers className="h-5 w-5 mr-2 text-blue-600" />
                Security Defense-in-Depth Layer
              </h3>
              <span className="text-xs font-semibold text-emerald-600">Active</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Trivy Vulnerability Scan:</strong> Zero critical CVE container admission control enforced.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Semgrep SAST Engine:</strong> AST pattern analysis blocking SQLi, SSRF, and command execution.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>SonarQube Quality Gate:</strong> 80%+ test coverage enforced on new code before merge.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span><strong>Gitleaks Pre-Commit Hooks:</strong> Real-time entropy and regex scanning preventing credential leaks.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center">
                <Terminal className="h-5 w-5 mr-2 text-indigo-600" />
                Zero Trust Host Nftables Firewall
              </h3>
              <span className="text-xs font-semibold text-emerald-600">Default-Deny</span>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 text-xs font-mono text-slate-200 space-y-1">
              <p className="text-emerald-400"># table inet filter [policy drop]</p>
              <p className="text-slate-400">chain input &#123; policy drop; &#125;</p>
              <p className="text-slate-300">tcp dport 8443 accept # Mutual TLS</p>
              <p className="text-slate-300">tcp dport 8081 accept # SPIRE Workload API</p>
              <p className="text-rose-400">log prefix "[NFT-INGRESS-DENIED]: " drop</p>
            </div>
            <p className="text-xs text-slate-500">
              Automated 20-second watchdog timer prevents operator lockout during firewall reloads.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Enterprise Cloud DevOps &amp; DevSecOps Portfolio • Architect: Tayyab Masood • Maintained under MIT License.
        </div>
      </footer>
    </div>
  );
}
