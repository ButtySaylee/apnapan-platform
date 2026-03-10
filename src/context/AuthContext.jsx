import React, { createContext, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

const AUTH_STORAGE_KEY = 'apnapan_user';
const SIGN_OUT_TIMEOUT_MS = 8000;
const AUTH_REQUEST_TIMEOUT_MS = 10000;
const PROFILE_REQUEST_TIMEOUT_MS = 6000;

export const AuthContext = createContext();

function withTimeout(promise, timeoutMs, timeoutMessage) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    }),
  ]);
}

function readStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());
  const [isAuthReady, setIsAuthReady] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return;
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    let isMounted = true;
    const authReadyTimeout = window.setTimeout(() => {
      if (isMounted) {
        setIsAuthReady(true);
      }
    }, 4000);

    const ensureProfile = async (authUser) => {
      if (!authUser) {
        return null;
      }

      const metadata = authUser.user_metadata || {};
      const fallbackEmail = authUser.email || '';
      const profilePayload = {
        id: authUser.id,
        full_name: metadata.full_name || metadata.name || (fallbackEmail ? fallbackEmail.split('@')[0] : 'User'),
        email: fallbackEmail,
        role: metadata.role || 'teacher',
        school: metadata.school || '',
        subject: metadata.subject || '',
      };

      const { data: profile, error: profileError } = await withTimeout(
        supabase
          .from('profiles')
          .select('full_name,email,role,school,subject')
          .eq('id', authUser.id)
          .maybeSingle(),
        PROFILE_REQUEST_TIMEOUT_MS,
        'Profile lookup timed out.'
      );

      if (profile || profileError) {
        return profile;
      }

      const { data: createdProfile, error: createError } = await withTimeout(
        supabase
          .from('profiles')
          .upsert(profilePayload)
          .select('full_name,email,role,school,subject')
          .single(),
        PROFILE_REQUEST_TIMEOUT_MS,
        'Profile creation timed out.'
      );

      if (createError) {
        return null;
      }

      return createdProfile;
    };

    const mapAuthUser = async (authUser) => {
      if (!authUser) {
        return null;
      }

      const metadata = authUser.user_metadata || {};
      const fallbackEmail = authUser.email || '';

      const baseUser = {
        id: authUser.id,
        name: metadata.full_name || metadata.name || (fallbackEmail ? fallbackEmail.split('@')[0] : 'User'),
        email: fallbackEmail,
        role: 'teacher',
        school: metadata.school || '',
        subject: metadata.subject || '',
      };

      let profile = null;

      try {
        profile = await ensureProfile(authUser);
      } catch {
        profile = null;
      }

      if (!profile) {
        return baseUser;
      }

      return {
        ...baseUser,
        name: profile.full_name || baseUser.name,
        email: profile.email || baseUser.email,
        role: profile.role || baseUser.role,
        school: profile.school || baseUser.school,
        subject: profile.subject || baseUser.subject,
      };
    };

    const hydrateSession = async () => {
      try {
        const { data, error } = await withTimeout(
          supabase.auth.getSession(),
          AUTH_REQUEST_TIMEOUT_MS,
          'Session check timed out.'
        );
        if (error) {
          if (isMounted) {
            setUser(null);
          }
          return;
        }

        const mapped = await mapAuthUser(data.session?.user || null);
        if (isMounted) {
          setUser(mapped);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsAuthReady(true);
        }
      }
    };

    hydrateSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        const mapped = await mapAuthUser(session?.user || null);
        if (isMounted) {
          setUser(mapped);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsAuthReady(true);
        }
      }
    });

    return () => {
      isMounted = false;
      window.clearTimeout(authReadyTimeout);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async ({ name, email, password, role = 'teacher' }) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await withTimeout(
        supabase.auth.signInWithPassword({
          email,
          password,
        }),
        AUTH_REQUEST_TIMEOUT_MS,
        'Sign in timed out. Please check your Supabase connection and try again.'
      );

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Login failed. No user session returned.');
      }

      let mappedRole = role === 'admin' ? 'admin' : 'teacher';
      try {
        const { data: profile, error: profileError } = await withTimeout(
          supabase
            .from('profiles')
            .select('full_name,email,role,school,subject')
            .eq('id', data.user.id)
            .maybeSingle(),
          PROFILE_REQUEST_TIMEOUT_MS,
          'Profile lookup timed out.'
        );
        if (profileError) {
          throw profileError;
        }

        if (profile?.role) {
          mappedRole = profile.role;
        }

        const sessionUser = {
          id: data.user.id,
          name: profile?.full_name || name || data.user.email?.split('@')[0] || 'User',
          email: profile?.email || data.user.email || email,
          role: mappedRole,
          school: profile?.school || '',
          subject: profile?.subject || '',
        };

        setUser(sessionUser);

        return {
          id: data.user.id,
          role: mappedRole,
        };
      } catch {
        mappedRole = role === 'admin' ? 'admin' : (data.user.user_metadata?.role || 'teacher');
      }

      const fallbackSessionUser = {
        id: data.user.id,
        name: name || data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
        email: data.user.email || email,
        role: mappedRole,
        school: data.user.user_metadata?.school || '',
        subject: data.user.user_metadata?.subject || '',
      };

      setUser(fallbackSessionUser);

      return {
        id: data.user.id,
        role: mappedRole,
      };
    }

    const sessionUser = {
      id: email,
      name: name || email.split('@')[0],
      email,
      role,
    };
    setUser(sessionUser);
    return sessionUser;
  };

  const signup = async ({ fullName, email, password, school, subject }) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await withTimeout(
        supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              school,
              subject,
            },
          },
        }),
        AUTH_REQUEST_TIMEOUT_MS,
        'Sign up timed out. Please check your Supabase connection and try again.'
      );

      if (error) {
        throw new Error(error.message);
      }

      const authUser = data.user;
      if (!authUser) {
        throw new Error('Signup failed. No user returned.');
      }

      // Insert profile when session exists immediately (email confirmation disabled).
      if (data.session) {
        const { error: profileError } = await withTimeout(
          supabase.from('profiles').upsert({
            id: authUser.id,
            full_name: fullName,
            email,
            role: 'teacher',
            school,
            subject,
          }),
          PROFILE_REQUEST_TIMEOUT_MS,
          'Profile setup timed out.'
        );

        if (profileError) {
          throw new Error(`Signup succeeded, but profile setup failed: ${profileError.message}`);
        }
      }

      return {
        id: authUser.id,
        requiresEmailVerification: !data.session,
      };
    }

    const sessionUser = {
      id: email,
      name: fullName,
      email,
      role: 'teacher',
      school,
      subject,
    };
    setUser(sessionUser);
    return {
      ...sessionUser,
      requiresEmailVerification: false,
    };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await withTimeout(
          supabase.auth.signOut(),
          SIGN_OUT_TIMEOUT_MS,
          'Sign out timed out. Please refresh the page and try again.'
        );
      } finally {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setIsAuthReady(true);
      }
      return;
    }

    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthReady,
        isUsingSupabase: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
