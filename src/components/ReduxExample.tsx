import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearError } from "@/store/authSlice";

const ReduxExample = () => {
  const dispatch = useAppDispatch();
  const authState: any = useAppSelector((state: any) => state.auth);
  
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Redux State Example</h2>
      
      <div className="space-y-2">
        <p><strong>User:</strong> {authState.user ? `${authState.user.name} (${authState.user.email})` : 'Not logged in'}</p>
        <p><strong>Authenticated:</strong> {authState.isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>Loading:</strong> {authState.loading ? 'Yes' : 'No'}</p>
        {authState.error && (
          <div className="flex items-center justify-between bg-red-100 p-2 rounded">
            <p><strong>Error:</strong> {authState.error}</p>
            <button 
              onClick={handleClearError}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReduxExample;