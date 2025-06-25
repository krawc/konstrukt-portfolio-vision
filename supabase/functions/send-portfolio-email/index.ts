import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
const handler = async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    const { userResponse } = await req.json();
    if (!userResponse || userResponse.trim() === "") {
      return new Response(JSON.stringify({
        error: "User response is required"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });
    }
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <noreply@localhost96.net>",
      to: [
        "konrad.krawczyk@proton.me"
      ],
      subject: "New response from portfolio - the future is...",
      html: `
        <h2>New Portfolio Response</h2>
        <p><strong>The future is:</strong> ${userResponse}</p>
        <br>
        <p><em>Sent from your portfolio website</em></p>
      `
    });
    console.log("Email sent successfully:", emailResponse);
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error("Error in send-portfolio-email function:", error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }
};
serve(handler);
