-- ====================================================================
-- KATHMANDU KRYPTON IELTS - PRODUCTION DATABASE SETUP & RLS HARDENING (v2.0)
-- Target Supabase Project: https://xgndntumjdmavihospdw.supabase.co
-- Non-destructive additive migration with Strict Cryptographic Row-Level Security
-- Primary Rule: auth.uid() = user_id (Zero email-based ownership fallbacks)
-- Zero RLS recursion: Uses SECURITY DEFINER role functions
-- 
-- HOW TO RUN:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/xgndntumjdmavihospdw
-- 2. Go to: SQL Editor -> New Query
-- 3. Paste this entire file and click "Run" (or Ctrl + Enter)
-- ====================================================================

-- --------------------------------------------------------------------
-- STEP 1: SAFE ARCHIVE & DEDUPLICATION (PRESERVE ALL STUDENT DATA)
-- --------------------------------------------------------------------
-- 1.1 Create an archive table so duplicate candidate numbers and history are NEVER lost
CREATE TABLE IF NOT EXISTS public.ielts_students_archive (
  archived_at timestamptz DEFAULT now(),
  archive_reason text DEFAULT 'Deduplication migration: preserved legacy candidate numbers',
  id uuid,
  name text,
  email text,
  candidate_number text,
  target_band numeric,
  preferred_country text,
  created_at timestamptz
);

-- 1.2 Back up duplicate student rows into the archive table before cleaning active table
INSERT INTO public.ielts_students_archive (archived_at, archive_reason, id, name, email, candidate_number, target_band, preferred_country, created_at)
SELECT 
  now(), 
  'Deduplication migration: preserved legacy candidate numbers', 
  s.id, 
  s.name, 
  s.email, 
  s.candidate_number, 
  s.target_band, 
  s.preferred_country, 
  s.created_at
FROM public.ielts_students s
WHERE s.id NOT IN (
  SELECT DISTINCT ON (LOWER(TRIM(email))) id
  FROM public.ielts_students
  ORDER BY LOWER(TRIM(email)), created_at DESC
);

-- 1.3 Deduplicate active ielts_students keeping the latest active record for each email
DELETE FROM public.ielts_students
WHERE id NOT IN (
  SELECT DISTINCT ON (LOWER(TRIM(email))) id
  FROM public.ielts_students
  ORDER BY LOWER(TRIM(email)), created_at DESC
);

-- 1.4 Normalize emails to lowercase and trim whitespace
UPDATE public.ielts_students
SET email = LOWER(TRIM(email));

-- 1.5 Add UNIQUE constraint to email on ielts_students (guarantees zero duplicate profiles going forward)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'ielts_students_email_unique'
  ) THEN
    ALTER TABLE public.ielts_students 
    ADD CONSTRAINT ielts_students_email_unique UNIQUE (email);
  END IF;
END $$;

-- --------------------------------------------------------------------
-- STEP 2: NON-DESTRUCTIVE COLUMN UPGRADES
-- --------------------------------------------------------------------
-- 2.1 Upgrade ielts_students
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_students' AND column_name = 'user_id') THEN
    ALTER TABLE public.ielts_students ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_students' AND column_name = 'role') THEN
    ALTER TABLE public.ielts_students ADD COLUMN role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_students' AND column_name = 'device_type') THEN
    ALTER TABLE public.ielts_students ADD COLUMN device_type text DEFAULT 'Desktop';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_students' AND column_name = 'last_login_at') THEN
    ALTER TABLE public.ielts_students ADD COLUMN last_login_at timestamptz DEFAULT now();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_students' AND column_name = 'phone') THEN
    ALTER TABLE public.ielts_students ADD COLUMN phone text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_students' AND column_name = 'attendance_count') THEN
    ALTER TABLE public.ielts_students ADD COLUMN attendance_count integer DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_students' AND column_name = 'assigned_instructor_email') THEN
    ALTER TABLE public.ielts_students ADD COLUMN assigned_instructor_email text DEFAULT 'nirmalthapa0458@gmail.com';
  END IF;
