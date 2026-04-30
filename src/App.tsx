import { Route, Switch } from 'wouter';
import { Suspense, lazy } from 'react';
import { LenisProvider } from './scroll/LenisProvider';

const Landing = lazy(() => import('./pages/Landing'));
const Academy = lazy(() => import('./pages/Academy'));
const StartTrial = lazy(() => import('./pages/StartTrial'));
const ContactSales = lazy(() => import('./pages/ContactSales'));
const TrainerDetail = lazy(() => import('./pages/TrainerDetail'));

export default function App() {
  return (
    <LenisProvider>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/academy" component={Academy} />
          <Route path="/start-trial" component={StartTrial} />
          <Route path="/contact-sales" component={ContactSales} />
          <Route path="/trainers/:slug" component={TrainerDetail} />
          <Route>
            <main className="min-h-screen flex items-center justify-center text-paper">
              <p className="pilcrow">404 — not found</p>
            </main>
          </Route>
        </Switch>
      </Suspense>
    </LenisProvider>
  );
}
