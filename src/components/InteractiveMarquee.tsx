
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpLeft } from "lucide-react";
interface InteractiveMarqueeProps {
  content: string[];
}

const InteractiveMarquee = ({ content }: InteractiveMarqueeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsInputMode(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-portfolio-email', {
        body: { userResponse: inputValue }
      });

      if (error) {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again.');
      } else {
        // Ask if they want to provide contact info
        const wantsToProvideContact = confirm('Thanks for your response! Would you like to share your email or GitHub handle so I can get in touch? (Optional)');
        
        if (wantsToProvideContact) {
          const contactInfo = prompt('Please enter your email or GitHub handle:');
          
          if (contactInfo && contactInfo.trim()) {
            // Determine if it's email or github based on simple heuristic
            const contactType = contactInfo.includes('@') ? 'email' : 'github';
            
            // Save to database
            const { error: dbError } = await supabase
              .from('portfolio_responses')
              .insert({
                user_response: inputValue,
                contact_info: contactInfo.trim(),
                contact_type: contactType
              });
            
            if (dbError) {
              console.error('Error saving to database:', dbError);
              alert('Response sent successfully, but there was an issue saving your contact info.');
            } else {
              alert('Perfect! Your response and contact info have been saved. Let\'s keep in touch!');
            }
          } else {
            alert('OK! Your response has been sent successfully 🙌');
          }
        } else {
          // Save response without contact info
          const { error: dbError } = await supabase
            .from('portfolio_responses')
            .insert({
              user_response: inputValue
            });
          
          if (dbError) {
            console.error('Error saving to database:', dbError);
          }
          
          alert('Thanks for your response! Message sent successfully.');
        }
        
        setInputValue("");
        setIsInputMode(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsInputMode(false);
      setInputValue("");
    }
  };

  const handleBlur = () => {
    // Don't close input mode on blur to allow interaction with the submit button
  };

  useEffect(() => {
    if (isInputMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputMode]);

  if (isInputMode) {
    return (
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-4">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="bg-transparent border-b-[6px] sm:border-b-[8px] md:border-b-[12px] border-black text-black text-4xl sm:text-6xl md:text-8xl font-mono font-bold leading-tight outline-none w-full max-w-[90vw] sm:max-w-[600px]"
            placeholder=""
            disabled={isSubmitting}
          />
          {inputValue.trim() && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-2 bg-black text-white font-mono text-xs sm:text-sm hover:bg-gray-800 transition-colors rounded-lg disabled:opacity-50 whitespace-nowrap flex-shrink-0"
            >
              {isSubmitting ? 'Sending...' : 'Press ↵ to send'}
            </button>
          )}
        </form>
      </div>
    );
  }

  return (
    <span 
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <span className={`transition-opacity duration-300 border-b-[6px] sm:border-b-[8px] md:border-b-[12px] border-black text-transparent`}>
        _____
      </span>
      
      <span className="absolute inset-0 overflow-hidden whitespace-nowrap">
        <span className="inline-block animate-[marquee_120s_linear_infinite]">
          {content.join(" • ")} • {content.join(" • ")} • 
        </span>
      </span>

      {/* Interactive cursor indicator - moved to bottom right with hand pointer style */}
      <ArrowUpLeft className="absolute" style={{ right: '-25px', bottom: '-40px' }} />
    </span>
  );
};

export default InteractiveMarquee;
