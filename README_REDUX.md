# Redux Implementation Guide

## Overview
This document explains how Redux has been implemented in the Job Portal application using Redux Toolkit.

## Architecture

### Store Structure
The Redux store contains two main slices:
1. **Auth Slice** - Manages authentication state (user, login status, loading, errors)
2. **Messages Slice** - Manages messaging state (conversations, unread count, loading, errors)

### Directory Structure
```
src/
├── store/
│   ├── index.ts          # Store configuration
│   ├── authSlice.ts      # Auth state slice
│   ├── messageSlice.ts   # Messages state slice
│   ├── authThunks.ts     # Async auth operations
│   └── messageThunks.ts  # Async message operations
├── hooks/
│   └── redux.ts          # Custom Redux hooks
└── context/
    ├── AuthContext.tsx   # Updated to use Redux
    └── MessageContext.tsx # Updated to use Redux
```

## Implementation Details

### 1. Store Configuration
The store is configured in `src/store/index.ts` with two reducers:
- `auth`: Handles authentication state
- `messages`: Handles messaging state

### 2. Auth Slice
Manages:
- User authentication state
- Loading indicators
- Error messages
- Login/signup/logout flows

### 3. Message Slice
Manages:
- Conversation lists
- Unread message counts
- Message sending/receiving
- Loading indicators and errors

### 4. Thunks
Async operations are handled by Redux Thunks:
- `authThunks.ts`: Login, signup, logout, password reset
- `messageThunks.ts`: Load conversations, send messages, mark as read

## Usage Examples

### Accessing State
```typescript
import { useAppSelector } from "@/hooks/redux";

const MyComponent = () => {
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);
  
  // Use state in component
};
```

### Dispatching Actions
```typescript
import { useAppDispatch } from "@/hooks/redux";
import { login } from "@/store/authThunks";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  
  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      // Handle error
    }
  };
};
```

## Migration from Context API

### Before (Context API)
```typescript
import { useAuth } from "@/context/AuthContext";

const MyComponent = () => {
  const { user, login, logout } = useAuth();
  // ...
};
```

### After (Redux)
```typescript
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { login, logout } from "@/store/authThunks";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  
  const handleLogin = () => {
    dispatch(login({ email, password }));
  };
  
  const handleLogout = () => {
    dispatch(logout());
  };
};
```

## Benefits of Redux Implementation

1. **Centralized State Management**: All application state is in one place
2. **Predictable State Updates**: State changes follow a predictable pattern
3. **Time Travel Debugging**: Easy to debug state changes
4. **Middleware Support**: Enhanced capabilities with middleware
5. **Performance Optimization**: Built-in memoization and performance optimizations

## Best Practices

1. **Use Selectors**: Access state through selectors for better performance
2. **Normalize State**: Keep state flat and normalized
3. **Use Thunks for Async**: Handle async operations with thunks
4. **Immutable Updates**: Always update state immutably
5. **Type Safety**: Use TypeScript for better type safety

## Testing

### Unit Testing Reducers
```typescript
import authSlice, { loginSuccess } from "@/store/authSlice";

describe('authSlice', () => {
  it('should handle loginSuccess', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com', role: 'jobseeker' };
    const newState = authSlice.reducer(undefined, loginSuccess(user));
    
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toEqual(user);
  });
});
```

### Testing Thunks
```typescript
import { login } from "@/store/authThunks";

describe('authThunks', () => {
  it('should login successfully', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    
    await login({ email: 'test@example.com', password: 'password' })(dispatch, getState, undefined);
    
    // Assert dispatch calls
  });
});
```

## Migration Status

- [x] Redux store setup
- [x] Auth slice implementation
- [x] Message slice implementation
- [x] Auth thunks implementation
- [x] Message thunks implementation
- [x] Context API updated to use Redux
- [x] Custom hooks created
- [ ] Full component migration (in progress)
- [ ] Comprehensive testing
- [ ] Documentation

## Future Enhancements

1. **State Persistence**: Persist Redux state to localStorage
2. **Enhanced Middleware**: Add logging, crash reporting middleware
3. **Performance Monitoring**: Add performance monitoring tools
4. **Code Splitting**: Implement code splitting for better performance
5. **Advanced Patterns**: Implement advanced Redux patterns (entity adapter, etc.)