import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AgendaTable } from './components/AgendaTable';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-agenda-gray">
        <AgendaTable />
      </div>
    </QueryClientProvider>
  );
}

export default App; 