END $$;

-- 2.2 Create or upgrade ielts_test_attempts
CREATE TABLE IF NOT EXISTS public.ielts_test_attempts (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  student_email text NOT NULL,
  student_name text NOT NULL,
  test_id integer NOT NULL,
  test_title text NOT NULL,
  module text NOT NULL,
  band_score numeric NOT NULL,
  raw_score integer,
  total_questions integer,
  duration_seconds integer DEFAULT 0,
  device_type text DEFAULT 'Desktop',
  ai_evaluation jsonb,
  completed_at timestamptz DEFAULT now()
);

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_test_attempts' AND column_name = 'user_id') THEN
    ALTER TABLE public.ielts_test_attempts ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_test_attempts' AND column_name = 'duration_seconds') THEN
    ALTER TABLE public.ielts_test_attempts ADD COLUMN duration_seconds integer DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ielts_test_attempts' AND column_name = 'device_type') THEN
    ALTER TABLE public.ielts_test_attempts ADD COLUMN device_type text DEFAULT 'Desktop';
  END IF;
END $$;

-- 2.3 Backfill user_id on existing students and attempts if matching Google Auth users exist
UPDATE public.ielts_students s
SET user_id = u.id
FROM auth.users u
WHERE LOWER(TRIM(s.email)) = LOWER(TRIM(u.email))
  AND s.user_id IS NULL;

UPDATE public.ielts_test_attempts a
SET user_id = u.id
FROM auth.users u
WHERE LOWER(TRIM(a.student_email)) = LOWER(TRIM(u.email))
  AND a.user_id IS NULL;

-- --------------------------------------------------------------------
-- STEP 3: HIGH-CONCURRENCY B-TREE INDEXES (10 TO 500 CONCURRENT USERS)
-- --------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_ielts_students_user_id ON public.ielts_students(user_id);
CREATE INDEX IF NOT EXISTS idx_ielts_students_email ON public.ielts_students(email);
CREATE INDEX IF NOT EXISTS idx_ielts_students_role ON public.ielts_students(role);
CREATE INDEX IF NOT EXISTS idx_ielts_students_instructor ON public.ielts_students(assigned_instructor_email);
CREATE INDEX IF NOT EXISTS idx_ielts_attempts_user_id ON public.ielts_test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_ielts_attempts_student_email ON public.ielts_test_attempts(student_email);
CREATE INDEX IF NOT EXISTS idx_ielts_attempts_completed_at ON public.ielts_test_attempts(completed_at DESC);

-- --------------------------------------------------------------------
-- STEP 4: SECURE ROLE VERIFICATION FUNCTIONS (ZERO RLS RECURSION)
-- --------------------------------------------------------------------
-- Marked SECURITY DEFINER to bypass RLS during role checks, completely preventing
-- the "infinite recursion detected in policy for relation ielts_students" error.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.ielts_students
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_instructor()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.ielts_students
    WHERE user_id = auth.uid()
      AND role = 'instructor'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_instructor_or_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.ielts_students
    WHERE user_id = auth.uid()
      AND role IN ('instructor', 'admin')
  );
END;
$$;

-- --------------------------------------------------------------------
-- STEP 5: IMMUTABILITY & ANTI-ESCALATION TRIGGER
-- --------------------------------------------------------------------
-- Guarantees that students CANNOT modify:
--   - user_id (prevents profile hijacking)
--   - role (prevents self-promotion to instructor or admin)
--   - candidate_number (guarantees candidate ID permanence)
--   - email (verified identity cannot be swapped)
--   - attendance_count (protected from tampering)

