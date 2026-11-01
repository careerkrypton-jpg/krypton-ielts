-- ====================================================================
-- KATHMANDU KRYPTON IELTS - STEP 6 DATABASE RLS LOCKDOWN (CRITICAL P0)
-- Target Supabase Project: https://xgndntumjdmavihospdw.supabase.co
-- 
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/xgndntumjdmavihospdw
-- 2. Click on "SQL Editor" in the left sidebar.
-- 3. Click "New Query" (+).
-- 4. Copy and paste ALL lines below, then click "RUN".
-- ====================================================================

-- 1. FORCE ROW LEVEL SECURITY ON BOTH TABLES
ALTER TABLE public.ielts_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ielts_students FORCE ROW LEVEL SECURITY;
ALTER TABLE public.ielts_test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ielts_test_attempts FORCE ROW LEVEL SECURITY;

-- 2. DYNAMICALLY DROP EVERY EXISTING OR PERMISSIVE POLICY ON BOTH TABLES
DO $$
DECLARE
    pol record;
BEGIN
    FOR pol IN 
        SELECT policyname, tablename 
        FROM pg_policies 
        WHERE schemaname = 'public' 
          AND tablename IN ('ielts_students', 'ielts_test_attempts')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- 3. EXPLICIT DROPS FOR DEFAULT SUPABASE UI POLICIES
DROP POLICY IF EXISTS "Enable read access for all users" ON public.ielts_students;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.ielts_students;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Enable update access for all users" ON public.ielts_students;
DROP POLICY IF EXISTS "Enable update access for all users" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Enable delete access for all users" ON public.ielts_students;
DROP POLICY IF EXISTS "Enable delete access for all users" ON public.ielts_test_attempts;

-- 4. APPLY STRICT MULTI-TENANT POLICIES ON ielts_students
-- Students can only read their own profile; teachers read assigned students; admins read all
CREATE POLICY "Student and teacher profile access"
ON public.ielts_students
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR (public.is_instructor() AND (assigned_instructor_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR user_id = auth.uid()))
  OR public.is_admin()
);

-- Students can insert their own profile on registration
CREATE POLICY "Student profile self-registration"
ON public.ielts_students
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (role IS NULL OR role = 'student')
);

-- Students can only update their own profile (immutable fields protected by trigger)
CREATE POLICY "Student profile self-update"
ON public.ielts_students
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id OR public.is_admin())
WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Only admins can delete profiles
CREATE POLICY "Admin profile deletion"
ON public.ielts_students
FOR DELETE
TO authenticated
USING (public.is_admin());

-- 5. APPLY STRICT POLICIES ON ielts_test_attempts
-- Students can only read their own test attempts
CREATE POLICY "Student and teacher test attempt access"
ON public.ielts_test_attempts
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR (public.is_instructor() AND EXISTS (
    SELECT 1 FROM public.ielts_students s
    WHERE s.user_id = ielts_test_attempts.user_id
      AND (s.assigned_instructor_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR s.user_id = auth.uid())
  ))
  OR public.is_admin()
);

-- Students can record their own test submissions
CREATE POLICY "Student test attempt submission"
ON public.ielts_test_attempts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Only admins can purge test attempts
CREATE POLICY "Admin attempt deletion"
ON public.ielts_test_attempts
FOR DELETE
TO authenticated
USING (public.is_admin());

-- 6. VERIFICATION SUMMARY
SELECT 
  'STEP_6_RLS_LOCKDOWN_SUCCESSFUL' AS status,
  (SELECT count(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'ielts_students') AS student_policies_count,
  (SELECT count(*) FROM pg_policies WHERE schemaname = 'public' AND tablename = 'ielts_test_attempts') AS attempt_policies_count,
  now() AS completed_at;

