import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { mobile, dob } = await req.json();

    if (!mobile || !dob) {
      return new Response(
        JSON.stringify({ error: "Mobile number and Date of Birth are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const cleanMobile = mobile.trim().replace(/\D/g, "");
    const cleanDob = dob.trim();

    // Initialize Supabase Client inside Edge Function
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Query student table by mobile number
    const { data: student, error } = await supabase
      .from("students")
      .select("id, student_number, name, mobile, dob, email, course, department, semester, academic_year, profile_image")
      .eq("mobile", cleanMobile)
      .maybeSingle();

    if (error || !student) {
      return new Response(
        JSON.stringify({ error: "Invalid Student Mobile Number or Date of Birth." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify DOB credential
    const dbDob = String(student.dob).trim();
    if (dbDob !== cleanDob) {
      return new Response(
        JSON.stringify({ error: "Invalid Student Mobile Number or Date of Birth." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Remove raw DOB before returning payload to browser for security
    const { dob: _, ...safeStudentProfile } = student;

    // Generate authenticated session token
    const token = `srgi_session_${student.id}_${Date.now()}`;

    return new Response(
      JSON.stringify({
        token,
        student: safeStudentProfile
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error during authentication." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