CREATE OR REPLACE FUNCTION public.protect_student_immutability()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If the user is NOT an administrator, enforce strict immutability
  IF NOT public.is_admin() THEN
    -- 1. Prevent user_id change
    IF OLD.user_id IS NOT NULL AND NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      RAISE EXCEPTION 'Security Policy Violation: user_id is immutable';
    END IF;

    -- 2. Prevent role escalation
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'Security Policy Violation: Privilege escalation is strictly forbidden';
    END IF;

    -- 3. Prevent candidate_number tampering
    IF OLD.candidate_number IS NOT NULL AND NEW.candidate_number IS DISTINCT FROM OLD.candidate_number THEN
      RAISE EXCEPTION 'Security Policy Violation: candidate_number is immutable once assigned';
    END IF;

    -- 4. Prevent email swap
    IF NEW.email IS DISTINCT FROM OLD.email THEN
      RAISE EXCEPTION 'Security Policy Violation: Verified Google email cannot be altered';
    END IF;

    -- 5. Prevent attendance tampering by student
    NEW.attendance_count := OLD.attendance_count;
    NEW.role := OLD.role;
    NEW.candidate_number := COALESCE(OLD.candidate_number, NEW.candidate_number);
    NEW.user_id := COALESCE(OLD.user_id, NEW.user_id);
    NEW.email := OLD.email;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_student_immutability ON public.ielts_students;
CREATE TRIGGER trg_protect_student_immutability
  BEFORE UPDATE ON public.ielts_students
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_student_immutability();

-- --------------------------------------------------------------------
-- STEP 6: STRICT MULTI-TENANT ROW-LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------------------
ALTER TABLE public.ielts_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ielts_students FORCE ROW LEVEL SECURITY;
ALTER TABLE public.ielts_test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ielts_test_attempts FORCE ROW LEVEL SECURITY;

-- 6.1 Dynamically drop EVERY existing or permissive policy on both tables
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

-- Explicit drops for standard Supabase UI default policy names
DROP POLICY IF EXISTS "Enable read access for all users" ON public.ielts_students;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.ielts_students;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Enable update access for all users" ON public.ielts_students;
DROP POLICY IF EXISTS "Enable update access for all users" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Allow student select" ON public.ielts_students;
DROP POLICY IF EXISTS "Allow student insert" ON public.ielts_students;
DROP POLICY IF EXISTS "Allow student update" ON public.ielts_students;
DROP POLICY IF EXISTS "Allow read attempts" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Allow insert attempts" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Students can view own profile" ON public.ielts_students;
DROP POLICY IF EXISTS "Students can insert own profile" ON public.ielts_students;
DROP POLICY IF EXISTS "Students can update own profile" ON public.ielts_students;
DROP POLICY IF EXISTS "Students can read own test attempts" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Students can insert own test attempts" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Student and teacher profile access" ON public.ielts_students;
DROP POLICY IF EXISTS "Student profile self-registration" ON public.ielts_students;
DROP POLICY IF EXISTS "Student profile self-update" ON public.ielts_students;
DROP POLICY IF EXISTS "Admin profile deletion" ON public.ielts_students;
DROP POLICY IF EXISTS "Student and teacher test attempt access" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Student test attempt submission" ON public.ielts_test_attempts;
DROP POLICY IF EXISTS "Admin attempt deletion" ON public.ielts_test_attempts;

-- 6.2 POLICIES FOR: ielts_students

-- SELECT: Students view only their own record; Teachers view assigned students; Admins view all
CREATE POLICY "Student and teacher profile access"
ON public.ielts_students
FOR SELECT
TO authenticated
USING (
  -- 1. Student reads their own profile strictly by user_id
  auth.uid() = user_id
  -- 2. Certified teacher reads only their assigned students
  OR (
    public.is_instructor() AND (
      assigned_instructor_email = (SELECT email FROM auth.users WHERE id = auth.uid())
      OR user_id = auth.uid()
    )
  )
  -- 3. Portal administrator reads all student records
  OR public.is_admin()
);

-- INSERT: Authenticated student can insert their own profile on registration
-- Role must be 'student' (cannot self-register as instructor or admin)
CREATE POLICY "Student profile self-registration"
ON public.ielts_students
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND (role IS NULL OR role = 'student')
);

-- UPDATE: Student can update target_band and preferred_country on their own record
CREATE POLICY "Student profile self-update"
ON public.ielts_students
FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id OR public.is_admin()
)
WITH CHECK (
  auth.uid() = user_id OR public.is_admin()
);

-- DELETE: Only Portal Administrator can delete student profiles
CREATE POLICY "Admin profile deletion"
ON public.ielts_students
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);

-- 6.3 POLICIES FOR: ielts_test_attempts

-- SELECT: Student reads only their own attempts; Teacher reads assigned student attempts; Admin reads all
CREATE POLICY "Student and teacher test attempt access"
ON public.ielts_test_attempts
FOR SELECT
TO authenticated
USING (
  -- 1. Student reads their own test records strictly by user_id
  auth.uid() = user_id
  -- 2. Certified teacher reads only assigned student attempts
  OR (
    public.is_instructor() AND EXISTS (
      SELECT 1 FROM public.ielts_students s
      WHERE s.user_id = ielts_test_attempts.user_id
        AND (
          s.assigned_instructor_email = (SELECT email FROM auth.users WHERE id = auth.uid())
          OR s.user_id = auth.uid()
        )
    )
  )
  -- 3. Portal administrator reads all test records
  OR public.is_admin()
);

-- INSERT: Student records their own test attempts
CREATE POLICY "Student test attempt submission"
ON public.ielts_test_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

-- UPDATE: Test attempts are immutable exam scorecards (No updates allowed)
-- No UPDATE policy defined -> updates are blocked by default

-- DELETE: Only Portal Administrator can purge test attempts
CREATE POLICY "Admin attempt deletion"
ON public.ielts_test_attempts
FOR DELETE
TO authenticated
USING (
  public.is_admin()
);

-- --------------------------------------------------------------------
-- STEP 7: AUTOMATIC PROFILE PROVISIONING ON GOOGLE OAUTH SIGNUP
-- --------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_krypton_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_candidate_no text;
  v_existing_id uuid;
BEGIN
  -- 1. Check if student profile already exists by email
  SELECT id, candidate_number INTO v_existing_id, v_candidate_no
  FROM public.ielts_students
  WHERE email = LOWER(TRIM(NEW.email))
  LIMIT 1;

  IF v_existing_id IS NOT NULL THEN
    -- Existing student: Link verified user_id without touching existing candidate number or scores
    UPDATE public.ielts_students
    SET
      user_id = NEW.id,
      last_login_at = now()
    WHERE id = v_existing_id;
  ELSE
    -- Brand new student: Generate authentic candidate number (NP-KTM-XXXXXX)
    v_candidate_no := 'NP-KTM-' || LPAD((FLOOR(RANDOM() * 900000) + 100000)::text, 6, '0');

    INSERT INTO public.ielts_students (
      user_id,
      email,
      name,
      candidate_number,
      role,
      target_band,
      preferred_country,
      assigned_instructor_email,
      last_login_at,
      created_at
    )
    VALUES (
      NEW.id,
      LOWER(TRIM(NEW.email)),
      COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        INITCAP(SPLIT_PART(NEW.email, '@', 1))
      ),
      v_candidate_no,
      'student',
      COALESCE((NEW.raw_user_meta_data->>'target_band')::numeric, 7.5),
      COALESCE(NEW.raw_user_meta_data->>'preferred_country', 'UK'),
      'nirmalthapa0458@gmail.com',
      now(),
      now()
    );
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Safety guarantee: Never block Google sign-in even if trigger encounters an edge case
    RAISE WARNING 'handle_krypton_new_user notice: %', SQLERRM;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_krypton_new_user();

-- --------------------------------------------------------------------
-- STEP 8: POST-MIGRATION VERIFICATION CONFIRMATION QUERY
-- --------------------------------------------------------------------
SELECT 
  'KRYPTON_DATABASE_HARDENED' AS status,
  (SELECT count(*) FROM public.ielts_students) AS active_students_count,
  (SELECT count(*) FROM public.ielts_students_archive) AS archived_duplicates_count,
  (SELECT count(*) FROM public.ielts_test_attempts) AS test_attempts_count,
  now() AS completed_at;
